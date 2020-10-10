---
title: Java 反射
description: Java 反射
meta:
  - name: keywords
    content: Java 反射
tags: ['Java 反射']
prev: ../object/
next: ../annotation/
---

## 反射简述
反射通常用于检查或修改 Java 虚拟机运行时的行为。

- 优点
   - 扩展功能，应用程序可以通过使用其完全限定的名称创建可扩展性对象的实例来使用外部用户定义的类
   - 提供类浏览和可视化的开发环境
   - 用于调试器和测试工具，比如监视程序运行时类的状态
- 缺点
   - 反射操作性能弱于非反射操作，反射进行动态解析类型，无法执行某些 Java 虚拟机优化
   - 安全限制，反射需要在运行时执行，如果运行时受限，则无法运行
   - 内部暴露，反射允许执行非反射代码中非法的操作，可能会破坏封装性和抽象，破坏可移植性

## Class类型
对于 Java 中每种类型（基本类型，引用类型）的对象，Java 虚拟机都会实例化一个不可变的 java.lang.Class 实例，该实例用来检查对象的运行时属性（包括其成员和运行时信息）和方法，还提供创建新类和对象的能力。

java.lang.Class 是所有反射操作的入口。除了 java.lang.reflect.ReflectPermission， java.lang.reflect 包中的类都没有公开的构造器。当通过以下方法之一从 Java 字节码文件（.class 文件）创建一个类时，JVM 会自动创建一个 Class 对象。

- `ClassLoader#defineClass(String, byte[], int, int)`
- `java.lang.invoke.MethodHandles.Lookup#defineClass(byte[])`
- `java.lang.invoke.MethodHandles.Lookup#defineHiddenClass(byte[], boolean, MethodHandles.Lookup.ClassOption...)`

### 获取Class类型
获取 Class 类型有以下几种方法：

   - Object.getClass() 方法，根据类的实例获取`String str = "str"; Class clazz = str.getClass();`
   - .class 语法，根据类型获取，该方法也适用于基本类型`Class intClazz = int.class;`
   - Class.forName() 方法，根据类的全限定类名获取`Class clazz = Class.forName("java.lang.String");`
   - 对于基本类型，除了 .class 语法外，其对应的包装类型提供了 TYPE 属性`Class clazz = Double.TYPE;`
### 检查类声明

- 获取全限定类名，getCanonicalName() 方法
- 获取所有的修饰符，getModifiers() 方法
- 获取泛型声明的类型参数列表，getTypeParameters() 方法
- 获取实现的泛型声明的接口列表，getGenericInterfaces() 方法
- 获取直接父类类型，getSuperclass() 方法
- 获取注解列表，getAnnotations() 方法
### 检查类成员

- getDeclaredField() / getDeclaredMethod()，查找类的成员
- getDeclaredFields() / getDeclaredMethods()，列举类的成员
- getField() / getMethod()，只能查找类公共的成员，查找私有的会报 NoSuchFieldException / NoSuchMethodException
- getFields() / getMethods()，只能列举类公共的成员，查找私有的会报 NoSuchFieldException / NoSuchMethodException
- getConstructor() 等同

## 反射成员
反射中的成员包含类的属性和方法，以及嵌套类、接口和枚举类型，还有构造器。他们分别是实现了 java.lang.reflect.Member 接口的 java.lang.reflect.Field、java.lang.reflect.Method、和 java.lang.reflect.Constructor。
### Field
Field 成员是具有相关值的类、接口和枚举。Field 类提供了以下方法来获取成员信息，比如名称、类型、修饰符和注解。

- 成员类型
   - Field.getType()，获取成员类型
   - Field.getGenericType() ，返回成员的声明类型，如果该类型不可用，则退到 Field.getType()
   
- 成员修饰符

   修饰符主要有以下几种：访问修饰符（public，protected，private）、特定于字段的修饰符控制运行时行为（transient，volatile）、修饰符仅限一个实例（static）、禁止修改值的修饰符（final）、注解。获取修饰符的方法都在java.lang.reflect.Modifier 包中。

   - Field.getModifiers()， 返回修饰符集中的个数
   - Field.set(Object obj, Object value)，设置成员值
   - Field.setAccessible(true)，越过安全访问限制，比如对 final 字段修改
- 可能出现的异常
   - IllegalArgumentException，对成员赋值时，反射在运行时不会进行自动装箱拆箱（TODO：自动装箱拆箱发生在什么时候），如果对基本类型和包装类型互相赋值，会报该异常
   - NoSuchFieldException，使用 getField() 获取非公共的成员时报该异常，可以改成 getDeclaredField()
   - IllegalAccessException，访问 final 修饰的成员时权限不够，可以通过 Field.setAccessible(true)，越过安全访问限制
### Method
Method 类提供了以下方法来获取一个方法的修饰符、返回值、形式参数、注解以及抛出的异常等声明信息，它还可以通过反射执行方法。

- 方法类型
   - Method.getReturnType()
   - Method.getGenericReturnType()
   - Method.getParameterTypes()
   - Method.getGenericParameterTypes()
   - Method.getExceptionTypes()
   - Method.getGenericExceptionTypes()
   
- 方法修饰符

   修饰符主要有以下几种：访问修饰符（public，protected，private）、修饰符仅限一个实例（static）、禁止修改值的修饰符（final）、注解、需要覆盖的修饰符（abstract）、防止重入的修饰符（synchronized）、标识使用本地语言实现的修饰符（native）、强制执行严格的浮点行为（strictfp）。获取修饰符的方法都在 java.lang.reflect.Modifier 包中。

   - Method.getName()

   - Method.getModifiers()

   - Method.isVarArgs()

   - Method.isBridge()

   - Method.isSynthetic()

   - ...

- 反射执行方法
   
   - Method.invoke(Object obj, Object... args)
   
   ```java
   Class<Cat> catClass = Cat.class;
   Class<? super Cat> superclass = catClass.getSuperclass();
   Method getAgeMethod = superclass.getDeclaredMethod("setName", String.class);
   getAgeMethod.invoke(animal, "pig");
   ```
   
   - JavaBean 提供的属性描述符可以反射执行 get / set 方法，实例：
   
   ```java
   BeanInfo beanInfo = Introspector.getBeanInfo(Cat.class);
   for (PropertyDescriptor pd : beanInfo.getPropertyDescriptors()) {
       System.out.println(pd.getDisplayName() + ":" + pd.getReadMethod().invoke(cat) + ":" + pd.getPropertyType());
   }
   ```
   
- 可能出现的异常
   - NoSuchMethodException，由于类型擦除，可能找不到某方法，建议寻找方法时总是查找参数化类型的上限
   - IllegalAccessException，访问 private 方法或其它无权限的方法时报该异常，可以通过 Field.setAccessible(true)，越过安全访问限制
   - IllegalArgumentException，反射方法执行参数异常，
   - InvocationTargetException，反射方法执行抛出了异常，可以根据此判断业务异常
### Constructor
通常构造器在反射调用方法或者访问成员之前进行初始化创建类的实例。Constructor 类也提供了很多方法来获取构造器的修饰符、参数列表、注解和异常等信息。

- 反射创建对象

  有两种方式创建对象，java.lang.reflect.Constructor.newInstance() 和 Class.newInstance()。前者是首选，因为：

  - 前者可以执行任意的构造方法，后者只能执行获得访问权限的无参构造方法
  - 前者会抛出统一的 InvocationTargetException，后者会抛出构造器抛出的异常
  - 前者在某些情况下可以执行私有构造器，后者只能执行公共构造器

  ```java
  Constructor<? super Cat> constructor = catClass.getDeclaredConstructor(String.class);
  Cat cat = (Cat) constructor.newInstance("cat");
  ```

- 可能出现的异常
   - InstantiationException，使用 Class.newInstance() 时没有无参构造方法

## 反射在动态代理中的应用

使用动态代理在运行期动态创建接口的实例，直接生成字节码并进行类加载：

```java
AnimalInterface proxyInstance = (AnimalInterface) Proxy.newProxyInstance(AnimalInterface.class.getClassLoader(), new Class[]{AnimalInterface.class}, (proxy, method, args) -> {
    if (method.getName().equals("getAge")) {
        return Integer.valueOf(String.valueOf(LocalDate.parse((String) args[0]).until(LocalDate.now(), ChronoUnit.YEARS)));
    }
    return method.invoke(args);
});
System.out.println(proxyInstance.getAge("2020-01-01"));
```

## 反射实践之工具类

### 比较对象属性值的变化

工作中有时会遇到比较两个对象的属性值是否发生了变化的场景，一个个属性比较的话使用太多 if-else，既不简单优雅，也影响判断，我们试试通过 Java 反射来比较两个对象的属性值，获取属性前后的变化。

该场景的前提条件：

- - 两个对象的属性名完全一致
  - 需要比较的属性具有 get 方法
  - 比较方法第一个参数对象需要比较的属性上含有自定义注解

#### 自定义注解

自定义一个属性注解，声明在需要对比的实体属性上，可以设置一个别名属性。

```java
@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface NeedComparedProperty
{
    // 实体属性别名
    String name() default "";
}
```

#### 准备参数变化传输对象

声明一个对象来保存变化前后的值。

```
public class ModifiedDTO
{
    private String name;

    private Object before;

    private Object after;
}
```

#### 工具类

```java
@Slf4j
@Component
public class ComparePropertyUtils
{
    public static List<ModifiedDTO> getDiff(Object o1, Object o2)
    {
        List<ModifiedDTO> diffList = new ArrayList<>();
        Class<?> o1Clazz = o1.getClass();
        Class<?> o2Clazz = o2.getClass();
        Field[] declaredFields = o1Clazz.getDeclaredFields();
        for (int i = 0; i < declaredFields.length; ++i)
        {
            Field field = declaredFields[i];
            NeedComparedProperty annotation = field.getAnnotation(NeedComparedProperty.class);
            if (annotation == null)
            {
                continue;
            }
            Object invokeO1, invokeO2;
            try
            {
                PropertyDescriptor pdo1 = new PropertyDescriptor(field.getName(), o1Clazz);
                PropertyDescriptor pdo2 = new PropertyDescriptor(field.getName(), o2Clazz);
                Method readMethod1 = pdo1.getReadMethod();
                Method readMethod2 = pdo2.getReadMethod();
                invokeO1 = readMethod1.invoke(o1);
                invokeO2 = readMethod2.invoke(o2);
            }
            catch (IntrospectionException | IllegalAccessException | InvocationTargetException e)
            {
                log.error("获取bean属性值错误, 提示: [{}]", e.getMessage());
                continue;
            }
            if (!(invokeO1 == null && invokeO2 == null) && (invokeO1 != null && !invokeO1.equals(invokeO2) || !invokeO2.equals(invokeO1)))
            {
                ModifiedDTO modifiedDTO = new ModifiedDTO();
                modifiedDTO.setName(StringUtils.isBlank(annotation.name()) ? field.getName() : annotation.name());
                modifiedDTO.setBefore(Optional.ofNullable(invokeO1).orElse(""));
                modifiedDTO.setAfter(Optional.ofNullable(invokeO2).orElse(""));
                diffList.add(modifiedDTO);
            }
        }
        return diffList;
    }
}
```

### 设置对象属性非 null

有些时候，后端开发人员可能不注意，返回给前端的值有的为 null，有的为空字符串，有的为空数组，而如果前端开发人员程序也不严谨，会出很多问题。当然有很多方式可以避免，比如对象属性默认初始化，显式给其赋值等。我们这里本着学习反射的态度，通过 Java 反射来处理返回的对象中的 null 值。

```java
public static void transferNull(Object o)
{
    Class<?> clazz = o.getClass();
    Field[] declaredFields = clazz.getDeclaredFields();
    for (int i = 0; i < declaredFields.length; ++i)
    {
        Field field = declaredFields[i];
        field.setAccessible(true);
        try
        {
            PropertyDescriptor descriptor = new PropertyDescriptor(field.getName(), clazz);
            Method readMethod = descriptor.getReadMethod();
            Method writeMethod = descriptor.getWriteMethod();
            Object oValue = readMethod.invoke(o);
            if (null == oValue)
            {
                String typeName = field.getType().getName();
                switch (typeName)
                {
                    case "java.lang.String":
                        writeMethod.invoke(o, "");
                        break;
                    case "java.util.List":
                        writeMethod.invoke(o, Collections.EMPTY_LIST);
                        break;
                    case "java.util.Map":
                        writeMethod.invoke(o, Collections.EMPTY_MAP);
                        break;
                    default:
                        break;
                }
            }

        }
        catch (IntrospectionException | IllegalAccessException | InvocationTargetException e)
        {
            log.error("获取bean属性值错误, 提示: [{}]", e.getMessage());
            continue;
        }
    }
}
```