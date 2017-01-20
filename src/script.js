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

    var v0 = Vector3.zero;
    var v1 = Vector3.zero;
    var v2 = new Vector3();
    var v3 = new Vector3(5, 10, 15);

    v0.x = -2;

    debug(v0);
    debug(v1);
    debug(v2);
    debug(v3);

    debug("normalize v0 ...");
    v0.normalize();
    debug(v0);

    debug("normalize v3 ...");
    v3.normalize();
    debug(v3);
};

})();