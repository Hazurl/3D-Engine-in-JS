class Camera {
    constructor (pos, rot, distViewPort, mode) {
        Debug.incrementMem('Camera');

        this.pos = ((pos instanceof Vector3) ? pos : Vector3.zero);
        this.rot = ((rot instanceof Vector3) ? rot.normalize() : Vector3.forward);

        this.mode = mode;

        this.viewPort = distViewPort <= 0 ? 1 : (distViewPort || 1);

        //Calcul Plane of the canvas relative to the position

        //equation cartésienne plan : ax + by + cz + d = 0
        var ptOnPlane = this.rot.cp().mult(this.viewPort);

        var a = this.rot.x;
        var b = this.rot.y;
        var c = this.rot.z;
        var d = - (a * ptOnPlane.x + b * ptOnPlane.y + c * ptOnPlane.z); 
    }

    static get MODE () { return { ORTHO : 0, PERPEC : 1 }; }

    lookAt (pos) {
        this.rot = this.pos.to(pos).normalize();
    }
}
