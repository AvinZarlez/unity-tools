// 
// Mocha tests
// Overkill for this project, but adding them none the lesss
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// Testibe code from search.ts
import * as myExtension from '../src/search';

// Defines a Mocha test suite to group tests of similar kind together
suite("Search.ts -> prepareInput", () => {

	// Defines a Mocha unit test
	test("Check string AND whitespace trimming", () => {
		assert.equal(myExtension.prepareInput("   abc   ", 2, 8),"abc");
	});
		
	test("Check wrong input", () => {
		assert.equal(myExtension.prepareInput("abc", 1,0),"");
	});
		
	test("Check trims newline", () => {
		assert.equal(myExtension.prepareInput("abc  \n       ",0, 8),"abc");
	});
});