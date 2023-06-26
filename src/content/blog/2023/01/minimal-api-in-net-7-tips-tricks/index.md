---
title: Minimal API in .NET 7 - Tips & Tricks
publishDate: 2023-01-16 00:00:00
description: Minimal API is the new, simplified approach for building APIs in .NET, which is faster and requires minimal code and configuration. Below you can find a set of tips & tricks you may find useful while starting your journey with Minimal API or transforming your existing API from a controller approach into minimal.
img: '/assets/images/2023/01/minimal-api-in-net-7-tips-tricks/images/image.png'
tags: 
  - "net"
  - "net7"
---

Minimal API is the new, simplified approach for building APIs in .NET, which is faster and requires minimal code and configuration. Below you can find a set of tips & tricks you may find useful while starting your journey with Minimal API or transforming your existing API from a controller approach into minimal.

## First endpoint

The point of Minimal API is the ease of use and speed of implementation. With the "conservative" approach, you have to define at least one class (controller) or more often two (model and controller). With Minimal API, you need **zero** extra classes. You can define all in your **Program.cs** file (it is not the best approach considering further maintenance, but the point is that it is possible!).

To create your first endpoint, just add the following code snippet in the **Program.cs** file:

```csharp
app.MapGet("hello", () => "hello world!");
```

The code string defines the routing part, so the path where your endpoint is accessible (in the old MVC approach - controller name, e.g. **Hello**Controller). _MapGet_ defines the **HTTP method** for the endpoint. Other methods are:

- MapPost

- MapDelete

- MapPut

- MapPatch

Lambda is the function that will be triggered when the endpoint is accessed. Simply - if you access the path _/hello_ in your browser, you will see the _hello world!_ text.

![](https://jakubwajs.files.wordpress.com/2023/01/image.png?w=481)

We can extend this endpoint by adding the parameter to the request. Just add it as a lambda parameter in your code:

```csharp
app.MapGet("hello", (string name) => $"hello {name}!");
```

![](https://jakubwajs.files.wordpress.com/2023/01/image-2.png?w=459)

But what if the user does not provide the parameter? Of course, we would like to return an error code. For this purpose, use the static _Results_ class with the corresponding error code, like in the example below:

```csharp
app.MapGet("hello", (string? name) =>
{
    if(!string.IsNullOrWhiteSpace(name))
    {
        return Results.Ok($"hello {name}!");
    }
    else
    {
        return Results.BadRequest("Please provide the name.")
    }
});
```

![](https://jakubwajs.files.wordpress.com/2023/01/image-3.png?w=439)

## Dependency injection

You might say: "It's all nice and neat, but real controllers don't look like that. They are much more complicated and dependent on other services" - and you are right. I can't imagine a controller without external dependencies injected into it with interfaces. But it is also possible with minimal API and it is also easy. All you need to do is to register your interface implementation as you always do (in Program.cs or with a third-party library like Autofac). Then, just inject it into your endpoint definition with the \[FromServices\] attribute. Minimal API will resolve it the same way as in controller:

```csharp
app.MapGet("hello", (\[FromServices\] ILogger logger, string? name) =>
{
    if(!string.IsNullOrWhiteSpace(name))
    {
        logger.LogInformation($"Name: {name}");
        return Results.Ok($"hello {name}!");
    }
    else
    {
        logger.LogError("Name not provided.");
        return Results.BadRequest("Please provide the name.");
    }
});
```

## Authorization

What if you want to restrict access to your endpoint? In the MVC approach, you probably added the _\[Authorize\]_ attribute to your method or whole controller. Minimal APIs are all about extension methods, and this is how it is for authorization - just add the _.RequireAuthorization()_ extension method.

```csharp
app.MapGet("hello", (\[FromServices\] ILogger logger, string? name) =>
{
    if(!string.IsNullOrWhiteSpace(name))
    {
        logger.LogInformation($"Name: {name}");
        return Results.Ok($"hello {name}!");
    }
    else
    {
        logger.LogError("Name not provided.");
        return Results.BadRequest("Please provide the name.");
    }
}).RequireAuthorization();
```

## Documentation

Your API is useless if you haven't documented properly how to use it. With [Swagger](https://swagger.io/) it became very easy and it became a permanent element of API projects written in .NET. To extend its documentation, I often used attributes like:

```csharp
[ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
[ProducesErrorResponseType(StatusCodes.Status400BadRequest)]
```

To define what is the expected and error response code and type. We can also define it in Minimal API using ._Produces_ and ._ProducesProblem_ extension methods and their generic counterparts. The example is presented below:

```csharp
app.MapGet("hello", (\[FromServices\] ILogger logger, string? name) =>
    {
        if (!string.IsNullOrWhiteSpace(name))
        {
            logger.LogInformation($"Name: {name}");
            return Results.Ok($"hello {name}!");
        }
        else
        {
            logger.LogError("Name not provided.");
            return Results.BadRequest("Please provide the name.");
        }
    })
    .RequireAuthorization()
    .Produces(StatusCodes.Status200OK)
    .ProducesProblem(StatusCodes.Status400BadRequest);
```

Will produce the following doc:

![](https://jakubwajs.files.wordpress.com/2023/01/image-4.png?w=1024)

## Summary

This is just a sneak peek of the features that you can find in the minimal APIs. More of them and also the more complex cases will be presented in the future. I hope this post has piqued your interest in minimal APIs in .NET and that you'll give it a try in your next project ;)

### Docs

- https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-7.0

- https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/parameter-binding?view=aspnetcore-7.0

- https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/openapi?view=aspnetcore-7.0
