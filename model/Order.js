var HashMap = require('hashmap');

/**
 * Class to hold the data for an order.
 **/
class Order {
  constructor (orderInfo, cartItemsMap, payment) {
    this._info = orderInfo;
    this._items = cartItemsMap;
    this._payment = payment;
  }

  getInfo() {
    return this._info;
  }

  getItems() {
    return this._items;
  }

  getPayment() {
    return this._payment;
  }

  static fromJson(orderJson) {
    var items = new HashMap();
    Object.keys(orderJson.items).forEach(function(cartItemId) {
      items.set(cartItemId, CartItem.fromJson(orderJson.items[cartItemId]));
    });
    return new Order(OrderInfo.fromJson(orderJson.info),
                     items,
                     PaymentInfo.fromJson(orderJson.paymentInfo));

  }

  toJson() {
    return {
      info: this._info.toJson(),
      items: this._items,
      payment: this._payment.toJson()
    };
  }
}

module.exports = { Order }
