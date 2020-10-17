---
title: Java 线程基础
description: Java 线程基础
meta:
  - name: keywords
    content: Java 线程基础
tags: ['Java 线程基础']
prev: ./
next: ./lock
---

**Java 中每个线程对象都是 Thread 类的实例**。下面通过阅读 java.lang.Thread 类的源码来学习下线程基础。源码注释写的非常清楚，不得不感谢开发人员的严谨认真。

## 线程属性

- **name 线程名称（volatile）**

  - `setName(String)`，建议设置线程名，设置线程名时，不能为 null，否则会报 NPE 异常。匿名线程会根据创建顺序默认名称为 `Thread-顺序号` 。
  - `getName()`

- **id 线程 id（final）**

  - `getId()`，创建线程时分配的 id 不可修改，线程终止时可再分配给其他线程。

- **priority 线程优先级**

  - `setPriority(int)`
  - `getPriority()`，线程优先级 1-10，默认是 5。创建线程默认继承当前线程的优先级；线程优先级决定线程调度器优先调度哪个线程执行的概率，但是不同的 OS 线程规划不一样，有的甚至会忽略该设置；设置优先级有可能会导致有的线程一直无法执行，从而导致饥饿。

- **threadStatus 线程状态（volatile）**
  - `getState()` 方法返回当前线程的状态，用来监视系统状态。
- **interrupted 是否中断（volatile）**
  - `isInterrupted()` 方法测试线程是否已被中断，该方法并不影响线程中断状态。
- **daemon 是否是守护线程**
- `setDaemon(boolean)`，设置守护线程要在线程启动之前，否则线程存活会抛异常 IllegalThreadStateException。
  - `isDaemon()`，线程分为用户线程和守护线程，用户线程为主线程，守护线程为用户线程提供服务。JVM 启动时会启动一个 main 线程，main 线程又可以启动其它线程，如 gc 等守护线程；当只剩下守护线程时，JVM 会退出，此时守护线程不一定正常结束，所以守护线程不要持有资源，否则无法关闭。**创建线程默认会继承当前线程是守护线程还是用户线程**。
  
- **group 线程组**

  - `getThreadGroup()`，返回线程所属的线程组，如果线程死亡返回 null。

- **defaultUncaughtExceptionHandler 默认异常处理器（static volatile）**

  - `getDefaultUncaughtExceptionHandler()`
  - `setDefaultUncaughtExceptionHandler(UncaughtExceptionHandler eh)`，如果线程和线程组都没有设置异常处理器，则调用默认的处理器（不设置默认 null）。

- **uncaughtExceptionHandler 异常处理器（volatile）**

  - `getUncaughtExceptionHandler()`
  - `setUncaughtExceptionHandler(UncaughtExceptionHandler eh)`，由于线程 `run()` 方法不会抛出异常，当出现异常时，首先会由线程设置的 uncaughtExceptionHandler 处理器来处理（未设置默认 null），如果没有则由线程组来处理，还没有则由线程默认处理器处理。


## 线程状态

Thread 类中的内部枚举类 State 定义了五种线程状态：

- `NEW`，线程已创建但未启动执行，默认此时 threadStatus 为 0
- `RUNNABLE`，JVM 正在执行线程的 `run()` 方法，但是线程有可能在等待操作系统资源
- `BLOCKED`，线程被阻塞，正在等待其它线程执行 
- `WAITING`，线程执行中由于以下三种情况等待被其他线程唤醒或者其他线程结束：
  - Object.wait()
  - Thread.join()
  - LockSupport.park()
- `TIMED_WAITING`，具有指定时间的等待状态的线程，触发方式：
  - Thread.sleep(long)
  - Object.wait(long)
  - Thread.join(long) 
  - LockSupport.parkNanos()
  - LockSupport.parkUntil()
- `TERMINATED`，线程执行完 `run()` 方法正常终止或 `run()` 方法抛出异常意外终止

如果线程在 `TERMINATED` 状态或者线程被中断，那么就说线程死亡了，否则线程还活着。可以通过 `isAlive()` 方法判断。

> TODO：操作系统中线程状态的切换

## 线程方法

- `start()`，启动一个线程交由 JVM 执行，调用该方法后新创建的线程开始执行 run 方法，当前线程继续执行 `start()` 方法后面的事情。

- `join( )` / `join(long millis)` / `join(long millis, int nanos)`，暂停主线程优先执行该线程，直到该线程死亡（结束或者被中断）或时间到。

- `interrupt()`，主线程将当前线程的中断标志置为 true。当前线程可以通过 `isInterrupted() ` 方法判断是否已中断并终止当前操作。

  中断相当于一个信号，告知当前线程需要终止执行。如果当前线程正处于以下几种状态中，执行该方法当前线程会抛出中断异常 InterruptedException 并清除中断状态。以下方法需捕获中断异常进行处理：

  - Object.wait()
  - join()
  - sleep()

- `interrupted() ` 静态方法，返回当前线程是否已中断，如果中断则重置中断标志为 false 并返回 true。这个方法可以拒绝中断。

- `sleep(long millis)` / `sleep(long millis, int nanos)` 静态方法，使当前线程暂停执行一段时间，这个时间不是精确的，受操作系统计时器和调度程序的精度和准确性影响，其它线程中断当前线程也会停止此时间。

  线程暂停不会失去持有的锁。带纳秒参数的构造器其实内部调用的还是毫秒构造器，纳秒参数范围为 0 - 999999，当大于 500000 或者毫秒设置为 0，则毫秒加 1。

- `yield()` 静态方法，告诉调度程序可以让出当前使用的处理器，调度程序可以忽略该请求。

-  `currentThread()` 静态方法，返回当前正在执行的线程对象的引用。

- ` holdsLock(Object o)` 静态方法，当前线程是否持有该对象的监视器锁（隐式锁）。

- `onSpinWait()  `静态方法，JDK 9 引入，表示当前正在等待某个条件无法执行，调用线程将向运行时指示其正在等待。

- `dumpStack() ` 静态方法，打印当前线程堆栈信息。

- `activeCount() ` 静态方法，返回当前线程的线程组及其子线程组内的活动线程数量的估计值，用于监控和调试。

## 线程创建和任务执行

Thread 类提供了构造器和 `start()` 方法来创建和启动线程。比如：

```java
Thread thread = new Thread();
thread.start();
```

运行一下，没感觉到有什么变化，因为我们创建了一个空线程嘛，什么也没让它做。那如何让线程按我们的指示去做呢？

**线程启动后，JVM 会去调用线程的 `run()` 方法去执行**。首先我们看一下Thread 类的 `run()`方法：

```java
/* What will be run. */
private Runnable target;

@Override
public void run() {
    if (target != null) {
        target.run();
    }
}
```

可以看到，thread 类的 `run()` 方法实际上是执行的 target 的 `run()` 方法，而 target 是 Runnable 接口的对象，也就是说，我们要创建一个任务，然后交给线程去执行，这个任务呢，要实现 Runnable 接口。

那这个任务怎么交给线程呢？Thread 类提供了构造器 `Thread(ThreadGroup, Runnable, String)` 来接收这个对象。

> 所以我们需要创建一个类实现 Runnable 接口，给 `run()` 方法指定一个行为，然后作为构造器参数交给线程执行就好了。

Thread 类也实现了 Runnable 接口，但是 Thread 类没有具体行为，我们通过继承 Thread 类重写 `run()` 方法不就有行为了嘛。

> 所以我们还可以继承 Thread 类并重写 `run()` 方法，然后作为构造器参数交给线程执行就可以了。

以上两种方式都是如何创建任务，其中，继承 Thread 类就不能继承其他类了，而实现接口比较灵活，且 Java 8 lambada 表达式语法可以将接口作为方法引用或者构造器参数，使得 `run()` 方法可以很方便的被实现：

```java
// 参数为 Runnable 实现类的构造器
Thread thread = new Thread(() -> System.out.println("执行run方法"));
thread.start();
```

::: warning 特别注意

使用构造器创建线程默认继承当前线程的两个属性：是否是守护线程以及线程优先级。如果没有指定线程组，则继承父线程的线程组。

JDK 8 及以前会默认继承线程局部变量，JDK 9 默认不继承，而是新增了一个构造器，让用户决定是否开启继承。

:::

### 线程工厂创建

JDK 5 提供了 ThreadFactory 接口作为线程工厂，提供了 `newThread(Runnable r)` 方法来创建线程。通过线程工厂，我们可以统一定义线程组，初始化线程优先级，自定义线程名称、初始化线程守护状态等操作。

自定义线程工厂代码示例：

``` java
public class ProductThreadFactory implements ThreadFactory {
    private static final ThreadGroup threadGroup = new ThreadGroup("Product-flow");
    private static AtomicInteger threadNum = new AtomicInteger(1);

    private String taskName;

    ProductThreadFactory(String taskName) {
        this.taskName = "From Class ProductFactory‘s" + taskName;
    }

    @Override
    public Thread newThread(Runnable r) {
        final Thread thread = new Thread(threadGroup, r, taskName + threadNum.getAndIncrement(), 0, true);
        thread.setPriority(10);
        thread.setDaemon(false);
        thread.setUncaughtExceptionHandler((t, e) -> {
        });
        return thread;
    }
}

// new ProductThreadFactory("").newThread(() -> {}).start();
```

::: warning 阿里巴巴 Java 开发手册（嵩山版）

【强制】创建线程或线程池时请指定有意义的线程名称，方便出错时回溯。

自定义线程工厂，并且根据外部特征进行分组。

:::