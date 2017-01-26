class Matrix {
	constructor (lines, columns, def) {
        Debug.incrementMem('Matrix');

		this.lines = lines || 1;
		this.columns = columns || 1;
		def = def || 0;
		this.data = new Array(lines * columns);
		for (var i = this.data.length - 1; i >= 0; i--)
			this.data[i] = def;
	}

	get size () { return this.lines * this.columns; }

	cp () {
		var out = new Matrix(this.lines, this.columns);
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
			Debug.error ("Matrix : can't assign a different Matrix size");
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

	equalsTo (m) {
		for (var i = this.size - 1; i >= 0; i--)
			if (m.data[i] != this.data[i])
				return false;

		return true;
	}

	forEach (callback) { // callback : (index, line, col)
		var len = this.data.length;
		for (var i = 0; i < len; i++)
			this.data[i] = callback(i, i % this.lines, Math.floor(i / this.lines) ) 
						|| this.data[i];
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

	crossProduct (m) {
		if (m.lines != this.columns)
			throw new Err (__file, __line, "Impossible to use cross product : the columns of the first must be equals to the lines of the second");

		var out = new Matrix (this.lines, m.columns, 0);
		var n = m.lines;

		out.forEach((i, c, l) => { //index, column, line
			var tmp = 0;
			for (var k = 0; k < n; k++)
				tmp += this.get(c, k) * m.get(k, l);
			return tmp; // out.set(l, c, tmp)
		});

		return out;
	}

	toVector3 () {
		if (this.lines > 3 || this.columns != 1)
			throw new Err (__file, __line, "Matrice not 3 by 1 can't be converted to Vector3");
		return new Vector3 (this.data[0] || 0, this.data[1] || 0, this.data[2] || 0)
	}

	directAdd (m) {
		var out = new Matrix (m.lines + this.lines, m.columns + this.columns);

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

	static rotationMatrix (n, phi) {
        var cPhi = Math.cos(phi);
        var xy = n.x * n.y;
        var xz = n.x * n.z;
        var zy = n.z * n.y;

        return Matrix.identity(3, cPhi, 0).add(
                new Matrix (3, 3).setAll(n.x * n.x, xy, xz,
                                         xy, n.y * n.y, zy,
                                         xz, zy, n.z * n.z).mult(1 - cPhi)
            ).add(
                new Matrix (3, 3).setAll(0, n.z, -n.y, -n.z, 0, n.x, n.y, -n.x, 0).mult(Math.sin(phi))
            );
    }

	static identity (s, def, nul) {
		def = def || 1;
		nul = nul || 0;
		var out = new Matrix(s, s, nul);
		for (var i = s - 1; i >= 0; i--)
			out.data[i + s * i] = def;
		return out;
	}
}