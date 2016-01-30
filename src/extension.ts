import * as vscode from 'vscode';
import * as search from './search';
import * as directories from './directories';

function openDocErrorMessage (str) {
	return vscode.window.showErrorMessage("Error: " + str, "Open Docs").then((item) => {
		if (item === "Open Docs") {
			search.openURL();
		}
	});
}

export function activate(context: vscode.ExtensionContext) {

	//Tell the user the extension has been activated.
	console.log('Unity Tools extension is now active!'); 

	// Open Unity Documentation, when you already have something you want to search selected
	var open_docs = vscode.commands.registerTextEditorCommand("extension.unityOpenDocs",
		(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
				
			// selection[0] is the start, and selection[1] is the end
			let selection = textEditor.selection;
			
			if (!selection.isSingleLine) {
				openDocErrorMessage("Multiple lines selected, please just select a class.");
				return;
			}
			
			// If there is nothing, or the end is before the start
			if (selection.isEmpty) {
				
				openDocErrorMessage("Nothing is selected. Please select a class!");
				return;
			}
			
			//Get the whole line of code with the selection
			let line = textEditor.document.lineAt(selection.start.line).text;
		
			search.openUnityDocs(line, selection.start.character, selection.end.character)
	});
	context.subscriptions.push(open_docs);
	
	var search_docs = vscode.commands.registerCommand("extension.unitySearchDocs",()=>{
		vscode.window.showInputBox({
			prompt: "Search the Unity Documentation:"
		}).then((result) => {
			if (result != undefined) {	
				//Use the node module "open" to open a web browser
				search.openURL(result);
			}
		});
	});
	context.subscriptions.push(search_docs);
    
	var open_vscode_docs = vscode.commands.registerCommand("extension.unityOpenVSCodeDocs",()=>{
		// Using OpenURL from search to open VS Documentation.
        // Passing "true" to open the URL directly (instead of searching Unity docs)
        search.openURL("https://code.visualstudio.com/Docs/runtimes/unity", true);
        
	});
	context.subscriptions.push(open_vscode_docs);

	var get_assetstore_plugin = vscode.commands.registerCommand("extension.unityGetAssetStorePlugin",()=>{
		search.openURL("http://u3d.as/jmM", true);
        return vscode.window.showErrorMessage("Add to your Unity project, and remember check \"Enable Integration\"","How To","Git").then((item) => {
		  if (item === "How To") {
			// Using OpenURL from search to open Unity plug-in Documentation in git repo.
            // Passing "true" to open the URL directly (instead of searching Unity docs)
            search.openURL("https://github.com/dotBunny/VSCode/blob/master/HOWTO.pdf",true);
		  } else if (item === "Git") {
			// Using OpenURL from search to open Unity plug-in git repo.
            // Passing "true" to open the URL directly (instead of searching Unity docs)
            search.openURL("https://github.com/dotBunny/VSCode/",true);
          }
	    });
	});
	context.subscriptions.push(get_assetstore_plugin);
    
    var create_Directories = vscode.commands.registerCommand("extension.unityCreateDirectories", () => {
        var rootPath = vscode.workspace.rootPath + '/Assets/';
        if (vscode.workspace.rootPath == undefined || rootPath == undefined) {
            vscode.window.showErrorMessage("You are not in the proper Project Folder");
        }
        else{
            directories.GenerateOrganizationFolders(rootPath); 
        }
    
    });
    context.subscriptions.push(create_Directories);  
   
}