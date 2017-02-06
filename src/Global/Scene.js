"use strict";

class Scene {
	constructor (camera, canvas) {
        Debug.incrementMem('Scene');

		this.camera = camera;
		this.objs = new Array();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');	

        this.origin = new Vector3(Math.round(canvas.width/2), Math.round(canvas.height/2), 0);	
        this.zoom = 10;
	}

	toString () {
		return "Scene with " + this.objs.length + " objects";
	}

	add (obj) {
		this.objs.push(obj);
	}

	transpose (v) {
		return v.mult(this.zoom).add(this.origin);
	}

	drawPoint_PER (vertex, color) {
		Debug.log_i("DrawPoint " + vertex.toString() + " ...", Debug.COLOR.GREEN);
		color = color || '#000000';
		var maybe_pointOnVP = this.getPointOnviewPort_PER (vertex);

		if (maybe_pointOnVP.isJust()) {
			var pointOnVP = maybe_pointOnVP.fromJust();

			Canvas.DrawPoint(this.ctx, pointOnVP.x, pointOnVP.y, color, 3);
			Debug.log_ig("Point reprensented at (" + pointOnVP.x + ", " + pointOnVP.y + ")", Debug.COLOR.RED);
		} else
			Debug.log_ig("Point can't be reprensented on the canvas", Debug.COLOR.RED);
	}

	drawRay_PER (vertex, vertex2, color) {
		Debug.log_i("DrawRay between " + vertex + " and " + vertex2 + " ...", Debug.COLOR.GREEN);
		color = color || '#000000';
		var maybe_pointOnVP = this.getPointOnviewPort_PER (vertex);
		var maybe_pointOnVP2 = this.getPointOnviewPort_PER (vertex2);

		if (maybe_pointOnVP.isJust() && maybe_pointOnVP2.isJust()) {
			var pointOnVP = maybe_pointOnVP.fromJust();
			var pointOnVP2 = maybe_pointOnVP2.fromJust();

			Canvas.DrawRay(this.ctx, pointOnVP.x, pointOnVP.y, pointOnVP2.x, pointOnVP2.y, color, 1);
			Debug.log_ig("First point reprensented at (" + pointOnVP.x + ", " + pointOnVP.y + ")", Debug.COLOR.RED);
			Debug.log_ig("Second point reprensented at (" + pointOnVP2.x + ", " + pointOnVP2.y + ")", Debug.COLOR.RED);
		} else {
			if (!maybe_pointOnVP.isJust())
				Debug.log_ig("First point can't be reprensented on the canvas", Debug.COLOR.RED);
			if (!maybe_pointOnVP2.isJust())
				Debug.log_ig("Second point can't be reprensented on the canvas", Debug.COLOR.RED);
		}
	}

	drawTriangle (x0, y0, x1, y1, x2, y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x2, y2);
		this.ctx.lineTo(x0, y0);
		this.ctx.lineTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}

	drawRectangle (x0, y0, x1, y1, x2, y2, x3, y3) {
		this.ctx.beginPath();
		this.ctx.moveTo(x3, y3);
		this.ctx.lineTo(x0, y0);
		this.ctx.lineTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineTo(x3, y3);
		this.ctx.stroke();
	}

	renderAxes (color) {
		color = color || '#00ff00';
		if (this.camera.mode === Camera.MODE.ORTHOGRAPHIC) {
			Debug.error('PERSPECTIVE mode not implemented');
		} else { // PERSPECTIVE
			// Each axe :
			var axe_x = new Ray (Vector3.forward, Vector3.zero);
			var axe_y = new Ray (Vector3.up, Vector3.zero);
			var axe_z = new Ray (Vector3.right, Vector3.zero);

			this.drawRay_PER(Vector3.zero, Vector3.up.mult(10000000), '#0000ff');
			this.drawRay_PER(Vector3.zero, Vector3.right, '#0000ff');
			this.drawRay_PER(Vector3.zero, Vector3.forward.mult(10000000), '#0000ff');

			this.drawPoint_PER(Vector3.zero, '#ff0000');
			this.drawPoint_PER(Vector3.up.mult(10000000), '#ffff00');
			this.drawPoint_PER(Vector3.right, '#ff00ff');
			this.drawPoint_PER(Vector3.forward.mult(10000000), '#00ff00');
		}
	}

	getPointOnviewPort_ORT (vertex) {

	}

	getPointOnviewPort_PER (vertex) {
		var vp = this.camera.viewport;
		var vpPlane = this.camera.viewportPlane;

		Debug.log("viewport plane : " + vpPlane.toString(), Debug.COLOR.GREEN);
		Debug.log("vertex : " + vertex.toString(), Debug.COLOR.GREEN);
		Debug.log("Ray build : " + new Ray(this.camera.pos.cp().to(vertex), this.camera.pos).toString(), Debug.COLOR.GREEN);

		var I = new Ray(this.camera.pos.cp().to(vertex), this.camera.pos).getIntersectionWithPlane(vpPlane);

		if (I.isNothing())
			return Maybe.Nothing;

		Debug.log_g("Intersection on vp " + I.fromJust().toString(), Debug.COLOR.D_BLUE);

		return Maybe.Just(vp.getRelative(I.fromJust()));
	}

	render (show_axe) {
		Debug.log_i("Rendering ...", Debug.COLOR.GREEN);

		if (show_axe)
			this.renderAxes();
		return;
		this.vpObj = new Array();

		this.objs.forEach(function (o, i) {
			this.vpObj[i] = new Array();
			o.vertexes.forEach(function (v) {
				// view on : https://en.wikipedia.org/wiki/3D_projection#Perspective_projection

				var c = this.camera.pos;
				var r = this.camera.rotDir;
				var O = this.camera.rotDir.toEulerAngle();

				var Cx = Math.cos(O.x);
				var Cy = Math.cos(O.y);
				var Cz = Math.cos(O.z);

				var Sx = Math.sin(O.x);
				var Sy = Math.sin(O.y);
				var Sz = Math.sin(O.z);

				var x = v.x - c.x;
				var y = v.y - c.y;
				var z = v.z - c.z;

				var Szy = Sy * y;
				var Czx = Cz * x;
				var Czy = Cz * y;

				var CyzpSy_SzypCzx = Cy * z + Sy * (Sz * y + Cz * x);

				var d = new Vector3 (
					// Cy(Sz*y + Cz*x) - Sy*z
					Cy * (Szy + Czx) - Sy * z,
					// Sx(Cy*z + Sy(Sz*y + Cz*x)) + Cx(Cz*y - Sy*x)
					Sx * CyzpSy_SzypCzx + Cx * (Czy - Sy * x),
					// Cx(Cy*z + Sy(Sz*y + Cz*x)) - Sx(Cz*y - Sz*x)
					Cx * CyzpSy_SzypCzx - Sx * (Czy - Sz * x)
				);

				var ez_dz = d.z === 0 ? 0 : r.z / d.z;

				var pointOnViewPort = new Vector3 (ez_dz * d.x - r.x, ez_dz * d.y - r.y, 0);

				//this.drawPoint(pointOnViewPort.x, pointOnViewPort.y, 1, 1);

				this.vpObj[i].push(pointOnViewPort);
			}, this)
		}, this);

		this.objs.forEach(function (o, idx) {
			var vertexes = this.vpObj[idx];
		    Debug.info('Vertexes : ', vertexes);
		    Debug.info('Entity : ', o);

			// Triangles
			for (var i = o.triangles.length - 1; i >= 0; i= i-3) {
				var p0 = this.transpose(vertexes[o.triangles[i]]);
				var p1 = this.transpose(vertexes[o.triangles[i - 1]]);
				var p2 = this.transpose(vertexes[o.triangles[i - 2]]);

				this.drawTriangle(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
			}

			// Rectangles
			for (var i = o.rectangles.length - 1; i >= 0; i= i-4) {
				var p0 = this.transpose(vertexes[o.rectangles[i]]);
				var p1 = this.transpose(vertexes[o.rectangles[i - 1]]);
				var p2 = this.transpose(vertexes[o.rectangles[i - 2]]);
				var p3 = this.transpose(vertexes[o.rectangles[i - 3]]);

				this.drawRectangle(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
			}
		}, this);
	};
}
