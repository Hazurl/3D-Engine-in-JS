class BinaryTree {
    constructor (comp) {
        this.comp = comp || function (a, b) { return a < b; };
        this.root = null;
    }

    push (v) {
        if (this.root === null)
            this.root = new Node(v, this.comp);
        else
            this.root.push(new Node(v, this.comp));
    }

    forEach (callback) {
        if (this.root)
            this.root.forEach(callback);
    }
}

// Don't use
class Node {
    constructor (v, comp) {
        this.comp = comp;
        this.value = v;
        this.left = this.right = null;
    }

    push (v) {
        var comp = this.comp(v, this.value);
        if (comp) {
            if (this.left === null)
                this.left = v;
            else
                this.left.push(v);
        } else {
            if (this.right === null)
                this.right = v;
            else
                this.right.push(v);
        }
    }

    forEach(callback) {
        if (this.left)
            this.left.forEach(callback);
        
        callback(this.value);

        if (this.right)
            this.right.forEach(callback);
    }
}