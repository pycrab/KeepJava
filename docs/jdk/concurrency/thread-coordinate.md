---
title: 线程协调
description: 线程协调
meta:
  - name: keywords
    content: 线程协调
tags: ['线程协调']
prev: ./
next: ./thread-manage
---

## wait - notify

Java 为每个对象提供了 `wait()` 方法使线程阻塞等待，`notify()` 方法来唤醒由于 `wait()` 方法阻塞等待的线程。使用这两个方法的前提是当前线程持有该对象的监视器锁（隐式锁），而给对象添加隐式锁的方式就是通过 synchronized 关键字声明。

- `wait()`，当前线程释放该对象的监视器锁，等待被唤醒或者被中断退出等待
- ` wait(long timeoutMillis)`，同 `wait()` 方法，同时如果超过指定时间没被唤醒，可以退出等待
- `notify()`，唤醒一个正在阻塞等待的线程
- `notifyAll()`，唤醒所有的正在阻塞等待的线程

::: warning 注意

`wait()` 方法会释放对对象的监视器锁，`notify()` 方法只是唤醒阻塞等待的线程，和其它线程去竞争获取对象的监视器锁，具体能不能获取到监视器锁，要看 CPU 的具体调度。

:::

::: details 代码示例：两个线程交替打印数字

隐式锁锁住同一个对象，一个线程打印完后，唤醒另一个线程，然后阻塞等待另一个线程唤醒。

```java
public class Main {
    static class Counter {
        private int count = 0;

        public synchronized void printX() {
            while (count < 100 && count % 2 == 0) {
                count++;
                System.out.println(Thread.currentThread().getName() + count);
                notifyAll();
            }

            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
                return;
            }
        }

        public synchronized void printY() {
            while (count < 100 && count % 2 == 1) {
                count++;
                System.out.println(Thread.currentThread().getName() + count);
                notifyAll();
            }

            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
                return;
            }
        }
    }

    public static void main(String[] args) {
        final Counter counter = new Counter();
        new Thread(() -> {
            while (counter.count < 100) {
                counter.printX();
            }
            Thread.currentThread().interrupt();
        }, "线程A: ").start();

        new Thread(() -> {
            while (counter.count < 100) {
                counter.printY();
            }
            Thread.currentThread().interrupt();
        }, "线程B: ").start();

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

:::

## await - signal

如果使用显式锁替代了隐式锁使用，则应该使用 Condition 类提供的 `await()` 和 `signal()` 替代 `wait()` 和 `notify()`。

显示锁提供了 `newCondition()` 方法来声明一个条件，其实就是一个普通对象，它提供了如下方法：

- `await()`，自动释放锁，进入阻塞等待状态，等待被唤醒或者被中断退出等待
- `awaitUninterruptibly()`，释放锁，进入阻塞等待状态，无法通过中断唤醒
- `signal()`，唤醒一个阻塞等待的线程
- `signalAll()`，唤醒所有的正在阻塞等待的线程

::: warning 注意

和隐式锁的使用一样，调用以上方法需要保证当前线程持有该 Condition 条件对象的锁，否则会报 IllegalMonitorStateException 异常。

:::

::: details 代码示例：生产者 - 消费者

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class Main {
    static class Factory {
        private volatile AtomicBoolean RUNNING_STATUS = new AtomicBoolean(true);

        private final int MIN_SIZE = 0;
        private final int MAX_SIZE = 10;
        private List<Integer> blockedQueue = new ArrayList<>(MAX_SIZE);

        ReentrantLock lock = new ReentrantLock();
        Condition full = lock.newCondition();
        Condition empty = lock.newCondition();

        public void produce() {
            lock.lock();
            while (blockedQueue.size() >= MAX_SIZE) {
                System.out.println("阻塞队列满，" + Thread.currentThread().getName() + " 等待生产");
                try {
                    full.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return;
                }
            }

            try {
                final int num = ThreadLocalRandom.current().nextInt();
                blockedQueue.add(num);
                System.out.println(Thread.currentThread().getName() + " 生产：" + num);

                Thread.sleep(100);
                empty.signalAll();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }

        public void consume() {
            lock.lock();
            while (blockedQueue.size() <= MIN_SIZE) {
                System.out.println("阻塞队列空，" + Thread.currentThread().getName() + " 等待消费");
                try {
                    empty.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            try {
                System.out.println(Thread.currentThread().getName() + " 消费：" + blockedQueue.remove(0));

                Thread.sleep(100);
                full.signalAll();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }


        public boolean running() {
            return RUNNING_STATUS.get();
        }

        public void stop() {
            RUNNING_STATUS.set(false);
        }
    }

    public static void main(String[] args) {
        Factory factory = new Factory();

        new Thread(() -> {
            while (factory.running()) {
                factory.produce();
            }
            Thread.currentThread().interrupt();
        }, "线程A").start();

        new Thread(() -> {
            while (factory.running()) {
                factory.produce();
            }
            Thread.currentThread().interrupt();
        }, "线程B").start();

        new Thread(() -> {
            while (factory.running()) {
                factory.consume();
            }
            Thread.currentThread().interrupt();
        }, "线程C").start();

        new Thread(() -> {
            while (factory.running()) {
                factory.consume();
            }
            Thread.currentThread().interrupt();
        }, "线程D").start();

        try {
            // 两秒后停止生产和消费
            Thread.sleep(2000);
            factory.stop();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

:::

::: warning 注意

在线程协调的条件块中，使用 while 而不是 if 通过`wait()` 或者 `await()` 使线程等待。因为当线程重新获取到锁后，会从 `wait()` 或 `await()` 处重新开始执行，此时竞态条件可能已经发生变化，所以需要再次进入循环判断。

:::

## 阻塞队列

JDK 5 新增了队列这种集合，并实现了很多常用的阻塞队列，阻塞队列通过在内部使用锁或其它并发控制来实现原子操作，它是线程安全的，我们不需要手动去实现加锁解锁阻塞等待等操作了，可以像使用普通集合类那样方便。阻塞队列 BlockingQueue 接口提供了如下方法：

- 插入元素
  - `put(E e)`，直接插入元素，如果没有可用空间则阻塞等待
  - `add(E e)`，容量足够则直接插入并返回 true，超出容量限制则抛 IllegalStateException 异常
  - `offer(E e)`，容量足够则直接插入并返回 true，超出容量限制则返回 false
  - `offer(E e, long timeout, TimeUnit unit)`，容量足够则直接插入并返回 true，否则等待指定时间再尝试插入
- 删除元素
  - `take()`，检索并删除第一个元素，如果没有元素则阻塞等待
  - `poll(long timeout, TimeUnit unit)`，检索并删除第一个元素，如果没有元素则阻塞等待指定时间再尝试，超时没有则返回 null
  - `remove(Object o)`，删除指定元素的单个实例，有则返回 true；`contains(Object o)` 判断是否含有某个元素
  - `remainingCapacity()`，获取队列剩余可用容量，没有限制则返回 Integer.MAX_VALUE

::: warning 注意

阻塞队列不能插入 null 值，因为 null 用作标识 poll 操作失败。阻塞队列通常用于特定场景，尽量不要当作普通队列使用。

:::

### ArrayBlockingQueue

基于数组的、有界（必须指定 capacity）、先进先出（FIFO）的阻塞队列。

内部使用可重入锁 ReentrantLock，可选择公平策略（默认非公平）。

::: details 代码示例：生产者 - 消费者

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ThreadLocalRandom;

public class Main {

    static class Producer implements Runnable {
        private final BlockingQueue<Integer> queue;

        public Producer(BlockingQueue<Integer> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            while (true) {
                try {
                    Thread.sleep(50);
                    queue.put(produce());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return;
                }
            }
        }

        private Integer produce() {
            final int num = ThreadLocalRandom.current().nextInt();
            System.out.println(Thread.currentThread().getName() + " 生产: " + num);
            return num;
        }
    }

    static class Consumer implements Runnable {
        private final BlockingQueue<Integer> queue;

        public Consumer(BlockingQueue<Integer> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            while (true) {
                try {
                    Thread.sleep(80);
                    consume(queue.take());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return;
                }
            }
        }

        private void consume(Integer take) {
            System.out.println(Thread.currentThread().getName() + " 消费: " + take);
        }
    }


    public static void main(String[] args) {
        final ArrayBlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10);

        final Thread a = new Thread(new Producer(queue), "A");
        final Thread b = new Thread(new Producer(queue), "B");
        final Thread c = new Thread(new Consumer(queue), "C");
        final Thread d = new Thread(new Consumer(queue), "D");
        a.start();
        b.start();
        c.start();
        d.start();

        try {
            Thread.sleep(1000);
            a.interrupt();
            Thread.sleep(1000);
            b.interrupt();
            Thread.sleep(1000);
            c.interrupt();
            Thread.sleep(1000);
            d.interrupt();
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

:::

### LinkedBlockingQueue

基于链表的、理论有界（Integer.MAX_VALUE）、先进先出（FIFO）的阻塞队列。

相比于 ArrayBlockingQueue 有更高的吞吐量，但性能较差。

### LinkedBlockingDeque <badge>JDK 6</badge>

基于链表的、有界（默认 Integer.MAX_VALUE，可选 capacity）的阻塞双端队列。

### PriorityBlockingQueue

基于优先级队列 PriorityQueue、无界的阻塞队列。

因为是无界的，插入元素不会阻塞，获取元素可以阻塞。可以通过 Comparator 参数指定如何比较优先级并提供实现 Comparable 接口的元素，不指定默认以元素插入顺序。

### DelayQueue

包含具有延迟指定时间才可用的元素、无界的阻塞队列。

元素需要实现 Delayed 接口声明延迟时间。由于无界，插入元素永不阻塞；如果队列为空获取元素可以阻塞等待。

内部使用可重入锁 ReentrantLock 保证安全，使用优先级队列 PriorityQueue 实现延迟。该延迟阻塞队列可用于以下几种情况：

- 缓存过期处理
- 事件需要延迟处理

### SynchronousQueue

同步阻塞队列，它不存储元素，用于线程和线程间的一对一通信。插入和获取元素必须成对出现才能同时操作，否则都一直等待对应的线程到来。

- 公平模式下是先进先出的队列
- 非公平模式下是后进先出栈

::: details 代码示例：两个线程交替打印数字

```java
AtomicInteger atomicNUm = new AtomicInteger(0);
final SynchronousQueue<Integer> queue = new SynchronousQueue<>();

new Thread(() -> {
    while (atomicNUm.get() < 100) {
        try {
            queue.put(atomicNUm.incrementAndGet());
            System.out.println("A run: " + queue.take());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}).start();

new Thread(() -> {
    while (atomicNUm.get() < 100) {
        try {
            System.out.println("B run: " + queue.take());
            queue.put(atomicNUm.incrementAndGet());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}).start();
```

:::

### LinkedTransferQueue <badge> JDK 7</badge>

基于链表的、理论有界（Integer.MAX_VALUE）、先进先出（FIFO）的阻塞队列。（双同步队列）