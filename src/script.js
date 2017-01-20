(function () {

var canvas;
var context;

function InitCanvas () {
    canvas = document.getElementById('camera');
    if(!canvas) {
        alert("Impossible de récupérer la camera");
        return;
    }

    context = canvas.getContext('2d');
    if(!context) {
        alert("Impossible de récupérer le context du canvas");
        return;
    }
}

function debug (x) { console.log(x); }
function debugM (msg, x) { debug(msg); debug(x); }

window.onload = function() {
    InitCanvas();

    var scene = Scene.create(Camera.create(Vector3.create(5, 5, 5), Vector3.zero()))

    var cam = Object.create(Camera);
    cam.pos = Vector3.create(5, 5, 5);
    cam.lookAt(0, 0, 0);

    debugM("Camera : ", cam);

    var obj = Cube.create(0, 0, 0);

    debugM("obj : ", obj);
};

})();