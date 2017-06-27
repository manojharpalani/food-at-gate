/**
 * Class to hold menu item info data.
 **/
class MenuItemInfo {
  constructor(menuItemInfoJson) {
    this._name = menuItemInfoJson.name;
    this._description = menuItemInfoJson.description;
    this._imageUri = menuItemInfoJson.image_uri;
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  getImageUri() {
    return this._imageUri;
  }

  toString() {
    return this._name;
  }
}

module.exports = { MenuItemInfo }
