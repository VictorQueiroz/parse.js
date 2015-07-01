function defaultFilterFn () {
  return function (input) {
    return input;
  };
}

/**
 * @constructor
 */
var Parser = function(lexer, $filter, options) {
  $filter = $filter || defaultFilterFn;
  options = options || {};

  this.lexer = lexer;
  this.$filter = $filter;
  this.options = options;
  this.ast = new AST(this.lexer);
  this.astCompiler = options.csp ? new ASTInterpreter(this.ast, $filter) :
                                   new ASTCompiler(this.ast, $filter);
};

Parser.prototype = {
  constructor: Parser,

  parse: function(text) {
    return this.astCompiler.compile(text, this.options.expensiveChecks);
  }
};