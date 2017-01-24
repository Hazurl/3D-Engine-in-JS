class Matrix {
	constructor (lines, columns, def) {
        Debug.incrementMem('matrix');

		this.lines = lines || 1;
		this.columns = columns || 1;
		def = def || 0;
		this.data = new Array(lines * columns);
		for (var i = this.data.length - 1; i >= 0; i--)
			this.data[i] = def;
	}

	get size () { return this.lines * this.columns; }

	cp () {
		var out = new matrix(this.lines, this.columns);
		out.forEach( (i) => out.data[i] = this.i );
		return out;
	}

	get (l, c) {
		return this.data[l + c * this.lines];
	}

	set (l, c, d) {
		return this.data[l + c * this.lines] = d;
	}

	setAll () {
		if (arguments.length != this.size) {
			Debug.error ("Matrix : can't assign a different matrix size");
			return;
		}

		for (var i = arguments.length - 1; i >= 0; i--) {
			this.data[i] = arguments[i];
		}
		return this;
	}

	has (l, c) {
		return l < this.lines && c < this.columns;
	}

	forEach (callback) { // callback : (index, line, col)
		for (var i = this.data.length - 1; i >= 0; i--)
			this.data[i] = callback(i, i % this.columns, Math.floor(i / this.lines)) || this.data[i];
	}

	add (m) {
		if (m.lines != this.lines || m.columns != this.columns)
			throw new Err (__file, __line, "Impossible to add a matrice with different size (use directAdd instead)");
		this.forEach( (i) => (this.data[i] + m.data[i]) );
		return this;
	}

	mult (x) {
		this.forEach( (i) => (this.data[i] * x) );
		return this;
	}

	scalar (m) {
		if (m.lines != this.columns)
			throw new Err (__file, __line, "Impossible to use scalar product : the columns of the first must be equals to the lines of the second");

		var out = new matrix (this.lines, m.columns, 0);
		var n = m.lines;

		out.forEach((i, c, l) => {
			var tmp = 0;
			for (var k = 0; k < n; k++)
				tmp += this.get(c, k) * m.get(k, l);
			return tmp;
		});

		return out;
	}

	toVector3 () {
		if (this.lines >= 3 || this.columns != 1)
			throw new Err (__file, __line, "Matrice not 3 by 1 can't be converted to Vector3");
		return new Vector3 (this.data[0] || 0, this.data[1] || 0, this.data[2] || 0)
	}

	directAdd (m) {
		var out = new matrix (m.lines + this.lines, m.columns + this.columns);

		out.forEach( (i, c, l) => {
			if (this.has(c, l))
				return this.get(c, l);
			else if (m.has(c + this.lines, l + this.columns))
				return m.get(c, l);
			else 
				return 0;
		});

		return out;
	}

	invert () {
		this.forEach ( (i) => -this.data[i] );
		return this;
	}

	transpose () {
		var _ = this.lines;
		this.lines = this.columns;
		this.columns = _;

		var data = new Array(this.lines * this.columns);
		this.forEach( (i, c, l) => this.get(c, l));
		this.data = data;
		return this;
	}

	static identity (s, def, nul) {
		def = def || 1;
		nul = nul || 0;
		var out = new matrix(s, s, nul);
		for (var i = s - 1; i >= 0; i--)
			out.data[i + s * i] = def;
		return out;
	}
}