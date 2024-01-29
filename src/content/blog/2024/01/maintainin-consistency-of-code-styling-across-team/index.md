---
title: Maintaining code styling consistency across the .NET team with editorconfig
description: Ensuring consistent code styling across a project and diverse development team is a significant challenge. Fortunately, Visual Studio provides an option to define unified code styling rules for the project.
publishDate: 2024-01-29 00:00:00
img: '/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/hero.jpg'
img_alt: Picture of a samurai standing in the night with code around.
tags: 
  - "visualstudio"
  - "net"
  - "dotnet"
  - "collaboration"
---

Ensuring consistent code styling across diverse development team is a significant challenge. Different developers` preferences regarding conventions, indentation, and naming can lead to fragmentation of the codebase and even conflicts within a team.

Fortunately, Visual Studio provides native support for EditorConfig - the option to define unified code styling rules for the project in *editorconfig* file, that can be used in various IDEs.

## Setup

There are few options on how *editorconfig* file can be added to your Visual Studio project.

### Add custom file

The easiest way is to simply add an empty file to the solution and name it *.editorconfig*. It will be automatically applied to your project. All directives must be defined manually.

### Predefined template file

You can also create *editorconfig* file in Visual Studio using one of the templates. Just right click on the project file and select *Add item*.

![Add new item in Visual Studio](/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/screenshot-1.png)

Then search for *editorconfig* and choose template - .NET or default.

![Search for editorconfig template](/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/screenshot-2.png)

File created through this feature is prefilled with the template-defined options.

### Generate from settings

In my opinion, the most useful is the last option. Developers often have their unique preferences and want to apply them globally. To achieve that, you can export your local settings straight into *editorconfig* file.

Go to **Tools** -> **Options** -> **Text Editor** -> **C#** -> **Code Style** -> **General**

Click on *Generate .editorconfig file from settings*

![Generate .editorconfig file from settings](/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/screenshot-3.png)

Generated *editorconfig* file is then added to the project.

![Example generated *editorconfig* file](/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/screenshot-4.png)

Code: [Editor config file example](https://github.com/kubawajs/Google.CustomSearch.API/blob/master/Google.CustomSearch.API/.editorconfig)

## Example directives

This file grants control over various options. It allows enabling/disabling, defining specific clauses for each value, and applying severity levels such as:

- Silent
- Suggestion
- Warning
- Error

Let's dive into an example to see how it works.

### Example with braces style option

![Default settings - no warning for condition without braces](/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/screenshot-5.png)

The image above shows code snippet with condition without braces. There is no info about suggested changes. Let's change it. Through the clickable editor for *editorconfig* file that Visual Studio provides, you can apply *Warning* level to the *Prefer braces* setting.

![EditorConfig - *Prefer braces* setting with *warning* severity level](/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/screenshot-6.png)

After changing the option in *editorconfig* file, Visual Studio now shows the warning and suggest the change that should be applied.

![Visual Studio suggestion based on rules in *editorconfig*](/assets/images/2024/01/maintainin-consistency-of-code-styling-across-team/images/screenshot-7.png)


## Sources

- [Create portable, custom editor settings with EditorConfig](https://learn.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2022)
- [Code-style rule options](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/code-style-rule-options)
- [EditorConfig documentation](https://editorconfig.org/#supported-properties)