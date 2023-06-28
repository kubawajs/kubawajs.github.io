---
title: Machine Learning in .NET? Introducing ML.NET
description: Discover Microsoft's ML.NET, a powerful machine learning tool, as it expands the capabilities of their flagship platform to empower developers in leveraging data-driven insights.
publishDate: 2018-09-26T00:00:00Z
tags:
  - "machine-learning"
  - "net"
  - "net-core"
  - "ml-net"
img: '/assets/images/2018/09/machine-learning-in-net-introducing-ml-net/images/architecture-books-bookshelves-159870.jpg'
img_alt: ""
---

**Już od dawna podkreśla się, jak ważne są terabajty danych, które (świadomie lub nie) produkujemy każdego dnia.** **Umiejętność ich eksploracji i wyciągania wniosków na ich podstaw****ie może być bardzo przydatna w wielu procesach biznesowych.** **Niemal każdy rodzaj danych, jakie zostawiamy w sieci jest w jakiś sposób przetwarzany. O ile sam w sobie nie niesie wiele informacji, to w skali tysięcy użytkowników może być bezcenny. Z tego powodu uczenie maszynowe stało się jednym z najpopularniejszych i najdynamiczniej rozwijających się kierunków w IT ostatnich lat. Również twórcy narzędzi programistycznych podążają za tym trendem,  w tym Microsoft, który rozszerza swoją flagową platformę o framework do Machine Learningu, nazwany** **ML.NET.**

* * *

**_It has long been stressed how important terabytes of data are (which we consciously or not) produce every day. The ability to explore them and draw conclusions based on them can be very useful in many business processes. Almost every kind of data that we leave in the Web is being processed in some way. Unless it carries much information in itself, it can be invaluable on a scale of thousands of users. For this reason, machine learning has become one of the most popular and most dynamically developing trends in IT in recent years. Developers of programming tools are also following this trend, including Microsoft, which is expanding its flagship platform by machine learning tool, called ML.NET._**

## Machine Learning .NET

Choć o ML.NET było głośno już w maju, dowiedziałem się o nim dopiero podczas przeglądania filmów z tegorocznego .NET Conf. Podobnie jak [Blazor](https://jakubwajs.wordpress.com/2018/05/31/blazor-first-view/) jest jeszcze we wczesnej fazie developmentu (obecnie dostępna wersja to wersja 0.5), jednak już teraz wykorzystywany jest w wielu produktach Microsoftu (np. Bing Ads, Excel, PowerPoint, Windows Defender). ML.NET jest opensourcowy i crossplatformowy, co wpisuje się w obecnie obrany kurs firmy z Redmond, kładący duży nacisk na takie rozwiązania.

* * *

_Although ML.NET became known in May, I learned about it only after this year's .NET Conf._ _The same as [Blazor](https://jakubwajs.wordpress.com/2018/05/31/blazor-first-view/), it is also in early-development stage (the recent version is 0.5) however, it's already used in many Microsoft products (eg. Bing Ads, Excel, PowerPoint, Windows Defender). ML.NET is opensource and cross-platform, what is part of the current course of the company from Redmond, which lays a lot of emphasis on such solutions._

[caption id="attachment_2514" align="aligncenter" width="911"]![mlnet](images/mlnet.png) The machine learning framework was long awaited by the .NET community (source: [blog msdn](http://aka.ms/mlnet0.5))[/caption]

## Framework first

Jak podkreślają twórcy, ML.NET ma być przede wszystkim frameworkiem. Ma stanowić przyjazne wprowadzenie do Machine Learningu dla deweloperów .NET, poprzez udostępniane API do budowania i trenowania modeli. Przygotowane i wytrenowane modele można zapisywać jak paczki, dzięki czemu mogą być wykorzystywane niezależnie w innych projektach. ML.NET umożliwia też integrację z bogatą bazą inteligentnych algorytmów Azure Cognitive Services.

* * *

_As emphasize by the creators, ML.NET is the framework first oriented. It is supposed to be a friendly introduction to machine learning for .NET developers, through the API for building and training models. Prepared and trained models can be saved as zip files, so it can be used independently in other projects. ML.NET also allows integration with a wide base of artificial intelligence algorithms from Azure Cognitive Services._

![machine-learning-dotnet](https://jakubwajs.files.wordpress.com/2019/09/machine-learning-dotnet.png)

## What next?

Nadchodząca wersja 0.6 ma przynieść wiele zmian. Microsoft przede wszystkim kładzie nacisk na rozszerzenia - możliwe ma być wykorzystanie wytrenowanych modeli z Tensorflow, czyli jednej z najpopularniejszych bibliotek do uczenia maszynowego. Również składnia ma być uproszczona - twórcy zrezygnowali z tzw. pipeline'ów. W późniejszych wersjach ma też powstać narzędzie UI, pozwalające tworzyć i trenować modele z poziomu aplikacji webowej/desktopowej.

Planowana data release'u wersji 1.0 to rok 2019.

* * *

_The upcoming version 0.6 is expected to bring many changes. Above all, Microsoft lays emphasis on the extensions - it will be posible to use trained models from Tensorflow, one of the most popular machine learning libraries. Also the syntax will be simplified - the developers gave up the so-called pipelines._ _In later versions, a UI tool is also to be created, allowing to create and train models from the level of a web / desktop application._

_The planned release date of version 1.0 is 2019._

https://www.youtube.com/watch?v=zXn10vy8F6E

 

Źródła / _Sources_

- [https://www.microsoft.com/net/apps/machinelearning-ai/ml-dotnet](https://www.microsoft.com/net/apps/machinelearning-ai/ml-dotnet)
- [https://www.microsoft.com/net/learn/machinelearning-ai/ml-dotnet-get-started-tutorial](https://www.microsoft.com/net/learn/machinelearning-ai/ml-dotnet-get-started-tutorial)
- [https://blogs.msdn.microsoft.com/dotnet/2018/09/12/announcing-ml-net-0-5/](https://blogs.msdn.microsoft.com/dotnet/2018/09/12/announcing-ml-net-0-5/)
- [https://github.com/dotnet/machinelearning](https://github.com/dotnet/machinelearning)
