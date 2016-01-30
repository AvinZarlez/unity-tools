
let fs = require('fs-extra');

var folders: Array<string> = ['Scripts', 'Scenes', 'Prefabs', 'Materials', 'Textures', 'Audio'];

export function GenerateOrganizationFolders(path: string)
{
    for(var j = 0; j <folders.length; j++){
        var dir = path + folders[j];
        fs.ensureDir(dir, function (err) {
        console.log(err) // => null
        // dir has now been created, including the directory it is to be placed in
        });
    }
}
