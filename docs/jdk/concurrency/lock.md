---
title: 同步和锁机制
description: 同步和锁机制
meta:
  - name: keywords
    content: 同步和锁机制
tags: ['同步和锁机制']
prev: ./
next: ./sharing
---

> Java 提供了加锁机制抑制多线程访问共享变量。当一个线程访问对象时首先要获取对象的锁，获取到并通过加锁声明对对象的独占访问，访问完之后再释放对象的锁。由于对象上有锁，其它线程无法访问，只能阻塞等待当前线程释放锁再去获取。

## 隐式锁

JVM 层面实现了一种隐式锁，这种锁相当于是对象的隐式监视器 Monitor。为什么称为隐式锁呢？Java 通过 **synchronized** 关键字声明对一个对象进行独占访问，这种锁不需要我们手动加锁和解锁，当线程访问对象时 JVM 自动加锁，并在访问结束或者抛出异常时自动解锁。

synchronized 使用方式如下：

- 声明持有指定对象的锁

  ```java
  final Object object = new Object();
  
  public void increment() {
      synchronized (object) {
          count++;
      }
  }
  ```

- 声明持有当前对象的锁

  ```java
  // 对当前对象加锁
  public void increment() {
      synchronized (this) {
          count++;
      }
  }
  
  // 同步方法，也是对当前对象加锁
  public synchronized void decrement() {
      count--;
  }
  ```

::: warning 注意

隐式锁是**可重入的锁**（套娃），意思就是同一个线程可以对一个对象多次加锁，每次加锁，对象的监视器 Monitor 就会加一，解锁时就会减一，直到为 0 时表示当前对象没有被线程独占。

隐式锁释放与下一次获取同一把锁具有 **happens - before** 关系。

:::

## 显式锁

JDK 5 在 java.util.concurrent.locks 包中新增了程序实现的显式锁。显式锁提供了以下方法：

- `lock()`，获取锁，获取不到则阻塞等待
- `unlock()`，释放锁
- `lockInterruptibly()`，获取锁，获取不到则阻塞等待，但是可以被中断而退出阻塞等待
- `tryLock()`，尝试获取锁，如果获取不到则立马返回 false，如果获取到则返回 true 并自动加锁，可以进行后续操作
- `tryLock(long time, TimeUnit unit)`，在指定时间内尝试获取锁，可被中断退出
- `newCondition()`，声明线程协调的条件

相比于隐式锁，显式锁可以更灵活的加锁解锁，并且支持尝试获取锁，如果获取不到可以退出获取锁的尝试。

### ReentrantLock 类

ReentrantLock 相当于隐式锁 synchronized，正如它的名字一样，是可重入的锁。它提供了两个构造方法：

- `ReentrantLock()`，默认非公平可重入锁
- `ReentrantLock(boolean fair)` ，指定公平策略的可重入锁

公平模式下线程先进先出，减少饥饿，但是会减少吞吐量。`isFair()` 方法可以判断是否是公平锁。

```java
// 普通获取锁
public void increment() {
    final ReentrantLock lock = new ReentrantLock();
    lock.lock();
    try {
        count++;
    } finally {
        lock.unlock();
    }
}

// 尝试获取锁
public void increment() {
    final ReentrantLock lock = new ReentrantLock();
    if (lock.tryLock()) {
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}
```

ReentrantLock 类还提供了两个方法：

- `getHoldCount()`，获取当前线程持有该锁的数量
- `isHeldByCurrentThread()`，判断当前线程是否持有该锁

通过以上两个方法可以根据 ReentrantLock 实现不可重入的锁，即判断是否已经持有该锁：

```java
public void increment() {
    final ReentrantLock lock = new ReentrantLock();
    assert lock.isHeldByCurrentThread();
    //assert lock.getHoldCount() != 0;
    
    lock.lock();
    try {
        count++;
    } finally {
        lock.unlock();
    }
}
```

::: tip 互斥锁

隐式锁和 ReentrantLock 锁都是互斥锁（排他锁），每个锁只允许一个线程访问。

:::

### ReentrantReadWriteLock 类

由于互斥锁只允许一个线程访问，在某些情况下，多个线程可以并发读取往往能提升性能。ReentrantReadWriteLock 类提供了一对关联的锁：`ReadLock`读锁和 `WriteLock` 写锁。读锁用于并发只读操作，写锁允许排他写入。

**公平策略**

ReentrantReadWriteLock 类提供的构造函数有两个：

- `ReentrantReadWriteLock()`，默认非公平的读写锁
- `ReentrantReadWriteLock(boolean fair)`，指定公平策略的读写锁

非公平锁模式：

读锁和写锁互相竞争，具体谁获得锁是不确定的，受重入影响。相比公平锁可以提高吞吐量。

公平锁模式：

当释放当前锁时，公平锁会为等待时间最长的一个写请求线程分配写锁，或者为等待时间比写请求长的读请求线程组分配读锁。

如果没有空闲的读写锁，那么请求获取写锁的线程会被阻塞；如果有写锁或者有等待写锁的线程，那么请求获取读锁会被阻塞。（`tryLock` 尝试获取锁不受此限制，还有可能不管等待的线程直接获取锁）

**可重入**

正如 ReentrantReadWriteLock 名字那样，读锁和写锁是可重入的，但是以下情况除外：

- 写锁未释放不允许非重入读，即不允许其它线程读
- 写锁未释放允许重入读，即允许当前线程读，写锁可降级为读锁。但反之不能（内存一致性）

::: details 更新缓存锁降级代码示例

```java
class CachedData {
    Object data;
    boolean cacheValid;
    final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

    void processCachedData() {
        rwl.readLock().lock();
        if (!cacheValid) {
            // Must release read lock before acquiring write lock（获取写锁先释放读锁）
            rwl.readLock().unlock();
            rwl.writeLock().lock();
            try {
                // Recheck state because another thread might have
                // acquired write lock and changed state before we did.（重新检查状态，防止其它线程先于我们获取写锁之前修改）
                if (!cacheValid) {
                    data = ...
                    cacheValid = true;
                }
                // Downgrade by acquiring read lock before releasing write lock（锁降级：获取读锁，这时并不释放写锁）
                rwl.readLock().lock();
            } finally {
                rwl.writeLock().unlock(); // Unlock write, still hold read（获取到读锁后可以释放写锁）
            }
        }

        try {
            use(data);
        } finally {
            rwl.readLock().unlock();
        }
    }
}
```

:::

**可中断**

读写锁在获取锁的时候也是可中断的。

::: warning 读写锁适用条件

读写锁适用于前期大量写并很少修改，后期大量读的场景，比如字典。示例代码如下：

::: details 读写字典官方示例代码

```java
class RWDictionary {
    private final Map<String, Data> m = new TreeMap<>();
    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();
    private final Lock r = rwl.readLock();
    private final Lock w = rwl.writeLock();

    public Data get(String key) {
        r.lock();
        try {
            return m.get(key);
        } finally {
            r.unlock();
        }
    }

    public List<String> allKeys() {
        r.lock();
        try {
            return new ArrayList<>(m.keySet());
        } finally {
            r.unlock();
        }
    }

    public Data put(String key, Data value) {
        w.lock();
        try {
            return m.put(key, value);
        } finally {
            w.unlock();
        }
    }

    public void clear() {
        w.lock();
        try {
            m.clear();
        } finally {
            w.unlock();
        }
    }
}
```

:::

### StampedLock 类

Java 8 新增了 StampedLock 类，提供了乐观读的功能。

::: tip 乐观锁和悲观锁

乐观锁假定读的过程中大概率不会写入，可以获取写锁；而悲观锁在读的过程中禁止写，必须释放读锁才能获取写锁。

:::

StampedLock 类提供了如下方法：

- `writeLock()`，获取独占形式的排他写锁，释放用 `unlockWrite(long stamp)`
- `readLock()`，获取非排他的读锁，释放用 `unlockRead(long stamp)`
- `tryOptimisticRead()`，获取带有验证标记的乐观锁
- `validate(long stamp)`，验证读取是否已被修改
- `tryConvertToWriteLock(long stamp)`，如果锁定状态与给定的标记相匹配，则自动执行以下操作之一：如果图章表示持有写锁，则将其返回；如果有读锁，则如果写锁可用，则释放读锁并返回写标记；如果乐观阅读，则仅在立即可用时才返回写戳记。在所有其他情况下，此方法均返回零。
- `tryConvertToReadLock(long stamp)`，如果锁定状态与给定的标记相匹配，则自动执行以下操作之一：如果图章表示持有写锁，请释放它并获得读锁；如果有读锁，则返回它；如果是乐观读取，则获取读取锁定，并且仅在立即可用时才返回读取戳记。在所有其他情况下，此方法返回零。
- `tryConvertToOptimisticRead(long stamp)`，如果锁状态与给定的戳匹配，则从原子上讲，如果戳表示持有锁，则将其释放并返回观察戳。如果乐观阅读，则在验证后返回。在所有其他情况下，此方法都返回零，因此可用作 `tryUnlock` 的形式。

::: details 官方示例代码

```java
class Point {
    private double x, y;
    private final StampedLock sl = new StampedLock();

    // an exclusively locked method
    void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock();
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    // a read-only method
    // upgrade from optimistic read to read lock
    // 乐观读升级为悲观读
    double distanceFromOrigin() {
        long stamp = sl.tryOptimisticRead();
        try {
            retryHoldingLock:
            for (; ; stamp = sl.readLock()) {
                if (stamp == 0L)
                    continue retryHoldingLock;
                // possibly racy reads
                double currentX = x;
                double currentY = y;
                // 验证是否被修改
                if (!sl.validate(stamp))
                    continue retryHoldingLock;
                return Math.hypot(currentX, currentY);
            }
        } finally {
            if (StampedLock.isReadLockStamp(stamp))
                sl.unlockRead(stamp);
        }
    }

    // upgrade from optimistic read to write lock
    // 乐观读升级为悲观写
    void moveIfAtOrigin(double newX, double newY) {
        long stamp = sl.tryOptimisticRead();
        try {
            retryHoldingLock:
            for (; ; stamp = sl.writeLock()) {
                if (stamp == 0L)
                    continue retryHoldingLock;
                // possibly racy reads
                double currentX = x;
                double currentY = y;
                if (!sl.validate(stamp))
                    continue retryHoldingLock;
                if (currentX != 0.0 || currentY != 0.0)
                    break;
                stamp = sl.tryConvertToWriteLock(stamp);
                if (stamp == 0L)
                    continue retryHoldingLock;
                // exclusive access
                x = newX;
                y = newY;
                return;
            }
        } finally {
            if (StampedLock.isWriteLockStamp(stamp))
                sl.unlockWrite(stamp);
        }
    }

    // Upgrade read lock to write lock
    // 读锁升级为写锁
    void moveIfAtOrigin(double newX, double newY) {
        long stamp = sl.readLock();
        try {
            while (x == 0.0 && y == 0.0) {
                long ws = sl.tryConvertToWriteLock(stamp);
                if (ws != 0L) {
                    stamp = ws;
                    x = newX;
                    y = newY;
                    break;
                } else {
                    sl.unlockRead(stamp);
                    stamp = sl.writeLock();
                }
            }
        } finally {
            sl.unlock(stamp);
        }
    }
}
```

:::

## 隐式锁和显式锁对比

|          | 隐式锁                       | 显式锁                                                       |
| -------- | ---------------------------- | ------------------------------------------------------------ |
| 实现     | JVM 实现，内置锁             | 程序实现                                                     |
| 加锁解锁 | 自动，比较方便               | 手动，且必须在 finally 块中保证释放锁                        |
| 范围限制 | 被获取的锁只能按相反方向释放 | 允许以任意顺序获取和释放多个锁，更灵活                       |
| 获取锁   | 获取不到只能阻塞等待         | 可以阻塞等待，可以通过可被中断的 `lockInterruptibly()` 方法获取锁，也可以尝试获取，更灵活 |
| 重入     | 可重入                       | 可重入，可不重入                                             |

## 图示锁之间的关系