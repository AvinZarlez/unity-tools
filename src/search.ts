// Unity search url broken up to allow for documentation version
let unity_search_root = "http://docs.unity3d.com/";
let unity_search_path = "ScriptReference/30_search.html";
let unity_search_url = "?q=";
let msft_search = "https://docs.microsoft.com/";
let msft_search_url = "en-us/search/index?search=";

import * as vscode from 'vscode';
const open = require('open');

export async function openURL(search_base?: string, s?: string) {
	if (search_base === "open") { await vscode.env.openExternal(vscode.Uri.parse(s as string)); } else {
		var search_blank_url, search_url;
		var local:boolean = false;
		var appPath:string = "";

		if (search_base === "unity") {
			var settings: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('unity-tools');
			var localPath: string = settings.get('localDocumentationPath',"");
			
			if (localPath === "") {
				var documentationVersion: string = settings.get('documentationVersion',"");
				if (documentationVersion === "") {
					search_blank_url = unity_search_root+unity_search_path;
				}
				else
				{
					search_blank_url = unity_search_root + documentationVersion + "/Documentation/" + unity_search_path;
				}
			}
			else
			{
				appPath = settings.get('localDocumentationViewer',"");
				search_blank_url = "file:///"+localPath+"/30_search.html";
				local = true;
			}
			search_url = search_blank_url+unity_search_url;
		}
		else if (search_base === "msft") {
			search_blank_url = msft_search;
			search_url = msft_search + msft_search_url;
		}

		if (!s) { s = search_blank_url; }
		else { s = search_url + s; }

		if (local) {
			await open(s as string, { app: appPath });
		}
		else
		{
			await vscode.env.openExternal(vscode.Uri.parse(s as string));
		}

	}
	return true;
}

// Slice and Trim
export function prepareInput(input: string, start: number, end: number) {
	//input is the whole line, part of which is selected by the user (defined by star/end) 

	if (start >= end) { return ""; }

	//Slice to just the selection
	input = input.slice(start, end);

	//Trim white space
	input = input.trim();

	//Possible future addition:
	//Check right here if valid variable/function name to search?

	//Everything looks good by this point, so time to open a web browser!
	return input;
}

export function openUnityDocs(input: string, start: number, end: number) {
	//Use the node module "opn" to open a web browser
	openURL("unity", prepareInput(input, start, end));
}
