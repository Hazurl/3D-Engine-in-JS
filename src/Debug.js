class Debug {
	static init () {
		this.mem = new Array();
	}

	static err (e) {
		Debug.error ("File : " + e.file + " at line " + e.line + " an error occured ! \n" + e.msg);
	}

	static log (obj, color) {
		if (color)
			console.log('%c' + obj, color);
		else
			console.log(obj);
	}

	static log_i (obj, color) {
		if (color)
			console.log('%c' + obj, color + 'font-style : italic;');
		else
			console.log(obj);
	}

	static log_g (obj, color) {
		if (color)
			console.log('%c' + obj, color + 'font-weight: bold;');
		else
			console.log(obj);
	}

	static log_ig (obj, color) {
		if (color)
			console.log('%c' + obj, color + 'font-weight: bold;font-style : italic;');
		else
			console.log(obj);
	}

	static info () {
		console.log.apply(null, arguments);
	}

	static error (err) {
		console.error(err);
	}

	static matrix (m, color) {
		color = color || this.COLOR.GREY;
		var l = m.lines;
		var c = m.columns;
		for (var i = 0; i < l; i++) {
			var line = "";
			for (var j = 0; j < c; j++) {
				line += m.get(i, j);
				if (j < c - 1)
					line += '; ';
			}
			Debug.log(line, color);
		}
	}

	static incrementMem (name) {
		this.mem[name] = (this.mem[name] + 1) || 1;
	}

	static memoryDebugging () {
		for (var name in this.mem)
			Debug.log_g("\"" + name + "\" has been created " + this.mem[name] + " times !", this.COLOR.BLUE);
	}

	static get COLOR () { return {GREY : 'color:#aaaaaa;', RED : 'color:#ff2222;', GREEN : 'color:#55aa22;', BLUE : 'color:#2255aa;'}; }
}

class Err {
	constructor (file, line, msg) {
		this.file = file; this.line = line; this.msg = msg;
	}
}

Object.defineProperty(this, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(this, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
});

Object.defineProperty(this, '__file', {
  get: function(){
    return __stack[1].getFileName().split('/').slice(-1)[0];
  }
});

