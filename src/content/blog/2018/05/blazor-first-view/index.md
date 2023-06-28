---
title: Blazor - first view
description: Discover the paradigm-shifting potential of Blazor, a revolutionary framework leveraging WebAssemblies to enable frontend development with C#. Explore how this innovative approach can reshape the role of JavaScript by empowering developers to build robust web applications using C# for both frontend and backend.
publishDate: 2018-05-31T00:00:00Z
tags: 
  - "net"
  - "blazor"
  - "net-core"
  - "javascript"
  - "webdev"
img: "/assets/images/2018/05/blazor-first-view/images/blazor-counter.png"
img_alt: ""
---

**W dobie prężnie rozwijających się, coraz to nowszych frameworków, rola JavaScriptu w programowaniu frontendowym wydaje się niepodważalna.** **Wraz z wprowadzeniem WebAssemblies pojawia się jednak nowa, rewolucyjna koncepcja - Blazor, która może znacząco wpłynąć na pozycję tego języka programowania.** **Już niedługo pisanie dużych aplikacji webowych z wykorzystaniem C# zarówno na front- jak i backendzie będzie możliwe.**

* * *

**_In the era of dynamically developing, ever newer frameworks, the role of JavaScript in frontend programming seems unquestionable. With the introduction of WebAssemblies, however, a new, revolutionary concept appears - Blazor, which can significantly affect the position of this programming language. Soon, it will be possible to write large web applications using C# on both the front and backend._**

[caption id="attachment_2506" align="aligncenter" width="1920"]![Blazor-counter.png](images/blazor-counter.png) App from example Blazor template.[/caption]

### WebAssembly zmienia zasady / WebAssembly change rules

WebAssembly jest nowym rozwiązaniem. Umożliwia uruchomienie kodu napisanego w językach wysokopoziomowych z szybkością zbliżoną do rozwiązań natywnych. Do tej pory to JavaScript posiadał monopol na web development po stronie klienta. Od teraz się to zmieni - programiści będą mogli pisać kod w swoim ulubionym języku, który po kompilacji do WebAssembly będzie obsługiwany przez przeglądarkę tak samo sprawnie JS.

Co ważne, standardy WebAssembly są definiowane przez organizację W3C, co powinno zapewnić jego jednolitą obsługę przez większość popularnych przeglądarek internetowych. Obecnie WebAssembly jest dostępne w Mozilli Firefox, Google Chrome, Safari i Microsoft Edge.

* * *

_WebAssembly is a new solution. It allows you to run code written in high-level languages at a speed similar to native solutions. Until now, JavaScript had a monopoly on a web development on the client's side. It will change from now on - programmers will be able to write a code in their favorite language, which after compilation to WebAssembly will be served by the browser just as smothly as JS._

_Importantly, WebAssembly standards are defined by the W3C organization, which should ensure its consistent support for the most popular web browsers. Currently, WebAssembly is available in Mozilla Firefox, Google Chrome, Safari and Microsoft Edge._

[caption id="attachment_2507" align="aligncenter" width="1928"]![webassembly.png](images/webassembly.png) [Source](https://www.sitepoint.com/webassembly-is-overdue-javascript-for-large-projects/)[/caption]

### Czym jest Blazor? / What is Blazor?

C#-ową odpowiedzią na możliwości oferowane przez WebAssembly jest Blazor. Umożliwia pisanie w C# bezpośrednio w Widoku, podobnie jak dzieje się to z fragmentami kodu interpretowanymi przez silnik Razor. W odróżnieniu od wcześniejszych rozwiązań, kod nie jest jednak "tłumaczony" na JavaScript, a uruchamiany jako assembly .NET-owe bezpośrednio w przeglądarce, bez dodatkowych pluginów. Dzięki temu programista nie musi przełączać się pomiędzy dwoma językami programowania. Dotychczasowy programista backendowy będzie mógł łatwo wykonać część zadań frontendowca bez potrzeby nauki nowego języka/frameworka.

* * *

_The C# answer to the possibilities offered by the WebAssembly is Blazor. It allows writing in C# directly in the View, just like it happens with the code parts interpreted by the Razor engine. Unlike previous solutions, the code isn't "translated" into JavaScript, but run as a .NET assembly directly in the browser, without additional plugins. As a result, the programmer doesn't have to switch between two different programming languages. The previous backend programmer will be able to easily perform part of the frontend's tasks without the need to learn a new language/framework._

[caption id="attachment\_2505" align="aligncenter" width="984"]![new-blazor-app-dialog](images/new-blazor-app-dialog.png) Window for creating a new project containing Blazor templates.[/caption]

Pomimo, że Blazor jest jeszcze na bardzo wczesnym etapie rozwoju i, jak podkreśla Microsoft, nie do końca wiadomo w jakim kierunku będzie zmierzał dalszy development, możliwe jest już przetestowanie jego dotychczasowej wersji. W ostatnim releasie (wraz .NET Core 2.1) dodano nawet przykładowe szablony aplikacji Blazor: Blazor oraz Blazor (ASP .NET Core hosted). Działanie aplikacji z przykładowego szablonu Blazor można zobaczyć na filmie poniżej.

* * *

_Although Blazor is still at a very early stage of development and, as Microsoft emphasizes, it isn't entirely clear in which direction will be taken, it's possible to test its current version now. In the last release (along with .NET Core 2.1) added even sample Blazor application templates:_ _Blazor and Blazor (ASP .NET Core hosted). A working application from the sample Blazor template can be seen on the video below._

https://youtu.be/qDoSAnwNgQI?t=3m50s

### Podsumowanie / Summary

Blazor jest obiecującą koncepcją. Wizja utworzenia całej aplikacji z wykorzystaniem jednego głównego języka programowania, w dodatku z zachowaniem wydajności aplikacji JavaScriptowej, jest bardzo zachęcająca. Jako programista backendowy trzymam kciuki za Microsoft i na pewno będę śledził dalszy rozwój projektu.

* * *

_Blazor is a very promising concept. The vision of creating the entire application using one main programming language, in addition to preserving the performance of the JavaScript application, is very encouraging. As a backend developer I keep my fingers crossed for Microsoft and I'll certainly follow the further development of the project._

 

Źródła / _Sources_:

- [https://github.com/aspnet/blazor](https://github.com/aspnet/blazor)
- [https://blogs.msdn.microsoft.com/webdev/2018/05/02/blazor-0-3-0-experimental-release-now-available/](https://blogs.msdn.microsoft.com/webdev/2018/05/02/blazor-0-3-0-experimental-release-now-available/)
- [https://blogs.msdn.microsoft.com/webdev/2018/03/22/get-started-building-net-web-apps-in-the-browser-with-blazor/](https://blogs.msdn.microsoft.com/webdev/2018/03/22/get-started-building-net-web-apps-in-the-browser-with-blazor/)
- [https://blogs.msdn.microsoft.com/webdev/2018/02/06/blazor-experimental-project/](https://blogs.msdn.microsoft.com/webdev/2018/02/06/blazor-experimental-project/)
- [https://webassembly.org/](https://webassembly.org/)
