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

    reverse () {
        return this.reBuild (-this.x, -this.y, -this.z);
    }

    toEulerAngle () {
        var d = this.norm();

        return d === 0 ?
            Vector3.zero
          : new Vector3 (0, Math.atan2(this.y, this.x), Math.acos(this.z / d)); //view on : https://www.opengl.org/discussion_boards/showthread.php/159883-converting-a-3D-vector-into-three-euler-angles
    }

    static get zero ()      { return new Vector3( 0, 0, 0); }
    static get up ()        { return new Vector3( 0, 1, 0); }
    static get down ()      { return new Vector3( 0,-1, 0); }
    static get forward ()   { return new Vector3( 1, 0, 0); }
    static get back ()      { return new Vector3(-1, 0, 0); }
    static get right ()     { return new Vector3( 0, 0, 1); }
    static get left ()      { return new Vector3( 0, 0,-1); }
}
