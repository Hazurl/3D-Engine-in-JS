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

        this._modifV = true;
    }

    get viewport () {
        if (this._modifV) {
            this._viewport = this.calculViewPort();
            this._viewportPlane = this.calculViewPortPlane();
            this._modifV = false;
        }
            
        return this._viewport;
    }

    get viewportPlane () {
        if (this._modifV) {
            this._viewport = this.calculViewPort();
            this._viewportPlane = this.calculViewPortPlane();
            this._modifV = false;
        }
            
        return this._viewportPlane;
    }

    static get MODE () { return { ORTHOGRAPHIC : 0, PERSPECTIVE : 1 }; }

    lookAt (pos) {
        this.rotDir = this.pos.cp().to(pos).normalize();
        this._modifV = true;
    }

    setPos (pos) {
        this.pos = ((pos instanceof Vector3) ? pos : Vector3.zero);
        this._modifV = true;
    }

    setRotDir (rotDir) {
        this.rotDir = ((rotDir instanceof Vector3) ? rotDir.normalize() : Vector3.forward);
        this._modifV = true;
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

        // Calcul the rigth vector of the Camera
        // vectorRigth is perpendicular to rotDir and Vector3.up
        // if rotDir and Vector3.up are collinear then we set vectorRigth to Vector3.rigth or Vector3.left
        // depends on the rotDir is up or down
        // rotDir (a, b, c)
        // Vector3.up (0, 1, 0)
        // rigth (x, y, z)

        // Case rotDir and Vector3.up are not collinear
        // rotDir 'scalar' rigth = 0
        // Vector3.up 'scalar' rigth = 0
        // { ax + by + cz = 0
        // { y = 0

        //  => ax + cz = 0
        // with x = 1 : z = -a/c
        // so rigth = (1, 1, -a/c)

        // with z = 1 : x = -c/a
        // so rigth = (-c/a, 1, 1)

        // Case there are collinear
        // if rotDir is positif (up)
        // then rigth = Vector3.rigth
        // else rigth = Vector3.left
        var right;
        if (this.rotDir.isCollinearWith(Vector3.up))
            if (this.rotDir.y > 0)
                right = Vector3.right;
            else
                right = Vector3.left;
        else
            if (this.rotDir.z == 0)
                right = new Vector3(-this.rotDir.z / this.rotDir.x, 0, 1 ).normalize();
            else
                right = new Vector3(1, 0, -this.rotDir.x / this.rotDir.z ).normalize();

        // rotation is not taken into account at the moment
        Debug.info("Right : ", right);
        Debug.info("Rotate " + radian + " rad ; Matrix : ", Matrix.rotationMatrix(this.rotDir, radian));

        var u = Math.sqrt(this.height * this.height / 4 + this.width * this.width / 4);
        var radian = this.height === 0 ? 0 : Math.atan( this.height / this.width );
        
        return new Parallelogram (
            this.rotDir.cp().mult(this.distViewPort).add(this.pos).sub(right.rotateFrom(
                Matrix.rotationMatrix(this.rotDir, -radian)
            ).setSize(u)),
            right.cp().setSize(this.width),
            new Vector3 (0, this.height, 0)
        );
    }
}