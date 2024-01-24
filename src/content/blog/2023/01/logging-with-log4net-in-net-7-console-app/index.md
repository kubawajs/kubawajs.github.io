---
title: Logging with log4net in .NET 7 Console App
description: In this post, I will go through the setup of logging with log4net in the .NET 7 console application and try to solve some of the common issues you can encounter during this process.
publishDate: 2023-01-17 00:00:00
img: '/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/hero.jpg'
img_alt: Picture of the computer console error.
tags: 
  - "net"
  - "net-core"
  - "dotnet"
---

In this post, I will go through the setup of logging with log4net in the .NET 7 console application and try to solve some of the common issues you can encounter during this process. I decided to write the whole post about it because I encountered extremely many problems and errors **with this seemingly simple thing, containing a little bunch of code**.

## Project setup

In this tutorial, I will use .NET 7, log4net v2.0.15, and Visual Studio Community 2022. Start with creating a new project using the _Console App_ template.

![Screenshot from Visual Studio with Console.Writeline "hello, world" text displayed.)](/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/image-5.png?w=1024)

New Console App project in Visual Studio 2022

## Log4net installation

When your solution is ready, you need to add the log4net package to your project. To do this run the following command in your NuGet console:

Install-Package log4net

If you're using Visual Studio you can do this also through the **NuGet Package Manager** window. Click RMB on your project in the Solution Explorer window and choose Manage Nuget Packages... Then search for **log4net** in the Browse tab. Click on log4net and install the latest version of the **package**.

![Screenshot from nuget package manager with log4net package selected.](/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/image-6.png?w=887)

Log4net package installation through NuGet Package Manager

## Add config file

Add a new file called **log4net.config** in the project root level and populate it with the content from the code frame below. It adds two types of log appenders - one which will save our application logs to file and the second one which prints them into the console window.

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

When configuring log4net in my project, I followed [this tutorial](https://stackify.com/log4net-guide-dotnet-logging/). According to this, in point no. 3 I should add a line at the bottom of the AssemblyInfo.cs file, but there is no such file in .NET 7. We can of course add it manually, but we can do it smarter. The configuration file can be loaded from log4net.config file directly in the **Program.cs** before any other code will be executed. It looks really clean and neat.

```csharp
using log4net;
using log4net.Config;
using System.Reflection;

// Get logger
var log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

// Load configuration
var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

Console.WriteLine("Hello world!");

// Log some things
log.Info("Hello logging world!");
log.Error("Error!");
log.Warn("Warn!");

Console.ReadLine();
```

If we run our program now, **the console still displays only the "Hello world!" text**. The reason for this behavior is that by default log4net.config file is not copied to the output directory, which means that Configure method that we've set up in the previous step can't find the file to load the configuration. To fix this issue, right-click on log4net.config file and choose Properties. Then change the option under **Copy to Output Directory** build action into **Copy if newer** or **Copy always**.

![Visual Studio file properties view with Copy to Output Directory option selected.](/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/image-8.png)

Setup copy action of the configuration file on the project build

Here it is! Our logging configuration is completed. We can see our logs in the console, and also they're stored in a text file, which is by default saved under the path:

```shell
~\\<project\_name>\\bin\\Debug\\net7.0
```

![Picture of the computer console with INFO, ERROR and WARN messages displayed.](/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/image-9.png?w=975)

## Colored Console Appender

Our logging is ready, but as you can see in the screen above, at first glance it's difficult to distinguish which logs indicate application errors, and which are only informational. Hopefully, log4net provides a specific appender to make console logs colorful. As I found [here](https://logging.apache.org/log4net/release/config-examples.html), it just needs the replacement of the regular **ConsoleAppender** with the **ColoredConsoleAppender** and adding a few lines to the configuration file, containing log types mapping into individual colors. But, it doesn't work for me.

![Picture of the computer console with Could not create appender error.](/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/colored-console-error.png)

After quite a long research about my issue and 100 times verifications that I did make no mistake in the configuration file, I found [this repository](https://gist.github.com/mizanRahman/4484020). And exactly this comment:

![Screenshot from the GitHub discussion about the error.](/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/colored-console-solution.png)

[https://gist.github.com/mizanRahman/4484020](https://gist.github.com/mizanRahman/4484020)

I've followed the suggestion and replaced **ColoredConsoleAppender** with **ManagedColoredConsoleAppender**. Et... voila! Our colored console logging works perfectly.

![Picture of the computer console with INFO, ERROR and WARN messages displayed colored in green, red and yellow.](/assets/images/2023/01/logging-with-log4net-in-net-7-console-app/images/image-10.png?w=979)

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
      <conversionPattern value="%date [%thread] %level %logger - %message%newline" />
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
      <conversionpattern value="%date [%thread] %-5level - %message%newline" />
    </layout>
  </appender>
</log4net>
```

I hope that my post will prove useful, help you prepare your logging mechanism quickly, and make this process as easy as possible.

* * *

_This post is a refreshed version of the original post written by me in 2019. You can read the original post here:_

* * *

### Sources

- [https://stackify.com/log4net-guide-dotnet-logging/](https://stackify.com/log4net-guide-dotnet-logging/)

- [https://stackify.com/making-log4net-net-core-work/](https://stackify.com/making-log4net-net-core-work/)

- [https://logging.apache.org/log4net/release/config-examples.html](https://logging.apache.org/log4net/release/config-examples.html)

- [https://gist.github.com/mizanRahman/4484020](https://gist.github.com/mizanRahman/4484020)
