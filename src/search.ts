let unity_search 		= "http://docs.unity3d.com/ScriptReference/30_search.html";
let unity_search_url 	= unity_search + "?q=";
let msdn_search 		= "https://social.msdn.microsoft.com/search/";
let msdn_search_url 	= msdn_search + "?query=";

//Open a URL using the npm module "opn"
let opn = require('opn');

export function openURL(search_base?: string, s?: string) {
    if (search_base === "open") { opn(s); } else {
		var search_blank_url, search_url;

		if (search_base === "unity") {
			search_blank_url = unity_search;
			search_url = unity_search_url;
		}
		else if (search_base === "msdn") {
			search_blank_url = msdn_search;
			search_url = msdn_search_url;
		}

		if (!s) { s = search_blank_url; }
		else { s = search_url + s; }
		
		opn(s);
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
	openURL("unity",prepareInput(input, start, end));
}
