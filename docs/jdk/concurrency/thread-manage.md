---
title: 线程管理
description: 线程管理
meta:
  - name: keywords
    content: 线程管理
tags: ['线程管理']
prev: ./
next: ../skill/
---

## 异步任务及其状态

### 任务

在线程基础那一节我们简单了解到，实现 Runnable 接口可以创建一个任务，然后交给线程去执行。我们先看一下 Runnable 接口：

```java
/** 
 * @author  Arthur van Hoff
 * @see     java.lang.Thread
 * @see     java.util.concurrent.Callable
 * @since   1.0
 */
@FunctionalInterface
public interface Runnable {
    /**
     * When an object implementing interface {@code Runnable} is used
     * to create a thread, starting the thread causes the object's
     * {@code run} method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method {@code run} is that it may
     * take any action whatsoever.
     *
     * @see     java.lang.Thread#run()
     */
    public abstract void run();
}
```

Runnable 接口中只提供了没有返回值的 `run()` 方法，并且不能抛出异常，如果我们需要等任务结束，根据任务的结果或者异常状态进行下一步操作，该接口没法做到。这就有了 Callable 接口，我们看一下 Callable 接口：

```java
/**
 * @see Executor
 * @since 1.5
 * @author Doug Lea
 * @param <V> the result type of method {@code call}
 */
@FunctionalInterface
public interface Callable<V> {
    /**
     * Computes a result, or throws an exception if unable to do so.
     *
     * @return computed result
     * @throws Exception if unable to compute a result
     */
    V call() throws Exception;
}
```

Callable 接口提供了 `call()` 方法，该方法有返回值，并且可以抛出异常。

### 状态

JDK 5 提供了 **Future 接口**对线程状态进行管理。Future 表示异步任务的执行情况，通过它可以对任务进行控制，它提供了以下方法：

- `get()`，阻塞获取异步任务执行结果，可能会抛出异常。
- `get(long timeout, TimeUnit unit)`，阻塞一定时间获取异步任务执行结果，超时未果会抛异常 TimeoutException。
- `cancel(boolean mayInterruptIfRunning)`，如果任务没开始，则直接取消；如果已经开始，则通过 mayInterruptIfRunning 参数指定是否应该中断。如果任务已经执行完、任务已经被取消、或者由于其它原因不能取消则返回 false。
- `isCancelled()` ，返回任务是否被取消。
- `isDone()`，返回任务是否已完成、已取消、抛异常。

### RunnableFuture 接口

RunnableFuture 接口继承了 Runnable 接口和 Future 接口，它提供一个 `run()` 方法将任务和任务的运行状态联系起来。这样就可以**将 RunnableFuture 任务对象提交给线程，同时我们又可以对提交的任务进行控制**（通过后面的线程执行器具体控制）。这就看出来面向接口编程的重要性了。

FutureTask 类是 RunnableFuture 接口的实现类，是任务的默认实现，提供了很好的自定义任务的参考价值。

## 线程执行器

一直以来我们都是直接创建一个线程并运行，线程执行的任务和线程是高度耦合的。JDK 5 提供了线程执行器来管理任务，包括添加任务、启动、停止等。

### Executor 接口

Executor 接口提供了一个 `execute(Runnable command)` 方法，基于此我们可以自己定义如何添加和执行任务，比如：

- 添加并直接在调用者线程中执行任务

  ```java
  public class Manager implements Executor {
      @Override
      public void execute(Runnable command) {
          command.run();
      }
  }
  
  // new Manager().execute(()->{});
  ```

- 添加并启动新线程异步执行任务

  ```java
  // 指定有意义的线程及线程组，方便追溯
  public class Manager implements Executor {
      private static AtomicInteger threadNum = new AtomicInteger(0);
      private String busMark;
  
      public Manager(String busMark) {
          this.busMark = "From Class Manager's " + busMark;
      }
  
      @Override
      public void execute(Runnable command) {
          new Thread(command, busMark + threadNum.incrementAndGet()).start();
      }
  }
  // new Manager("xx-1").execute(()->{});
  ```

### ExecutorService 接口

ExecutorService 接口继承自 Executor 接口，它提供了终止线程执行器的方法，并通过返回 Future 跟踪异步任务执行状态：

- 终止
  - `shutdown()`，拒绝提交的新任务，等待已提交的任务执行完再关闭
  - `shutdownNow()`，尝试停止正在执行的任务，暂停并返回等待执行的任务列表
  - `awaitTermination(long timeout, TimeUnit unit)`，执行关闭之后再执行此方法，该方法会阻塞直到全部线程执行完毕或者发生超时或者当前线程被中断
  - `isShutdown()`，判断是否已关闭
  - `isTerminated()`，判断关闭后所有线程是否正常结束
- 启动异步任务，成功执行会返回 Future 的 `get()` 结果
  - `submit(Callable<T> task)`，提交实现 Callable 接口的异步任务
  - `submit(Runnable task, T result)`，提交实现 Runnable 接口的异步任务
- 批量提交异步任务
- `invokeAll(Collection<? extends Callable<T>> tasks)`，在全部完成后返回各自的结果和状态
- `invokeAny(Collection<? extends Callable<T>> tasks)`，返回一个成功执行的任务的结果或者抛出异常，其它任务都会取消

### ScheduledExecutorService 接口

ScheduledExecutorService 接口继承自 ExecutorService 接口，它提供了延迟指定时间或者周期性执行异步任务的方法，并通过返回 Future 跟踪异步任务执行状态：

- `schedule(Runnable command, long delay, TimeUnit unit);`，提交支持 Runnable 接口的任务，延迟执行

- `schedule(Callable<V> callable, long delay, TimeUnit unit);`，提交支持 Callable 接口的任务，延迟执行

- `scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit);`，提交任务，在 initialDelay 延迟后以 period 固定频率执行

  第一次执行在 initialDelay 延迟后，然后以 initialDelay + period * n 的频率执行；如果任务执行时间超过频率，可能会延迟启动，不会同时执行。

- `scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit);`，提交任务，在 initialDelay 延迟后执行一次，当每次任务执行结束推迟 delay 时间后再执行下一次任务

> 周期性任务会由于任务被取消、执行器停止或者任务抛出异常而终止，可以通过返回值 Future 来处理。
>
> 默认的 submit 提交任务的方法为 0 延迟，以上方法都支持 0 延迟和负延迟，表示的意思是立马执行。
>
> 时间单位都是相对时间，可能需要在绝对时间和相对时间转换，比如 `date.getTime() - System.currentTimeMillis()`

::: details 代码示例：每隔十秒执行一次，一小时后停止任务执行

```java
final ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(2);
final ScheduledFuture<?> future = scheduledThreadPool.scheduleAtFixedRate(() -> System.out.println("ok"), 0, 10, TimeUnit.SECONDS);
scheduledThreadPool.schedule(() -> future.cancel(false), 1, TimeUnit.HOURS);
```

:::

## 线程池

线程池是线程执行器的直接实现。频繁创建和销毁线程会消耗大量内存管理资源，如果我们一开始就初始化好指定数量的线程，当线程运行时以某种方式停止并切换任务，就相当于开辟了一个新的线程。这样就减少了任务切换带来的开销。

线程池内部维护了一个队列，当提交的任务数多于线程池的线程数时，会在内部队列里面等待执行，这是一种**服务降级**的实现。

### ThreadPoolExecutor 类

我们使用 ThreadPoolExecutor 类来创建线程池。ThreadPoolExecutor 类继承自 AbstractExecutorService 抽象类（其实现了 ExecutorService 接口并提供了默认实现），并提供了丰富的重载构造器 `ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler)`，参数说明如下：

- 核心线程数 corePoolSize 和最大线程数 maximumPoolSize

  ::: tip 按需创建线程

  默认只有当新任务到来时才会创建并启动核心线程。但是也提供了两个方法来提前创建：

  - `prestartCoreThread()`，启动一个核心线程，如果核心线程全部启动则返回 false
  - `prestartAllCoreThreads()`，启动所有的核心线程并返回本次启动的线程数

  如果构造线程池的阻塞队列本来就有任务，则需要预先创建并启动线程。

  :::

- 线程最大活跃时间 keepAliveTime 及其时间单位 TimeUnit

  ::: tip 最大活跃时间

  当线程数超过核心线程数时，会终止超过最大活跃时间的空闲线程，减少资源消耗。

  如果开启了 `allowCoreThreadTimeOut(boolean value)` 允许核心线程超时，则空闲的核心线程也会被终止。

  设置为 (Long.MAX_VALUE, TimeUnit.NANOSECONDS)  则永远不会关闭。

  :::

- 保存任务的阻塞队列 workQueue，不能为 null

  ::: tip 排队策略

  当 execute 提交一个新的任务时，

  - 如果正在运行的线程数少于核心线程数 corePoolSize，则创建新的线程处理新任务，即使其它工作线程处于空闲状态；

  - 如果正在运行的线程数大于等于核心线程数 corePoolSize，先加入队列 workQueue，尽管此时线程数还小于 maximumPoolSize；

  - 当队列 workQueue 满，并且线程数小于 maximumPoolSize，则创建新的线程处理新任务；

  - 当队列 workQueue 满，并且线程数也已经到最大 maximumPoolSize，则触发拒绝策略 RejectedExecutionHandler。

  :::

- 创建新线程使用的线程工厂 threadFactory

- 当线程数和队列最大容量都到达时，对新任务的拒绝策略 handler

  ::: tip 拒绝策略

  当使用有界队列和有限的最大池线程数时或者执行器关闭时，新来的任务将被拒绝，预定义了四种拒绝策略：

  - `ThreadPoolExecutor.AbortPolicy`，默认拒绝，抛出 RejectedExecutionException 异常
  - `ThreadPoolExecutor.DiscardPolicy`，直接丢弃
  - `ThreadPoolExecutor.CallerRunsPolicy`，调用者执行策略，反馈控制降低任务提交速度
  - `ThreadPoolExecutor.DiscardOldestPolicy`，丢弃队列开头的任务，并再次尝试

  :::


以上参数除了队列 workQueue 都可以通过 set 方法重新设置。

::: warning 回收内存

可以通过 `purge()` 方法尝试删除队列中已取消的任务，回收存储空间；`remove(Runnable task)` 方法可以删除队列中的指定任务，返回是否删除。

线程池内的线程不再使用需要回收，如果没有明确关闭线程池，可以通过设置 keepAliveTime 活跃时间、设置零核心线程 corePoolSize 或者  `allowCoreThreadTimeOut(true)` 来回收线程。

:::

::: warning 注意

使用 ArrayBlockingQueue 等设置有界队列，需要配合 maximumPoolSize 最大池大小，考虑 IO、上下文切换等进行调整；

使用不配置容量的 LinkedBlockingQueue 无界阻塞队列，超过核心线程数时任务就会入队，maximumPoolSize 参数就失效了，如果处理速度小于添加新任务的速度，可能会使线程数无限增长；

使用 SynchronousQueue 阻塞队列，可以直接创建线程切换，通常 maximumPoolSize 设置为无界，如果处理速度小于添加新任务的速度，可能会使线程数无限增长。

:::

### ScheduledThreadPoolExecutor 类

ScheduledThreadPoolExecutor 类继承自 ThreadPoolExecutor 类，并实现了 ScheduledExecutorService 接口，它扩展了普通的线程池，支持添加可以延时执行或者周期性执行的任务。

从它提供的构造器 `ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory, RejectedExecutionHandler handler)` 可知，内部使用的是相当于无界的 Integer.MAX_VALUE 大小的最大池大小，使用  DelayedWorkQueue 延迟阻塞队列，该队列使用堆这种数据结构，根据延迟时间排序，更快查找。

- `setRemoveOnCancelPolicy(boolean value)`，设置已取消的任务是否自动从队列中删除，默认 false

### Executors 线程池工厂

Executors 类是线程池工厂，它预置了几种常用的线程池和 Callable 转换方法。

- `newFixedThreadPool(int nThreads)`，创建一个固定 nThreads 个线程的、无界队列的线程池，实现为 `ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>());`

  当一个线程执行完毕或者异常终止，则会有一个新的线程执行新的任务。

- `newSingleThreadExecutor()`，创建一个单一线程的、无界队列的线程池，实现为 `new FinalizableDelegatedExecutorService (new ThreadPoolExecutor(1, 1, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>()));`

  当一个线程执行完毕或者异常终止，会创建一个新的线程执行新的任务，所以该线程池在任何时间最多只有一个活跃线程，确保任务按顺序执行。

- `newCachedThreadPool()`，创建一个短期快速执行的、基于同步阻塞队列的线程池，实现为 `new ThreadPoolExecutor(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS, new SynchronousQueue<Runnable>());`

  它使用同步阻塞队列，根据需要创建线程，但是会复用已有的可用线程，60 秒未使用的线程将终止并从缓存中删除（自动回收）。

  主要用于提高短期异步任务的性能，由于使用最大限制的 Integer.MAX_VALUE 最大线程数不安全，因此通常需要自己实现。

- `newScheduledThreadPool(int corePoolSize)`，创建一个可以延时或周期性执行任务的线程池，实现为 `new ScheduledThreadPoolExecutor(corePoolSize);`

- `newSingleThreadScheduledExecutor()`，创建一个单一线程的、可延时或周期性执行任务的线程池，实现为 `new DelegatedScheduledExecutorService (new ScheduledThreadPoolExecutor(1));`

  同 `newSingleThreadExecutor()`。

- `newWorkStealingPool()` <badge>JDK 8</badge>，创建一个线程数可动态伸缩的、用于并行计算的线程池，实现为 `new ForkJoinPool (Runtime.getRuntime().availableProcessors(), ForkJoinPool.defaultForkJoinWorkerThreadFactory, null, true);`

  它根据指定的并行级别 parallelism 维护足够的线程并可能使用多个队列来减少争用，不保证线程执行顺序；不指定参数则默认使用 Java 虚拟机运行时可用的处理机数量，不小于 1。

::: warning newSingleThreadExecutor() 和 newFixedThreadPool(1) 的区别

`newSingleThreadExecutor()` 后期不可重新配置线程池属性，因为它使用包装类 DelegatedExecutorService 包装，该类只实现了 ExecutorService 接口；而 `newFixedThreadPool(1)` 直接由 ThreadPoolExecutor 类实现，可以重新配置线程数。

`newSingleThreadExecutor()` 使用的包装类 FinalizableDelegatedExecutorService（继承自 DelegatedExecutorService） 重写了 `finalize()` 方法，在 GC 时会执行 `shutdown()` 方法关闭不再被引用且没有线程的线程池；`newFixedThreadPool(1)` 使用的 ThreadPoolExecutor 类在 JDK 11 之前重写了 `finalize()` 方法，为了与字类兼容在 JDK 11 之后去掉了方法体。

`newSingleThreadScheduledExecutor()` 也是使用了包装类 DelegatedScheduledExecutorService 进行包装，该类实现了 ScheduledExecutorService 接口，后期不可重新配置线程池属性。

:::

前面已经看到使用 DelegatedExecutorService 这个包装器类可以冻结配置，禁止修改线程池具体实现，Executors 工厂也提供了两个方法对自定义的线程池冻结配置：

- `unconfigurableExecutorService(ExecutorService executor)`
- `unconfigurableScheduledExecutorService(ScheduledExecutorService executor)`

Executors 类还提供了几个方法转换：

- `callable(Runnable task, T result)`，Runnable 接口转 Callable 接口

- `callable(final PrivilegedAction<?> action)`，将特权动作转为 Callable

- `privilegedCallable(Callable<T> callable)`，将 Callable 包装为特权动作

  提示：由 AccessController 类进行特权处理。

### 自定义线程池

通过继承 ThreadPoolExecutor 类可以重写部分 protected 方法，对线程池进行扩展。

---

::: warning 阿里巴巴 Java 开发手册（嵩山版）

- 【强制】创建线程或线程池时请指定有意义的线程名称，方便出错时回溯。

- 【强制】线程资源必须通过线程池提供，不允许在应用中自行显式创建线程。 

  说明：线程池的好处是减少在创建和销毁线程上所消耗的时间以及系统资源的开销，解决资源不足的问题。 如果不使用线程池，有可能造成系统创建大量同类线程而导致消耗完内存或者“过度切换”的问题。

- 【强制】线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这 样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险。

  说明：Executors 返回的线程池对象的弊端如下： 

  1） FixedThreadPool 和 SingleThreadPool： 允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，从而导致 OOM。 

  2） CachedThreadPool： 允许的创建线程数量为 Integer.MAX_VALUE，可能会创建大量的线程，从而导致 OOM。

:::

## 并行计算

### ForkJoinPool 类 <badge>JDK 7</badge>

ForkJoinPool 类继承自 AbstractExecutorService 抽象类，与其它线程执行器不同，它采用 work-stealing 工作窃取算法：池中的所有线程尝试查找并执行提交给池和/或由其他活动任务创建的任务。它可以通过对任务进行拆分并分治，达到高效处理。

ForkJoinTask 抽象类提供了任务拆分的默认方法，需要我们实现该抽象类提供具体的任务拆分方法。

## 异步回调

### CompletableFuture 类 <badge>JDK 8</badge>

JDK 8 新增了 CompletableFuture 类用于异步计算回调，并且支持任务按预期顺序编排执行。

由于 Future 接口需要阻塞获取结果，CompletableFuture 类实现了 Future 接口，并结合 JDK 8 的 Supplier、Consumer、Function 三个接口实现了任务编排。

- `thenAccept()` 回调方法返回执行结果
- `exceptionally()` 回调方法返回异常结果
- `thenApply()` 方法串行执行
- `allOf()` 方法并行执行所有
- `anyOf()` 方法并行执行返回一个