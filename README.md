# parse.js

AngularJS 1.x parser, ported as a standalone library

### Installation
```
bower install --save parse.js
```

### Usage
To create a parser you will need of two classes, `Lexer` and `Parser`, you will implement a `Lexer` instance in the `Parser` one. See the usage example bellow to more information:

```js
var filters = {
	json: function (input) {
		return JSON.stringify(input);
	}
};
function MyFilterService(filterName) {
	return filters[filterName];
}

var parseOptions = {
	csp: true // content security policy mode
};
var lexer = new Lexer();
var parser = new Parser(lexer, MyFilterService, parseOptions);
var value = parser.parse('x + y * z')({
	x: 10,
	y: 4,
	z: 8
});
// value === 42
```

The `parseOptions` or `MyFilterService` param is not mandatory. The `MyFilterService` is similar to AngularJS filters, you can compile any expression with a filter, just like we do in AngularJS:

```js
myVar | myFilterName
```

If exists, it will execute the param passed (in our example case `MyFilterService`) with the filterName in the first param of the call, so you can do whatever you please with it. In case that we do not have any filter service defined, it will use a default function which just return the input.