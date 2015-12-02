import * as vscode from 'vscode'; 
let open = require("open");

let search_blank_url 	= "http://docs.unity3d.com/ScriptReference/30_search.html";
let search_url 			= search_blank_url+"?q=";

function openDocErrorMessage (str) {
	vscode.window.showErrorMessage("Error: "+str,"Open Docs").then(function (item) {
		if (item === "Open Docs") {
			open(search_blank_url);
		}
	};
	return false;
}

export function activate(context: vscode.ExtensionContext) {

	//Tell the user the extension has been activated.
	console.log('Unity Tools extension is now active!'); 

	// Open Unity Documentation, when you already have something you want to search selected
	var open_unity_docs = vscode.commands.registerTextEditorCommand("extension.openUnityDocs",
		(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		
		// selection[0] is the start, and selection[1] is the end
		let selection = [textEditor.selections[0].start, textEditor.selections[0].end];
		
		if ((selection[0].line != selection[1].line)) {
			openDocErrorMessage("Multiple lines selected, please just select a class.");
			return false;
		}
		
		// If there is nothing, or the end is before the start
		if ((selection[0].character >= selection[1].character)) {
			
			openDocErrorMessage("Nothing is selected. Please select a class!");
			return false;
		}
		
		//Get the whole line of code with the selection
		let line = textEditor.document.lineAt(selection[0].line).text;
		
		//Slice to just the selection
		line = line.slice(selection[0].character, selection[1].character);
		
		//Trim white space
		line = line.trim();
		
		//Possible future addition:
		//Check right here if valid variable/function name to search?
		
		//Everything looks good by this point, so time to open a web browser!
		
		//Use the node module "open" to open a web browser
		open(search_url+line);
		
	});
	context.subscriptions.push(open_unity_docs);
	
	var search_unity_docs = vscode.commands.registerCommand("extension.searchUnityDocs",()=>{
		vscode.window.showInputBox({
			prompt: "Search the Unity Documentation:"
		}).then((result) => {
			//Use the node module "open" to open a web browser
			open(search_url+result);
		});
	});
	context.subscriptions.push(search_unity_docs);
}