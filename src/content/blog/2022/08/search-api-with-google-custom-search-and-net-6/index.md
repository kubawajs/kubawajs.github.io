---
title: Search API with Google Custom Search and .NET 6
description: Search option is an important part of every website. In this article, I will show how to build our own search engine and integrate it into .NET 6 minimal API.
publishDate: 2022-08-05T00:00:00Z
img: '/assets/images/2022/08/search-api-with-google-custom-search-and-net-6/images/markus-winkler-afw1hht0nss-unsplash-1.jpg'
img_alt: 'Image post 2'
categories: 
tags: 
  - "net"
  - "net-core"
  - "dotnet"
  - "google"
  - "google-custom-search"
---

**Search option is an important part of every website. Building an appropriate algorithm on your own and adjusting it to the client's requirements is very time-consuming and expensive, and the results obtained are not always satisfactory. Fortunately, there are ready-made solutions on the market, such as Programmable Search Engine from Google. In this article, I will show how to build our own search engine and integrate it into .NET 6 minimal API.**

#### Technologies used:

- .NET 6 with minimal API
- Google.Apis.CustomSearchAPI.v1 1.57.0.2455
- Google.Apis.Customsearch.v1 1.49.0.2084

## Create a Google Custom search engine

To consume our own search engine we need two things - **API key** and **Custom Search Engine ID**. Both of them are really easy to get.

### Generate API key

To generate an API key, go to [Custom Search JSON API: Introduction](https://developers.google.com/custom-search/v1/introduction) page and click _Get a Key_. You have to authenticate with your Google account and then select a project where the key will be assigned. And that's all you have to do. Click on the _Show key_ button and save the generated key somewhere - we will need it later.

![](https://jakubwajs.files.wordpress.com/2022/08/image.png?w=612)

Popup with generated Google Custom Search API key.

### Create Custom Search Engine

The Custom Search Engine ID needs a bit more setup. Go to [Programmable Search Engine by Google](https://programmablesearchengine.google.com/about/) and click on _Get started_ button. You will again be asked for credentials to your Google account and then redirected to the Programmable Search Engine Control Panel. From this view, you can manage your custom search engines. Click on the _Add_ button and provide the required information: name (whatever) and search type (specific websites or global search). You can also add some extra options like an image search or a safe search filter. In the example below, I set up an engine that will search on GitHub and Stackoverflow.

![](https://jakubwajs.files.wordpress.com/2022/08/image-2.png?w=533)

Add a new Google Custom Search engine view.

After successful creation, go to _Edit_ mode. From this view, you can add advance options to your search engine and e.g. limit results to the selected region or language. Search for the _Search Engine ID_ field and copy its value somewhere.

## Build .NET 6 minimal API

### Create .NET 6 Web API project

Start with creating a new project in Visual Studio with _ASP .NET Core Web API_ template. Choose .NET 6.0 as a framework and remember to uncheck _Use controllers_ - we want to use the Minimal API approach.

![](https://jakubwajs.files.wordpress.com/2022/08/image-3.png?w=704)

Project setup in Visual Studio 2022.

After the project is created, we have to install the required Google libraries. Right-click on the project in the solution explorer view, go to _Manage NuGet packages_, search for **Google.Apis.Customsearch.v1** and **Google.Apis.CustomSearchAPI.v1** and install them.

![](https://jakubwajs.files.wordpress.com/2022/08/image-4.png?w=1020)

Installed Google libraries in the NuGet Package Manager.

### appsettings.json configuration

As we know from the previous section of the article, in order to properly connect to the Search API, we need **API Key** and **Custom Search Engine ID** (called **CX**). It is a good practice to move the configuration part outside of the code, so we create a dedicated section in the **appsettings.json** file:

```json
"GoogleCustomSearchApi": {
  "ApiKey": "api_key",
  "Cx": "custom_search_engine_id"
}
```

To load the configuration during application startup, add the code snippet in the **Program.cs** file:

```csharp
builder.Services.Configure<GoogleCustomSearchApiConfiguration>(builder.Configuration.GetSection(GoogleCustomSearchApiConfiguration.Name));
```

It will automatically scan for the _GoogleCustomSearchApi_ section in the **appsettings.json** file and map it into the _GoogleCustomSearchApiConfiguration:_

```csharp
public class GoogleCustomSearchApiConfiguration
{
    public const string Name = "GoogleCustomSearchApi";

    public string ApiKey { get; set; } = string.Empty;
    public string Cx { get; set; } = string.Empty;
}
```

Then, using [IOptions pattern](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-6.0) we can inject the configuration wherever it will be needed.

### Service service implementation

#### Domain model

We will start with creating a domain model. We need only two objects:

- **GoogleSearchResultItem** - represents a single item from the results.
- **GoogleSearchResult** - object that contains a collection of single items and some additional properties, like a total number of results.

These objects will be used only for reading mapped data retrieved from the API. In the project root, create a **Domain.cs** file with both data models (I prefer storing simple, related models in the same file):

```csharp
public record GoogleSearchResult(int TotalResults, IEnumerable<GoogleSearchResultItem> Items);
public record GoogleSearchResultItem(string Headline, string Description, string Url);
```

#### Interface

We start with creating an interface. It is nothing new - needs to have only one asynchronous method _SearchAsync_ with only one (so far) parameter - search phrase. As the result of the method, we want to receive the _GoogleSearchResult_ domain model which we created in the previous step.

```csharp
public interface IGoogleCustomSearchApiService
{
    Task<GoogleSearchResult> SearchAsync(string searchPhrase);
}
```

#### Service

Now it is time for the implementation. Create a new class _GoogleCustomSearchApiService_ which implements the interface created in the previous step. The next step is to inject the configuration using the IOptions pattern which I mentioned before. The code of the service class looks as above:

```csharp
internal class GoogleCustomSearchApiService : IGoogleCustomSearchApiService
{
    private readonly GoogleCustomSearchApiConfiguration _configuration;

    public GoogleCustomSearchApiService(IOptions<GoogleCustomSearchApiConfiguration> options)
    {
        _configuration = options.Value;
    }

    public async Task<GoogleSearchResult> SearchAsync(string searchPhrase)
    {
        ...
    }
}
```

Start with creating a **CustomSearchService** object (from _Google.Apis.Customsearch.v1_ library). As a constructor parameter, it uses **BaseClientService.Initializer** where we have to add our _ApiKey_ taken from the configuration object (lines 3-6).

Next, add the request parameters:

- **Cx** - from configuration object
- **Q** - stands for _query_ - this is our search phrase

and execute the request with the _ExecuteAsync_ method (lines 8-16).

If everything was executed correctly, we can map the response from the Google API to our domain model (line 18) and return the result.

```csharp
public async Task<GoogleSearchResult> SearchAsync(string searchPhrase)
{
    var searchService = new CustomsearchService(new BaseClientService.Initializer
    {
        ApiKey = _configuration.ApiKey
    });

    var listRequest = searchService.Cse.List();
    listRequest.Cx = _configuration.Cx;
    listRequest.Q = searchPhrase;

    var results = await listRequest.ExecuteAsync();
    if(results == null)
    {
        throw new ArgumentNullException(nameof(results));
    }

    var items = results.Items?.Select(x => new GoogleSearchResultItem(x.Title, x.Snippet, x.Link)) ?? new List<GoogleSearchResultItem>();
    return new GoogleSearchResult(int.Parse(results.SearchInformation.TotalResults), items);
}
```

#### Service registration

The last thing to do is to register our interface and its implementation in the dependency injection container. We come back again to the **Program.cs** file and add the given code snippet:

```csharp
builder.Services.AddTransient<IGoogleCustomSearchApiService, GoogleCustomSearchApiService>();
```

### Endpoint setup

With minimal API setting up the endpoint is easier than ever. We do not need a controller anymore - we can just define the method type (e.g. GET as above), route ("/search"), and define what the given endpoint should do as a lambda function directly in the **Program.cs**.

```csharp
app.MapGet("/search", async (string searchPhrase, IGoogleCustomSearchApiService service) =>
{
    return await service.SearchAsync(searchPhrase);
})
.WithName("GetSearchResults");
```

As you can see above, thanks to the conventions in Minimal API, the framework will automatically resolve _searchPhrase_ as the name of the query parameter and inject the service we registered before.

And that is all. We can run our API and test it directly in the browser thanks to the Swagger:

![](https://jakubwajs.files.wordpress.com/2022/08/image-5.png?w=1024)

Example response from the created API executed in Swagger.

### Extending the service

Google Custom Search API offers many parameters to customize our search results. We can e.g. limit them to a specific language (_Lr_), country of origin (_Cr_), add SafeSearch filtering, or boost results based on the geolocation of the user (_Gl_). The full list of available attributes is available here - [Google.Apis.CustomSearchAPI.v1 - Class CseResource.ListRequest](https://googleapis.dev/dotnet/Google.Apis.CustomSearchAPI.v1/latest/api/Google.Apis.CustomSearchAPI.v1.CseResource.ListRequest.html#properties).

One of the most useful parameters is undoubtedly _Num_ and _Start_. They control the number of returned results (by default it is 10 and cannot be more - it is a limitation added by Google) and the starting index. Using them, we can easily add pagination to our API.

```csharp
public async Task<GoogleSearchResult> SearchAsync(string searchPhrase, int pageNumber, int pageSize)
{
    ...
    var listRequest = searchService.Cse.List();
    listRequest.Cx = _configuration.Cx;
    listRequest.Q = searchPhrase;
    listRequest.Num = pageSize < 10 ? pageSize : 10; // Number of results (cannot be more than 10)
    listRequest.Start = (pageNumber - 1) \* pageSize; // Start index
    listRequest.Lr = "lang_en"; // Only EN language results
    ...
}
```

## Github

The full project code is available on my Github profile: [https://github.com/kubawajs/Google.CustomSearch.API](https://github.com/kubawajs/Google.CustomSearch.API).

### Sources

- [https://developers.google.com/custom-search/v1/introduction](https://developers.google.com/custom-search/v1/introduction)
- [https://developers.google.com/custom-search/v1/using\_rest](https://developers.google.com/custom-search/v1/using_rest)
- [https://stackoverflow.com/questions/8040824/how-can-i-do-a-search-with-google-custom-search-api-for-net](https://stackoverflow.com/questions/8040824/how-can-i-do-a-search-with-google-custom-search-api-for-net)
- [https://developers.google.com/api-client-library/dotnet/apis/customsearch/v1](https://developers.google.com/api-client-library/dotnet/apis/customsearch/v1)

* * *

Hero photo by [Markus Winkler](https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/search?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
