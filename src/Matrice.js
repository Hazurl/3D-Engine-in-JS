class Matrice {
	constructor (lines, columns, default) {
		this.lines = lines || 1;
		this.columns = columns || 1;
		default = default || 0;
		this.data = new Array(lines * columns);
		for (var i = this.data.length - 1; i >= 0; i--)
			this.data[i] = default;
	}

	cp () {
		var out = new Matrice(this.lines, this.columns);
		out.forEach( (i) => out.data[i] = this.i);
		return out;
	}

	get (l, c) {
		return this.data[l + c * this.lines];
	}

	set (l, c, d) {
		return this.data[l + c * this.lines] = d;
	}

	has (l, c) {
		return l < this.lines && c < this.columns;
	}

	forEach (callback) { // callback : (index, line, col)
		for (var i = this.data.length - 1; i >= 0; i--)
			callback(i, i % this.columns, Math.floor(i / this.lines));
	}

	add (m) {
		if (m.lines != this.lines || m.columns != this.columns)
			throw new Err (__file, __line, "Impossible to add a matrice with different size (use directAdd instead)");
		this.forEach( (i) => this.data[i] = this.data[i] + m.data[i]; );
	}

	mult (x) {
		this.forEach( (i) => this.data[i] = this.data[i] * x; );
	}

	scalar (m) {
		if (m.lines != this.columns)
			throw new Err (__file, __line, "Impossible to use scalar product : the columns of the first must be equals to the lines of the second");

		var out = new Matrice (this.lines, m.columns);
		out.forEach((i, c, l) => {
			out.data[i] = 
		});

		return out;
	}

	directAdd (m) {
		var out = new Matrice (m.lines + this.lines, m.columns + this.columns);

		out.forEach( (i, c, l) => {
			if (this.has(c, l))
				out.data[i] = this.get(c, l);
			else if (m.has(c + this.lines, l + this.columns))
				out.data[i] = m.get(c, l);
			else 
				out.data[i] = 0;
		});

		return out;
	}

	invert () {
		this.forEach ( (i) => this.data[i] = -this.data[i]; );
	}

	static identity (s, default, nul) {
		default = default || 1;
		nul = nul || 0;
		var out = new Matrice(s, s, nul);
		for (var i = s - 1; i >= 0; i--)
			out.data[i + s * i] = default;
		return out;
	}
}