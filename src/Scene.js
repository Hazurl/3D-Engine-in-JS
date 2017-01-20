class Scene {
	constructor (camera) {
		this.camera = camera;
		this.objs = new Array();
	}

	add (obj) {
		this.objs.push(obj);
	}

	render () {
		console.log("Rendering ...");
	}
}
