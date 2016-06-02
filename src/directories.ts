let fs = require('fs');

var folders: Array<string> = ['Scripts', 'Scenes', 'Prefabs', 'Materials', 'Textures', 'Audio'];

export function GenerateOrganizationFolders(path: string)
{
    for(var j = 0; j <folders.length; j++){
        var dir = path + folders[j];
        fs.mkdir(dir, function (err) {
            // dir has now been created
            // Creating checks to see if the folders exist with fs.stat, EEXIST and ENOENT errs 
            // prevent folders from being recreated if they are ever deleted by user. 
            console.log(err);
        });       
    }
}
