/**
 * Class to hold shopping cart info data for a user.
 **/
class CartInfo {

  constructor(airportId, terminalId, gateId, count, lastUpdated) {
    this._airportId = airportId;
    this._terminalId = terminalId;
    this._gateId = gateId;
    this._count = count;
    if (lastUpdated) {
      this._lastUpdated = lastUpdated;
    } else {
      this._lastUpdated = new Date().toISOString();
    }
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

  getCount() {
    return this._count;
  }

  getLastUpdated() {
    return this._lastUpdated;
  }

  setCount(count) {
    this._count = count;
    this._lastUpdated = Date.now().toISOString();
  }

  static fromJson(cartInfoJson) {
    return new CartInfo(cartInfoJson.airportId,
                        cartInfoJson.terminalId,
                        cartInfoJson.gateId,
                        cartInfoJson.count,
                        cartInfoJson.lastUpdated);
  }

  toJson() {
    return {
      airportId: this._airportId,
      terminalId: this._terminalId,
      gateId: this._gateId,
      count: this._count,
      lastUpdated: this._lastUpdated
    };
  }
}

module.exports = { CartInfo }
