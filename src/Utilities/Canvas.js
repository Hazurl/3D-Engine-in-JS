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