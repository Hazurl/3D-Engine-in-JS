class Line3 {
	constructor (dir, origin) {
        Debug.incrementMem('Line3');

		if (dir.isNull())
			throw new Err(__file, __line, "Line3 cannot have a vector null");

		this.dir = dir.cp().normalize();
		this.origin = origin.cp();
	}

	toString () {
		return "Line3 at " + this.origin.toString() + " on direction : " + this.dir.toString();
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
		//			- l.n = 0 and (p0 - l0).n = 0		then 		Line3 is in the plane
		//			- l.n = 0 and (p0 - l0).n != 0		then		Line3 is parallel with the plane (no intersection)
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
