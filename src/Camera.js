class Camera {
    constructor (pos, rotDir, distViewPort, height, width, mode) {
        Debug.incrementMem('Camera');

        this.pos = ((pos instanceof Vector3) ? pos : Vector3.zero);
        this.rotDir = ((rotDir instanceof Vector3) ? rotDir.normalize() : Vector3.forward);
        // must be a value between 0 and 2 not included, represent the trigonometric circle, so 0.5 mean a rotation of 90° on the left
        this.rotation = 0; // not supported

        this.mode = mode;

        this.distViewPort = distViewPort <= 0 ? 1 : (distViewPort || 1);
        this.height = height || 1;
        this.width = width || 1;

        this.viewport = this.calculViewPort();
    }

    static get MODE () { return { ORTHOGRAPHIC : 0, PERSPECTIVE : 1 }; }

    lookAt (pos) {
        this.rotDir = this.pos.cp().to(pos).normalize();
        this.viewport = this.calculViewPort();
    }

    setPos (pos) {
        this.pos = ((pos instanceof Vector3) ? pos : Vector3.zero);
        this.viewport = this.calculViewPort();
    }

    setRotDir (rotDir) {
        this.rotDir = ((rotDir instanceof Vector3) ? rotDir.normalize() : Vector3.forward);
        this.viewport = this.calculViewPort();
    }

    calculViewPortPlane () {
        //Calcul Plane of the canvas relative to the position

        //equation cartésienne plan : ax + by + cz + d = 0
        var ptOnPlane = this.rotDir.cp().mult(this.distViewPort);

        var a = this.rotDir.x;
        var b = this.rotDir.y;
        var c = this.rotDir.z;
        var d = - (a * ptOnPlane.x + b * ptOnPlane.y + c * ptOnPlane.z); 

        return new Plane (a, b, c, d);
    }

    calculViewPort () {
        // Calcul the origin of the VP
        var d = Math.sqrt(this.height * this.height + this.width * this.width);
        var radian = this.height === 0 ? Math.PI/2 : Math.atan( this.width / this.height );
        //var origin = this.rotDir.cp().mult(this.distViewPort).orthogonalAtRadian(radian).normalize().mult(d);
    }
}