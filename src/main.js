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
                    new Vector3(0, 0, 0),       // position
                    new Vector3(1, 0, 1),       // direction of rotation
                    1,                          // distance to VP
                    canvas.height,              // height of VP
                    canvas.width,               // width of VP
                    Camera.MODE.PERSPECTIVE     // Camera.MODE
                ),
                canvas
            );

    /*var cube = Entity.getCube(Vector3.zero, 1);

    S.add(cube);*/

    Debug.info('Scene : ', S);
    Debug.info('Camera : ', S.camera);

    Debug.log("4 corners of the camera's parallelogram :")
    var p = S.camera.viewport;
    Debug.info(p.origin);
    Debug.info(p.origin.cp().add(p.v0));
    Debug.info(p.origin.cp().add(p.v0).add(p.v1));
    Debug.info(p.origin.cp().add(p.v1));

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
            throw e;
    }
};

})();