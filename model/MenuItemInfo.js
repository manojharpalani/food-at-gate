/**
 * Class to hold menu item info data.
 **/
class MenuItemInfo {
  constructor(menuItemInfoJson) {
    this._name = menuItemJson.name;
    this._description = menuItemJson.description;
    this._ingredients = ingredients;
    this._imageUri = menuItemJson.image_uri;
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  getIngredients() {
    return this._ingredientsl
  }

  getImageUri() {
    return this._imageUri;
  }

  toString() {
    return this._name;
  }
}

module.exports = { MenuItemInfo }
