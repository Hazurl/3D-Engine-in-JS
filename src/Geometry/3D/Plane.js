class Plane {
	constructor (a, b, c, d) {
        Debug.incrementMem('Plane');

		this.a = a || 0;
		this.b = b || 0;
		this.c = c || 0;
		this.d = d || 0;

		if (new Vector3(a, b, c).isNull())
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
