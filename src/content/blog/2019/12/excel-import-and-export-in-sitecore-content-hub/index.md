---
title: Excel import and export in Sitecore Content Hub
description: Simplify the process of updating custom properties for multiple assets in Sitecore Content Hub with the Excel file import.
publishDate: 2019-12-23T00:00:00Z
tags: 
  - "sitecore"
  - "dam"
  - "excel"
  - "sitecore-content-hub"
img: "/assets/images/2019/12/excel-import-and-export-in-sitecore-content-hub/images/export-to-excel.png"
img_alt: ""
---

**Every asset has many custom properties. They provide a lot of information about a specific resource and the file associated with this. This means a huge amount of data about many assets. The problem occurs when you need to update them quickly. You can of course use a mass edit table, but for many hundreds of assets this can be problematic. Fortunately, Sitecore Content Hub enables alternative way to handle this issue - by importing an Excel file.**

## How to enable EXPORT EXCEL on page

You need a data template before importing an Excel file. To obtain it, you need to export sample data from Content Hub. To enable **Export to Excel** feature on the page, you need to go to **Manage** tab, then choose **Pages** and find the page where you want to enable it. In this case we will use _Assets_ page. Inside **Selection component** settings, tick the checkbox beside _Enable export to Excel_ text.

![](https://jakubwajs.files.wordpress.com/2019/12/general-settings.png?w=931)

**Important:** to set up export feature the page where you want to enable it needs to have **Selection** component.

For _Create_ page Import by Excel it is enabled by default. However, if for your Content Hub instance page it's disabled, you need to go to the page where you want to add the feature, then choose _Creation_ component and switch the checkbox next to _Import Excel_ option. As export feature needs selection component to be enabled, as import feature needs creation component. It means that without _Creation_ component present on your page you cannot import excel files.

## How to export?

In order to export assets to Excel file go to the **Assets** page and select assets you want to export. Then click on the **dots** icon and choose **Export to Excel**.

![](https://jakubwajs.files.wordpress.com/2019/12/export-to-excel.png?w=927)

Assets page witch export to Excel option enabled.

Then, on the displayed popup, enter the name of the file to which you want to export the data and select options as on the screenshoot below.

![](https://jakubwajs.files.wordpress.com/2019/12/export.png?w=610)

## How to update assets with excel import

After downloading export file, you can edit it in Excel and set the values for exported assets. In this example, I will change **Title** property value.

![](https://jakubwajs.files.wordpress.com/2019/12/excel-edit.png?w=945)

**Remember**: if you want to update complex fields, like e.g. taxonomies, you need to type identifier of the taxonomy value you want to set.

To update assets, go to _Create_ page, click on **Add** button and choose **Import Excel**. The process should look similar regardless of the page and entity definition for which we enable the import option. You can track the file processing status on the **Jobs** page. It is also a place where you can find information about errors, if any.

![](https://jakubwajs.files.wordpress.com/2019/12/import.png?w=911)

When job is completed, you can go back to the _Assets_ page. As you can see on the screenshot below, imported Excel file updated specified assets.

![](https://jakubwajs.files.wordpress.com/2019/12/result-1.png?w=927)

To properly import data from an Excel file into Content Hub, the Excel file sheet must be named the same as the entity you are importing. For example, for asset import it will be **M.Asset**.

## Summary

Excel import and export features are very powerful tool for mass edit of entities. If you configure it correctly, it can be a very quick way to correct user mistakes or problems that occurred during data migration. What is particularly important, this functionality can be used for various types of entities and change the value of fields normally unavailable from the portal level.

### References

- [https://docs.stylelabs.com/content/user-documentation/administration/portal/pages/page-components/creation.html?q=creation&v=3.2.1](https://docs.stylelabs.com/content/user-documentation/administration/portal/pages/page-components/creation.html?q=creation&v=3.2.1)
