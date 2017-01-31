class Line {
	constructor (dir, origin) {
        Debug.incrementMem('Line');

		if (dir.isNull())
			throw new Err(__file, __line, "Line cannot have a vector null");

		this.dir = dir.cp().normalize();
		this.origin = origin.cp();
	}

	at (k) {
		return this.dir.cp().mult(k).add(this.origin);
	}

	transpose (trans) {
		this.origin.add(trans);
	}

	isIn (vertex) {
		var v = vertex.cp().sub(this.origin);
		var coef;
		if (this.dir.x !== 0) {
			coef = v.x / this.dir.x;
			return this.dir.y * coef === v.y && this.dir.z * coef === v.z;

		} else if (this.dir.y !== 0) {
			coef = v.y / this.dir.y;
			return this.dir.x * coef === v.x && this.dir.z * coef === v.z;

		} else {
			coef = v.z / this.dir.z;
			return this.dir.y * coef === v.y && this.dir.x * coef === v.x;
		}
	}

	collideWithPlane(p) {
		// l : vecteur de la droite : this.coef
		// l0 : cst de la droite : this.origin
		// n : normale de lu plan : p.normal
		// p0 : poitn du plan : p.origin

		// 		3 cases : 
		//			- l.n = 0 and (p0 - l0).n = 0		then 		Line is in the plane
		//			- l.n = 0 and (p0 - l0).n != 0		then		Line is parallel with the plane (no intersection)
		//			- otherwise							then		Line and plane has one intersection : d*l + l0

		return this.dir.scalarPrdct(p.normal) !== 0 || p.origin.cp().sub(this.origin).scalarPrdct(p.normal) === 0;
	}

	getIntersectionWithPlane (plane) { // Maybe
		var scalar = this.dir.scalar(plane.normal);
		if (scalar === 0)
			return Maybe.Nothing;

		var k = (-plane.d - plane.a * this.origin.x - plane.b * this.origin.y - plane.b * this.origin.y) / scalar;

		return Maybe.Just(this.at( k ));
	}
}

class Ray {
	constructor (dir, origin) {
        Debug.incrementMem('Ray');

		if (dir.isNull())
			throw new Err(__file, __line, "Ray cannot have a vector null");

		this.dir = dir.cp().normalize();
		this.origin = origin.cp();
	}

	at (k) {
		if (k < 0)
			throw new Err(__file, __line, "Ray.at must have his parameter positive");

		return this.dir.cp().mult(k).add(this.origin);
	}

	transpose (trans) {
		this.origin.add(trans);
	}

	isIn (vertex) {
		var v = vertex.cp().sub(this.origin);
		var coef;
		if (this.dir.x !== 0) {
			coef = v.x / this.dir.x;
			return coef >= 0 && this.dir.y * coef === v.y && this.dir.z * coef === v.z;

		} else if (this.dir.y !== 0) {
			coef = v.y / this.dir.y;
			return coef >= 0 && this.dir.x * coef === v.x && this.dir.z * coef === v.z;

		} else {
			coef = v.z / this.dir.z;
			return coef >= 0 && this.dir.y * coef === v.y && this.dir.x * coef === v.x;
		}
	}

	collideWithPlane (plane) {
		return this.dir.scalarPrdct(p.normal) > 0 || p.origin.cp().sub(this.origin).scalarPrdct(p.normal) === 0;
	}

	getIntersectionWithPlane (plane) { // Maybe
		var scalar = this.dir.scalar(plane.normal);
		if (scalar === 0)
			return Maybe.Nothing;

		var k = (-plane.d - plane.a * this.origin.x - plane.b * this.origin.y - plane.b * this.origin.y) / scalar;
		if (k < 0)
			return Maybe.Nothing;

		return Maybe.Just(this.at( k ));
	}
}

class Plane {
	constructor (a, b, c, d) {
        Debug.incrementMem('Plane');

		this.a = a || 0;
		this.b = b || 0;
		this.c = c || 0;
		this.d = d || 0;

		this.normal = new Vector3(a, b, c);
		if (this.normal.isNull())
			throw new Err(__file, __line, "Plane cannot have a normal null");

		if (a !== 0)
			this.origin = new Vector3(-d/a, 0, 0); // ax + d = 0 => x = -d/a
		else if (b !== 0)
			this.origin = new Vector3(0, -d/b, 0); // by + d = 0 => y = -d/b
		else 
			this.origin = new Vector3(0, 0, -d/c); // cz + d = 0 => z = -d/c
	}

	get normal () {
		return new Vector3(this.a, this.b, this.c);
	}

	isIn (vertex) {
		return a * vertex.x + b * vertex.y + c * vertex + d === 0;
	}
}

class Parallelogram {
	constructor (origin, v0, v1) {
        Debug.incrementMem('Parallelogram');

		this.origin = (origin instanceof Vector3) ? origin : Vector3.zero;
		if (v0.isNull() || v1.isNull())
			throw new Err(__file, __line, "Parallelogram cannot have a vector director null");
		this.v0 = v0;
		this.v1 = v1;
	}
}