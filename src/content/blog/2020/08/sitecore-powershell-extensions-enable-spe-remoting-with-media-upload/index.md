---
title: Sitecore Powershell Extensions - enable SPE Remoting with media upload
description: Discover the seamless setup process and troubleshooting tips for running Sitecore PowerShell Extensions scripts remotely, empowering you to automate tasks effortlessly.
publishDate: 2020-08-07T00:00:00Z
tags: 
  - "sitecore-powershell-extensions"
  - "sitecore"
img: "/assets/images/2020/08/sitecore-powershell-extensions-enable-spe-remoting-with-media-upload/images/kelly-sikkema-ripitx__oeq-unsplash.jpg"
img_alt: ""
---

**Sitecore Powershell Extensions is a powerful tool which allows to automate various tasks within the Sitecore platform. Sometimes it may require running SPE scripts remotely. This is why Sitecore PowerShell Extensions Remoting was developed. There are few things you need to remember while setting up your instance to run scripts remotely. Below I have described the installation process of SPE Remoting, the problems I encountered and their solutions.**

Here you can find official documentation on this topic - [Sitecore PowerShell Remoting](https://doc.sitecorepowershell.com/remoting).

### Prerequisites

- Sitecore PowerShell Extensions installed on your instance (in my case - version dedicated for Sitecore XP 9.3)
- Sitecore PowerShell Extensions Remoting - [download](https://github.com/SitecorePowerShell/Console/releases).

## Create SPE Remoting user

Start with creating a new user in the User Manager. Assign a role dedicated for remoting - **sitecore\\PowerShell Extensions Remoting**. Of course, you can use the Sitecore Admin account instead, but it's not good practice to give the remote user full access to the instance.

![](https://jakubwajs.files.wordpress.com/2020/08/image.png?w=837)

User creation window - Sitecore XP User Manager.

## Enable SPE Remoting and Media Upload

Sitecore PowerShell Extensions has its own dedicated config file which you can find here:

```shell
your\_instance\_folder/App\_Config/Include/SPE/SPE.config
```

You can enable remoting by changing _enabled_ attribute value of _remoting_ setting to _true._ I do not recommend this. With this approach, you cannot track the history of changes to the file and you will irretrievably lose the way config looked originally. I propose preparing patch file in your VS solution folder instead.

Example patch file code with _mediaUpload_ enabled (based on official documentation).

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:role="http://www.sitecore.net/xmlconfig/role/" xmlns:security="http://www.sitecore.net/xmlconfig/security/">
  <sitecore role:require="Standalone or ContentManagement" security:require="Sitecore">
    <powershell>
      <services>
        <remoting>
          <patch:attribute name="enabled">true</patch:attribute>
        </remoting>
        <mediaUpload>
          <patch:attribute name="enabled">true</patch:attribute>
        </mediaUpload>
      </services>
    </powershell>
  </sitecore>
</configuration>
```

Besides the **mediaUpload** mentioned above, you can enable various kinds of services via a patch file depending on your needs. Full list and descriptions - [SPE Service Descriptions](https://doc.sitecorepowershell.com/security#service-descriptions).

## Remember about config files patching order!

There is one problem with using patch file - if you're following Helix principles and naming conventions, your **patch file will be overwriten by the SPE.config file**. Adding "classic" _Z_ to the beginning of the file name is not enough, because files from Project folder are loaded before SPE folder (**alphabetical order**). My suggestion is to **add SPE folder on the same level as your project configs** - as on the screen below.

![](https://jakubwajs.files.wordpress.com/2020/08/image-1.png?w=473)

Project structure - SPE config patch file location.

To check if your config was properly patched, go to **your-instance-url/sitecore/admin/showconfig.aspx** page and find _remoting_ setting.

![](https://jakubwajs.files.wordpress.com/2020/08/image-2.png?w=1000)

Config file with patch applied.

## Testing solution

After completing the above steps, it's time to test your solution. Here's a sample code to verify that everything is set correctly.

**Scenario:** Running SPE script on local machine/VM, SPE module downloaded to _modules_ folder in the script location.

```shell
# Parameters declaration
param(
    \[string\]$url,
    \[string\]$SiteName,
    \[string\]$SitecoreUser,
    \[string\]$SitecorePass
)

# Import SPE module
Import-Module -Name ".\\modules\\SPE"

# Create session and log to Sitecore
$session = New-ScriptSession -Username $SitecoreUser -Password $SitecorePass -ConnectionUri $url

# Publish item
Invoke-RemoteScript -Session $session -ScriptBlock { 
	Get-Item -Id $itemId | Publish-Item -Recurse -Target web
}

# Stop session
Stop-ScriptSession -Session $session
```

## Bonus: _Download failed. The specified media is invalid._

There is also one special error which may occur while working with SPE Remoting media upload. When I was trying to upload test CSS file I got following error in console:

_Download failed. The specified media is invalid._

I had no idea how to fix it - everything seemed to work fine except the upload data part. The solution was quick and easy but hard to find. It turns out that Sitecore (or SPE) detects that the file being uploaded has no content. So remember, **even for test purposes don't use empty files**.

### Sources

- [https://doc.sitecorepowershell.com/remoting](https://doc.sitecorepowershell.com/remoting)
- [https://doc.sitecorepowershell.com/security](https://doc.sitecorepowershell.com/security#service-descriptions)

* * *

_Hero photo by [Kelly Sikkema](https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_
