---
title: "Grid in Materialize - Project #3"
description: Manage the customization of content to the size of the screen on which the page is opened with Materialize's grid.
publishDate: 2017-05-20T00:00:00Z
tags: 
  - "css"
  - "html"
  - "material-design"
  - "materialize"
  - "petproject"
img: "/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-9-e1495302679574.png"
img_alt: ""
---

Dzisiejszy post poświęcony będzie dopracowywaniu strony, której budowę rozpoczęliśmy w [poprzednim poście](https://jakubwajs.wordpress.com/2017/05/15/first-webpage-with-materialize-project-2/). Wyjaśnię także, w jaki sposób można zarządzać dostosowywaniem treści do rozmiaru ekranu, na którym strona jest otwierana, czyli tzw. **gridem**.

* * *

_Today's post will be devoted to refining the website, whose construction we started in the [previous post](https://jakubwajs.wordpress.com/2017/05/15/first-webpage-with-materialize-project-2/). I will also explain how you can manage the customization of content to the size of the screen on which the page is opened, so called **grid**._

### Tło strony i własny arkusz stylów

We wcześniejszych pracach korzystaliśmy tylko z przygotowanych w Materialize arkuszy stylów. Pomimo ogromnych możliwości, jakie one oferują, pewne rzeczy musimy zdefiniować sami, za pomocą **osobnego pliku CSS**. Naszej stronie nadal brakuje wielu istotnych z wizualnego punktu widzenia elementów. Jednym z nich, który w znaczący sposób poprawi jej wygląd jest tło. Dobrym pomysłem byłoby również przytwierdzenie stopki do dołu strony. Właśnie te modyfikacje wprowadzimy za pomocą własnego arkusza stylów.

* * *

### Page background and own style sheet

_In earlier work we used only the Materialize style sheets. Despite the great possibilities they offer, some things we have to define ourselves, using **separate CSS file**. Our website still lacks many important visual elements. One that significantly improve its appearance is the background. It would be a good idea to also stick the footer to the bottom of the page. We'll make these modifications using our own style sheet._



Ważne jest, aby od początku zachowywać porządek w projekcie. Stwórzmy więc osobne foldery na arkusze stylów (_css_) i obrazy (_img_). Najpierw wyszukujemy obraz, który chcemy umieścić w tle strony. Do tego celu polecam stronę [pexels.com](http://pexels.com) - zawiera dość dużą bazę darmowych grafik, które można wykorzystywać również w celach komercyjnych. Należy zwrócić uwagę na **rozdzielczość używanych obrazów** \- im wyższa, tym większy rozmiar pliku, a tym samym **dłuższy czas ładowania strony**. Pobraną grafikę umieszczamy w folderze _img_.

* * *

_It's important to keep order in the project files from the beginning. So, let's create separate folder for style sheets (_css_) and images (_img_). First, we look for the image we want to put in the background of the page. For this purpose I recomment [pexels.com](https://www.pexels.com/) - it contains quite a large database of free graphics, which can also be used for commercial purposes. Pay attention to the **resolution of used images** \- the higher the larger the file size, and thus **the longer the page load time**. We put the downloaded graphic in the_ img _foleder._

![pexels-tut](/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-7-e1495059715783.png)

Kolejnym krokiem jest utworzenie pliku _mystyles.css_ w folderze _css_. Za jego pomocą dodamy obraz z folderu _img_ na tło naszej strony. Nie jest to trudne zadanie - wystarczy dodać do pliku poniższe kilka linii kodu. Przy okazji dodałem też fragment służący do przyklejenia stopki do dołu strony - używamy do tego [flexboxa](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

* * *

_The next step is to create_ mystyles.css _file in_ css _folder. With it we'll add an image from the_ img _folder to the background of our site. This isn't a difficult task - just add a few lines of code shown below. By the way, I've also added a section to stick the footer to the bottom of the page - we use a [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to this._

```css
body {
 display: flex;
 height: 100vh;
 flex-direction: column;
 background: url("../img/background.jpeg") no-repeat center center fixed;
 -webkit-background-size: cover;
 -moz-background-size: cover;
 background-size: cover;
}

main {
 flex: 1 0 auto;
}
```

### Grid

Zanim zabierzemy się za dodawanie kolejnych elementów do strony, powinniśmy wyjaśnić sobie, w jaki sposób można zarządzać układem treści na ekranie przeglądarki za pomocą klas w Materialize. Zbudowany jest on z trzech głównych elementów: **kontenerów** (_ang._ _container_),  **rzędów** (_ang. rows_) i **kolumn** (_ang. columns_).

Pierwszy z wymienionych w praktyce nie jest fragmentem gridu, jednak jest ważny z punktu widzenia układu elementów na stronie. Domyślnie zajmuje ~70% szerokości obszaru. Jeśli chcemy, aby zajmował całą szerokość strony należy użyć klasy _container-fixed_. Wewnątrz kontenera umieszczamy **rzędy**. Są niezbędne, ponieważ umożliwiają dzielenie znacznika posiadającego tą klasę na **kolumny_._** 

Każdy rząd ma **12 kolumn równej wielkości**. Dozwolone są dowolne modyfikacje szerokości naszego "pojemnika" wewnątrz rzędu - możemy np. utworzyć trzy elementy umieszczone obok siebie, jak w przykładzie poniżej.

* * *

_Before we take on adding more elements to the page, we should explain how you can manage the content layout on your browser using the Materialize classes. It is built of three main elements: **containers, rows** and **columns**__._

_First of them in the practice isn't a grid fragment, but it's important from the layout point of view. By default it occupies ~70% of browser width. If we want it to occupy the entire page width, use the_ container-fixed _class. Inside the container we place **rows**. They're necessary because they allow you to divide the tag of that class into **columns**._

_Each row has **12 columns of equal size**. Any modifications of the width of our "container" within a row are allowed - e.g. we can create three elements placed next to each other, as in the example below._

![promo-example](/assets/images/2017/05/grid-in-materialize-project-3/images/promo-e1495299283288.png)

```html
<div class="row">
  <div class="col s4">
    <!-- Promo Content 1 goes here -->
  </div>
  <div class="col s4">
    <!-- Promo Content 2 goes here -->
  </div>
  <div class="col s4">
    <!-- Promo Content 3 goes here -->
  </div>
</div>
```

Co ciekawe, rzędy można w sobie **zagnieżdżać**. To znaczy, że jeśli wewnątrz _diva_ o szerokości 4 kolumn, utworzymy rząd, to znów mamy do dyspozycji 12 kolumn.

* * *

_What's interesting, rows can **nest** within themselves. This means that if we create a row inside the_ _4-columns_ div_, we have 12 columns available._

![nested-columns-example](/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-4-e1495301492807.png)

![html-nested-columns](/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-8-e1495301850863.png)

Jednak jak to się wszystko ma do **responsywności** stron? Otóż w Materialize mamy dostępne 4 klasy szerokości ekranu:

- **.s** \- _small -_ ekrany **<= 600px** szerokości
- **.m** _\- medium -_ **\> 600px**
- **.l** \- _large_ - **\> 992px**
- **.xl** \- _extra large -_ **\> 1200px**

Stosując je możemy ustalić odmienny układ kolumn w zależności od szerokości urządzenia, na którym strona jest wyświetlana. Dzięki temu nasza strona jest przejrzysta na ekranach monitorów i jednocześnie czytelna na telefonach i tabletach.

Więcej informacji na temat gridu w Materialize znajdziesz [tutaj](http://materializecss.com/grid.html).

* * *

_But how does it all come about to the **responsiveness** of websites? In Materialize, we have 4 device-width classes:_

- **.s** \- _small - screens **<= 600px** width_
- **.m** _\- medium - **\> 600px**_
- **.l** \- _large - **\> 992px**_
- **.xl** \- _extra large - **\> 1200px**_

_By using them, we can determine a different layout depending on the width of the device on which page is displayed. This makes our website look clear on the monitors screens and is easily readable on smartphones and tablets._

_More informations about Materialize grid you can find [here](http://materializecss.com/grid.html)._

### Layout naszej strony

Na koniec zastosujmy zaprojektowany przez nas grid do naszej strony i dodajmy kontenery z treścią. Na dużych ekranach wybrałem układ z dodawanymi linkami o szerokości **9 kolumn oraz 3 kolumny** szerokości dla _Ostatnio popularnych_ i _Chmury tagów_. Na średnich i małych ekranach przechodzi on natomiast w układ **o całej szerokości**. Przykłady jak wygląda strona na poszczególnych urządzeniach możecie zobaczyć poniżej.

* * *

### Our website layout

_Finally, let's apply the layout we designed to out site and add content containers. On large screens I chose layout with **9-column links and 3-columns** widths for_ Latest popular _and_ Tag cloud. _On medium and small screens it goes into a layout with the **entire width**. Examples of how page looks like on individual devices can be seen below._ 

![layout-hd](/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-9-e1495302679574.png)

_1920 x 1080_

![ipad-layout](/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-10-e1495302851716.png)

_768 x 1024_

![iphone-layout](/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-11-e1495303031170.png)

_414 x 736_

**Podpowiedź:** jeśli chcesz zobaczyć jak Twoja strona wygląda na różnych urządzeniach, w przeglądarce Google Chrome możesz zrobić to wykorzystując _Narzędzia dla programistów_ (Ctrl + Shift + I). Następnie kliknij _Toggle Device Toolbar_. Z menu rozwijanego możesz wybrać urządzenie, które Cię interesuje.

* * *

_**Hint:** if you want to see how your site looks on different devices, you can do this in Google Chrome using_ Developer Tools _(Ctrl + Shift + I). Next click on_ Toggle Device Toolbar _button. From the dropdown menu you can select the device that interests you._

![Toggle-device-toolbar](/assets/images/2017/05/grid-in-materialize-project-3/images/zrzut-ekranu-121-e1495303769411.png)

Jak mogliście zobaczyć powyżej, przygotowałem już gotowe kontenery na linki, zawierające: **liczbę głosów, ikony do głosowania, tytuł, opis, liczbę komentarzy oraz datę publikacji** (jak na razie statyczne). Do ich budowy korzystałem tylko z Materialize. Zachęcam i Was do spróbowania samodzielnego modelowania. W razie problemów zawsze możecie zajrzeć do [repozytorium z kodem źródłowym](https://github.com/kubawajs/FootballApp).

**Powodzenia!**

* * *

_As you could see above, I've prepared ready-made containers with: **number of votes, icons for voting, title, description, number of comments and pubblication date** (only static so far). I only used Materialize for their construction. I encourage you to try modelling by yourself.  In case of problems, you can always look at the [source code repository](https://github.com/kubawajs/FootballApp)._

**Good luck!**
