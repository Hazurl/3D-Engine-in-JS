class Debug {
	static init () {
		this.mem = new Array();
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

	static incrementMem (name) {
		this.mem[name] = (this.mem[name] + 1) || 1;
	}

	static memoryDebugging () {
		for (var name in this.mem)
			Debug.log_g(name + " has been created " + this.mem[name] + " times !", this.COLOR.BLUE);
	}

	static get COLOR () { return {GREY : 'color:#aaaaaa;', RED : 'color:#ff2222;', GREEN : 'color:#55aa22;', BLUE : 'color:#2255aa;'}; }
}