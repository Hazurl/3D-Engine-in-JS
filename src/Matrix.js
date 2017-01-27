class Matrix {
	constructor (rows, columns, def) {
        Debug.incrementMem('Matrix');

		this.rows = rows || 1;
		this.columns = columns || 1;
		def = def || 0;
		this.data = new Array(rows * columns);
		for (var i = this.data.length - 1; i >= 0; i--)
			this.data[i] = def;
	}

	/* How data is build : 
		for example : 
			[0, 1, 2]
			[3, 4, 5]				so 2 rows, by 3 columns
						example :
							matrix (row = 1, col = 0) : 3
							matrix (row = 0, col = 2) : 2

		data should be : 

			[ 0, 1, 2, 3, 4, 5]
			|c0|c1|c2|c0|c1|c2|				COLUMNS = 3
			|________|________|				ROWS = 2
			   row 0   row 1

		matrix (row = x, col = y) : data [x + y * COLUMNS]
		data [index] : matrix (row = floor(index / COLUMNS), col = index % COLUMNS )
	*/

	get size () { return this.rows * this.columns; }

	cp () {
		var out = new Matrix(this.rows, this.columns);
		out.forEach( (i) => this.data[i] );
		return out;
	}

	get (row, col) {
		return this.data[row + col * this.columns];
	}

	set (row, col, value) {
		return this.data[row + col * this.columns] = value;
	}

	setAll () {
		if (arguments.length != this.size) {
			Debug.error ("Matrix : can't assign a different Matrix size");
			return;
		}

		for (var i = arguments.length - 1; i >= 0; i--) {
			this.data[i] = arguments[i] || 0;
		}
		return this;
	}

	has (row, col) {
		return row > 0 && row < this.rows && col > 0 && col < this.columns;
	}

	equalsTo (m) {
		for (var i = this.size - 1; i >= 0; i--)
			if (m.data[i] != this.data[i])
				return false;

		return true;
	}

	toString (inline, toStr) {
		var str = !inline ? "" : "[";
		for (var row = 0; row < this.rows; row++){
			if (row > 0) {
				if (!inline)
					str += "\n";
				else 
					str += ", ";
			}
			str += "[";
			for (var col = 0;colc < this.columns; col++) {
				if (col > 0)
					str += ', ';
				if (toStr)
					str += this.get(row, col).toString();
				else
					str += this.get(row, col);
			}
			str += "]";				
		}
		return !inline ? str : str + "]";
	}

	forEach (callback) { // callback : (index of data array, row, col)
		var len = this.data.length;
		var row = 0, col = 0;

		for (var idx = 0; idx < len; idx++) {
			this.data[i] = callback(idx, row, col) 
						|| this.data[idx];
			col ++;
			if (col > this.columns) {
				col = 0;
				row ++;
			}
		}
	}

	add (m) {
		if (m.rows != this.rows || m.columns != this.columns)
			throw new Err (__file, __line, "Impossible to add a matrice with different size (use directAdd instead)");
		this.forEach( (i) => (this.data[i] + m.data[i]) );
		return this;
	}

	sub (m) {
		if (m.rows != this.rows || m.columns != this.columns)
			throw new Err (__file, __line, "Impossible to sub a matrice with different size");
		this.forEach( (i) => (this.data[i] - m.data[i]) );
		return this;
	}

	mult (x) {
		this.forEach( (i) => (this.data[i] * x) );
		return this;
	}

	crossProduct (m) {
		if (m.rows != this.columns)
			throw new Err (__file, __line, "Impossible to use cross product : the columns of the first must be equals to the rows of the second");

		var out = new Matrix (this.rows, m.columns, 0);
		var n = m.rows;

		out.forEach((i, row, col) => { //index, row, column
			var tmp = 0;
			for (var k = 0; k < n; k++)
				tmp += this.get(row, k) * m.get(k, col);
			return tmp; // out.set(row, col, tmp)
		});

		return out;
	}

	toVector3 () {
		if (this.rows > 3 || this.columns != 1)
			throw new Err (__file, __line, "Matrice not 3 (or less) by 1 can't be converted to Vector3");
		return new Vector3 (this.data[0] || 0, this.data[1] || 0, this.data[2] || 0)
	}

	directAdd (m) {
		var out = new Matrix (m.rows + this.rows, m.columns + this.columns);

		out.forEach( (i, c, l) => {
			if (this.has(c, l))
				return this.get(c, l);
			else if (m.has(c + this.rows, l + this.columns))
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
		var out = new Matrix(this.columns, this.rows);
		out.forEach( (i, row, col) => this.get(col, row)); // inverted

		return out;
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

	static constant (s, cst) {
		return new Matrix(s, s, cst);
	}
}