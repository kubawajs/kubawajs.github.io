---
title: Logging with log4net in .NET Core 3.0 Console App
description: Setup logging with log4net in the .NET Core 3.0 console application.
publishDate: 2019-11-28T00:00:00Z
tags: 
  - "net-core"
  - "dotnet"
  - "log4net"
  - "logging"
img: "/assets/images/2019/11/logging-with-log4net-in-net-core-3-0-console-app/images/project-structure.png"
img_alt: ""
---

**I decided to write this post because, with this seemingly simple thing, containing a little bunch of code, I encountered extremely many problems and errors. In this post, I will go through the setup of logging with log4net in the .NET Core 3.0 console application and try to solve some of the common issues you can encounter during this process.**

A refreshed version of this blog post adjusted to .NET 7 is available.

## Logging with log4net in .NET 7 Console App

[Read more](https://jakubwajs.wordpress.com/2023/01/17/logging-with-log4net-in-net-7-console-app/)

## Project setup

In this tutorial, I will use .NET Core 3.0, log4net v2.0.8, and Visual Studio Community 2019. Start with creating a new project using _Console App (.NET Core)_ template.

![](https://jakubwajs.files.wordpress.com/2019/11/project-structure.png?w=959)

## Log4Net Installation

When your solution is ready, you need to add the log4net package to your project. To do this run the following command in your NuGet console:

```shell
Install-Package log4net
```

If you're using Visual Studio you can do this also through the NuGet Package Manager window. Click RMB on your project in the Solution Explorer window and choose Manage Nuget Packages... Then search for log4net in the Browse tab. Click on log4net and install the latest version of the **package**.

![](https://jakubwajs.files.wordpress.com/2019/11/nuget-download.png?w=1024)

NuGet Package installation window.

## Add config file

Add a new file called log4net.config in the project root level and populate it with the content from the code frame below. It adds two types of log appenders - one which will save our application logs to file and the second one which prints them into the console window.

```xml
<log4net>
    <root>
        <level value="ALL" />
        <appender-ref ref="console" />
        <appender-ref ref="file" />
    </root>
    <appender name="console" type="log4net.Appender.ConsoleAppender">
        <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date %level %logger - %message%newline" />
        </layout>
    </appender>
    <appender name="file" type="log4net.Appender.RollingFileAppender">
        <file value="main.log" />
        <appendToFile value="true" />
        <rollingStyle value="Size" />
        <maxSizeRollBackups value="5" />
        <maximumFileSize value="25MB" />
        <staticLogFileName value="true" />
        <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date \[%thread\] %level %logger - %message%newline" />
        </layout>
    </appender>
</log4net>
```

## Load Configuration

When configuring log4net in my project, I followed [this tutorial](https://stackify.com/log4net-guide-dotnet-logging/). According to this, in point no. 3 I should add a line at the bottom of the AssemblyInfo.cs file, but... I didn't have this file. It turns out that in .NET Core 3.0 assembly file is generated automatically, and the whole configuration should be done through csproj file. After a quick research, I've found out that the configuration can be manually loaded from log4net.config file in the application code level, before any other code, will be executed.

```csharp
using log4net;
using log4net.Config;
using System;
using System.IO;
using System.Reflection;

namespace NetCore3Log4Net.Tutorial.ConsoleApp
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        static void Main(string\[\] args)
        {
            // Load configuration
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

            Console.WriteLine("Hello world!");

            // Log some things
            log.Info("Hello logging world!");
            log.Error("Error!");
            log.Warn("Warn!");

            Console.ReadLine();
        }
    }
}
```

If we run our program now, the console still displays only the "Hello world!" text. The reason for this behavior is that by default log4net.config file is not copied to the output directory, which means that Configure method that we've set up in the previous step can't find the file to load the configuration. To fix this issue, right-click on log4net.config file and choose Properties. Then change the option under **Copy to Output Directory** build action into **Copy if newer** or **Copy always**.

![](https://jakubwajs.files.wordpress.com/2019/11/log4net-deploy-1.png?w=924)

Change Copy to Output Directory build action into _Copy if newer_.

Here it is! Our logging configuration is completed. We can see our logs in the console, and also they're stored in a text file, which is by default saved under the path:

```
~\<project\name>\bin\Debug\netcoreapp3.0
```

![](https://jakubwajs.files.wordpress.com/2019/11/ready-part-1.png?w=982)

## Colored Console Appender

Our logging is ready, but as you can see in the screen above, at first glance it's difficult to distinguish which logs indicate application errors, and which are only informational. Hopefully, log4net provides a specific appender to make console logs colorful. As I found [here](https://logging.apache.org/log4net/release/config-examples.html), it just needs the replacement of the regular **ConsoleAppender** with the **ColoredConsoleAppender** and adding a few lines to the configuration file, containing log types mapping into individual colors. But, it doesn't work for me.

![](https://jakubwajs.files.wordpress.com/2019/11/colored-console-error.png?w=980)

After quite a long research about my issue and 100 times verifications that I did make no mistake in the configuration file, I found [this repository](https://gist.github.com/mizanRahman/4484020). And exactly this comment:

![](https://jakubwajs.files.wordpress.com/2019/11/colored-console-solution.png?w=997)

[https://gist.github.com/mizanRahman/4484020](https://gist.github.com/mizanRahman/4484020)

I've followed the suggestion and replaced **ColoredConsoleAppender** with **ManagedColoredConsoleAppender**_._ Et... voila! Our colored console logging works perfectly.

![](https://jakubwajs.files.wordpress.com/2019/11/ready-final.png?w=978)

And final look on **log4net.config** file:

```xml
<log4net>
  <root>
    <level value="ALL" />
    <appender-ref ref="console" />
    <appender-ref ref="file" />
  </root>
  
  <!--File Appender-->
  <appender name="file" type="log4net.Appender.RollingFileAppender">
    <file value="main.log" />
    <appendToFile value="true" />
    <rollingStyle value="Size" />
    <maxSizeRollBackups value="5" />
    <maximumFileSize value="25MB" />
    <staticLogFileName value="true" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date \[%thread\] %level %logger - %message%newline" />
    </layout>
  </appender>
  
  <!--Console appender-->
  <appender name="console" type="log4net.Appender.ManagedColoredConsoleAppender">
    <mapping>
      <level value="INFO" />
      <forecolor value="Green" />
    </mapping>
    <mapping>
      <level value="WARN" />
      <forecolor value="Yellow" />
    </mapping>
    <mapping>
      <level value="ERROR" />
      <forecolor value="Red" />
    </mapping>
    <mapping>
      <level value="DEBUG" />
      <forecolor value="Blue" />
    </mapping>
    <layout type="log4net.Layout.PatternLayout">
      <conversionpattern value="%date \[%thread\] %-5level - %message%newline" />
    </layout>
  </appender>
</log4net>
```

I hope that my post will prove useful, help you prepare your logging mechanism quickly and make this process as nice as possible.

#### Sources

- [https://stackify.com/log4net-guide-dotnet-logging/](https://stackify.com/log4net-guide-dotnet-logging/)

- [https://stackify.com/making-log4net-net-core-work/](https://stackify.com/making-log4net-net-core-work/)

- [https://logging.apache.org/log4net/release/config-examples.html](https://logging.apache.org/log4net/release/config-examples.html)

- [https://gist.github.com/mizanRahman/4484020](https://gist.github.com/mizanRahman/4484020)
