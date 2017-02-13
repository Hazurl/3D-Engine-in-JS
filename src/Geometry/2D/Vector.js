class Vector2 {
    constructor (x, y) {
        Debug.incrementMem('Vector2');
        this.x = x || 0; this.y = y || 0;
    }

    reBuild (x, y) {
        this.x = x || this.x; this.y = y || this.y;;
        return this;
    }

	toString () {
        return '(' + this.x + ', ' + this.y + ')';
    }

    cp () { return new Vector3 (this.x, this.y); } 

    normSquare () { 
        return this.x * this.x 
             + this.y * this.y;
    }

    norm () { return Math.sqrt(this.normSquare()); }

    normalize () {
        var n = this.norm();
        if (n === 0)
            throw new Err(__file, __line, "Cannot normalize the null vector");
        return this.reBuild (this.x / n, this.y / n);
    }

    to (v) {
        return this.reBuild (v.x - this.x, v.y - this.y);
    }

    setSize (s) {
        var n = this.norm();
        if (n === 0)
            throw new Err(__file, __line, "Cannot normalize the null vector");
        return this.reBuild (this.x / n * s, this.y / n * s);
    }

    mult (a) {
        return this.reBuild ( this.x * a, this.y * a);
    }

    add (v) {
        return this.reBuild (v.x + this.x, v.y + this.y);
    }

    sub (v) {
        return this.reBuild (this.x - v.x, this.y - v.y);
    }

    reverse () {
        return this.reBuild (-this.x, -this.y);
    }

    parallelTo (v) {
        return this.cp().normalize().equalsTo(v.cp().normalize());
    }

    equalsTo (v) {
        return this.x === v.x && this.y === v.y;
    }

    isNull () {
        return this.x === 0 && this.y === 0;
    }

    scalarPrdct (v) {
        return this.x * v.x + this.y * v.y;
    }

    alignWith (p0, p1) {
        return this.cp().to(p0).isCollinearWith(this.cp().to(p1));
    }

    isCollinearWith (v) {
        var coef;
        if (this.x !== 0) {
            coef = v.x / this.x;
            return this.y * coef === v.y;

        } else if (this.y !== 0) {
            coef = v.y / this.y;
            return this.x * coef === v.x;

        } else
            return false;
    }

    toMatrix () {
        return new Matrix(2, 1).setAll(this.x, this.y);
    }

    rotateFrom (rotMatrix) {
        return rotMatrix.crossProduct(this.toMatrix()).toVector3();
    }

    static get zero ()      { return new Vector2( 0, 0); }
    static get up ()        { return new Vector2( 0, 1); }
    static get down ()      { return new Vector2( 0,-1); }
    static get right ()     { return new Vector2( 1, 0); }
    static get left ()      { return new Vector2(-1, 0); }
}
