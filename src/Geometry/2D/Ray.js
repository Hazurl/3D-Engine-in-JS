class Ray2 {
    constructor (origin, dir) {
        Debug.incrementMem('Ray2');
        this.origin = instanceOfOr(origin, Vector2, Vector2.zero);
        this.dir = instanceOfOr(dir, Vector2, Vector2.up).normalize();
    }
}