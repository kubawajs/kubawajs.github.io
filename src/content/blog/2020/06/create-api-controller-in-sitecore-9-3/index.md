---
title: Create API controller in Sitecore 9.3
description: Elevate your website development with Sitecore CMS by seamlessly creating API controllers and registering them using dependency injection.
publishDate: 2020-06-21T00:00:00Z
tags: 
  - "net"
  - "webapi"
  - "sitecore"
img: '/assets/images/2020/06/create-api-controller-in-sitecore-9-3/images/rachel-houghton-raqhioyf3eo-unsplash.jpg'
img_alt: ""
---

**Building websites with Sitecore CMS is largely about creating components that will be used on the website (so-called renderings). Besides of creating controller renderings to handle components of your site, sometimes you need to prepare an API, e.g. for integration with external services. In today's post I'll show you how to create API controller in Sitecore XP 9.3 and how to register it using dependency injection.**

### Prerequisities

- Start with creating new project (class library) in your solution - depending on the purpose of the project in the Feature, Foundation or Project layer
- Install following packages:
    - _Microsoft.Extensions.DependencyInjection_
    - _Newtonsoft.Json 11.0.2_ - if you want to return items serialized to JSON in your api controller

## Create controller

Add new folder to the project and name it _Controllers_. Add new class with your controller's name (remember about _Controller_ suffix). Class should inherits from ApiController.

Next, create a method for your API endpoint. If you want to change the default .NET routing, you can add **Route** attribute (like in the example below).

```csharp
namespace Feature.ExampleApi.Controllers
{
    public class ExampleApiController : ApiController
    {
        [HttpGet]
        [Route("get/{itemIdString}")]
        public IHttpActionResult GetItem(string itemIdString)
        {
            if (!ID.TryParse(itemIdString, out var itemId)) return null;

            var item = Sitecore.Context.Database.GetItem(itemId);
            if (item == null) return NotFound();

            // Do sth with item

            return Json(result);
        }
    }
}
```

The method above attempts to obtain the item from Sitecore database based on its ID. If succeed, you can work with this item - edit, adapt to your DTO model or just return value of item's property.

## Register Controller

Newly created controller should be registered in DI container. There are many articles on how to do it properly - like this [official doc](https://doc.sitecore.com/developers/91/sitecore-experience-manager/en/dependency-injection.html).

So much has been written about dependency injection in Sitecore that one could successfully write a book on this subject. One of the best summaries in this topic which I've found was written by Corey Smith - you can read it here [Sitecore Dependency Injection - Scoped Services](https://www.coreysmith.co/sitecore-dependency-injection-scoped-services/).

Here's the way I personally use - it seems to me the most convenient. Just create **ServicesConfigurator.cs** file and add following content (remember about usings!):

```csharp
namespace Feature.ExampleApi
{
    public class ServicesConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            // Controllers
            serviceCollection.Replace(ServiceDescriptor.Transient(typeof(ExampleApiController),
                typeof(ExampleApiController)));
        }
    }
}
```

## Create config files

You also need to register your ServicesConfigurator class to be attached to Sitecore config. In order to do that, create **Feature.ExampleApi.config** file under **App\_Config/Include/Features** path (where _ExampleApi_ is the name of your project):

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <services>
      <configurator type="Feature.ExampleApi.ServicesConfigurator, Feature.ExampleApi" />
    </services>
  </sitecore>
</configuration>
```

Et voila! After publishing your controller is ready for work. It's available at the following endpoint:

```shell
{instance_url}/get/{item_id}
```

### Useful links:

- [Controller rendering in Sitecore with example](https://www.logicalfeed.com/posts/116/controller-rendering-in-sitecore-with-example)
- [Dependency Injection - Sitecore Documentation](https://doc.sitecore.com/developers/91/sitecore-experience-manager/en/dependency-injection.html)
- [Sitecore Dependency Injection - Scoped Services](https://www.coreysmith.co/sitecore-dependency-injection-scoped-services/)

* * *

Hero photo by [Rachel Houghton](https://unsplash.com/@rjhoughton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/rest-api?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
