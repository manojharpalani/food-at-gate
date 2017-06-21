/**
 * Class to hold airport terminal data.
 **/
class Terminal {
  constructor(id, terminalJson) {
    this._id = id;
    this._code = terminalJson.code;
    this._name = terminalJson.name;
    this._label = this._name + " (" + this._code + ")" ;
    this._order = terminalJson.order;
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

module.exports = { Terminal }
