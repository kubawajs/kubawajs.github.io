---
title: "First webpage with Materialize - Project #2"
description: Material design with Materialize - creating first website.
publishDate: 2017-05-15T00:00:00Z
tags: 
  - "css"
  - "html"
  - "material-design"
  - "materialize"
  - "petproject"
img: "/assets/images/2017/05/first-webpage-with-materialize-project-2/images/school-supplies-paint-watercolor-color-palette-159560.jpeg"
img_alt: ""
---

Nieważne jak dobre rozwiązania backendowe kryją się wewnątrz aplikacji - użytkownik ocenia po tym, co widzi na zewnątrz. Sukces lub porażka serwisu internetowego zależy w dużej mierze od jego wyglądu. W tym poście postaram się przybliżyć Wam temat **material designu** - zasad obecnie uznawanych za trendy przy budowie warstwy wizualnej aplikacji. Pokażę także jak, niedużym nakładem sił, napisać stronę, która w przyszłości będzie wizytówką [naszego projektu](https://jakubwajs.wordpress.com/2017/05/09/the-idea-is-not-the-most-important-project-1/).

* * *

_No matter how good backend solutions are hidden inside the application - user evaluates after what he sees outside. The success or failure of a website depends largely on its appearance. In this post I'll try to present you the topic of **material design** - principles currently recognized as trends in visual layer of the applications. I'll also show how, with a little effort, write a page that in the future will be the showcase of [our project](https://jakubwajs.wordpress.com/2017/05/09/the-idea-is-not-the-most-important-project-1/)._

* * *

### Nowoczesny design wg Google

Na początek kilka słów o dzisiejszym głównym bohaterze - **material design**. Większość z nas ma z nim do czynienia na co dzień, chociaż być może nie jest tego świadoma. Wystarczy włączyć aplikację Sklep Play. **M****aterial design to "styl projektowania"** (_ang. design language)_ opracowany w 2014 roku przez twórców wcześniej wspomnianego sklepu, czyli firmy **Google**. Z tego powodu najczęściej spotykany jest właśnie w ich produktach - np. Google Maps, Gmail.

* * *

### Modern design by Google

_To start with a few words about today's main character - **material design**. Most of us have contact with him on a daily basis, although he may not be aware of it. Just launch the Google Play app. **Material design is a design language**_ _developed in 2014 by Google. For this reason, it's most often found in their products - e.g. Google Maps, Gmail._

![material-design-example](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/mdesign-e1494798414779.png)

Material Design na przykładzie Map Google

_Material design in Google Maps_

Jakie są główne założenia? Twórcom zależało na zbudowaniu systemu, który pozwoli na jednakowe odczucia związane z użytkowaniem stron/aplikacji niezależne od urządzenia. Ma być **estetycznie, nowocześnie i przede wszystkim [responsywnie](https://pl.wikipedia.org/wiki/Responsive_Web_Design).** Nawet statyczne elementy stron mają sprawiać wrażenie ruchu. Niezwykle ważne są też **kolory**. Zaleca się umiejętne łączenie pastelowych barw. W tworzeniu odpowiednich kompozycji pomocne są palety, jak np. [ta](https://www.materialpalette.com/).

* * *

_What are the main rules? Developers wanted to build a system that would allow for consistent feel for the use of pages/applications independently of the device. It should be **aesthetically, modernly and above all [responsive](https://en.wikipedia.org/wiki/Responsive_web_design).** Even static page elements are supposed to give the impression of movement. **Colors** are also very important. It is advisable to skilfully combine pastel colors. Palettes such as [this](https://www.materialpalette.com/) are helpful in making the right compositions._

![md-principles](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/zrzut-ekranu-3-e1494798641395.png)

_[Material Design Principles](https://material.io/guidelines/material-design/introduction.html#introduction-principles)_

### Materialize

Implementacją **material design**, którą zdecydowałem się użyć w projekcie jest framework [Materialize](http://materializecss.com/). Udostępnia on kilkanaście gotowych CSS-owych i JS-owych komponentów, które można dodawać do swoich projektów w prawie niezmienionej formie. Dokładny opis każdego z dostępnych we frameworku elementów znajduje się pod wcześniej dodanym linkiem.

* * *

_The **material design** implementation which I decided to use in our project is [Materialize](http://materializecss.com/) framework. It provides a number of ready-made CSS and JS components that can be added to your projects in almost unchanged form. You can read a detailed description of each of the components available in the framework of the previously mentioned link._

![materialize-components](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/zrzut-ekranu-6-e1494799247728.png)

Lista gotowych komponentów w frameworku Materialize

_List of ready-made components in Materialize framework_

### Let's code!

Skoro wstęp teoretyczny mamy już za sobą, możemy w końcu zabrać się za tworzenie strony głównej naszego projektu. Za pomocą swojego ulubionego edytora (ja używam [Sublime](http://www.sublimetext.com/)) tworzymy szkielet pliku html, jak w przykładzie poniżej.

* * *

_Since the theoretical introduction is already over, we can finally get started on creating our project homepage. Using your favourite text editor (I use [Sublime](http://www.sublimetext.com/)) we create a backbone of a html file, as in the example below._

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Football App</title>
  </head>
  <body>
    <h1>Hello!</h1>
  </body>
</html>
```

Teraz należy dołączyć framework Materialize do pliku _index.html._ Można to zrobić na kilka sposobów (dokładny opis [tutaj](http://materializecss.com/getting-started.html)). Dla własnej wygody wybrałem najprostszy i najszybszy - bez pobierania żadnych plików, z wykorzystaniem **bibliotek online**. Należy dołączyć linki do nich ze strony (zawarte na stronie [cdnjs.com](https://cdnjs.com/libraries/materialize)), osobno dla pliku CSS (w sekcji _head_) i JS (na końcu sekcji _body_).

* * *

_Now we need to attach the Materialize framework to the_ index.html _file. You can do this in several ways (the exact description [here](http://materializecss.com/getting-started.html)). For my convenience I chose the easiest and quickest - without downloading any files, just using **online libraries**. Include links from [cdnjs.com](https://cdnjs.com/libraries/materialize) to these libraries in_ index.html _file, separately for CSS (in_ head _section) and JS (__at the end of_ body _section)._

```html
<!DOCTYPE html>
<html>
<head>
 <title>Football App</title>
 <!-- Compiled and minified CSS -->
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
</head>
<body>
 <h1>Hello!</h1>
 <!-- Compiled and minified JavaScript -->
 [https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js](https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js)
</body>
</html>
```

I... to wszytko. Jeśli poprawnie dołączyliśmy linki, po otwarciu pliku _index.html_ w przeglądarce, powinniśmy zobaczyć wystylowany w Materialize napis "_Hello!"._ Poniżej możecie zobaczyć porównanie (po lewej z Materialize, po prawej czysty plik html).

* * *

_And... that's all. If we correctly include the links we should see Materialize style "Hello!" text after opening_ index.html _file in the browser. You can see a comparision below (left - with Materialize, right - clean html file)._ 

![without-materialize](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/before2-e1494851546358.png)

### Pasek nawigacji i stopka

Ważnym elementem każdej nowoczesnej aplikacji internetowej jest pasek nawigacji. Z jego poziomu możemy w szybki sposób dostać się do interesującej nas podstrony lub funkcji, jak np. logowanie do serwisu czy wyszukiwarka treści. W naszej aplikacji pasek nawigacji (na ten moment) będzie zawierał:

- **Podstrony:** Best, All
- **Panel użytkownika:** dodawanie nowego linku, logowanie/rejestracja, wyszukiwarka treści

Materialize udostępnia kilka gotowych typów pasków nawigacji. Znajdziemy je w zakładce _Components -> Navbar._ Jako najbardziej dopasowany do potrzeb naszej aplikacji wybrałem szablon [Extended Navbar with Tabs](http://materializecss.com/navbar.html). Skopiujmy jego kod i dodajmy do sekcji _head_ w pliku _index.html._

* * *

### Navigation bar and footer

_An important element of any modern web application is the navigation bar. From its level we can quickly get to the subpage or function we are interested in, such as e.g. login or content search. In our application, the navigation bar (for this moment) will include:_

- _**Subpages:** Best, All_
- _**Users panel:** add new link, login/register, search_

_Materialize provides several ready-made types of navigation bars. We can find them in_ Components -> Navbar _bookmark. As the most adapted to the needs of our application I chose a [Extended Navbar with Tabs](http://materializecss.com/navbar.html) template. Let's copy his code and add it to the_ head _section of the_ index.html _file._

![without-jquery](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/without-jquery1-e1494859670727.png)

Jak widać powyżej, nasz pasek nawigacji nieco różni się od przykładu ze strony Materialize. Treść "Test 1", "Test 2"... znajduje się w tej samej zakładce. Również kliknięcia myszą w odnośniki nie powodują reakcji. Dzieje się tak, ponieważ Materialize potrzebuje biblioteki [JQuery](https://jquery.com/) do prawidłowego działania zawartych w nim skryptów. Musimy zatem dodać odpowiedni odnośnik przy końcu sekcji _body_ w pliku _index.html_ (lecz **przed** linkiem do skryptów Materialize!).

* * *

_As you can see above, our navigation bar is a bit different from the example on the Materialize page. Content "Test 1", "Test 2" ... is in the same tab. Also clicking the mouse in the links doesn't cause a reaction. This is because Materialize needs a [JQuery](https://jquery.com/) library to proper scripting. We need to add a link at the end of the body section in the_ index.html _file (but **before** the Materialize link!)._

 <!-- JQuery -->
 [https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js](https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js)

Teraz pozostało nam dostosowanie paska nawigacji do naszych potrzeb poprzez zmianę nazw i ilości etykiet. Po tych modyfikacjach kod prezentuje się jak poniżej:

* * *

_We have now left the navigation bar to our needs by changing the name and number of labels. After these modifications, the code is shown as below:_

![navbar-after-modifications](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/navbar-e1494864989984.png)

Analogicznie jak pasek nawigacji dodajemy stopkę [stąd](http://materializecss.com/footer.html). Zmieniamy też treść w poszczególnych jej elementach. W miejscu _Links_ zaplanowałem listę najpopularniejszych kategorii, natomiast przy _Copyright_ dodajemy własne dane. _Footer content_ na razie pozostawiamy bez zmian.

Teraz przyszedł czas na modyfikację kolorystyki dodanych przez nas elementów. Obecny odcień raczej niezbyt pasuje do piłkarskiej tematyki aplikacji. Używając klas zdefiniowanych w zakładce _CSS -> [Colors](http://materializecss.com/color.html)_ możemy zmieniać kolor wybranych elementów strony wg składni:

* * *

_Similarily to the navigation bar add a footer from [here](http://materializecss.com/footer.html). We also change the content of each of its elements. For the place of_ Links _I planned to add a list of most popular categories, while at the_ Copyright _we add our own data._ Footer content _leave unchanged._

_Now it's time to change color of recently added elements. The current hue doesn't match the football theme of the app. Using classes defined in_ CSS -> [Colors](http://materializecss.com/color.html) _bookmark we can change color of chosen elements by syntax:_

```html
<page_element class="color tone-number">
(...)
</page_element>
```

Przykład/_Example_:

```html
<footer class="page-footer grey darken-3">
(...)
</footer>
```

![color-pallette](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/color-pallette-e1494867939885.png)

Fragment dostępnej w Materialize palety kolorów

_Part of color pallette available in Materialize_

### ![stage-one](/assets/images/2017/05/first-webpage-with-materialize-project-2/images/football-app-e1494868150631.png)Ciąg dalszy nastąpi...

Na tym etapie zakończymy dziś pracę nad stroną. Mam nadzieję, że ilość informacji zawartych powyżej Was nie przytłoczyła.;) Zachęcam do śledzenia postępów prac w kolejnych postach. Cześć!

* * *

### To be continued...

_At this stage we finish work on the page for today. I hope the amount of information contained above didn't overwhelm you.  I encourage you to keep track of progress in subsequent posts. Bye!_

* * *

Kod projektu/_Project source code:_

- [GitHub](https://github.com/kubawajs/FootballApp)

Źródła/_Sources_:

- [Material design](https://material.io/guidelines/)
- [Materialize](http://materializecss.com/)
