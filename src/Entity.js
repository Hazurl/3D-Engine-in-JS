class Entity {
    constructor (center, vertexes, triangles, rectangles) {
        Debug.incrementMem('Entity');
        
        this.center = center instanceof Vector3 ? center : Vector3.zero;
        this.vertexes = vertexes instanceof Array ? vertexes : new Array();
        this.triangles = triangles instanceof Array ? triangles : new Array();
        this.rectangles = rectangles instanceof Array ? rectangles : new Array();
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
            5---1
           /|  /|
          4-7-0 3
          |/  |/
          6---2
        */

        rs.push(0, 1, 3, 2);
        rs.push(0, 1, 5, 4);
        rs.push(0, 2, 6, 4);
        rs.push(2, 3, 7, 6);
        rs.push(4, 5, 7, 6);
        rs.push(1, 5, 7, 3);        

        return new Entity(center, vx, new Array(), rs);
    }
}