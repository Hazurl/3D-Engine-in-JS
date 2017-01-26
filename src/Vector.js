class Vector3 {
    constructor (x, y, z) {
        Debug.incrementMem('Vector3');
        this.x = x || 0; this.y = y || 0; this.z = z || 0;
    }

    reBuild (x, y, z) {
        this.x = x || this.x; this.y = y || this.y; this.z = z || this.z;
        return this;
    }

    cp () { return new Vector3 (this.x, this.y, this.z); } 

    normSquare () { 
        return this.x * this.x 
             + this.y * this.y 
             + this.z * this.z; 
    }

    norm () { return Math.sqrt(this.normSquare()); }

    normalize () {
        var n = this.norm();
        if (n === 0)
            throw new Err(__file, __line, "Cannot normalize the null vector");
        return this.reBuild (this.x / n, this.y / n, this.z / n);
    }

    to (v) {
        return this.reBuild (v.x - this.x, v.y - this.y, v.z - this.z);
    }

    mult (a) {
        return this.reBuild ( this.x * a, this.y * a, this.z * a);
    }

    add (v) {
        return this.reBuild (v.x + this.x, v.y + this.y, v.z + this.z);
    }

    sub (v) {
        return this.reBuild (this.x - v.x, this.y - v.y, this.z - v.z);
    }

    reverse () {
        return this.reBuild (-this.x, -this.y, -this.z);
    }

    orthogonalAtRadian (radian) { // 0 mean 
        // vector orthogonal : o (a, b, c)          current vector : v (x, y, z)
        // we need ax + by + cz = 0

        /// WHAT I MY DOING ?!?
    }

    toEulerAngle () {
        var d = this.norm();

        return d === 0 ?
            Vector3.zero
          : new Vector3 (0, Math.atan2(this.y, this.x), Math.acos(this.z / d)); //view on : https://www.opengl.org/discussion_boards/showthread.php/159883-converting-a-3D-vector-into-three-euler-angles
    }

    parallelTo (v) {
        return this.cp().normalize().equalsTo(v.cp().normalize());
    }

    equalsTo (v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    isNull () {
        return this.x === 0 && this.y === 0 && this.z === 0;
    }

    scalarPrdct (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    alignWith (p0, p1) {
        return this.cp().to(p0).isCollinearWith(this.cp().to(p1));
    }

    isCollinearWith (v) {
        var coef;
        if (this.x !== 0) {
            coef = v.x / this.x;
            return this.y * coef === v.y && this.z * coef === v.z;

        } else if (this.y !== 0) {
            coef = v.y / this.y;
            return this.x * coef === v.x && this.z * coef === v.z;

        } else if (this.z !== 0) {
            coef = v.z / this.z;
            return this.y * coef === v.y && this.x * coef === v.x;
        } else
            return false;
    }

    toMatrix () {
        return new Matrix(3, 1).setAll(this.x, this.y, this.z);
    }

    rotateFrom (rotMatrix) {
        return rotMatrix.crossProduct(this.toMatrix()).toVector3();
    }

    static get zero ()      { return new Vector3( 0, 0, 0); }
    static get up ()        { return new Vector3( 0, 1, 0); }
    static get down ()      { return new Vector3( 0,-1, 0); }
    static get forward ()   { return new Vector3( 1, 0, 0); }
    static get back ()      { return new Vector3(-1, 0, 0); }
    static get right ()     { return new Vector3( 0, 0, 1); }
    static get left ()      { return new Vector3( 0, 0,-1); }
}
