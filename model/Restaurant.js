/**
 * Class to hold restaurant data.
 **/
class Restaurant {
  constructor(id, restaurantJson) {
    this._id = id;
    this._name = restaurantJson.name;
    this._description = restaurantJson.description;
    this._category = restaurantJson.category;
    this._iconImage = restaurantJson.iconImage;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  getCategory() {
      return this._category;
  }

  getIconImage() {
    return this._iconImage;
  }

  toString() {
    return "[" + this._name + "," + this._id +"]";
  }
}

module.exports = { Restaurant }
