class Ray {
	constructor (dir, origin) {
        Debug.incrementMem('Ray');

		if (dir.isNull())
			throw new Err(__file, __line, "Ray cannot have a vector null");

		this.dir = dir.cp().normalize();
		this.origin = origin.cp();
	}

	toString () {
		return "Ray at " + this.origin.toString() + " on direction : " + this.dir.toString();
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
		var scalar = this.dir.scalarPrdct(plane.normal);
		if (scalar === 0)
			return Maybe.Nothing;

		var k = (-plane.d - plane.a * this.origin.x - plane.b * this.origin.y - plane.c * this.origin.z) / scalar;
		if (k < 0)
			return Maybe.Nothing;

		return Maybe.Just(this.at( k ));
	}
}
