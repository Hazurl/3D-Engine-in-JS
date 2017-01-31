class Parallelogram {
	constructor (origin, v0, v1) {
        Debug.incrementMem('Parallelogram');

		this.origin = (origin instanceof Vector3) ? origin : Vector3.zero;
		if (v0.isNull() || v1.isNull())
			throw new Err(__file, __line, "Parallelogram cannot have a vector director null");
		this.v0 = v0;
		this.v1 = v1;
	}

	at(x, y) {
		return this.origin.cp().add(this.v0.cp().mult(x)).add(this.v1.cp().mult(y));
	}

	getRelative (vertex) {
		Debug.info(vertex, this.origin, this.v0, this.v1);
		if (this.v0.x !== 0){
			var ma_vx = (vertex.x - this.origin.x) / this.v0.x;
			var uy_uxvx = this.v1.y - this.v1.x / this.v0.x;
			
			if (uy_uxvx !== 0){
				var coef_v0 = ma_vx - this.v1.x * uy_uxvx;
				var coef_v1 = -(vertex.y - this.origin.y - ma_vx) / uy_uxvx;

				Debug.info("coef getrelative X : ", coef_v0, coef_v1);

				if (coef_v0 <= 1 && coef_v0 >= 0 && coef_v1 <= 1 && coef_v1 >= 0)
					return this.v0.cp().mult(coef_v0).add(this.v1.cp().mult(coef_v1));
				else
					throw new Err(__file, __line, "vertex not in the Parallelogram");
			}
		}
		if (this.v0.y !== 0){
			var nb_vy = (vertex.y - this.origin.y) / this.v0.y;
			var uz_uyvy = this.v1.z - this.v1.y / this.v0.y;
			
			if (uz_uyvy !== 0){
				var coef_v0 = nb_vy - this.v1.y * uz_uyvy;
				var coef_v1 = -(vertex.z - this.origin.z - nb_vy) / uz_uyvy;

				Debug.info("coef getrelative Y : ", coef_v0, coef_v1);

				if (coef_v0 <= 1 && coef_v0 >= 0 && coef_v1 <= 1 && coef_v1 >= 0)
					return this.v0.cp().mult(coef_v0).add(this.v1.cp().mult(coef_v1));
				else
					throw new Err(__file, __line, "vertex not in the Parallelogram");
			}
		}
		if (this.v0.z !== 0){
			var oc_vz = (vertex.x - this.origin.x) / this.v0.z;
			var ux_uzvz = this.v1.x - this.v1.z / this.v0.z;
			
			if (ux_uzvz !== 0){
				var coef_v0 = oc_vz - this.v1.z * ux_uzvz;
				var coef_v1 = -(vertex.x - this.origin.x - oc_vz) / ux_uzvz;

				Debug.info("coef getrelative Z : ", coef_v0, coef_v1);

				if (coef_v0 <= 1 && coef_v0 >= 0 && coef_v1 <= 1 && coef_v1 >= 0)
					return this.v0.cp().mult(coef_v0).add(this.v1.cp().mult(coef_v1));
				else
					throw new Err(__file, __line, "vertex not in the Parallelogram");
			}
		}
		throw new Err (__file, __line, "undefined behaviour");
	}
}