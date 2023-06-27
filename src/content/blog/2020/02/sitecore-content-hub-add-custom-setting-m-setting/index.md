---
title: Sitecore Content Hub - add custom setting (M.Setting)
description: When customizing your Sitecore Content Hub instance, you may want to configure your own environment settings, e.g. to store keys and tokens for external services you want to integrate. Here you can find two ways to add your own M.Setting entities.
publishDate: 2020-02-19T00:00:00Z
tags: 
  - "sitecore"
  - "rest"
  - "sitecore-content-hub"
img: "/assets/images/2020/02/sitecore-content-hub-add-custom-setting-m-setting/images/jonathan-borba-xrdueeg1tvi-unsplash.jpg"
img_alt: ""
---

**When customizing your Sitecore Content Hub instance, you may want to configure your own environment settings, e.g. to store keys and tokens for external services you want to integrate. There is not much information on how to do this in official Content Hub docs and it took me quite a long time to figure it out. Below you can find two ways to add your own _M.Setting_ entities.**

## Using REST API

As you may know from [Sitecore Content Hub REST API documentation](https://docs.stylelabs.com/content/integrations/rest-api/entities/create-entity.html), it is possible to create new entities by using POST request to the endpoint:

```
https://{{hostname}}/api/entities/
```

I decided to check if it's possible to create a new _M.Setting_ entity this way. Following the existing settings and taking into account the required fields, I prepared an example JSON body for POST request:

```json
{
    "identifier": "M.Setting.Twitter",
    "is_root_taxonomy_item": false,
    "cultures": [
        "en-US"
    ],
    "properties": {
        "M.Setting.Name": "Twitter",
        "M.Setting.Value": {
            "ApiKey": "",
            "ApiSecretKey": "",
            "AccessToken": "",
            "AccessTokenSecret": ""
        }
    },
    "relations": {
        "SettingCategoryToSettings": {
            "parent": {
                "href": "https://{{hostname}}/api/entities/6858"
            },
            "inherits_security": true
        }
    },
    "entitydefinition": {
        "href": "https://{{hostname}}/api/entitydefinitions/M.Setting",
        "title": "The entity definition for this entity"
    }
}
```

And it worked! Here's the line-by-line description:

- **Line 2**: your custom setting identitifier **(**required**)** - should have _M.Setting_ prefix (naming convention).
- **Line 8**: name of your setting **(required)**.
- **Lines 9-14**: values of your setting **(required)**. If you're not sure what fields your setting should contain, leave the brace empty (you can edit it later).
- **Line 19**: _6858_ stands for _Integration_ category. If you want to place your setting under another category, check its _id_ and paste it here.
- **Line 25**: set entity definition as _M.Setting_.

Now you can check in portal - your new setting is in place and available for further editing.

![](https://jakubwajs.files.wordpress.com/2020/02/image-2.png?w=918)

A new setting ready to be filled in with values.

**Remember!** You need to be authenticated in the API to successfully execute this request.

## In Portal

There is also an alternative way to create new settings - directly in portal. It's not in the documentation so you need to know exact url:

```
https://{{hostname}}/en-us/admin/entitymgmt/entities/1
```

After moving to the indicated address, a page with all _M.Setting_ entities is displayed.

![](https://jakubwajs.files.wordpress.com/2020/02/image.png?w=920)

"Secret" view with all setting entities.

You can add a new setting by clicking the "+" icon in the right corner. You will be directed to the page with a form that you can fill with exactly the same values as in the first example, but using a more user-friendly view.

![](https://jakubwajs.files.wordpress.com/2020/02/image-1.png?w=922)

_In portal_ setting creation.

* * *

_Hero photo by [Jonathan Borba](https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_
