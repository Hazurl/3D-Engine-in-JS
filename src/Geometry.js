class Line {
	constructor (coef, origin) {
		if (coef.isNull())
			throw "Line cannot have a vector null";

		this.coef = coef.cp().normalize();
		this.origin = origin.cp();
	}

	transpose (trans) {
		this.origin.add(trans);
	}

	isIn (vertex) {
		var v = vertex.cp().sub(this.origin);
		var coef;
		if (this.coef.x !== 0) {
			coef = v.x / this.coef.x;
			return this.coef.y * coef === v.y && this.coef.z * coef === v.z;

		} else if (this.coef.y !== 0) {
			coef = v.y / this.coef.y;
			return this.coef.x * coef === v.x && this.coef.z * coef === v.z;

		} else {
			coef = v.z / this.coef.z;
			return this.coef.y * coef === v.y && this.coef.x * coef === v.x;
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

		return !(this.coef.scalarPrdct(p.normal) === 0 && p.origin.cp().sub(this.origin).scalarPrdct(p.normal) !== 0);
	}

	collideWithLine (l) {
		
	}
}

class Ray {
	constructor (coef, origin) {
		if (coef.isNull())
			throw "Ray cannot have a vector null";

		this.coef = coef.cp().normalize();
		this.origin = origin.cp();
	}

	transpose (trans) {
		this.origin.add(trans);
	}

	isIn (vertex) {
		var v = vertex.cp().sub(this.origin);
		var coef;
		if (this.coef.x !== 0) {
			coef = v.x / this.coef.x;
			return coef >= 0 && this.coef.y * coef === v.y && this.coef.z * coef === v.z;

		} else if (this.coef.y !== 0) {
			coef = v.y / this.coef.y;
			return coef >= 0 && this.coef.x * coef === v.x && this.coef.z * coef === v.z;

		} else {
			coef = v.z / this.coef.z;
			return coef >= 0 && this.coef.y * coef === v.y && this.coef.x * coef === v.x;
		}
	}
}

class Plane {
	constructor (a, b, c, d) {
		this.a = a || 0;
		this.b = b || 0;
		this.c = c || 0;
		this.d = d || 0;

		this.normal = new Vector3(a, b, c);
		if (this.normal.isNull())
			throw "Plane cannot have a normal null";

		if (a !== 0)
			this.origin = new Vector3(-d/a, 0, 0); // ax + d = 0 => x = -d/a
		else if (b !== 0)
			this.origin = new Vector3(0, -d/b, 0); // by + d = 0 => y = -d/b
		else 
			this.origin = new Vector3(0, 0, -d/c); // cz + d = 0 => z = -d/c
	}

	isIn (vertex) {
		return a * vertex.x + b * vertex.y + c * vertex + d === 0;
	}
}