!function(e,t){function n(e,t){return"undefined"!=typeof e?e:t}function r(e,t){return"undefined"==typeof e?t:"undefined"==typeof t?e:e+t}function i(e,t){var n=e(t);return!n.$stateful}function s(e,t){var n,r;switch(e.type){case A.Program:n=!0,b(e.body,function(e){s(e.expression,t),n=n&&e.expression.constant}),e.constant=n;break;case A.Literal:e.constant=!0,e.toWatch=[];break;case A.UnaryExpression:s(e.argument,t),e.constant=e.argument.constant,e.toWatch=e.argument.toWatch;break;case A.BinaryExpression:s(e.left,t),s(e.right,t),e.constant=e.left.constant&&e.right.constant,e.toWatch=e.left.toWatch.concat(e.right.toWatch);break;case A.LogicalExpression:s(e.left,t),s(e.right,t),e.constant=e.left.constant&&e.right.constant,e.toWatch=e.constant?[]:[e];break;case A.ConditionalExpression:s(e.test,t),s(e.alternate,t),s(e.consequent,t),e.constant=e.test.constant&&e.alternate.constant&&e.consequent.constant,e.toWatch=e.constant?[]:[e];break;case A.Identifier:e.constant=!1,e.toWatch=[e];break;case A.MemberExpression:s(e.object,t),e.computed&&s(e.property,t),e.constant=e.object.constant&&(!e.computed||e.property.constant),e.toWatch=[e];break;case A.CallExpression:n=e.filter?i(t,e.callee.name):!1,r=[],b(e.arguments,function(e){s(e,t),n=n&&e.constant,e.constant||r.push.apply(r,e.toWatch)}),e.constant=n,e.toWatch=e.filter&&i(t,e.callee.name)?r:[e];break;case A.AssignmentExpression:s(e.left,t),s(e.right,t),e.constant=e.left.constant&&e.right.constant,e.toWatch=[e];break;case A.ArrayExpression:n=!0,r=[],b(e.elements,function(e){s(e,t),n=n&&e.constant,e.constant||r.push.apply(r,e.toWatch)}),e.constant=n,e.toWatch=r;break;case A.ObjectExpression:n=!0,r=[],b(e.properties,function(e){s(e.value,t),n=n&&e.value.constant,e.value.constant||r.push.apply(r,e.value.toWatch)}),e.constant=n,e.toWatch=r;break;case A.ThisExpression:e.constant=!1,e.toWatch=[]}}function o(e){if(1==e.length){var n=e[0].expression,r=n.toWatch;return 1!==r.length?r:r[0]!==n?r:t}}function a(e){return e.type===A.Identifier||e.type===A.MemberExpression}function u(e){return 1===e.body.length&&a(e.body[0].expression)?{type:A.AssignmentExpression,left:e.body[0].expression,right:{type:A.NGValueParameter},operator:"="}:void 0}function c(e){return 0===e.body.length||1===e.body.length&&(e.body[0].expression.type===A.Literal||e.body[0].expression.type===A.ArrayExpression||e.body[0].expression.type===A.ObjectExpression)}function h(e){return e.constant}function p(e,t){this.astBuilder=e,this.$filter=t}function f(e,t){this.astBuilder=e,this.$filter=t}function l(){}function x(e){return!d(e)}function d(e){return"undefined"==typeof e}function m(e){return e&&e.window===e}function y(e){return isString(e)?e.toLowerCase():e}function v(e){return null!==e&&"object"==typeof e&&!O(e)}function g(e){if(null==e||m(e))return!1;var t="length"in Object(e)&&e.length;return e.nodeType===N&&t?!0:isString(e)||isArray(e)||0===t||"number"==typeof t&&t>0&&t-1 in e}function b(e,t,n){var r,i;if(e)if(isFunction(e))for(r in e)"prototype"==r||"length"==r||"name"==r||e.hasOwnProperty&&!e.hasOwnProperty(r)||t.call(n,e[r],r,e);else if(isArray(e)||g(e)){var s="object"!=typeof e;for(r=0,i=e.length;i>r;r++)(s||r in e)&&t.call(n,e[r],r,e)}else if(e.forEach&&e.forEach!==b)e.forEach(t,n,e);else if(v(e))for(r in e)t.call(n,e[r],r,e);else if("function"==typeof e.hasOwnProperty)for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e);else for(r in e)P.call(e,r)&&t.call(n,e[r],r,e);return e}function E(e,t){if("__defineGetter__"===e||"__defineSetter__"===e||"__lookupGetter__"===e||"__lookupSetter__"===e||"__proto__"===e)throw $parseMinErr("isecfld","Attempting to access a disallowed field in Angular expressions! Expression: {0}",t);return e}function k(e,t){if(e){if(e.constructor===e)throw $parseMinErr("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",t);if(e.window===e)throw $parseMinErr("isecwindow","Referencing the Window in Angular expressions is disallowed! Expression: {0}",t);if(e.children&&(e.nodeName||e.prop&&e.attr&&e.find))throw $parseMinErr("isecdom","Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}",t);if(e===Object)throw $parseMinErr("isecobj","Referencing Object in Angular expressions is disallowed! Expression: {0}",t)}return e}function w(e){return"constructor"==e}function I(e,t){if(e){if(e.constructor===e)throw $parseMinErr("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",t);if(e===j||e===C||e===_)throw $parseMinErr("isecff","Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}",t)}}function S(){return function(e){return e}}var M=function(e){this.options=e||{}};M.prototype={constructor:M,lex:function(e){for(this.text=e,this.index=0,this.tokens=[];this.index<this.text.length;){var t=this.text.charAt(this.index);if('"'===t||"'"===t)this.readString(t);else if(this.isNumber(t)||"."===t&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(t))this.readIdent();else if(this.is(t,"(){}[].,;:?"))this.tokens.push({index:this.index,text:t}),this.index++;else if(this.isWhitespace(t))this.index++;else{var n=t+this.peek(),r=n+this.peek(2),i=$[t],s=$[n],o=$[r];if(i||s||o){var a=o?r:s?n:t;this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length}else this.throwError("Unexpected next character ",this.index,this.index+1)}}return this.tokens},is:function(e,t){return-1!==t.indexOf(e)},peek:function(e){var t=e||1;return this.index+t<this.text.length?this.text.charAt(this.index+t):!1},isNumber:function(e){return e>="0"&&"9">=e&&"string"==typeof e},isWhitespace:function(e){return" "===e||"\r"===e||"	"===e||"\n"===e||""===e||" "===e},isIdent:function(e){return e>="a"&&"z">=e||e>="A"&&"Z">=e||"_"===e||"$"===e},isExpOperator:function(e){return"-"===e||"+"===e||this.isNumber(e)},throwError:function(e,t,n){n=n||this.index;var r=x(t)?"s "+t+"-"+this.index+" ["+this.text.substring(t,n)+"]":" "+n;throw $parseMinErr("lexerr","Lexer Error: {0} at column{1} in expression [{2}].",e,r,this.text)},readNumber:function(){for(var e="",t=this.index;this.index<this.text.length;){var n=y(this.text.charAt(this.index));if("."==n||this.isNumber(n))e+=n;else{var r=this.peek();if("e"==n&&this.isExpOperator(r))e+=n;else if(this.isExpOperator(n)&&r&&this.isNumber(r)&&"e"==e.charAt(e.length-1))e+=n;else{if(!this.isExpOperator(n)||r&&this.isNumber(r)||"e"!=e.charAt(e.length-1))break;this.throwError("Invalid exponent")}}this.index++}this.tokens.push({index:t,text:e,constant:!0,value:Number(e)})},readIdent:function(){for(var e=this.index;this.index<this.text.length;){var t=this.text.charAt(this.index);if(!this.isIdent(t)&&!this.isNumber(t))break;this.index++}this.tokens.push({index:e,text:this.text.slice(e,this.index),identifier:!0})},readString:function(e){var t=this.index;this.index++;for(var n="",r=e,i=!1;this.index<this.text.length;){var s=this.text.charAt(this.index);if(r+=s,i){if("u"===s){var o=this.text.substring(this.index+1,this.index+5);o.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+o+"]"),this.index+=4,n+=String.fromCharCode(parseInt(o,16))}else{var a=ESCAPE[s];n+=a||s}i=!1}else if("\\"===s)i=!0;else{if(s===e)return this.index++,void this.tokens.push({index:t,text:r,constant:!0,value:n});n+=s}this.index++}this.throwError("Unterminated quote",t)}};var A=function(e,t){this.lexer=e,this.options=t};A.Program="Program",A.ExpressionStatement="ExpressionStatement",A.AssignmentExpression="AssignmentExpression",A.ConditionalExpression="ConditionalExpression",A.LogicalExpression="LogicalExpression",A.BinaryExpression="BinaryExpression",A.UnaryExpression="UnaryExpression",A.CallExpression="CallExpression",A.MemberExpression="MemberExpression",A.Identifier="Identifier",A.Literal="Literal",A.ArrayExpression="ArrayExpression",A.Property="Property",A.ObjectExpression="ObjectExpression",A.ThisExpression="ThisExpression",A.NGValueParameter="NGValueParameter",A.prototype={ast:function(e){this.text=e,this.tokens=this.lexer.lex(e);var t=this.program();return 0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]),t},program:function(){for(var e=[];;)if(this.tokens.length>0&&!this.peek("}",")",";","]")&&e.push(this.expressionStatement()),!this.expect(";"))return{type:A.Program,body:e}},expressionStatement:function(){return{type:A.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var e,t=this.expression();e=this.expect("|");)t=this.filter(t);return t},expression:function(){return this.assignment()},assignment:function(){var e=this.ternary();return this.expect("=")&&(e={type:A.AssignmentExpression,left:e,right:this.assignment(),operator:"="}),e},ternary:function(){var e,t,n=this.logicalOR();return this.expect("?")&&(e=this.expression(),this.consume(":"))?(t=this.expression(),{type:A.ConditionalExpression,test:n,alternate:e,consequent:t}):n},logicalOR:function(){for(var e=this.logicalAND();this.expect("||");)e={type:A.LogicalExpression,operator:"||",left:e,right:this.logicalAND()};return e},logicalAND:function(){for(var e=this.equality();this.expect("&&");)e={type:A.LogicalExpression,operator:"&&",left:e,right:this.equality()};return e},equality:function(){for(var e,t=this.relational();e=this.expect("==","!=","===","!==");)t={type:A.BinaryExpression,operator:e.text,left:t,right:this.relational()};return t},relational:function(){for(var e,t=this.additive();e=this.expect("<",">","<=",">=");)t={type:A.BinaryExpression,operator:e.text,left:t,right:this.additive()};return t},additive:function(){for(var e,t=this.multiplicative();e=this.expect("+","-");)t={type:A.BinaryExpression,operator:e.text,left:t,right:this.multiplicative()};return t},multiplicative:function(){for(var e,t=this.unary();e=this.expect("*","/","%");)t={type:A.BinaryExpression,operator:e.text,left:t,right:this.unary()};return t},unary:function(){var e;return(e=this.expect("+","-","!"))?{type:A.UnaryExpression,operator:e.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var e;this.expect("(")?(e=this.filterChain(),this.consume(")")):this.expect("[")?e=this.arrayDeclaration():this.expect("{")?e=this.object():this.constants.hasOwnProperty(this.peek().text)?e=copy(this.constants[this.consume().text]):this.peek().identifier?e=this.identifier():this.peek().constant?e=this.constant():this.throwError("not a primary expression",this.peek());for(var t;t=this.expect("(","[",".");)"("===t.text?(e={type:A.CallExpression,callee:e,arguments:this.parseArguments()},this.consume(")")):"["===t.text?(e={type:A.MemberExpression,object:e,property:this.expression(),computed:!0},this.consume("]")):"."===t.text?e={type:A.MemberExpression,object:e,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return e},filter:function(e){for(var t=[e],n={type:A.CallExpression,callee:this.identifier(),arguments:t,filter:!0};this.expect(":");)t.push(this.expression());return n},parseArguments:function(){var e=[];if(")"!==this.peekToken().text)do e.push(this.expression());while(this.expect(","));return e},identifier:function(){var e=this.consume();return e.identifier||this.throwError("is not a valid identifier",e),{type:A.Identifier,name:e.text}},constant:function(){return{type:A.Literal,value:this.consume().value}},arrayDeclaration:function(){var e=[];if("]"!==this.peekToken().text)do{if(this.peek("]"))break;e.push(this.expression())}while(this.expect(","));return this.consume("]"),{type:A.ArrayExpression,elements:e}},object:function(){var e,t=[];if("}"!==this.peekToken().text)do{if(this.peek("}"))break;e={type:A.Property,kind:"init"},this.peek().constant?e.key=this.constant():this.peek().identifier?e.key=this.identifier():this.throwError("invalid key",this.peek()),this.consume(":"),e.value=this.expression(),t.push(e)}while(this.expect(","));return this.consume("}"),{type:A.ObjectExpression,properties:t}},throwError:function(e,t){throw $parseMinErr("syntax","Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",t.text,e,t.index+1,this.text,this.text.substring(t.index))},consume:function(e){if(0===this.tokens.length)throw $parseMinErr("ueoe","Unexpected end of expression: {0}",this.text);var t=this.expect(e);return t||this.throwError("is unexpected, expecting ["+e+"]",this.peek()),t},peekToken:function(){if(0===this.tokens.length)throw $parseMinErr("ueoe","Unexpected end of expression: {0}",this.text);return this.tokens[0]},peek:function(e,t,n,r){return this.peekAhead(0,e,t,n,r)},peekAhead:function(e,t,n,r,i){if(this.tokens.length>e){var s=this.tokens[e],o=s.text;if(o===t||o===n||o===r||o===i||!t&&!n&&!r&&!i)return s}return!1},expect:function(e,t,n,r){var i=this.peek(e,t,n,r);return i?(this.tokens.shift(),i):!1},constants:{"true":{type:A.Literal,value:!0},"false":{type:A.Literal,value:!1},"null":{type:A.Literal,value:null},undefined:{type:A.Literal,value:t},"this":{type:A.ThisExpression}}},p.prototype={compile:function(e,i){var a=this,p=this.astBuilder.ast(e);this.state={nextId:0,filters:{},expensiveChecks:i,fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]},s(p,a.$filter);var f,l="";if(this.stage="assign",f=u(p)){this.state.computing="assign";var x=this.nextId();this.recurse(f,x),l="fn.assign="+this.generateFunction("assign","s,v,l")}var d=o(p.body);a.stage="inputs",b(d,function(e,t){var n="fn"+t;a.state[n]={vars:[],body:[],own:{}},a.state.computing=n;var r=a.nextId();a.recurse(e,r),a.return_(r),a.state.inputs.push(n),e.watchId=t}),this.state.computing="fn",this.stage="main",this.recurse(p);var m='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+l+this.watchFns()+"return fn;",y=new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","ifDefined","plus","text",m)(this.$filter,E,k,I,n,r,e);return this.state=this.stage=t,y.literal=c(p),y.constant=h(p),y},USE:"use",STRICT:"strict",watchFns:function(){var e=[],t=this.state.inputs,n=this;return b(t,function(t){e.push("var "+t+"="+n.generateFunction(t,"s"))}),t.length&&e.push("fn.inputs=["+t.join(",")+"];"),e.join("")},generateFunction:function(e,t){return"function("+t+"){"+this.varsPrefix(e)+this.body(e)+"};"},filterPrefix:function(){var e=[],t=this;return b(this.state.filters,function(n,r){e.push(n+"=$filter("+t.escape(r)+")")}),e.length?"var "+e.join(",")+";":""},varsPrefix:function(e){return this.state[e].vars.length?"var "+this.state[e].vars.join(",")+";":""},body:function(e){return this.state[e].body.join("")},recurse:function(e,n,r,i,s,o){var u,c,h,p,f=this;if(i=i||l,!o&&x(e.watchId))return n=n||this.nextId(),void this.if_("i",this.lazyAssign(n,this.computedMember("i",e.watchId)),this.lazyRecurse(e,n,r,i,s,!0));switch(e.type){case A.Program:b(e.body,function(n,r){f.recurse(n.expression,t,t,function(e){c=e}),r!==e.body.length-1?f.current().body.push(c,";"):f.return_(c)});break;case A.Literal:p=this.escape(e.value),this.assign(n,p),i(p);break;case A.UnaryExpression:this.recurse(e.argument,t,t,function(e){c=e}),p=e.operator+"("+this.ifDefined(c,0)+")",this.assign(n,p),i(p);break;case A.BinaryExpression:this.recurse(e.left,t,t,function(e){u=e}),this.recurse(e.right,t,t,function(e){c=e}),p="+"===e.operator?this.plus(u,c):"-"===e.operator?this.ifDefined(u,0)+e.operator+this.ifDefined(c,0):"("+u+")"+e.operator+"("+c+")",this.assign(n,p),i(p);break;case A.LogicalExpression:n=n||this.nextId(),f.recurse(e.left,n),f.if_("&&"===e.operator?n:f.not(n),f.lazyRecurse(e.right,n)),i(n);break;case A.ConditionalExpression:n=n||this.nextId(),f.recurse(e.test,n),f.if_(n,f.lazyRecurse(e.alternate,n),f.lazyRecurse(e.consequent,n)),i(n);break;case A.Identifier:n=n||this.nextId(),r&&(r.context="inputs"===f.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",e.name)+"?l:s"),r.computed=!1,r.name=e.name),E(e.name),f.if_("inputs"===f.stage||f.not(f.getHasOwnProperty("l",e.name)),function(){f.if_("inputs"===f.stage||"s",function(){s&&1!==s&&f.if_(f.not(f.nonComputedMember("s",e.name)),f.lazyAssign(f.nonComputedMember("s",e.name),"{}")),f.assign(n,f.nonComputedMember("s",e.name))})},n&&f.lazyAssign(n,f.nonComputedMember("l",e.name))),(f.state.expensiveChecks||w(e.name))&&f.addEnsureSafeObject(n),i(n);break;case A.MemberExpression:u=r&&(r.context=this.nextId())||this.nextId(),n=n||this.nextId(),f.recurse(e.object,u,t,function(){f.if_(f.notNull(u),function(){e.computed?(c=f.nextId(),f.recurse(e.property,c),f.addEnsureSafeMemberName(c),s&&1!==s&&f.if_(f.not(f.computedMember(u,c)),f.lazyAssign(f.computedMember(u,c),"{}")),p=f.ensureSafeObject(f.computedMember(u,c)),f.assign(n,p),r&&(r.computed=!0,r.name=c)):(E(e.property.name),s&&1!==s&&f.if_(f.not(f.nonComputedMember(u,e.property.name)),f.lazyAssign(f.nonComputedMember(u,e.property.name),"{}")),p=f.nonComputedMember(u,e.property.name),(f.state.expensiveChecks||w(e.property.name))&&(p=f.ensureSafeObject(p)),f.assign(n,p),r&&(r.computed=!1,r.name=e.property.name))},function(){f.assign(n,"undefined")}),i(n)},!!s);break;case A.CallExpression:n=n||this.nextId(),e.filter?(c=f.filter(e.callee.name),h=[],b(e.arguments,function(e){var t=f.nextId();f.recurse(e,t),h.push(t)}),p=c+"("+h.join(",")+")",f.assign(n,p),i(n)):(c=f.nextId(),u={},h=[],f.recurse(e.callee,c,u,function(){f.if_(f.notNull(c),function(){f.addEnsureSafeFunction(c),b(e.arguments,function(e){f.recurse(e,f.nextId(),t,function(e){h.push(f.ensureSafeObject(e))})}),u.name?(f.state.expensiveChecks||f.addEnsureSafeObject(u.context),p=f.member(u.context,u.name,u.computed)+"("+h.join(",")+")"):p=c+"("+h.join(",")+")",p=f.ensureSafeObject(p),f.assign(n,p)},function(){f.assign(n,"undefined")}),i(n)}));break;case A.AssignmentExpression:if(c=this.nextId(),u={},!a(e.left))throw $parseMinErr("lval","Trying to assing a value to a non l-value");this.recurse(e.left,t,u,function(){f.if_(f.notNull(u.context),function(){f.recurse(e.right,c),f.addEnsureSafeObject(f.member(u.context,u.name,u.computed)),p=f.member(u.context,u.name,u.computed)+e.operator+c,f.assign(n,p),i(n||p)})},1);break;case A.ArrayExpression:h=[],b(e.elements,function(e){f.recurse(e,f.nextId(),t,function(e){h.push(e)})}),p="["+h.join(",")+"]",this.assign(n,p),i(p);break;case A.ObjectExpression:h=[],b(e.properties,function(e){f.recurse(e.value,f.nextId(),t,function(t){h.push(f.escape(e.key.type===A.Identifier?e.key.name:""+e.key.value)+":"+t)})}),p="{"+h.join(",")+"}",this.assign(n,p),i(p);break;case A.ThisExpression:this.assign(n,"s"),i("s");break;case A.NGValueParameter:this.assign(n,"v"),i("v")}},getHasOwnProperty:function(e,t){var n=e+"."+t,r=this.current().own;return r.hasOwnProperty(n)||(r[n]=this.nextId(!1,e+"&&("+this.escape(t)+" in "+e+")")),r[n]},assign:function(e,t){return e?(this.current().body.push(e,"=",t,";"),e):void 0},filter:function(e){return this.state.filters.hasOwnProperty(e)||(this.state.filters[e]=this.nextId(!0)),this.state.filters[e]},ifDefined:function(e,t){return"ifDefined("+e+","+this.escape(t)+")"},plus:function(e,t){return"plus("+e+","+t+")"},return_:function(e){this.current().body.push("return ",e,";")},if_:function(e,t,n){if(e===!0)t();else{var r=this.current().body;r.push("if(",e,"){"),t(),r.push("}"),n&&(r.push("else{"),n(),r.push("}"))}},not:function(e){return"!("+e+")"},notNull:function(e){return e+"!=null"},nonComputedMember:function(e,t){return e+"."+t},computedMember:function(e,t){return e+"["+t+"]"},member:function(e,t,n){return n?this.computedMember(e,t):this.nonComputedMember(e,t)},addEnsureSafeObject:function(e){this.current().body.push(this.ensureSafeObject(e),";")},addEnsureSafeMemberName:function(e){this.current().body.push(this.ensureSafeMemberName(e),";")},addEnsureSafeFunction:function(e){this.current().body.push(this.ensureSafeFunction(e),";")},ensureSafeObject:function(e){return"ensureSafeObject("+e+",text)"},ensureSafeMemberName:function(e){return"ensureSafeMemberName("+e+",text)"},ensureSafeFunction:function(e){return"ensureSafeFunction("+e+",text)"},lazyRecurse:function(e,t,n,r,i,s){var o=this;return function(){o.recurse(e,t,n,r,i,s)}},lazyAssign:function(e,t){var n=this;return function(){n.assign(e,t)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)},escape:function(e){if(isString(e))return"'"+e.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(isNumber(e))return e.toString();if(e===!0)return"true";if(e===!1)return"false";if(null===e)return"null";if("undefined"==typeof e)return"undefined";throw $parseMinErr("esc","IMPOSSIBLE")},nextId:function(e,t){var n="v"+this.state.nextId++;return e||this.current().vars.push(n+(t?"="+t:"")),n},current:function(){return this.state[this.state.computing]}},f.prototype={compile:function(e,t){var n=this,r=this.astBuilder.ast(e);this.expression=e,this.expensiveChecks=t,s(r,n.$filter);var i,a;(i=u(r))&&(a=this.recurse(i));var p,f=o(r.body);f&&(p=[],b(f,function(e,t){var r=n.recurse(e);e.input=r,p.push(r),e.watchId=t}));var l=[];b(r.body,function(e){l.push(n.recurse(e.expression))});var x=0===r.body.length?function(){}:1===r.body.length?l[0]:function(e,t){var n;return b(l,function(r){n=r(e,t)}),n};return a&&(x.assign=function(e,t,n){return a(e,n,t)}),p&&(x.inputs=p),x.literal=c(r),x.constant=h(r),x},recurse:function(e,n,r){var i,s,o,a=this;if(e.input)return this.inputs(e.input,e.watchId);switch(e.type){case A.Literal:return this.value(e.value,n);case A.UnaryExpression:return s=this.recurse(e.argument),this["unary"+e.operator](s,n);case A.BinaryExpression:return i=this.recurse(e.left),s=this.recurse(e.right),this["binary"+e.operator](i,s,n);case A.LogicalExpression:return i=this.recurse(e.left),s=this.recurse(e.right),this["binary"+e.operator](i,s,n);case A.ConditionalExpression:return this["ternary?:"](this.recurse(e.test),this.recurse(e.alternate),this.recurse(e.consequent),n);case A.Identifier:return E(e.name,a.expression),a.identifier(e.name,a.expensiveChecks||w(e.name),n,r,a.expression);case A.MemberExpression:return i=this.recurse(e.object,!1,!!r),e.computed||(E(e.property.name,a.expression),s=e.property.name),e.computed&&(s=this.recurse(e.property)),e.computed?this.computedMember(i,s,n,r,a.expression):this.nonComputedMember(i,s,a.expensiveChecks,n,r,a.expression);case A.CallExpression:return o=[],b(e.arguments,function(e){o.push(a.recurse(e))}),e.filter&&(s=this.$filter(e.callee.name)),e.filter||(s=this.recurse(e.callee,!0)),e.filter?function(e,r,i,a){for(var u=[],c=0;c<o.length;++c)u.push(o[c](e,r,i,a));var h=s.apply(t,u,a);return n?{context:t,name:t,value:h}:h}:function(e,t,r,i){var u,c=s(e,t,r,i);if(null!=c.value){k(c.context,a.expression),I(c.value,a.expression);for(var h=[],p=0;p<o.length;++p)h.push(k(o[p](e,t,r,i),a.expression));u=k(c.value.apply(c.context,h),a.expression)}return n?{value:u}:u};case A.AssignmentExpression:return i=this.recurse(e.left,!0,1),s=this.recurse(e.right),function(e,t,r,o){var u=i(e,t,r,o),c=s(e,t,r,o);return k(u.value,a.expression),u.context[u.name]=c,n?{value:c}:c};case A.ArrayExpression:return o=[],b(e.elements,function(e){o.push(a.recurse(e))}),function(e,t,r,i){for(var s=[],a=0;a<o.length;++a)s.push(o[a](e,t,r,i));return n?{value:s}:s};case A.ObjectExpression:return o=[],b(e.properties,function(e){o.push({key:e.key.type===A.Identifier?e.key.name:""+e.key.value,value:a.recurse(e.value)})}),function(e,t,r,i){for(var s={},a=0;a<o.length;++a)s[o[a].key]=o[a].value(e,t,r,i);return n?{value:s}:s};case A.ThisExpression:return function(e){return n?{value:e}:e};case A.NGValueParameter:return function(e,t,r,i){return n?{value:r}:r}}},"unary+":function(e,t){return function(n,r,i,s){var o=e(n,r,i,s);return o=x(o)?+o:0,t?{value:o}:o}},"unary-":function(e,t){return function(n,r,i,s){var o=e(n,r,i,s);return o=x(o)?-o:0,t?{value:o}:o}},"unary!":function(e,t){return function(n,r,i,s){var o=!e(n,r,i,s);return t?{value:o}:o}},"binary+":function(e,t,n){return function(i,s,o,a){var u=e(i,s,o,a),c=t(i,s,o,a),h=r(u,c);return n?{value:h}:h}},"binary-":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o),u=t(r,i,s,o),c=(x(a)?a:0)-(x(u)?u:0);return n?{value:c}:c}},"binary*":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)*t(r,i,s,o);return n?{value:a}:a}},"binary/":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)/t(r,i,s,o);return n?{value:a}:a}},"binary%":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)%t(r,i,s,o);return n?{value:a}:a}},"binary===":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)===t(r,i,s,o);return n?{value:a}:a}},"binary!==":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)!==t(r,i,s,o);return n?{value:a}:a}},"binary==":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)==t(r,i,s,o);return n?{value:a}:a}},"binary!=":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)!=t(r,i,s,o);return n?{value:a}:a}},"binary<":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)<t(r,i,s,o);return n?{value:a}:a}},"binary>":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)>t(r,i,s,o);return n?{value:a}:a}},"binary<=":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)<=t(r,i,s,o);return n?{value:a}:a}},"binary>=":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)>=t(r,i,s,o);return n?{value:a}:a}},"binary&&":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)&&t(r,i,s,o);return n?{value:a}:a}},"binary||":function(e,t,n){return function(r,i,s,o){var a=e(r,i,s,o)||t(r,i,s,o);return n?{value:a}:a}},"ternary?:":function(e,t,n,r){return function(i,s,o,a){var u=e(i,s,o,a)?t(i,s,o,a):n(i,s,o,a);return r?{value:u}:u}},value:function(e,n){return function(){return n?{context:t,name:t,value:e}:e}},identifier:function(e,n,r,i,s){return function(o,a,u,c){var h=a&&e in a?a:o;i&&1!==i&&h&&!h[e]&&(h[e]={});var p=h?h[e]:t;return n&&k(p,s),r?{context:h,name:e,value:p}:p}},computedMember:function(e,t,n,r,i){return function(s,o,a,u){var c,h,p=e(s,o,a,u);return null!=p&&(c=t(s,o,a,u),E(c,i),r&&1!==r&&p&&!p[c]&&(p[c]={}),h=p[c],k(h,i)),n?{context:p,name:c,value:h}:h}},nonComputedMember:function(e,n,r,i,s,o){return function(a,u,c,h){var p=e(a,u,c,h);s&&1!==s&&p&&!p[n]&&(p[n]={});var f=null!=p?p[n]:t;return(r||w(n))&&k(f,o),i?{context:p,name:n,value:f}:f}},inputs:function(e,t){return function(n,r,i,s){return s?s[t]:e(n,r,i)}}};var O=(Object.prototype.toString,Object.getPrototypeOf),j=Function.prototype.call,C=Function.prototype.apply,_=Function.prototype.bind,P=Object.prototype.hasOwnProperty,N=1,$={};b("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(e){$[e]=!0});var L=function(e,t,n){t=t||S,n=n||{},this.lexer=e,this.$filter=t,this.options=n,this.ast=new A(this.lexer),this.astCompiler=n.csp?new f(this.ast,t):new p(this.ast,t)};L.prototype={constructor:L,parse:function(e){return this.astCompiler.compile(e,this.options.expensiveChecks)}},e.Parser=L,e.Lexer=M}(window,void 0);