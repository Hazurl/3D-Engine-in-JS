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

    var S = new Scene(
                new Camera(
                    new Vector3(5, 5, 5),
                    new Vector3(5, 5, 5).to(Vector3.zero).normalize(),
                    1,
                    canvas
                )
            );
    var cube = new Entity (Vector3.zero, Entity.getCubeVertex());

    S.add(cube);

    debug(S);

    S.render();
};

})();