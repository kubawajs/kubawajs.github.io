---
title: "\"Sign in with Apple\" in Kentico 13 website with .NET 4.8, OWIN, and OpenId"
description: Sign-in/up with… has become a ubiquitous authentication method for most modern websites. In this blog post, I guide you through the process of integrating your Apple ID registration/login into your Kentico 13 CMS website.
publishDate: 2023-05-02 00:00:00
img: '/assets/images/2023/05/sign-in-with-apple-in-kentico-13-website-with-net-4-8-owin-and-openid/images/hero.jpg'
img_alt: Picture with iPhone and iPad lying on the white paper.
tags: 
  - "net"
  - "apple"
  - "dotnet"
  - "kentico"
  - "owin"
  - "sso"
---

**Sign-in/up with… has become a ubiquitous authentication method for most modern websites. While there are numerous tutorials on how to implement this feature for various providers such as Google or Facebook, adding Apple ID registration/login to an application written in .NET Framework (particularly any other version than Core) can be challenging. In this blog post, I will guide you through the process of integrating your Apple ID registration/login into your Kentico 13 CMS website. Although the focus is on Kentico 13, the information shared in this post will be useful even if you are not using the CMS.**

### Setup

- Kentico v13.0.70

- .NET 4.8

## Prerequisites

If your Kentico project does not have any external providers added, please follow the steps described in the official tutorial provided by Kentico - [Configuring external authentication | Xperience 13 Documentation](https://docs.xperience.io/managing-users/user-registration-and-authentication/configuring-external-authentication)

When your SSO works correctly in the project, you can start installing the required packages. There is only one - **Microsoft.Owin.Security.OpenIdConnect** (in my case in version 4.2.2).

![Screenshot from nuget package manager with Microsoft.Owin.Security.OpenIdConnect package.](/assets/images/2023/05/sign-in-with-apple-in-kentico-13-website-with-net-4-8-owin-and-openid/images/image-7.png)

In this tutorial, I will skip the configuration on the Apple Developer's account side. What you will need is a Client ID from the service and Redirect URI defined in it.

## OpenId setup

As you may have already noticed, for external providers like Facebook, Google, or WsFederation there are dedicated NuGet packages available, that make its setup easy and painless. For Apple and especially .NET 4.8 we need to take a different approach. There are many descriptions of related issues on Stackoverflow but dedicated to the new .NET Core. In this blog post, we will adapt one of them (full text here: [Implementing Sign in with Apple in ASP.NET Core (scottbrady91.com)](https://www.scottbrady91.com/openid-connect/implementing-sign-in-with-apple-in-aspnet-core)) into .NET 4.8 and OWIN.

To keep the project organized and separate different authentication types, I added an extension method called **AddAppleAuthentication** that contains all the setup, but you can just paste the content of the _app.UseOpenIdConnectAuthentication_ in your _Startup_ file.

```csharp
public static class AuthenticationExtensions
{
    public static void AddAppleAuthentication(this IAppBuilder app, AppleAuthenticationSettings settings)
    {
        app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
        {
            ResponseType = "code id\_token",
            ResponseMode = "form\_post",
            UsePkce = false,
            Authority = "https://appleid.apple.com",
            ClientId = settings.ClientId,
            Scope = OpenIdConnectScope.OpenId + " " + OpenIdConnectScope.Email + " name",
            AuthenticationType = "Apple",
            Caption = "Apple",
            RedirectUri = settings.RedirectUri
        });
    }
}
```

## Kentico Settings

Settings object retrieves parameters required for connection to the Apple SSO from Kentico Settings App.

To make it more flexible, there is also a feature switch _Enabled_ that allows administrators to disable/enable Apple authentication without redeploying the App (but requires its restart).

```csharp
public class AppleAuthenticationSettings
{
    public bool Enabled => SettingsKeyInfoProvider.GetBoolValue("ExternalAuthenticationAppleEnabled");
    public string ClientId => SettingsKeyInfoProvider.GetValue("ExternalAuthenticationAppleClientId");
    public string RedirectUri => SettingsKeyInfoProvider.GetValue("ExternalAuthenticationAppleRedirectUri");
}
```

Now go to Kentico. Add settings with defined keys in the _Modules_ app (as described here: ). Then provide Client ID and Redirect URI values and save settings.

**IMPORTANT: the value of the redirect URI does not need to be a real URL within your app (I always add _/signin-apple|google|facebook_ at the end of the App URL) but must match the Redirect URI defined on the Apple side.**

![Screenshot with Kentico configuration.](/assets/images/2023/05/sign-in-with-apple-in-kentico-13-website-with-net-4-8-owin-and-openid/images/image-5.png?w=829)

Now just edit the _Startup_ file to inject settings and add a flag for enabling/disabling this authentication type.

```csharp
var appleSsoSettings = new AppleAuthenticationSettings();
if (appleSsoSettings.Enabled)
{
    app.AddAppleAuthentication(settings.Apple);
}
```

That's all, everything else will be handled by the code from Kentico's tutorial.

### Sources

- [https://docs.xperience.io/managing-users/user-registration-and-authentication/setting-up-authentication](https://docs.xperience.io/managing-users/user-registration-and-authentication/setting-up-authentication)

- [https://docs.xperience.io/managing-users/user-registration-and-authentication/configuring-external-authentication](https://docs.xperience.io/managing-users/user-registration-and-authentication/configuring-external-authentication)

- [Implementing Sign in with Apple in ASP.NET Core (scottbrady91.com)](https://www.scottbrady91.com/openid-connect/implementing-sign-in-with-apple-in-aspnet-core)
