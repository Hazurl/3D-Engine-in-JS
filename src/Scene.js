"use strict";

class Scene {
	constructor (camera, canvas) {
		this.camera = camera;
		this.objs = new Array();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');	

        this.origin = new Vector3(Math.round(canvas.width/2), Math.round(canvas.height/2), 0);	
        this.zoom = 5;
	}

	add (obj) {
		this.objs.push(obj);
	}

	drawPoint (x, y, thickness) {
		this.ctx.fillRect(Math.floor(x - thickness/2), Math.floor(y - thickness/2), thickness,thickness);
	}

	render () {
		console.log("Rendering ...");

		this.vpObj = new Array();

		this.objs.forEach(function (o, i) {
			this.vpObj[i] = new Array();
			o.vertexs.forEach(function (v) {
				// view on : https://en.wikipedia.org/wiki/3D_projection#Perspective_projection

				var c = this.camera.pos;
				var O = this.camera.rot.toEulerAngle();

				var Cy = Math.cos(O.y);
				var Cz = Math.cos(O.z);
				var Cx = Math.cos(O.x);

				var Sy = Math.sin(O.y);
				var Sz = Math.sin(O.z);
				var Sx = Math.sin(O.x);

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

				// I'll take  'e' as 'c' (the camera position)
				var ez_dz = c.z / d.z;

				var pointOnViewPort = new Vector3 (ez_dz * d.x - c.x, ez_dz * d.y - c.y, 0).mult(this.zoom).add(this.origin);

				this.drawPoint(pointOnViewPort.x, pointOnViewPort.y, 1, 1);

				this.vpObj[i].push(pointOnViewPort);
			}, this)
		}, this);

		console.log(this.vpObj);
	}
}
