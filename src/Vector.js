class Vector3 {
    constructor (x, y, z) {
        this.x = x || 0; this.y = y || 0; this.z = z || 0;
    }

    copy () { return new Vector3 (this.x, this.y, this.z); } 

    static get zero ()      { return new Vector3( 0, 0, 0); }
    static get up ()        { return new Vector3( 0, 1, 0); }
    static get down ()      { return new Vector3( 0,-1, 0); }
    static get forward ()   { return new Vector3( 1, 0, 0); }
    static get back ()      { return new Vector3(-1, 0, 0); }
    static get right ()     { return new Vector3( 0, 0, 1); }
    static get left ()      { return new Vector3( 0, 0,-1); }

    normSquare () { 
        return this.x * this.x 
             + this.y * this.y 
             + this.z * this.z; 
    }

    norm () { return Math.sqrt(this.normSquare()); }

    normalize () {
        var n = this.norm ();

        this.x = this.x / n; 
        this.y = this.y / n; 
        this.z = this.z / n; 
    }
}
/*
const Vector3 = {
    x : 0,
    y : 0, 
    z : 0,

    create: function (x, y, z) {
        var p = Object.create(Vector3);
        p.x = x;
        p.y = y;
        p.z = z;

        return p;
    },

    copy: function (v) {
        Vector3.create(v.x, v.y, v.z);
    },

    zero    : function () { return Vector3.create( 0, 0, 0); },
    up      : function () { return Vector3.create( 0, 1, 0); },
    down    : function () { return Vector3.create( 0,-1, 0); },
    rigth   : function () { return Vector3.create( 0, 0, 1); },
    left    : function () { return Vector3.create( 0, 0,-1); },
    forward : function () { return Vector3.create( 1, 0, 0); },
    back    : function () { return Vector3.create(-1, 0, 0); },

    normalize : function () {

    },

    norm : function () {
        return Math.sqrt(this.normSquare());
    },

    normSquare : function () {
        return this.x * this.x 
             + this.y * this.y 
             + this.z * this.z;
    }

    deg_to_rad : function (x, y, z) {
        return Vector3.create(
            x/180 * Math.PI, 
            y/180 * Math.PI, 
            z/180 * Math.PI
        );
    },

    pos_to_rot : function (v) {
        return Vector3.create();
    }
}

const Cube = {
    center : Vector3.create(0, 0, 0),
    points : new Array(),

    create: function (center_x, center_y, center_z) {
        var c = Object.create(Cube);

        c.center = Vector3.create(center_x, center_y, center_z);

        c.points = new Array();
        c.points[0] = Vector3.create(-1, -1, -1);
        c.points[1] = Vector3.create(-1, -1, 1);
        c.points[2] = Vector3.create(-1, 1, -1);
        c.points[3] = Vector3.create(-1, 1, 1);
        c.points[4] = Vector3.create(1, -1, -1);
        c.points[5] = Vector3.create(1, -1, 1);
        c.points[6] = Vector3.create(1, 1, -1);
        c.points[7] = Vector3.create(1, 1, 1);

        return c;
    }
}

const Camera = {
    canvas : null,
    pos : Vector3.zero(),
    rot : Vector3.zero(),

    create : function (pos, rot) {
        var c = Object.create(Camera);

        c.pos = pos;
        c.rpt = rot;

        return c;
    },

    lookAt : function (x, y, z) {
        this.rot = Vector3.pos_to_rot(Vector3.create(this.pos.x - x, this.pos.y - y, this.pos.z - z));
    }
}

const Scene = {
    camera : null,
    entities : new Array(),

    create : function (cam) {
        var s = Object.create(Scene);

        s.camera = cam;

        return s;
    },

    addEntity : function (obj) {
        this.entities.push(obj);
    }
}*/