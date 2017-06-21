/**
 * Class to hold the data of an item in the cart or order.
 **/
class CartItem {
  constructor(restaurantId, itemId, optionId, price, quantity, notes) {
    this._restaurantId = restaurantId;
    this._itemId = itemId;
    this._optionId = optionId;
    this._price = price;
    this._quantity = quantity;
    this._notes = notes;
  }

  getRestaurantId() {
    return this._restaurantId;
  }

  getItemId() {
    return this._itemId;
  }

  getOptionId() {
    return this._optionId;
  }

  getPrice() {
    return this._price;
  }

  getQuantity() {
    return this._quantity;
  }

  getNotes() {
    return this._notes;
  }

  static fromJson(cartItemJson) {
    return new CartItem(cartItemJson.restaurantId,
                        cartItemJson.itemId,
                        cartItemJson.optionId,
                        cartItemJson.price,
                        cartItemJson.quantity,
                        cartItemJson.notes);
  }

  toJson() {
    return {
      restaurantId: this._restaurantId,
      itemId: this._itemId,
      optionId: this._optionId,
      price: this._price,
      quantity: this._quantity,
      notes: this._notes
    };
  }
}

module.exports = { CartItem }
