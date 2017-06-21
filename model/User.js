/**
 * Class to hold user data.
 **/
class User {
  constructor(id, profile) {
    this._id = id;
    this._profile = profile;
  }

  getId() {
    return this._id;
  }

  getProfile() {
    return this._profile;
  }
}

module.exports = { User }
