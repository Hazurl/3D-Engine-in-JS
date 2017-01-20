class Camera {
    constructor (pos, rot, distViewPort, canvas) {
        this.pos = pos instanceof Vector3 ? pos : Vector3.zero;
        this.rot = rot instanceof Vector3 ? rot : Vector3.zero;

        this.viewPort = distViewPort <= 1 ? 1 : (distViewPort || 1);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    lookAt (pos) {
        rot = this.pos.to(pos).normalize();
    }
}
