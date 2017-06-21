/**
 * Class to hold data of a menu item option.
 **/
class MenuItemOption {
  constructor(id, menuItemOptionJson) {
    this._id = id;
    this._name = menuItemOptionJson.name;
    this._price = menuItemOptionJson.price;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getPrice() {
    return this._price;
  }

  toString() {
    return "[" + this._name + "," + this._price + "]"
  }
}

module.exports = { MenuItemOption }
