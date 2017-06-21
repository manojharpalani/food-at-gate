/**
 * Class to hold order payment data.
 **/
class PaymentInfo {
  constructor(method, amount, transactionId) {
    this._method = method;
    this._amount = amount;
    this._transactionId = transactionId;
  }

  getMethod() {
    return this._method;
  }

  getAmount() {
    return this._method;
  }

  getTransactionId() {
    return this._transactionId;
  }

  static fromJson(paymentInfoJson) {
    return new PaymentInfo(
      paymentInfoJson.method,
      paymentInfoJson.amount,
      paymentInfoJson.transactionId);
  }

  toJson() {
    return {
      method: this._method,
      amount: this._amount,
      transactionId: this._transactionId};
  }
}
