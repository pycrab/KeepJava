---
title: 线程竞争
description: 线程竞争
meta:
  - name: keywords
    content: 线程竞争
tags: ['线程竞争']
prev: ./
next: ./sharing
---

## 死锁

::: details 死锁示例一：线程互相等待对方持有的资源，导致永远被阻塞

```java
public class Main {
    static class Counter {
        final Object o1 = new Object();
        final Object o2 = new Object();

        public void increment() {
            synchronized (o1) {
                System.out.println("inc-o1");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return;
                }
                synchronized (o2) {
                    System.out.println("inc-o2");
                }
            }
        }

        public void decrement() {
            synchronized (o2) {
                System.out.println("dec-o2");
                synchronized (o1) {
                    System.out.println("dec-o1");
                }
            }
        }
    }

    public static void main(String[] args) {
        final Counter counter = new Counter();
        final Thread thread = new Thread(counter::increment, "线程1:");
        thread.start();
        new Thread(counter::decrement, "线程2:").start();

        //thread.interrupt();
    }
}
```

:::

::: details 死锁示例二：线程全部阻塞等待互相唤醒

如果有两个个生产者和一个消费者，缓冲区为最大为1，消费者先阻塞，notify 通知生产者1，生产者1生产1，然后阻塞，notify 生产者2，生产者2也阻塞，这时已经没有线程可以执行 notify，因此全部在等待无法被唤醒，产生死锁。

:::

避免死锁要注意加锁的顺序要一致；使用 `notifyAll()` 而不是 `notify()` 去唤醒阻塞的线程。

## 饥饿

饥饿的产生是由于贪婪线程长时间不释放锁，导致其它需要获取锁的线程经常被阻塞。

## 活锁

一个线程通常会响应另一个线程的操作而行动，如果另一个线程的动作也是对这个线程的动作的响应，则可能会导致活锁。就比如两个人迎面走来，一个往左一个往右，互相谦让，一个往右一个往左。这两个线程都没有阻塞，只是忙于彼此的响应而无法恢复工作。