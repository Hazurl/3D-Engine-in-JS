class Canvas {
    static DrawPoint (ctx, x, y, color, thickness) {
        thickness = thickness || 2;
        ctx.fillStyle = color || '#000000';
		ctx.fillRect(Math.floor(x - thickness/2), Math.floor(y - thickness/2), thickness,thickness);
    }
}