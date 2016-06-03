import {window, commands, StatusBarAlignment, StatusBarItem, workspace, extensions} from 'vscode';
import path = require('path');

let fs = require('fs');


var folders: Array<string> = ["Scenes", "Prefabs", "Scripts", "Materials", "Audio"];

export function GenerateOrganizationFolders(path: string)
{
    var generationFolders;
    generationFolders = setDefaultOrCustomFolders();
    for(var j = 0; j <generationFolders.length; j++){
        var dir = path + generationFolders[j];
        fs.mkdir(dir, function (err) {
            // dir has now been created
            // Cannot use the following methods to check if folders already exist: fs.stat, EEXIST and ENOENT;
            // the methods prevent folders from being recreated if they are ever deleted by user. 
        });       
    }
}

// Checks whether or not the User changed the default folder array
export function setDefaultOrCustomFolders() : Array<String> {
    if (!workspace || !workspace.rootPath) return null;
    let fSettings = getDefaultFoldersFromSettings();
    let fDefault = folders;
    
    // Quick sanity check
    let userFolders = (fSettings && fSettings.length > 0 ) ? fSettings : fDefault;
    return userFolders;
}


export function getDefaultFoldersFromSettings(): Array<String> {
    if (!workspace || !workspace.rootPath) return null;

    let settingsFile = path.join(workspace.rootPath,'.vscode', 'settings.json');
    try {
        let settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));

        if (settings) {
            var usersDefaultFolders = settings['unity.setDefaultOrganizationFolders']; 
            return usersDefaultFolders;
        } else {
            return folders;
        }
    } catch (e) {
        return folders;
    }
}

