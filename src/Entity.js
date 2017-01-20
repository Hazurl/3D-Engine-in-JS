class Entity {
    constructor (center, vertexs) {
        this.center = center instanceof Vector3 ? center : Vector3.zero;
        this.vertexs = vertexs instanceof Array ? vertexs : new Array();
    }

    static getCubeVertex (size) {
        var t = new Array();
        size = size || 1;

        t.push(new Vector3 (  size,  size,  size));
        t.push(new Vector3 (  size,  size, -size));
        t.push(new Vector3 (  size, -size,  size));
        t.push(new Vector3 (  size, -size, -size));
        t.push(new Vector3 ( -size,  size,  size));
        t.push(new Vector3 ( -size,  size, -size));
        t.push(new Vector3 ( -size, -size,  size));
        t.push(new Vector3 ( -size, -size, -size));

        return t;
    }
}