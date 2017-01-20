class Maybe {
	constructor (isJust, x) {
		this._isJust = isJust;
		this._x = x;
	}

	static Just (x) { return new Maybe (true, x); }
	static get Nothing () { return new Maybe (false); }

	isJust () { return this._isJust; }
	isNothing () { return !this._isJust; }

	fromMaybe (def) {
		if (!this._isJust)
			return def;
		return this._x;
	}

	fromJust () {
		if (this._isJust)
			return this._x;
	}
}