class Parallelogram {
	constructor (origin, v0, v1) {
        Debug.incrementMem('Parallelogram');

		this.origin = instanceofOr(origin, Vector3, Vector3.zero);
		if (v0.isNull() || v1.isNull())
			throw new Err(__file, __line, "Parallelogram cannot have a vector director null");
		this.v0 = v0;
		this.v1 = v1;
	}

	toString () {
		return "Parallelogram at " + this.origin.toString() + ", with border : " + this.v0.toString() + " and " + this.v1.toString();
	}

	at(x, y) {
		return this.origin.cp().add(this.v0.cp().mult(x)).add(this.v1.cp().mult(y));
	}

	getRelative (vertex) {
		Debug.log_i("vertex to find relative : " + vertex, Debug.COLOR.BLUE);
		Debug.log_i("this plane : " + this, Debug.COLOR.BLUE);
		/*
		 *	| t * v0.x + k * v1.x = vertex.x - origin.x
		 *	| t * v0.y + k * v1.y = vertex.y - origin.y
		 * 	| t * v0.z + k * v1.z = vertex.z - origin.z
		 * 
		 * Matrix : M[row, col]
		 * [ v0.x		v1.x		vertex.x - origin.x ]
		 * [ v0.y		v1.y		vertex.y - origin.y ]
		 * [ v0.z		v1.z		vertex.z - origin.z ]
		 * 
		 * - find 'i' such that M[i, 1] != 0
		 * - M[i+1] = [ M[i+1, 0] - M[i+1, 1] / M[i, 1] * M[i, 0]		0		M[i, 2] - M[i+1, 1] / M[i, 1] * M[i, 2] ]
		 * - M[i+2] = [ M[i+2, 0] - M[i+2, 1] / M[i, 1] * M[i, 0]		0		M[i, 2] - M[i+2, 1] / M[i, 1] * M[i, 2] ]
		 * 
		 * - find 'j' such that M[i, 0] != 0 and j != i
		 * - M[j]= [ 1		0		M[j, 2] / M[j, 0] ]
		 * 
		 * So t = M[j, 2]
		 * 
		 * - Calcul k :
		 * - M[i] = [0		1		M[i, 2] - M[i, 0] * t / M[i, 1] ]
		 * 
		 * So k = M[i, 2]
		 * 
		 * return (t, k)
		 */
	}
}