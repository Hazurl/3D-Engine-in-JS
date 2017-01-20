class Camera {
    constructor (pos, rot, distViewPort) {
        this.pos = pos instanceof Vector3 ? pos : Vector3.zero;
        this.rot = rot instanceof Vector3 ? rot : Vector3.zero;

        this.viewPort = distViewPort <= 1 ? 1 : (distViewPort || 1);
    }

    lookAt (pos) {
        rot = this.pos.to(pos).normalize();
    }


}
