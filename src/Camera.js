class Camera {
    constructor (pos, rot, distViewPort, mode) {
        Debug.incrementMem('Camera');

        this.pos = ((pos instanceof Vector3) ? pos : Vector3.zero);
        this.rot = ((rot instanceof Vector3) ? rot.normalize() : Vector3.forward);

        this.mode = mode;

        this.distViewPort = distViewPort <= 0 ? 1 : (distViewPort || 1);

        this.viewport = this.calculViewPort();
    }

    static get MODE () { return { ORTHOGRAPHIC : 0, PERSPECTIVE : 1 }; }

    lookAt (pos) {
        this.rot = this.pos.cp().to(pos).normalize();
        this.viewport = this.calculViewPort();
    }

    setPos (pos) {
        this.pos = ((pos instanceof Vector3) ? pos : Vector3.zero);
        this.viewport = this.calculViewPort();
    }

    setRot (rot) {
        this.rot = ((rot instanceof Vector3) ? rot.normalize() : Vector3.forward);
        this.viewport = this.calculViewPort();
    }

    calculViewPortPlane () {
        //Calcul Plane of the canvas relative to the position

        //equation cartésienne plan : ax + by + cz + d = 0
        var ptOnPlane = this.rot.cp().mult(this.viewPort);

        var a = this.rot.x;
        var b = this.rot.y;
        var c = this.rot.z;
        var d = - (a * ptOnPlane.x + b * ptOnPlane.y + c * ptOnPlane.z); 

        return new Plane (a, b, c, d);
    }

    calculViewPort () {
        
    }
}
