// 
// Mocha tests
// Overkill for this project, but adding them none the lesss
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// Testibe code from search.ts
import * as myExtension from '../src/search';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

	// Defines a Mocha unit test
	test("Something 1", () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});