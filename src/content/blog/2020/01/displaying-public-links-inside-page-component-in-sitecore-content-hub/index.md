---
title: Displaying public links inside page component in Sitecore Content Hub
description: Delve into the world of external page components with a comprehensive tutorial, guiding you through the process of creating a feature-rich component that presents the public links for an asset.
publishDate: 2020-01-14T00:00:00Z
tags:
  - "js"
  - "javascript"
  - "sitecore"
  - "sitecore-content-hub"
img: "/assets/images/2020/01/displaying-public-links-inside-page-component-in-sitecore-content-hub/images/iker-urteaga-tl5vy1im-ua-unsplash.jpg"
img_alt: ""
---

**In one of my previous posts I described what external page components are. Today I would like to show you this functionality on a more complex example. Here's a quick recipe how to create a component which displays available public links for asset.**

* * *

Description of what External Page Components are, how to add and configure them on page can be found [here](https://jakubwajs.wordpress.com/2019/12/13/javascript-customization-in-sitecore-content-hub-introducing-external-page-components/).

## Template

To the template tab add the following HTML. Proposed solution will contain only three pieces of data about each public link: entity id, name and direct link to image.

```html
<div id="publicLinks">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Direct Link</th>
      </tr>
    </thead>
    <tbody id="publicLinksTableBody">
    </tbody>
  </table>
</div>
```

## Configuration

We will need to use instance url in our code to fetch data from. To make script environment-independent, we'll move instance url to configuration tab. In order to do this, put the following JSON in the Config section.

```json
{
  "instanceUrl": "https://your-instance-url.com/"
}
```

## CoDE

In the code tab put the following JS code.

```javascript
// get instance url from configuration tab
let instanceUrl = options.config.instanceUrl;

// subscribe to the entity loaded event
let entityLoadedSubscription = options.mediator.subscribe("entityLoaded", async function (entity) {
    let table_body = "";
    let currentTime = new Date($.now());

    // prepare query to get public links using Querying API
    let query = "Definition.Name == 'M.PublicLink' AND Parent('AssetToPublicLink').id == " + entity.systemProperties.id() + " AND (DateTime('ExpirationDate') equals null OR DateTime('ExpirationDate') gt " + currentTime.toISOString() + ")";

    // fetch data from prepared query endpoint
    let publicLinksForEntity = instanceUrl + "api/entities/query?query=" + query;
    await fetch(publicLinksForEntity).then(resp => resp.json())
        .then(function (linkItems) {
            $('#publicLinksTableBody').empty();
            linkItems.items.forEach(function(item) {
                table_body += '<tr>';
                table_body += '<td>' + item.id + '</td>';
                table_body += '<td>' + item.properties.Resource + '</td>';
                table_body += '<td><a href="' + item.public_link + '">Go</a></td>';
                table_body += '</tr>';
            });
            $('#publicLinksTableBody').append(table_body);
        });
});
```

## Summary

In today's post I presented a quick way to display public links in an external page In today's post I presented a quick way to display public links in an external page component. This is a simplified version of the view available by default after clicking on the _Public Link_ icon. It does not contain much information about a particular rendition (like its name or size), but for testing purposes or with some improvements might be interesting feature in your DAM solution.

![](https://jakubwajs.files.wordpress.com/2020/01/image-1.png?w=453)

Final component look.

Hero image: [unsplash-logoIker Urteaga](https://unsplash.com/@iurte?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge "Download free do whatever you want high-resolution photos from Iker Urteaga")
