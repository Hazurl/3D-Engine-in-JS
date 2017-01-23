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

window.onload = function() {
    try {

    InitCanvas();
    Debug.init();

    var S = new Scene(
                new Camera(
                    new Vector3(5, 5, 5),
                    new Vector3(5, 5, 5).to(Vector3.zero).normalize(),
                    1,
                    Camera.MODE.PERSPECTIVE
                ),
                canvas
            );

    /*var cube = Entity.getCube(Vector3.zero, 1);

    S.add(cube);*/

    Debug.info('Scene : ', S);

    S.render(true);
    Debug.memoryDebugging();
/*
    setTimeout(function() {
        S.camera.pos = new Vector3 (5, 0, 0);
        S.camera.lookAt(Vector3.zero);
        Debug.info(S);
        S.render();
    }, 2500);
    setTimeout(function() {
        S.camera.pos = new Vector3 (0.5, 0, 0);
        S.camera.lookAt(new Vector3(0, 0.5, 0.5));
        Debug.info(S);
        S.render();
    }, 5000);
*/

    } catch (e) {
        if (e instanceof Err)
            Debug.err (e);
        else
            Debug.error("An error occured in the script !\n" + e);
    }
};

})();