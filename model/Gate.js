/**
 * Class to hold airport gate data.
 **/
class Gate {
  constructor(id, gateJson) {
    this._id = id;
    this._code = gateJson.code;
    this._name = gateJson.name;
    this._label = this._name + " (" + this._code + ")";
    this._order = gateJson.order;
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

module.exports = { Gate }
