class Segment2 {
    constructor (pt0, pt2) {
        Debug.incrementMem('Segment2');
        this.pt0 = instanceOfOr(pt0, Vector2, Vector2.zero);
        this.pt1 = instanceOfOr(pt1, Vector2, Vector2.zero);
    }
}