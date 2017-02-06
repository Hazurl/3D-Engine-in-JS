class Test {
    static All () {
        Test.Vector3();
        Test.Matrix();
        Test.toString();
    }

    static Vector3 () {
        Debug.log_g("=== Test Vector3 ===", Debug.COLOR.BLUE);

        var cst_1 = new Vector3 (1, 1, 1);
        var random = new Vector3 (5, 7, -2);

        Test.shouldBe("equalsTo", cst_1.equalsTo(cst_1), true);
        Test.equalsTo("copy", random.cp(), random);
        Test.shouldBe("normalize and norm", Math.round(random.cp().normalize().norm()), 1);
        Test.shouldBe("normSquare and norm", Math.round(random.cp().norm() * random.cp().norm()), random.cp().normSquare());
        Test.equalsTo("to", random.cp().mult(2), random.cp().add(random));
        Test.equalsTo("mult and add", Vector3.zero.to(random), random);
        Test.equalsTo("sub and reverse", Vector3.zero.sub(random), random.cp().reverse());
        Test.shouldBe("normalize and isCollinearWith", random.cp().normalize().isCollinearWith(random), true);
        Test.shouldBe("isNull", Vector3.zero.isNull(), true);
        Test.shouldBe("scalarPrdct", Vector3.right.scalarPrdct(Vector3.up.mult(0.23)), 0);
        Test.shouldBe("alignWith", new Vector3(5, 2, 0).alignWith(new Vector3(10, 4, 0), new Vector3(-15, -6, 0)), true);
        Test.equalsTo("toMatrix", random.toMatrix(), new Matrix(3, 1).setAll(5, 7, -2));
    }

    static Matrix () {
        Debug.log_g("=== Test Matrix ===", Debug.COLOR.BLUE);

        var mIdent = Matrix.identity(3);
        var random = new Matrix(3, 3).setAll(0, 5, 6, -9, -7, 1, -5, 2, 0);
        var random2 = new Matrix(3, 3).setAll(4, -65, 56, -19, -27, -91, 1, 52, 20);
        var cst1 = new Matrix(3, 3, 1);

        Test.shouldBe("size", mIdent.size, 9);
        Test.shouldBe("equalsTo", random.equalsTo(random), true);
        Test.equalsTo("copy", random.cp(), random);
        Test.shouldBe("get", random.get(2, 0), -5);
        Test.shouldBe("set", random.set(0, 0, 99), 99);
        Test.shouldBe("has", mIdent.has(3, 0), false);
        Test.equalsTo("add", mIdent.cp().add(cst1), Matrix.identity(3, 2, 1));
        Test.equalsTo("add and sub", random.cp().add(random2).sub(random2), random);
        Test.equalsTo("add and mult", random2.cp().add(random2), random2.cp().mult(2))
        Test.equalsTo("invert and sub", random.cp().invert(), Matrix.constant(3, 0).sub(random));
        Test.equalsTo("transpose", mIdent.transpose(), mIdent);
    }

    static toString() {
        var S = new Scene( new Camera( new Vector3(0, 0, 10),  new Vector3(0, 0, 10).to(Vector3.zero), 1, 900, 1600, Camera.MODE.PERSPECTIVE), {getContext (){}});
        Debug.log_i( new Vector3(5, 6, 7).toString()                                                    , Debug.COLOR.PINK );
        Debug.log_i( Entity.getCube(Vector3.zero, 10).toString()                                        , Debug.COLOR.PINK );
        Debug.log_i( new Line(Vector3.forward, Vector3.zero).toString()                                 , Debug.COLOR.PINK );
        Debug.log_i( new Parallelogram(new Vector3(1, 2, 3), Vector3.forward, Vector3.up).toString()    , Debug.COLOR.PINK );
        Debug.log_i( new Plane(Vector3.up, 3).toString()                                                , Debug.COLOR.PINK );
        Debug.log_i( new Ray(Vector3.forward, Vector3.zero).toString()                                  , Debug.COLOR.PINK );
        Debug.log_i( S.camera.toString()                                                                , Debug.COLOR.PINK );
        Debug.log_i( S.toString()                                                                       , Debug.COLOR.PINK );
        Debug.log_i( Matrix.identity(4).toString()                                                      , Debug.COLOR.PINK );
    }

    static shouldBe (msg, test, should) {
        if (test === should)
             Debug.log(msg + " : OK", Debug.COLOR.GREEN);
        else
            Debug.log(msg + " : NO (" + test + " -> " + should + ")", Debug.COLOR.RED);
   }

    static equalsTo (msg, v0, v1) { // must implement .equalsTo and .toString
        if (v0.equalsTo(v1))
             Debug.log(msg + " : OK", Debug.COLOR.GREEN);
        else {
            Debug.log(msg + " : NO", Debug.COLOR.RED);
            Debug.log(v0.toString() + "\n\tshould be\n" + v1.toString(), Debug.COLOR.RED);
        }
   }
}