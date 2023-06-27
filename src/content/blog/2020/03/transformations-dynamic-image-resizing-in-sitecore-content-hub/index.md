---
title: Transformations - dynamic image resizing in Sitecore Content Hub
description: Enhance your image embedding capabilities with Sitecore DAM's transformations, enabling responsive resizing of renditions to cater to different device sizes seamlessly.
publishDate: 2020-03-21T00:00:00Z
tags:
  - "dam"
  - "sitecore"
  - "sitecore-content-hub"
img: "/assets/images/2020/03/transformations-dynamic-image-resizing-in-sitecore-content-hub/images/transformations4.png"
img_alt: ""
---

**As you may know, in the Sitecore Content Hub you can define multiple renditions **with specific sizes** for each asset and then create public links to access them. However, public links to versions of the same resource contain a randomly generated part, and having a link to one of the renditions, you cannot predict a url of a different rendition. Even if it was possible, it could cause some problems if there was no public link for the requested rendition. But what if you need to embed the image on the page, but in different sizes for various devices? The solution to this problem are the so-called transformations, **that allow you to resize the requested renditions _on the fly_.**** **It is the Sitecore DAM implementation of the responsive image concept.**

Transformations work just as resizable links in the Sitecore XP - using query parameters in the image url. Unlike them, you can't generate every image size you request in the url, but only those that are defined in the configuration. Out of the box, Sitecore Content Hub provides 5 predefined transformations. You can check the list of them by visiting _Transformations_ page in the _Manage_ panel.

![](https://jakubwajs.files.wordpress.com/2020/03/transformations.png?w=1024)

List of default transformations available ootb with Sitecore Cotent Hub.

This functionality, however, would not be so useful, if you could not create your own transformations with a fixed size of the dynamically generated image. You can add your custom transformation by clicking on the + icon in the top right corner of _Transformations_ page. Enter values for necessary parameters - width and height of generated transformation and its name. And thats it - after clicking on _Create_ button your transformation is available. What's more, it will work not only for newly created public links but also for the older ones!

![](https://jakubwajs.files.wordpress.com/2020/03/transformations2.png?w=1024)

New transformation popup.

To test the transformation you created, select asset and generate a public link for it. Then open it in the browser and at the end of public link url add the _t=_ parameter with the name of transformation to access image generated for chosen transformation. Here it is - image which can be easily requested in different sizes depending on your external service requirements.

- ![transformation-w480](https://jakubwajs.files.wordpress.com/2020/03/transformations4.png?w=300)
    
- ![transformation-w120](https://jakubwajs.files.wordpress.com/2020/03/transformations3.png?w=300)
    

Comparison of two transformations - ootb _w480_ and custom _w120_.

### Sources:

- [https://docs-partners.stylelabs.com/content/user-documentation/content-user-manual/share/public-links.html](https://docs-partners.stylelabs.com/content/user-documentation/content-user-manual/share/public-links.html)
