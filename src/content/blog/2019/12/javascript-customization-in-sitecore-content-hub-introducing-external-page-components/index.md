---
title: JavaScript customization in Sitecore Content Hub - introducing External Page Components
description: Enhance user experience in Sitecore Content Hub with External Page Components
publishDate: 2019-12-13T00:00:00Z
tags: 
  - "dam"
  - "javascript"
  - "sitecore"
  - "sitecore-content-hub"
  - "vuejs"
img: "/assets/images/2019/12/javascript-customization-in-sitecore-content-hub-introducing-external-page-components/images/blue-and-yellow-phone-modules-1476321.jpg"
img_alt: ""
---

**As in Sitecore Experience Platform customization is hugely important to prepare the best user experience, same is for Sitecore Content Hub driven solutions. In addition to strictly backend methods such as scripts and Azure Functions, it is also possible to manipulate the data displayed to the user on individual pages. This is possible thanks to the External Page Components.**

## Adding external page component to your page

In order to add an **External Page Component** to your page, go to **Manage** tab and choose **Pages**. For the purpose of this tutorial, we will add a new component to the **Asset Detail Page**, which is one of the most commonly used pages.

![](https://jakubwajs.files.wordpress.com/2019/12/search.png?w=742)

You can search for the page you're looking for by using search box in left sidebar.

After clicking on **Asset Detail Page** in left sidebar, the main window will display the structure of the page. It's divided into sections containing components visible after entering the given page. You can rearrange the components in the section using the drag and drop option available after clicking "dots" icon.

![](https://jakubwajs.files.wordpress.com/2019/12/add-component-to-page.png?w=1024)

Asset Detail Page structure.

To add a new component, click on "+" icon in the section you want to edit. From long list of available components, choose _External_. Add a name to the newly created component and remember to set _Visible_ option on - this is necessary for correct work, even if you don't plan to add any visible content to the component.

![](https://jakubwajs.files.wordpress.com/2019/12/add-component.png?w=361)

Add external component popup.

After that, your component is ready for customization. Click on its name which will redirect you to the component edit page.

## Component settings overview

### Configuration

The first tab you will see after going to the component edit option is the configuration tab, divided into three sections - control name, config and resources. It is recommended to follow a naming convention when setting Control name, as in the example below: **\[project name\].Controls.\[component name\]**

![](https://jakubwajs.files.wordpress.com/2019/12/component-view.png?w=919)

In the config section you can add your custom parameters which will be available for the control, e.g. in _Code_ tab. However, the most interesting is the Resources section. Through this button we can attach our custom js file or, as mentioned in the documentation, connect a javascript framework like vue.js. This allows us for almost unlimited configuration options for the component.

How to setup _vue.js_ to work with external page component you can find [here](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/external-ui-component.html?v=3.2.1).

### Code

Code tab is probably the most important and grants the most freedom in customization. It allows you to inject js code which will be run when the component will be iniatialized on the page. Thanks to predefined external component [events](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/external-page-events.html?v=3.2.1) and [options](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/external-page-options.html?v=3.2.1) you can create your own flow which can be used e.g. to retrieve data from entity and manipulate it.

![](https://jakubwajs.files.wordpress.com/2019/12/component-view-code.png?w=700)

Full list of libraries available by default for component you can find [here](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/included-libraries.html).

### Template

The template tab is used for creating HTML markup for component. Default styles will be automatically applied to the markup or we can use our custom CSS classes if we defined them (inside [Theme](https://docs.stylelabs.com/content/user-documentation/administration/portal/themes/themes.html?q=theme&v=3.2.1)).

![](https://jakubwajs.files.wordpress.com/2019/12/template-view.png?w=924)

Template tab with example component markup.

### Messages

Messages are used to [inject translations into component](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/intro.html?q=external%20page%20component&v=3.2.1). In this example we won't use them.

![](https://jakubwajs.files.wordpress.com/2019/12/message-view.png?w=923)

## Displaying results

To check how your component is displayed, go to the page where you added it. Unlike scripts that require building code to test results, the External Page Component is automatically updated after each save operation, so you can check the status of your current work by refreshing the page to which the component is attached.

![](https://jakubwajs.files.wordpress.com/2019/12/result.png?w=1024)

> **REMEMBER**  
> Adding an External Page Component is kind of _"hard"_ customization - requires the use of built-in Sitecore Content Hub libraries, which can change over time and cause that the component will stop working after platform upgrade. It is not recommended to use it unless it is necessary and business viable.

### References

- [https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/intro.html](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/intro.html)
- [https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/external-page-events.html](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/external-page-events.html)
- [https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/external-page-options.html](https://docs.stylelabs.com/content/integrations/intergration-components/external-page-component/external-page-options.html)
