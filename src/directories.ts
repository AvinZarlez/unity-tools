let fs = require('fs');

export function GenerateOrganizationFolders(path: string, generationFolders: string[])
{
    for(var j = 0; j <generationFolders.length; j++){
        var dir = path + generationFolders[j];
        fs.mkdir(dir, function (err: Error) {
            // dir has now been created
            // Cannot use the following methods to check if folders already exist: fs.stat, EEXIST and ENOENT;
            // the methods prevent folders from being recreated if they are ever deleted by user. 
        });       
    }
}
