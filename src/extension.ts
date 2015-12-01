// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'; 

function isAlphaNumeric(str) {
  let code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "open-unity-docs" is now active!'); 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var open_unity_docs = vscode.commands.registerTextEditorCommand("extension.openUnityDocs", (textEdtior: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		let selection = [textEdtior.selections[0].start, textEdtior.selections[0].end];
		
		if ((selection[0].line != selection[1].line)) {
			vscode.window.showErrorMessage("Error: Multiple lines selected, please just select a class.");
			return false;
		}
		if ((selection[0].character >= selection[1].character)) {
			vscode.window.showErrorMessage("Error: Nothing is selected. Please select a class!");
			return false;
		}
		
		//Get the whole line of code with the selection
		let line = textEdtior.document.lineAt(selection[0].line).text;
		
		//Slice to just the selection
		line = line.slice(selection[0].character, selection[1].character);
		
		//Trim white space
		line = line.trim();
		
		//Are there any non-alphanumeric characters?
		if (!isAlphaNumeric(line)) {
			vscode.window.showErrorMessage("Error: Not a valid selection, please just select a class.");
			return false;
		}
		
		//If everything is good, open a web browser!
		console.log("HHH "+line+" HHH");
		
	});
	context.subscriptions.push(open_unity_docs);
}