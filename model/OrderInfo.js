/**
 * Class to hold order info data.
 **/
class OrderInfo {

  constructor(airportId, terminalId, gateId, deliveryTime, total, tax, deliveryFee, status, created, lastUpdated) {
    this._airportId = airportId;
    this._terminalId = terminalId;
    this._gateId = gateId;
    this._deliveryTime = deliveryTime;
    this._total = total;
    this._tax = tax;
    this._deliveryFee = deliveryFee;
    this._status = status;
    this._created = Date.now().toISOString();
    this._lastUpdated = Date.now().toISOString();
  }

  getAirport() {
    return this._airportId;
  }

  getTerminal() {
    return this._terminalId;
  }

  getGate() {
    return this._gateId;
  }

  getDeliveryTime() {
    return this._deliveryTime;
  }

  getDeliveryFee() {
    return this._deliveryFee;
  }

  getTotal() {
    return this._total;
  }

  getTax() {
    return this._tax;
  }

  getStatus() {
    return this._status;
  }

  getCreated() {
    return this._created;
  }

  getLastUpdated() {
    return this._lastUpdated;
  }

  static fromJson(orderInfoJson) {
    return new OrderInfo(orderInfoJson.airportId,
                        orderInfoJson.terminalId,
                        orderInfoJson.gateId,
                        orderInfoJson.deliveryTime,
                        orderInfoJson.total,
                        orderInfoJson.tax,
                        orderInfoJson.deliveryFee,
                        orderInfoJson.status,
                        orderInfoJson.created,
                        orderInfoJson.lastUpdated);
  }

  toJson() {
    return {
      airport: this._airport,
      terminal: this._terminal,
      gate: this._gate,
      count: this._count,
      created: this._created,
      lastUpdated: this._lastUpdated
    };
  }
}

module.exports = { OrderInfo }
