function $filter (filterName) {
	var filterFn = $filter.filters[filterName] || $filter.defaultFn;
	return filterFn;
}

$filter.define = function (filterName, fn) {
	$filter.filters[filterName] = fn();
};

$filter.defaultFn = function (input) { return input; };

$filter.filters = {
	lowercase: function (input) {
		return lowercase(input);
	},
	json: function (input) {
		return JSON.stringify(input);
	}
};

describe('parse', function () {
	var parser;

	beforeEach(function () {
		var lexer = new Lexer();
		parser = new Parser(lexer, $filter);
	});

	it('should parse an expression', function () {
		assert.equal(2, parser.parse('1 + 1')());
	});

	it('should support filters', function () {
		$filter.define('multiplier_1', function () {
			return function (input ) {
				return Math.pow(input, 2);
			};
		});

		var value = parser.parse('myVar | multiplier_1')({
			myVar: 8
		});

		assert.equal(64, value);
	});
});