/**
 * Class to hold the data of an item in the cart or order.
 **/
class CartItem {
  constructor(id, restaurant, item, imageUri, option, price, quantity, notes) {
    this._id = id;
    this._restaurant = restaurant;
    this._item = item;
    this._imageUri = imageUri;
    this._option = option;
    this._price = price;
    this._quantity = quantity;
    this._notes = notes;
  }
  
  getId() {
      return this._id;
  }

  getRestaurant() {
    return this._restaurant;
  }

  getItem() {
    return this._item;
  }

  getImageUri() {
    return this._imageUri;
  }

  getOption() {
    return this._option;
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

  static fromJson(id, cartItemJson) {
    return new CartItem(id,
                        cartItemJson.restaurant,
                        cartItemJson.item,
                        cartItemJson.imageUri,
                        cartItemJson.option,
                        cartItemJson.price,
                        cartItemJson.quantity,
                        cartItemJson.notes);
  }

  toJson() {
    return {
      restaurant: this._restaurant,
      item: this._item,
      imageUri: this._imageUri,
      option: this._option,
      price: this._price,
      quantity: this._quantity,
      notes: this._notes
    };
  }
}

module.exports = { CartItem }
