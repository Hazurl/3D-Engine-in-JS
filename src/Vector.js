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
            return Vector3.zero;
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
        return this.reBuild (v.x - this.x, v.y - this.y, v.z - this.z);
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
        if (this.coef.x !== 0) {
            coef = v.x / this.coef.x;
            return this.coef.y * coef === v.y && this.coef.z * coef === v.z;

        } else if (this.coef.y !== 0) {
            coef = v.y / this.coef.y;
            return this.coef.x * coef === v.x && this.coef.z * coef === v.z;

        } else if (this.coef.z !== 0) {
            coef = v.z / this.coef.z;
            return this.coef.y * coef === v.y && this.coef.x * coef === v.x;
        } else
            return false;
    }

    rotateFrom (n, phi) {
        var cPhi = Math.cos(phi);
        var xy = n.x * n.y;
        var xz = n.x * n.z;
        var zy = n.z * n.y;

        return Matrix.identity(3, cPhi, 0).add(
                new Matrix (3, 3).setAll(n.x * n.x, xy, xz,
                                         xy, n.y * n.y, zy,
                                         xz, zy, n.z * n.z).mult(1 - cPhi)
            ).add(
                new Matrix (3, 3).setAll(0, n.z, -n.y, -n.z, 0, n.x, n.y, -n.x, 0).mult(Math.sin(phi))
            ).toVector3(); //should work
    }

    toMatrix () {
        return new Matrix(3, 1).setAll(this.x, this.y, this.z);
    }

    static get zero ()      { return new Vector3( 0, 0, 0); }
    static get up ()        { return new Vector3( 0, 1, 0); }
    static get down ()      { return new Vector3( 0,-1, 0); }
    static get forward ()   { return new Vector3( 1, 0, 0); }
    static get back ()      { return new Vector3(-1, 0, 0); }
    static get right ()     { return new Vector3( 0, 0, 1); }
    static get left ()      { return new Vector3( 0, 0,-1); }
}
