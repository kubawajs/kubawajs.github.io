---
title: "Angular for printing list of objects - Project #4"
description: ""
publishDate: 2017-06-06T00:00:00Z
tags: 
  - "angular"
  - "html"
  - "javascript"
  - "project"
  - "webdev"
img: "/assets/images/2017/06/angular-for-printing-list-of-objects-project-4/images/zrzut-ekranu-17-e1496701271469.png"
img_alt: ""
---

W poprzednim poście zbudowaliśmy prawie kompletną stronę główną naszej aplikacji futbolowej. Niestety, jak na razie nie umożliwia jakiejkolwiek interakcji z użytkownikiem. Dane, które się na niej znajdują, zdefiniowanę są "na sztywno" w kodzie html. Pora to zmienić - zaczniemy od wypisywania listy linków za pomocą Angulara.

* * *

_In the previous post we built almost complete homepage of our football application. Unfortunately, so far it doesn't allow any interaction with user. The data that's on it is defined as "rigidly" in the html code. It's time to change it - we'll start by listing a list of links using Angular._

![AngularShieldLogo](/assets/images/2017/06/angular-for-printing-list-of-objects-project-4/images/angularshieldlogo.png)

### [AngularJS](https://angularjs.org/)

W ostatnim czasie javascript bije rekordy popularności. Duża w tym zasługa co raz to nowych frameworków, które oferują bardzo rozbudowane opcje tworzenia aplikacji internetowych. Jednymi z najbardziej znanych są np. [React](https://facebook.github.io/react/) i Angular. W naszej aplikacji użyjemy tego drugiego.

Angular, podobnie jak wspominane w poprzednich postach zasady Material Designu, firmowany jest przez Google. Powstał w celu dostosowania statycznych plików HTML do wymagań stawianych przez nowoczesne, dynamiczne aplikacje internetowe. Umożliwia zbudowanie serwisu zgodnie z zasadami wzorca [MVC](https://pl.wikipedia.org/wiki/Model-View-Controller) (o którym kiedyś postaram się napisać więcej). Z czasem ewoluował on do charakterystycznego dla Angulara MVW - Model View Whatever.

W dzisiejszym poście wykorzystamy tylko kilka podstawowych funkcji tego frameworka.

* * *

_In recent times, javascript is beating popularity records. This is largely due to new frameworks, which offers very elaborate options for developing web applications. One of the most famous are [React](https://facebook.github.io/react/) and Angular. In our app we'll use the second of them._

_Angular, like the Material Design principles mentioned in one of recent posts is promoted by Google. It was created to customize static HTML files to requirements of modern, dynamic web applications. It allows you to develop the app according to MVC pattern (about which I want to write more one time). Over time, it evolved into typical for Angular MVW - Model View Whatever pattern._

_In today's post we'll use only few of basic functions of this framework._

### Przygotowanie szablonu / Creating template

W wersji aplikacji utworzonej w poprzednim poście, przygotowaliśmy listę linków złożoną z kilku skopiowanych fragmentów HTML z przykładowymi danymi. Następnym krokiem jest przygotowanie szablonu karty, do którego dodawane będą prawdziwe informacje pobrane z bazy danych aplikacji. W tym celu usuwamy z pliku _index.html_ powielone fragmenty kodu pozostawiając tylko jeden (fragment pomiędzy komentarzami _Card 1_ a _Card 2_).

* * *

_In the version of app created in the previous post, we've prepared list of links consisting of several copied HTML fragments with sample data. The next step is to prepare a card template to which the real information retrieved from the application database will be added. For this purpose, we remove the duplicated code from the_ index.html _file, leaving only one (a fragment between_ Card 1 _and_ Card 2 _comments)._

![card-template](/assets/images/2017/06/angular-for-printing-list-of-objects-project-4/images/template-e1496693904317.png)

### Angular w akcji / Angular in action

Jak dotąd nasza aplikacja nie zawiera żadnego backendu, dlatego listę, która wypisywana będzie za pomocą Angulara, zdefiniujemy za pomocą tablicy JSON. Dzięki temu przygotujemy szablon do wypisywania linków w pliku HTML, a listę z pliku js w późniejszym czasie będziemy mogli podmienić na tą pobieraną z bazy danych.

Zaczynamy od utworzenia folderu js w folderze projektu. Dodajemy do niego plik _footballApp__.js_, a następnie otwieramy go w edytorze.

* * *

_Our application doesn't have any backend yet, so the list that will be printed using Angular we'll define as JSON array. Thanks to this we'll prepare the template for printing links in HTML file and we'll be able to replace in the future the list from js file into list downloaded from application database._

_We start by creating_ _folder called_ js _in project folder. We add_ footballApp.js _to it and open it in the text editor._

![folder-tree](/assets/images/2017/06/angular-for-printing-list-of-objects-project-4/images/zrzut-ekranu-15-e1496694395200.png)

Angular ma modułową budowę. Znaczy to mniej więcej tyle, że każdy z komponentów odpowiada za inną część aplikacji. _Moduł_ jest pojemnikiem na _kontrolery_ - elementy służące do kontrolowania danych w obrębie aplikacji, a także interakcji z użytkownikiem.

Wewnątrz utworzonego pliku _footballApp.js_ tworzymy nowy moduł komendą _angular.module_. Następnie definiujemy dla niego kontroler o nazwie _linkController_, który będzie odpowiedzialny za dostarczanie danych do wcześniej poprawionego szablonu karty w pliku _index.html_.

* * *

_Angular has modular construction. It means that each of components is responsible for another part of application._ Module _is container for_ controllers _- elements used to control the data inside Angular apps and to interact with the user._

_Inside_ footballApp.js _file we create new module by command_ angular.module_. Next we define controller for this module called_ linkController_, which will be responsible for providing data to card template inside_ index.html _file._

```javascript
var app = angular.module('footballApp', []);

app.controller('linkController', function($scope) {
// controller content
});
```

Teraz należy utworzyć kontener danych po stronie aplikacji Angularowej. Wykorzystamy w tym celu popularny format [JSON](https://pl.wikipedia.org/wiki/JSON). Opiera się on na bardzo intuicyjnej zasadzie _klucz-wartość_ (ang. _key-value_) - jeśli ktoś z Was używał kiedyś np. słowników w Pythonie powinien od razu zrozumieć, o co chodzi. ;)

"Kluczami" dla naszego zbioru danych będą informacje zawarte w karcie dla każdego z linków, czyli: tytuł, link, opis, głosy oraz liczba komentarzy.

* * *

_Now we have to create a container on Angular application side. We'll use [JSON](https://en.wikipedia.org/wiki/JSON) file format for this. It is based on the very intuitive_ key-value _principle - if one of you used e.g. Python dictionaries should immedietely understand how it works. ;)_

_The "keys" for our data set will be the information contained in the card for each link, namely: title, link, description, votes and number of comments._

```javascript
linksList = [
  { 
    "title" : "Valverde nowym trenerem Barcelony!", 
    "link" : "http://footroll.pl/valverde-nowym-trenerem-barcelony/",
    "description" : "Ernesto Valverde zastąpił Luisa Enrique na stanowisku trenera FC Barcelony.",
    "votes" : 120,
    "numOfComments" : 32
  },
  {
    "title" : "Lotto Ekstraklasa: Tabela po 36. kolejce.", 
    "link" : "https://sportowefakty.wp.pl/pilka-nozna/690300/lotto-ekstraklasa-tabela-po-36-kolejce-legia-nadal-liderem-co-za-emocje",
    "description" : "Legia nadal liderem! Co za emocje! Cztery prowadzące drużyny wygrały w niedzielę swoje mecze i przed ostatnią kolejką ciągle nic w lidze nie wiadomo!",
    "votes" : 98,
    "numOfComments" : 15
  },
  {
    "title" : "'Bezbłędna tabela', czyli jak wyglądałaby Ekstraklasa bez błędów sędziów", 
    "link" : "http://www.gol24.pl/ekstraklasa/a/bezbledna-tabela-czyli-jak-wygladalaby-ekstraklasa-bez-bledow-sedziow-36-kolejka,12126244/",
    "description" : "W niedzielę zakończyła się przedostatnia kolejka Ekstraklasy. Wielką pomyłkę popełniła w Gdyni sędziowska ekipa Tomasza Musiała, uznając bramkę, którą ręką zdobył Rafał Siemaszko.",
    "votes" : 44,
    "numOfComments" : 22
  }
];
```

Mamy gotowe źródło danych, jednak nadal nie jest ono dostępne z poziomu strony głównej. Do "związania" javascriptowego kontrolera z plikiem HTML służy obiekt _scope_. Każdy element, który chcemy, aby był dostępny w widoku, należy dodać do _scope_ danego kontrolera.

* * *

_We have a data source ready, but it's still not available from the homepage. To "bind" javascript controller to HTML file is used the_ scope _object. Each element that we want to be available in the view must be added to the controller's scope._

```javascript
$scope.linksList = [
...
];
```

### Angular w HTML / Angular in HTML

Przygotowaliśmy już kontroler do obsługi naszego tymczasowego źródła danych. Teraz przyszła pora na ich wyświetlenie w przeglądarce. Zaczynamy od dodania Angulara i stworzonego przez nas modułu do skryptów naszej strony, w sposób analogiczny jak wcześniej JQuery i Materialize.js.

* * *

_We have already prepared a controller to support our temporary data source. Now it's time to display them in the browser. We start by adding Angular and_ footballApp.js _file to page scripts in the same way as before JQuery and Materialize.js_

<!-- AngularJS -->
[https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js](https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js)
[http://js/footballApp.js](http://js/footballApp.js)

W następnym kroku należy podpiąć odpowiednią aplikację Angularową do fragmentu widoku, który ma obsługiwać. Framework udostępnia szereg dyrektyw, które służą do zarządzania danymi po stronie HTML. Aby wykorzystać aplikację używamy _ng-app_ i nazwy komponentu, który chcemy dołączyć. U nas jest to oczywiście _footballApp_.

* * *

_In the next step we should bind appropriate Angular app to part of view it should operate on. The framework provides a number of directives for managing HTML data. To use the application we use_ ng-app _and component name that you want to include. In our case this is obviously_ footballApp_._

```html
<main class="container" ng-app="footballApp">
```

Teraz do panelu, w którym znajduje się szablon karty, który mamy wypełnić danymi, dodajemy kontroler. Używamy do tego celu dyrektywy _ng-controller_.

* * *

_Now, to the panel that contains the card template, which we want to fill in with the data, we add a controller. We use_ ng-controller _directive for this purpose._

```html
<!-- Link panel -->
<div class="container col s12 m12 l9" ng-controller="linkController">
```

Pozostaje związać wybrany składnik kontrolera z danym fragmentem kodu HTML. W naszym przypadku tym elementem jest kontener _linksList_. _LinksList_ jest listą, dlatego musimy zastosować pętlę wypisującą jej wszystkie elementy. Stosuje się do tego celu dyrektywę _ng-repeat_, w odniesieniu do fragmentu kodu, który chcemy powtórzyć - u nas jest to szablon karty. Składnia tej dyrektywy jest nieco bardziej skomplikowana: najpierw podajemy element, do którego ma być zrzutowany aktualnie przetwarzany składnik listy, następnie słowo kluczowe _in_, a na końcu nazwę kontenera danych.

* * *

_It remains to bind the selected controller component to a particular piece of HTML code. In our case, this element is the_ linksList _container._ LinksList _is a list, so we need to use a loop to print all its elements. The_ ng-repeat _directive applies to this, in relation to the part of code we want to repeat - this is a card template for us. The syntax of this directive is a bit more complicated: first, we give the item to which the currently processed list item is to be dumped, then the_ in _keyword, and finally the data container name._

```html
<!-- Card Template -->
<div class="card blue-grey lighten-5" ng-repeat="link in linksList">
```

Na tym etapie mamy już dostęp do wszystkich składników przetwarzanego elementu listy _linksList_. Możemy się do nich odwołać przez użycie kropki i klucza interesującego nas segmentu, np. _{{ link.title }}_ dla tytułu lub _{{ link.description }}_ dla opisu. W odmienny sposób należy wiązać linki - do tego celu służy dyrektywa _ng-href_ zamiast zwykłego _href_.

* * *

_At this stage we already have access to all components of the processed_ linksList _item. We can refer to them by using dot and key of the component we are interested in, e.g._ {{ link.title }} _for title or_ {{ link.description }} _for description. The links should be bound in a different way - for this purpose_ ng-href _directive is used instead of the usual_ href_._

```html
<a ng-href="{{ link.link }}" class="light-green-text text-darken-3"><h5>{{ link.title }}</h5></a>
```

Pozostaje tylko podmienić statyczne fragmenty tekstu na składniki elementów listy i... gotowe! Nasza aplikacja pobiera już informacje w formacie JSON i wypisuje je z wykorzystaniem szablonu HTML.

* * *

_We only have to change the static parts of the text into elements of the list and... that's all! Our application already retrieves information in JSON and prints it using HTML template._

![after-angular](/assets/images/2017/06/angular-for-printing-list-of-objects-project-4/images/zrzut-ekranu-16-e1496699842931.png)

Przedstawiony tutorial pokazuje tylko niewielką część możliwości jakie daje framework Angular. Jak zwykle zachęcam do pogłębiania wiedzy we własnym zakresie i zachęcam do obserwowania dalszego rozwoju naszego projektu! ;)

Przypominam, że cały kod aplikacji możecie na bieżąco śledzić w [repozytorium Github](https://github.com/kubawajs/FootballApp).

* * *

_This tutorial shows only a small part of opportunities that Angular gives. As usual, I encourage you to deepen your knowledge and to observe the further development of our project! ;)_

_I remind you that you can keep track of all application code in the [Github repository](https://github.com/kubawajs/FootballApp)._
