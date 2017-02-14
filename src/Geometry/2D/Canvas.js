class Canvas {
    static DrawPoint (ctx, x, y, color, thickness) {
        thickness = thickness || 2;
        ctx.fillStyle = color || '#000000';
		ctx.fillRect(Math.floor(x - thickness/2), Math.floor(y - thickness/2), thickness,thickness);
    }

    static DrawRay (ctx, x, y, a, b, color, thickness) {
        var dir = new Vector3(x, y, 0).to(new Vector3(a, b, 0)).setSize(1000);
        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.lineTo(x + dir.x, y + dir.y);

        ctx.strokeStyle = color || '#000000';
        ctx.lineWidth = thickness || 2;
        ctx.stroke();
    }
}

class CanvasRenderer {
    constructor (canvas, context) {
        Debug.incrementMem('CanvasRenderer');
        this.canvas = canvas;
        this.context = context || canvas.getContext('2d');

        this.points = new Array();
        this.rays = new Array();
        this.segments = new Array();
        this.lines = new Array();

        this.objects = new Array();
    }

    get width () {
        return this.canvas.width;
    }

    get height () {
        return this.canvas.height;
    }

    isIn(pt) {
        return isbetween(pt.x, 0, this.width) && isbetween(pt.y, 0, this.height);
    }

    render (objects) {
        if (!objects)
            return this.calculate();

        var ctx = this.context;
        
        objects.forEach(function(obj) {
            if (obj.obj instanceof Vector2) {
                ctx.fillStyle = obj.col;
                ctx.fillRect(Math.floor(obj.obj.x - obj.thick/2), Math.floor(obj.obj.y - obj.thick/2), obj.thick, obj.thick);
            }
        });
    }

    calculate () {
        var computedObjects = new BinaryTree(function (a, b) { return a.idx < b.idx; });

        this.objects.forEach(function(obj) {
            if (obj.obj instanceof Vector2) {
                var maybe_computedObj = this.computePoint(obj);
                if (maybe_computedObj.isJust())
                    computedObjects.push(maybe_computedObj.fromJust());
            }
            if (obj.obj instanceof Segment2) {
                var maybe_computedObj = this.computeSegment(obj);
                if (maybe_computedObj.isJust())
                    computedObjects.push(maybe_computedObj.fromJust());
            }
            if (obj.obj instanceof Ray2) {
                var maybe_computedObj = this.computeRay(obj);
                if (maybe_computedObj.isJust())
                    computedObjects.push(maybe_computedObj.fromJust());
            }
            if (obj.obj instanceof Line2) {
                var maybe_computedObj = this.computeLine(obj);
                if (maybe_computedObj.isJust())
                    computedObjects.push(maybe_computedObj.fromJust());
            }
        }, this);

        return this.render(computedObjects);
    }

    addPoint (pt, z_index, color, thickness) {
        z_index = z_index || 0;
        color = color || '#000000';
        thickness = thickness || 1;
        this.objects.push({obj : pt, idx : z_index, col : color, thick : thickness});
    }

    addRay (ray, z_index, color, thickness) {
        z_index = z_index || 0;
        color = color || '#000000';
        thickness = thickness || 1;
        this.objects.push({obj : ray, idx : z_index, col : color, thick : thickness});
    }

    addSegment (seg, z_index, color, thickness) {
        z_index = z_index || 0;
        color = color || '#000000';
        thickness = thickness || 1;
        this.objects.push({obj : seg, idx : z_index, col : color, thick : thickness});
    }

    addLine (line, z_index, color, thickness) {
        z_index = z_index || 0;
        color = color || '#000000';
        thickness = thickness || 1;
        this.objects.push({obj : lines, idx : z_index, col : color, thick : thickness});
    }

    computePoint (obj) {
        return this.isIn(obj.obj) ? Maybe.Just(obj) : Maybe.Nothing;
    }

    computeSegment (obj) {
        var seg = obj.obj;
        var pt0 = seg.pt0;
        var pt1 = seg.pt1;

        if(this.isIn(pt0)) {
            if (this.isIn(pt1)) {
                return Maybe.Just(obj);
            } else {

            }
        } else {
            if (this.isIn(pt1)) {

            } else {
                if (pt0.y < 0 && pt1.y < 0
                ||  pt0.y > h && pt1.y > h
                ||  pt0.x < 0 && pt1.x < 0
                ||  pt0.x > w && pt1.x > w)
                    return Maybe.Nothing;
                
            }
        }
    }

    computeRay(obj) {
        /* border :
         * UP -> 0 <= x <= width AND y === 0
         * DOWN -> 0 <= x <= width AND y === height
         * RIGHT -> x === width AND 0 <= y <= height 
         * LEFT -> x === 0 AND 0 <= y <= height
         */
        var ray = obj.obj;
        var x = ray.origin.x;
        var y = ray.origin.y;
        var dir = ray.dir;
        var h = this.height;
        var w = this.width;
        var a = dir.x;
        var b = dir.y;

        var k;

        if (this.isIn(ray.origin)) {
            // Calcul second point
            // Border UP
            if (b !== 0) {
                k = -y/b;
                if (k >= 0 && isbetween(x + a * k, 0, w)) {
                    obj.obj = new Segment2(ray.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            // Border DOWN
            if (b !== 0) {
                k = (h-y)/b;
                if (k >= 0 && isbetween(x + a * k, 0, w)) {
                    obj.obj = new Segment2(ray.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            // Border LEFT
            if (a !== 0) {
                k = -x/a;
                if (k >= 0 && isbetween(y + b * k, 0, h)) {
                    obj.obj = new Segment2(ray.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            // Border RIGHT
            if (a !== 0) {
                k = (w-x)/a;
                if (k >= 0 && isbetween(y + b * k, 0, h)) {
                    obj.obj = new Segment2(ray.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            throw new Err(__file, __line, "should'nt throw an error...");
        } else {
            var vec0, vec1;
            // Border UP
            if (b !== 0) {
                k = -y/b;
                if (k >= 0 && isbetween(x + a * k, 0, w)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }
            // Border DOWN
            if (b !== 0) {
                k = (h-y)/b;
                if (k >= 0 && isbetween(x + a * k, 0, w)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }
            // Border LEFT
            if (a !== 0) {
                k = -x/a;
                if (k >= 0 && isbetween(y + b * k, 0, h)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }
            // Border RIGHT
            if (a !== 0) {
                k = (w-x)/a;
                if (k >= 0 && isbetween(y + b * k, 0, h)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }

            if (!vec0 || !vec1)
                return Maybe.Nothing;
            obj.obj = new Segment2(vec0, vec1);
            return Maybe.Just(obj);
        }
    }

    computeLine (obj) {
        var line = obj.obj;
        var x = line.v0.x;
        var y = line.v0.y;
        var dir = line.v0.cp().to(line.v1);
        var h = this.height;
        var w = this.width;
        var a = dir.x;
        var b = dir.y;

        var k;

        if (this.isIn(line.origin)) {
            // Calcul second point
            // Border UP
            if (b !== 0) {
                k = -y/b;
                if (isbetween(x + a * k, 0, w)) {
                    obj.obj = new Segment2(line.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            // Border DOWN
            if (b !== 0) {
                k = (h-y)/b;
                if (isbetween(x + a * k, 0, w)) {
                    obj.obj = new Segment2(line.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            // Border LEFT
            if (a !== 0) {
                k = -x/a;
                if (isbetween(y + b * k, 0, h)) {
                    obj.obj = new Segment2(line.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            // Border RIGHT
            if (a !== 0) {
                k = (w-x)/a;
                if (isbetween(y + b * k, 0, h)) {
                    obj.obj = new Segment2(line.origin, new Vector2(x + k * a, y + k * b));
                    return Maybe.Just(obj);
                }
            }
            throw new Err(__file, __line, "should'nt throw an error...");
        } else {
            var vec0, vec1;
            // Border UP
            if (b !== 0) {
                k = -y/b;
                if (isbetween(x + a * k, 0, w)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }
            // Border DOWN
            if (b !== 0) {
                k = (h-y)/b;
                if (isbetween(x + a * k, 0, w)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }
            // Border LEFT
            if (a !== 0) {
                k = -x/a;
                if (isbetween(y + b * k, 0, h)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }
            // Border RIGHT
            if (a !== 0) {
                k = (w-x)/a;
                if (isbetween(y + b * k, 0, h)) {
                    if (vec0) vec1 = new Vector2(x + k * a, y + k * b);
                    else vec0 = new Vector2(x + k * a, y + k * b);
                }
            }

            if (!vec0 || !vec1)
                return Maybe.Nothing;
            obj.obj = new Segment2(vec0, vec1);
            return Maybe.Just(obj);
        }
    }
}