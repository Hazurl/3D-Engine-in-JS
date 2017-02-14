class Entity {
    constructor (name, center, vertices, triangles, rectangles, rays, lines) {
        Debug.incrementMem('Entity');

        this.name = name;
        
        this.center = instanceofOr(center, Vector3, Vector3.zero);
        this.vertices = instanceofOr(vertices, Array, new Array());
        this.triangles = instanceofOr(triangles, Array, new Array());
        this.rectangles = instanceofOr(rectangles, Array, new Array());
        this.rays = instanceofOr(rays, Array, new Array());
        this.lines = instanceofOr(lines, Array, new Array());
    }

    toString () {
        return this.name + " at " + this.center.toString() + " (" + this.vertices.length + " vertices)"
    }

    static getCube (center, size) {
        var vx = new Array();
        var rs = new Array();
        size = size || 1;

        vx.push(new Vector3 (  size,  size,  size));
        vx.push(new Vector3 (  size,  size, -size));
        vx.push(new Vector3 (  size, -size,  size));
        vx.push(new Vector3 (  size, -size, -size));
        vx.push(new Vector3 ( -size,  size,  size));
        vx.push(new Vector3 ( -size,  size, -size));
        vx.push(new Vector3 ( -size, -size,  size));
        vx.push(new Vector3 ( -size, -size, -size));

        /*
            5-----1
           /|    /|
          4-7---0-3        7 and 3 are behind
          |/    |/
          6-----2
        */

        rs.push(0, 1, 3, 2);
        rs.push(0, 1, 5, 4);
        rs.push(0, 2, 6, 4);
        rs.push(2, 3, 7, 6);
        rs.push(4, 5, 7, 6);
        rs.push(1, 5, 7, 3);        

        return new Entity("Cube", center, vx, new Array(), rs);
    }
}