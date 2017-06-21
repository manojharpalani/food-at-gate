/**
 * Class to hold airport data.
 **/
class Airport {
  constructor(id, airportJson) {
    this._id = id;
    this._code = airportJson.code;
    this._name = airportJson.name;
    this._label = this._name + " (" + this._code + ")";
    this._order = airportJson.order;
  }

  getId() {
      return this._id;
  }

  getCode() {
    return this._code;
  }

  getName() {
    return this._name;
  }

  getLabel() {
    return this._label;
  }

  getOrder() {
    return this._order;
  }

  toString() {
    return "[" + this._id + "," + this._code + "," + this._name + "," + this._order + "]";
  }
}

module.exports = { Airport }
