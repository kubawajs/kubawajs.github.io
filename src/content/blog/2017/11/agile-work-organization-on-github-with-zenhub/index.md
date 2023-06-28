---
title: Agile work organization on github with Zenhub
description: Overcoming the challenges of project management in remote teams is a daunting task, particularly when relying on traditional tools like sticky notes. Discover Zenhub, a cost-effective solution tailored for open source projects, empowering distributed developers with seamless collaboration.
publishDate: 2017-11-18T00:00:00Z
tags:
  - "agile"
  - "programming"
  - "git"
  - "kanban"
  - "project-management"
  - "zenhub"
img: "/assets/images/2017/11/agile-work-organization-on-github-with-zenhub/images/zenhub-e1507929134847.png"
img_alt: ""
---

Dużym wyzwaniem podczas realizacji projektów, nawet w niewielkich teamach jest odpowiednie zorganizowanie pracy. Od wielu lat powszechnie stosowanym rozwiązaniem są karteczki. Pomimo wielu zalet, trudno wykorzystać je w zespołach skladających się z deweloperów pracujących z różnych miejsc na świecie. Oczywiście istnieje wiele alternatyw w postaci aplikacji, jednak najczęściej są kosztowne. Darmowym (dla projektow opensource) rozwiązaniem tego problemu jest Zenhub.

* * *

_It's a big challenge to carry out projects, even in small teams. Form many years, sticky notes are the most frequently used solution. Despite many advantages, it's difficult to use them in teams consisting developers working from different locations. Of course, there's a lot of applications for this purpose, but most often they're very expensive. Free (for open source projects) solution of this problem is app called Zenhub._

![features](/assets/images/2017/11/agile-work-organization-on-github-with-zenhub/images/features-e1508014043603.png)

Zenhub posiada wszystkie zalety "karteczkowego" kanbana - pozwala na dodawanie zadań, podpinanie ich jako elementy składowe większych funkcjonalności (tzw. _epics_ lub _milestones_) oraz do poszczególnych release'ow. Na tablicy możemy na bieżąco śledzic stan realizacji zadań oraz przypisywać ich wykonawców.

* * *

_Zenhub has all of  the advantages of a kanban board - you can add new issue, link them as elements of larger feature (called epics or milestones) or directly to release. On the board you can keep track of the state of the tasks and assign their contractors._ 

* * *

Instalacja [Zenhub](https://github.com/marketplace/zenhub) jest bardzo prosta. Działa jako rozszerzenie do przeglądarki - gdy raz go zainstalujemy, automatycznie będzie uruchamiany po wejściu na profil github. Na pierwszy rzut oka różnic jest niewiele - do paska zakładek dodano dwie nowe: _Reports_ oraz _B__oards_. Pierwsza z wymienionych zawiera szereg wykresów monitorujących pracę zespołu. Drugą kartę w całości zajmuje elektroniczny kanban. Można dopasowywać go do własnych wymagań, np. poprzez dodawanie nowych kolumn, wyznaczając tym samym workflow projektu.

* * *

_Installation of [Zenhub](https://github.com/marketplace/zenhub) is very simple. It works as browser extension - once installed, it'll automatically launch every time you enter your github repo. At first glance there are few differences - two new tabs were added to bookmarks:_ Reports _and_ Boards. _The first one contains a number of charts that monitor work of the team. Second tab is entirely occupied by the electronic kanban. You can adjust it to your own requirements, eg. by adding new columns, thus defining the project workflow._

![zenhub-diff](/assets/images/2017/11/agile-work-organization-on-github-with-zenhub/images/zenhub-diff.png)

Ciekawą opcją jest integracja dodawanych commitów z zadaniami już w momencie wrzucania zmian do repozytorium. Dodanie w treści wiadomości numeru zadania poprzedzonego hashem powoduje automatyczne podpięcie go pod zadanie oznaczone tym numerem. Dzięki dołączeniu słowa _resolve_, można dane zadanie zakończyć, co spowoduje przeniesienie "karteczki" na tablicy w odpowiednie miejsce.

* * *

_An interesting option is to integrate added commits with tasks already at the time of pushing changes to the repository. Adding task number preceded by hash in commit message automatically attaches it to the issue marked with this number. By including the word_ resolve _you can end the task, which will move the "sticky" on the board to the appropriate place._

![zenhub-before-resolve](/assets/images/2017/11/agile-work-organization-on-github-with-zenhub/images/before-resolve-e1511031282225.png?w=545)

git commit -m "Commit message with number of issue and phrase resolve #3"

![after-resolve](/assets/images/2017/11/agile-work-organization-on-github-with-zenhub/images/after-resolve-e1511031385545.png)
Po wrzuceniu zmian do repozytorium z odpowiednią wiadomością, zadanie zostaje automatycznie przeniesione do odpowiedniej kolumny na tablicy.

Sam korzystam z Zenhub i uważam, że świetnie sprawdza się w zarządzaniu niewielkimi projektami (np. akademickimi). Co ważniejsze, uczy pracy w zespole i zasad zwinnego wytwarzania oprogramowania, co może stanowić cenne doświadczenie przy szukaniu pracy.

* * *

_I use Zenhub and in my opinion it works great for managing small projects (eg academic). What's more important, it teaches teamwork and basic principles of agile software development, which can be a valuable experience when looking for a job._

* * *

Źródła / _Sources_:

- [Zenhub](https://www.zenhub.com/)
