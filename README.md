# Unity Tools for Visual Studio Code
[![Build Status](https://travis-ci.org/TobiahZ/unity-tools.svg?branch=master)](https://travis-ci.org/TobiahZ/unity-tools) [![Dependency Status](https://dependencyci.com/github/TobiahZ/unity-tools/badge)](https://dependencyci.com/github/TobiahZ/unity-tools)
## What this extension is

This is an **unofficial** extention created by Tobiah Zarlez, and is not affiliated in any way with Unity Technologies. 

The goal of this extention is to add miscellaneous functionality to Visual Studio Code for Unity developers.

In this future, this extension will also act as an extension package for other Unity related VSCode extensions. Specfically, "YclepticStudios.unity-snippets" and "Unity.unity-debug"
However, that feature is in preview right now, so for now you'll have to manually install the related extensions.

## What this extension isn't

This is not a comprehensive set of tools for Unity development, nor does it provide any debugging features.

If you want to debug your Unity projects, I would recommend getting [Unity's official debugger for Visual Studio Code](https://github.com/Unity-Technologies/vscode-unity-debug).

### Can you add XZY feature?

Possibly! Let me know, I'd love to hear your suggestions on what tools you'd like to see added to this collection.

## How to install

You can install this extension directly from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Tobiah.unity-tools).

Launch VS Code Quick Open (Ctrl+P) and copy/paste the following command:

> ext install unity-tools

## Feature list:

### Command: Open Documentation for Selection
Use the pallet command "Unity Tools: Open Documentation for Selection" (`Cmd+'` on OSX or `Ctrl+'` on Windows and Linux) to open the Unity Documentation for the currently selected class.

### Command: Search Documentation
Use the pallet command "Unity Tools: Search Documentation" (Shortcut: `Cmd+Shift+'` on OSX or `Ctrl+Shift+'` on Windows and Linux) where you can quickly enter whatever you want to search for.

### Command: Open VSCode Documentation
Added the pallet command "Unity Tools: Open VSCode Documentation" to open the [Unity Development with VS Code](https://code.visualstudio.com/docs/runtimes/unity) page on the Visual Studio Code Documentation.

### Command: Get VSCode plug-in from the Asset Store
Added the pallet command "Unity Tools: Get VSCode plug-in from the Asset Store" to open [dotBunny's Unity plug-in](https://github.com/dotBunny/VSCode/) on the [Unity Asset Store](http://u3d.as/jmM). Afterwards, will display a message with a link to the [How-To](https://github.com/dotBunny/VSCode/blob/master/HOWTO.pdf) and the Git repo for the project.

### Command: Generate Organizational Folders
Added the pallet command "Unity Tools: Generate Organizational Folders" to create some default organizational folders to your project's Assets Folder. The list of default folders are below: 
* Scenes 
* Scripts 
* Prefabs 
* Materials  
* Audio 

### Configuration
The Unity-Tools command Generate Organizational Folders can be configured to create a set of folders of your choosing, instead of the 5 default ones: Scenes, Scripts, Prefabs, Materials, and Audio. 
To do this simply open or create `./.vscode/settings.json` and fill in the following fields:

```json
{
    "unity-tools.defaultOrganizationFolders" : ["Your","New", "Folder","Names"]
}
```


## Other resources

Here are some other resources I recommend:

* [Unity Development with VS Code](https://code.visualstudio.com/docs/runtimes/unity)
* [dotBunny's Unity plug-in for Visual Studio Code support](https://github.com/dotBunny/VSCode/) - [Asset Store Link](http://u3d.as/jmM)
* [Unity's official debugger for Visual Studio Code](https://github.com/Unity-Technologies/vscode-unity-debug)
* [Tobiah Zarlez Blog](http://www.TobiahZ.com)
