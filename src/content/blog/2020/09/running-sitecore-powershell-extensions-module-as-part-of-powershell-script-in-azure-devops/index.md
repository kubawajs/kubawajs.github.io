---
title: Running Sitecore Powershell Extensions module as part of Powershell script in Azure DevOps
description: Effortlessly run Sitecore Powershell Extensions scripts in Azure DevOps with this tutorial, adapting to the evolving needs of your cloud-based Sitecore solution.
publishDate: 2020-09-22T00:00:00Z
tags: 
  - "azure"
  - "cloud"
  - "devops"
  - "programming"
  - "sitecore"
img: '/assets/images/2020/09/running-sitecore-powershell-extensions-module-as-part-of-powershell-script-in-azure-devops/images/verne-ho-0lajfsna-xq-unsplash.jpg'
img_alt: ""
---

**Continuous Integration and Continuos Development have become an important part of modern web applications development. Besides, Sitecore is going cloud. This means problems that did not occur before, when e.g. virtual machines were in use. One of the issues I have encountered is running PowerShell scripts that uses Sitecore Powershell Extensions. In this tutorial I will explain how to run your stored (eg. in the repo) SPE script, in Azure DevOps.**

### Prerequisites

1. Sitecore Powershell Extensions (SPE) - [download](https://github.com/SitecorePowerShell/Console/releases)
2. SPE script which works locally on your machine
3. Azure DevOps account
4. Sitecore instance running in Azure

## Scenario

In this example we assume that there is a Powershell script that uses SPE and it should be executed during build/deployment process. Also, we're building Continuous Integration environment in Azure and we want to use Azure Pipelines for build and deployment process. We want to move current process from local environment to the cloud.

**Problem:** How to run a script which uses Sitecore Powershell Extensions in Azure Pipelines.

## Script

Below you can find an example script that takes environment url, sitecore username and password as parameters. Then the SPE module is imported and a new Sitecore session is created. The highlighted lines are the most important. Unable to import module by specifying only folder path - it is required to specify the psd file directly. This is the main difference between running local and cloud scripts.

```shell
param(
	[string]$url,
  [string]$SitecoreUser,
	[string]$SitecorePass
)

$ScriptPath = Split-Path $MyInvocation.MyCommand.Path
Import-Module -Name $ScriptPath\\modules\\SPE\\SPE.psd1
Write-Host "Starting script..."
```

# Log into Sitecore
```shell
$session = New-ScriptSession -Username $SitecoreUser -Password $SitecorePass -ConnectionUri $url
```

The script should be stored in the repository that is imported during build. The SPE module should be a subfolder of the script folder (like the path specified in the script).

## Build pipeline

Build process is quite simple. The downloaded SPE module and script must be included in your repository. Then the only thing you need to remember is to add module folder to build artifacts, e.g. using OOTB Azure Pipelines task - _Copy files_.

![](https://jakubwajs.files.wordpress.com/2020/09/image.png?w=913)

As a Target Folder use [predefined variable](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml) for artifacts directory.

```shell
$(Build.ArtifactStagingDirectory)
```

It's also good idea to flatten file structure - this makes it easier to retrieve exact files in the Release Pipeline.

## Release pipeline

Start with adding artifacts built in build pipeline described before. Then add stage for your desired environment and create pipeline for it.

![](https://jakubwajs.files.wordpress.com/2020/09/image-3.png?w=623)

To run Powershell script we'll use OOTB _PowerShell_ task:

![](https://jakubwajs.files.wordpress.com/2020/09/image-1.png?w=914)

Now it's time for the most tricky part - script paths setup. Provide the path to the script file that should be included in the artifacts during build pipeline. You can view the artifact structure by clicking on the _three dots_ icon.

![](https://jakubwajs.files.wordpress.com/2020/09/image-4.png?w=1024)

Below you can define _Arguments_ for your script. To provide more security, I've added them to [pipeline variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch).

## Summary

If everything is set up correctly, you can execute your pipeline and everything should work. If not, the solution is not simple. Debugging is really difficult - only now we can check if all paths correctly defined, after each change made, you should run the script. The logs only contain basic information about the error and are often misleading, so sometimes the only way to fix it is to make repeated corrections. To make it even harder, not every script running locally will run the same way in the cloud, especially SPE parts.

However, all the effort pays off as scripts can greatly speed up development. Good luck with your own script-driven pipelines!

* * *

Hero photo by [Verne Ho](https://unsplash.com/@verneho?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/build?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
