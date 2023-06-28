---
title: Creating .NET Core MVC application
description: ""
publishDate: 2017-09-09T00:00:00Z
tags: 
  - "net-core"
  - "net"
  - "dotnet"
img: "/assets/images/2017/09/creating-net-core-mvc-application/images/netcore.png"
img_alt: ""
---

Kiedy 15 lat temu Microsoft wydał pierwszą wersję frameworka .NET, nikt nie spodziewał się jeszcze, w jak wielu różnych zastosowaniach będzie wykorzystywany. Po  latach dostosowywania platformy do ciągle zmieniających się wymagań, przyszedł czas na prawdziwą rewolucję - .NET Core.

* * *

_When 15 years ago Microsoft released the first version of the .NET framework, no one expected yet in how many different applications it will be used. After years of customizing the platform to constantly changing requirements, it was time for a real revolution - .NET Core._

### .NET Core, czyli .NET dla Linuxa / .NET Core - .NET for Linux

Od początku powstania, tworzenie aplikacji zarówno w języku C#, jak i frameworku .NET było zarezerwowane dla komputerów z Windows. Istniały co prawda wersje przeznaczone na Linux (jak np. [Mono](http://www.mono-project.com/)), jednak nie były to oficjalne wydania, a jedynie opensourcowe rozwiązania niewspierane przez Microsoft. W zeszłym roku deweloper postanowił w końcu zmierzyć się z oczekiwaniami programistów na całym świecie, nie przepadającym za Windowsem, a chcącymi spróbować programowania na flagowej platformie firmy z Redmond. Opracował nową wersję frameworka .NET, nazwaną .NET Core. Jako pierwsza oficjalna wersja platformy .NET jest dostępna nie tylko na Windowsie, ale również Linuxie i MacOS. Ponadto, co przez wiele lat byłoby nie do pomyślenia w odniesieniu do Microsoftu, zdecydowała się upublicznić jego [kod źródłowy](https://github.com/dotnet/core).

* * *

_From the very beginning, application development in both C# and the .NET was reserved for Windows. There were indeed versions for Linux (such as Mono), but they were not official releases, only open source solutions, not supported by Microsoft. Last year they finally decided to face the expectations of developers around the world who didn't like Windows and wanted to try programming on the flagship platform of the Redmond company. They've developed a new version of the .NET framework called .NET Core. As the first official .NET platform, it's available not only on Windows, but also on Linux and MacOS. In addition, what for many years would've been unthinkable for Microsoft, they decided to release its [source code](https://github.com/dotnet/core)._

![dotnetcore](/assets/images/2017/09/creating-net-core-mvc-application/images/dotnetcore-e1503612301160.jpg)

Równolegle z .NET Core, Microsoft wydał darmowy edytor Visual Studio Code. Jest to lekki edytor tekstowy, przypominający popularnego Sublime Text lub Brackets. Od tamtej pory VS Code jest intensywnie rozwijany, nie tylko przez wydawcę, ale również społeczność. Dzięki tworzonym przez nich pluginom, można dostosować edytor do kodzenia w każdym z najpopularniejszych języków programowania. Ponadto, w przeciwieństwie do Visual Studio, jest on zdecydowanie lżejszy i szybszy (lecz także pozbawiony większości przydatnych narzędzi).

* * *

_In parallel with .NET Core, Microsoft released the free code editor called Visual Studio Code. It's a lightweight text editor, reminscent of popular Sublime Text or Brackets. Since then VS Code has been extensively developed, not only by the publisher, but also by the community. With their plugins, you can customize the editor for coding in any of the most popular programming languages. Moreover, in opposite to Visual Studio, it's definitely lighter and faster (but also deprived most useful tools)._

### Tworzenie projektu / Creating project

Utworzenie nowego projektu w .NET Core jest bardzo proste, niezależnie z jakiego OSa korzystamy. Pierwszym krokiem jest pobranie odpowiedniej wersji [frameworka](https://www.microsoft.com/net/core). Po zainstalowaniu, uruchamiamy terminal (w Windows korzystam z PowerShella). Przechodzimy do folderu, w którym chcemy utworzyć naszą aplikację (dla osób mniej obeznanych z terminalem - _[cd](http://www.dummies.com/computers/operating-systems/linux/common-linux-commands/)_) i wpisujemy polecenie:

* * *

_Creating a new project in .NET Core is very easy, no matter which OS we use. The first step is to download the recent version of the [framework](https://www.microsoft.com/net/core). Once installed, run the terminal (I use PowerShell in Windows). Go to the folder where you want to create your application (for people less familiar with command line -_ [cd](http://www.dummies.com/computers/operating-systems/linux/common-linux-commands/)_) and type a command:_

```shell
dotnet new mvc -o mvc_test
```

Powstanie nowa aplikacja _mvc\_test_ wg wzorca MVC. Strukturę projektu możemy obejrzeć w Visual Studio Code. Jak widać na screenie poniżej, utworzone zostały odpowiednie dla wzorca MVC foldery (Models, Views, Controllers), a także pliki konfiguracyjne i cs.

* * *

_A new MVC application called_ mvc\_test _will be created. The structure of the resulting project can be viewed in Visual Studio Code. As you can see on the screenshot below, command_ dotnet new mvc _creates folders appropriate for MVC pattern, as well as configuration and cs files._

![Zrzut ekranu (23)](/assets/images/2017/09/creating-net-core-mvc-application/images/zrzut-ekranu-23.png)

Aby uruchomić aplikację, z poziomu folderu powstałego projektu wpisujemy komendę:

* * *

_To run your application, from the project folder, type the command:_

```shell
dotnet run
```

Po skompilowaniu, w przeglądarce należy wpisać adres, pod którym została uruchomiana aplikacja. W moim przypadku był to port 5000:

* * *

_After compiling, you must enter in your browser the address at which the application was started. In my case it was port 5000:_

```
http://localhost:5000
```

I... to już wszystko. Domyślna wersja aplikacji gotowa. ;)

* * *

_And... that's all. The default version of application is ready. ;)_ 

![localhost:5000](/assets/images/2017/09/creating-net-core-mvc-application/images/zrzut-ekranu-25-e1503523300401.png)
