---
title: 全局统一异常处理
description: 全局统一异常处理
meta:
  - name: keywords
    content: 全局统一异常处理，@ExceptionHandler，@ControllerAdvice，@RestControllerAdvice
tags: ['@ExceptionHandler', '@ControllerAdvice', '@RestControllerAdvice']
prev:
next: 
---

## 注解

​		从无到有，我们已经写过无数个 try - catch 代码块，繁杂的异常处理片段导致我们的代码可读性变弱，而且 try - catch 代码重复性很高，耗时耗力。以下通过两个注解来创建全局统一异常处理类，抛砖引玉，使代码更美观，提高代码复用性。

- **@RestControllerAdvice**

  首先介绍的是 @RestControllerAdvice 注解，该注解是基于 REST 风格的增强型接口注解，适用于类上。查看该注解的声明发现，其是 @ControllerAdvice 和 @ResponseBody 的组合注解。它的作用是搭配其他注解，实现对所有 RequestMapping 映射的接口的处理。

- **@ExceptionHandler**

  @ExceptionHandler 是异常处理器，该注解将捕获指定异常并做处理，适用于异常处理实现方法上。

下面创建异常处理类，通过这两个注解来实现全局异常处理，示例：

```java
@RestControllerAdvice
public class CustomExceptionHandler {  
    @ExceptionHandler({Exception.class})
    public R otherExceptionHandler(Exception e) {
        log.error("Error:[{}]", e.getMessage());
        return R.error(e.getMessage());
    }
}
```



以上代码展示了如何处理顶层异常，当有异常未捕获时将会执行此处理器，返回统一的错误结果。其中还使用到了日志字符串替换。

从两个方面进行统一，一个是通过一个异常处理类处理异常，几乎所有异常都可以在该类（或者创建多个 @RestControllerAdvice 注解的类）中捕获并处理；另一个是统一返回数据格式，通过自定义的R响应类来返回结果。

## 常用的异常处理

针对 hibernate-validator 参数校验出现的异常，我们可以统一一下：

```java
/*
 * RequestBody 请求体对象参数
 */
@ExceptionHandler({MethodArgumentNotValidException.class})
public R methodArgumentNotValid(MethodArgumentNotValidException e)
{
    String message = e.getBindingResult().getFieldError().getDefaultMessage();
    log.error("请求参数未通过校验，提示:[{}]", message);
    return R.error(e.getMessage());
}

/*
 * GET 请求参数绑定到对象参数
 */
@ExceptionHandler({BindException.class})
public R bindException(BindException e)
{
    String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
    log.error("请求参数未通过校验，提示:[{}]", message);
    return R.error(e.getMessage());
}

/*
 * 接口单个参数校验（没有绑定对象）
 */
@ExceptionHandler(ConstraintViolationException.class)
public Result otherValidException(ConstraintViolationException e) {
    return R.error(e.getMessage());    
}

/*
 * 必填参数缺失，如声明为 @PathVariable，@RequestParam 等
 */
@ExceptionHandler(ServletRequestBindingException.class)
public Result servletRequestBinding(ServletRequestBindingException e) {
    return R.error(e.getMessage());    
}
```

其他常用的异常类：

- IllegalArgumentException

## 自定义业务异常处理

除了特定异常，我们还可以定义业务异常类，创建符合自身业务的异常，然后使用上面的异常处理器捕获并处理。