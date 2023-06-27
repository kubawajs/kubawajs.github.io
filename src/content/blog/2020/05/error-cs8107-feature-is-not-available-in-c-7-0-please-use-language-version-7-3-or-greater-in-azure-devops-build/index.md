---
title: "\"Error CS8107: Feature '(...)' is not available in C# 7.0. Please use language version 7.3 or greater\" in Azure DevOps build"
description: Discover effective solutions to the common issue of building projects with enum as a generic type parameter in Azure DevOps CI/CD, as shared in this insightful blog post.
publishDate: 2020-05-11T00:00:00Z
tags: 
  - "azure"
  - "csharp"
  - "dotnet"
  - "dotnet-cli"
---

**During work with our latest project, where we're using Azure DevOps for CI/CD, I encountered this error while trying to build project which used enum as generic type parameter (C# 7.3 feature). I've discovered that is quite common issue, without short and simple explanation, so decided to write a quick blog post on how I dealt with it.**

I was really confused - build on my local machine worked fine. I was using **.NET Framework 4.7 with Visual Studio 2019**. I've looked into the documentation provided by Microsoft and found a table presented below:

<table><tbody><tr><td><strong>Target framework</strong></td><td class="has-text-align-center" data-align="center"><strong>Version</strong></td><td class="has-text-align-center" data-align="center"><strong>C# language version default</strong></td></tr><tr><td>.NET Core</td><td class="has-text-align-center" data-align="center">3.x</td><td class="has-text-align-center" data-align="center">C# 8.0</td></tr><tr><td>.NET Core</td><td class="has-text-align-center" data-align="center">2.x</td><td class="has-text-align-center" data-align="center">C# 7.3</td></tr><tr><td>.NET Standard</td><td class="has-text-align-center" data-align="center">2.1</td><td class="has-text-align-center" data-align="center">C# 8.0</td></tr><tr><td>.NET Standard</td><td class="has-text-align-center" data-align="center">2.0</td><td class="has-text-align-center" data-align="center">C# 7.3</td></tr><tr><td>.NET Standard</td><td class="has-text-align-center" data-align="center">1.x</td><td class="has-text-align-center" data-align="center">C# 7.3</td></tr><tr><td>.NET Framework</td><td class="has-text-align-center" data-align="center">all</td><td class="has-text-align-center" data-align="center">C# 7.3</td></tr></tbody></table>

Default C# language version used by compiler - [source](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version).

It made me even more confused. According to this, my build should success - all versions of .NET Framework uses C# 7.3 by default. So why my Azure DevOps build pipeline failed?

As I found out here - [Azure DevOps build .Net Core error CS8107](https://developercommunity.visualstudio.com/content/problem/726548/azure-devops-build-net-core-error-cs8107-feature-i.html) - explanation is simple: Azure DevOps agent uses Dotnet CLI for build process. The above table applies for the compiler that is used by Visual Studio. It looks different for Azure DevOps - **Dotnet CLI in DevOps by default uses C# 7.0**. This is why build succeed on my local machine, but failed in pipeline.

To force usage of C# 7.3 by Azure DevOps, you must specify this explicitly. To do this, create a file **Directory.Build.props** in your solution root folder and fill it in with following content:

```xml
<Project>
    <PropertyGroup>
        <LangVersion>7.3</LangVersion>
    </PropertyGroup>
</Project>
```

It does not affect your local build in any way - compiler for .NET Framework (and .NET Core 2.x and 3.x) by default uses C# 7.3 - it's just the information for Azure DevOps to use proper language version.

And that's it! After adding the file, the build pipeline finished successfully

### Sources

- [C# documentation - Configure language version](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version)
- [Developer Community Visual Studio issue](https://developercommunity.visualstudio.com/content/problem/726548/azure-devops-build-net-core-error-cs8107-feature-i.html)
