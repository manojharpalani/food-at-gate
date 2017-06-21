/**
 * Class to hold data of a menu item.
 **/
class MenuItem {
  constructor(id, menuItemJson) {
    this._id = id;
    this._info = new MenuItemInfo(menuItemJson.info);
    this._options = Object.keys(menuItemJson.options).forEach(
      function(menuItemOptionId) {
      let menuItemOption = new MenuItemOption(menuItemOptionId,
        menuItemJson.options[menuItemOptionId]);
      logger.debug("Reading Menu Item Option ID " + menuItemOptionId +
        " - " + menuItemOption);
      menuItems.push(menuItemOption);
    });
  }

  getId() {
    return this._id;
  }

  getInfo() {
    return this._info;
  }

  getOptions() {
    return this._options;
  }

  toString() {
    return "[" + this._id + this._info  + this._options + "]";
  }
}

module.exports = { MenuItem }
