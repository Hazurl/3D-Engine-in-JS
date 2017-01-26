class Test {
    static All () {
        Test.Vector3();
    }

    static Vector3 () {
        Debug.log_g("=== Test Vector3 ===", Debug.COLOR.BLUE);

        var cst_1 = new Vector3 (1, 1, 1);
        var random = new Vector3 (5, 7, -2);

        Test.shouldBe("equalsTo", cst_1.equalsTo(cst_1), true);
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

    static shouldBe (msg, test, should) {
        if (test === should)
             Debug.log(msg + " : OK", Debug.COLOR.GREEN);
        else
            Debug.log(msg + " : NO (" + test + " -> " + should + ")", Debug.COLOR.RED);
   }

    static equalsTo (msg, v0, v1) {
        if (v0.equalsTo(v1))
             Debug.log(msg + " : OK", Debug.COLOR.GREEN);
        else {
            Debug.log(msg + " : NO", Debug.COLOR.RED);
            Debug.info(v0, "should be", v1);
        }
   }
}