var HashMap = require('hashmap');
/**
 * Class to hold shopping cart data of a user.
 **/
class Cart {
  constructor(cartInfo) {
    this._items = new HashMap();
    this._info = cartInfo;
  }

  addItem(cartItemId, cartItem) {
    this._items.set(cartItemId, cartItem);
  }

  removeItem(cartItemId) {
    this._items.remove(cartItemId);
  }
}

module.exports = { Cart }
