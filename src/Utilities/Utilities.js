class Maybe {
	// like the maybe from Haskell
	// the principe is to create an object to 'maybe' hold something
	// in the case of this hold nothing, the value is 'Nothing' (can be achieve by get Nothing, and test with isNothing)
	// in the other case, the object hold something, isJust test if this is holding, Maybe.Just create a maybe object holding the parameter given
	// fromJust return the object if it's holding one
	// fromMaybe is like the previous one, but give a default value in case of Nothing
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

// replace "x instanceof c ? x : def"
function instanceofOr (value, clazz, def) {
	return value instanceof clazz ? value : def;
}