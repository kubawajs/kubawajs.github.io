---
title: Setup Autofac and AutoMapper in .NET 5 Web project
description: Save time and enhance code efficiency with Autofac and AutoMapper in your .NET web projects.
publishDate: 2021-01-12T00:00:00Z
tags: 
  - "autofac"
  - "automapper"
  - "netcore"
img: '/assets/images/2021/01/setup-autofac-and-automapper-in-net-5-web-project/images/annie-spratt-jsra0n9up1s-unsplash.jpg'
img_alt: ""
---

**Autofac is a powerful and very popular Inversion of Control container for .NET platform. AutoMapper, on the other hand, is a library that solves the problem of **highly repetitive and junk code**** **mapping one object to another. One of the first things to do after creating a new .NET web project is to add both of these libraries to it. In this tutorial I will show you how to setup both of these tools in .NET 5 web project which hopefully save your time during next project creation.**

## Autofac

At first, you need to install **Autofac** packages for your project. To do that, RMB on your project in _Solution Explorer_ view, choose _Manage NuGet packages_... and search for **Autofac** and **Autofac.Extensions.DependencyInjection**

![](https://jakubwajs.files.wordpress.com/2021/01/image.png?w=911)

Autofac packages in NuGet package manager

Then it is required to add **AutofacServiceProvider** to .NET Core hosting mechanism in **Program.cs**:

```csharp
public static IHostBuilder CreateHostBuilder(string\[\] args) =>
    Host.CreateDefaultBuilder(args)
        .UseServiceProviderFactory(new AutofacServiceProviderFactory())
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

Now it is time for **ContainerModule** class to be created. It will be used for registering all types and modules. It should inherit from **Autofac.Module** and override _Load_ method.

```csharp
public class ContainerModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        // Register types & modules
    }
}
```

For example, to register all types implementing _IService_ interface you can use below code snippet:

```csharp
var assembly = Assembly.GetExecutingAssembly();
builder.RegisterAssemblyTypes(assembly)
       .AssignableTo<IService>()
       .AsImplementedInterfaces()
       .InstancePerLifetimeScope();
```

Last but not least - create new _ConfigureContainer_ method in **Startup.cs**. This method registers previously created module and will be implicitly invoked by Autofac. Thanks to this you can access the Autofac **ContainerBuilder** and register things directly with it (like in the module above).

```csharp
public void ConfigureContainer(ContainerBuilder builder)
{
    builder.RegisterModule(new ContainerModule());
}
```

## AutoMapper

Same as Autofac, **AutoMapper** requires installation of two NuGet packages - base (**AutoMapper**) and dependency injection extensions (**AutoMapper.Extensions.Microsoft.DependencyInjection**).

![](https://jakubwajs.files.wordpress.com/2021/01/image-1.png?w=914)

AutoMapper packages in NuGet package manager

The next step is to build the mapping profile. This is a special class where all mappings between models and DTOs should be defined. I recommend using _ReverseMap_() method, which automatically creates also a reverse mapping to the defined one.

```csharp
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<TestModel, TestModelDto>().ReverseMap();
    }
}
```

Now it's time to add class which will create mapper based on the mapping profile built in the previous step. This method will be used later for registering **IMapper** in IoC container, so I recommend creating static method as below.

```csharp
public class AutoMapperConfig
{
    public static IMapper Initialize()
    {
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });
        return mapperConfig.CreateMapper();
    }
}
```

In this example I'm adding mapping profile to _MapperConfiguration_, but there's no problem with creating the mapping here explicitly (instead using special _MappingProfile_ class).

Last thing to do is to register instance of just built **AutoMapperConfig** in the Autofac IoC container. Just add the code snippet in the **ContainerModule.cs** file.

```csharp
builder.RegisterInstance(AutoMapperConfig.Initialize()).SingleInstance();
```

And that's it! Both Autofac and AutoMapper are ready to work.

If you already use Dependency Injection in your project (e.g. built-in _Microsoft.Extensions.DependencyInjection_) but want to replace it with Autofac, you can use this commit as real-life example how to do it - [Add Autoface IoC · kubawajs/WeddingPlanner@c7fd52d (github.com)](https://github.com/kubawajs/WeddingPlanner/commit/c7fd52db0621776adf4ce81837033673394133a3)

### Sources

- [ASP.NET Core — Autofac 6.0.0 documentation (autofaccn.readthedocs.io)](https://autofaccn.readthedocs.io/en/latest/integration/aspnetcore.html)
- [Getting Started Guide — AutoMapper documentation](https://docs.automapper.org/en/latest/Getting-started.html)

* * *

Hero photo by [Annie Spratt](https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
