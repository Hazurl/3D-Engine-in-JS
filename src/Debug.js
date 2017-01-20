class Debug {
	static init () {
		this.mem = new Array();
	}

	static log (obj) {
		console.log(obj);
	}

	static error (err) {
		console.error(err);
	}

	static incrementMem (name) {
		this.mem[name] = (this.mem[name] + 1) || 1;
	}

	static memoryDebugging () {
		console.log(this.mem);
		this.mem.forEach(function (count, name) {
			Debug.log(name + " has been created " + count + " times !");
		});
		console.log(this.mem);
	}
}