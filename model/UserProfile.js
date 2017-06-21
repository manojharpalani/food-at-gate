/**
 * Class to hold user profile data.
 **/
class UserProfile {
  constructor(name, mobile) {
    this._name = name;
    this._mobile = mobile;
  }

  getName() {
    return this._name;
  }

  getMobile() {
    return this._mobile;
  }

  setName(name) {
    this._name = name;
  }

  setMobile(mobile) {
    this._mobile = mobile;
  }

  toString() {
    return "[" + this._name + "," + this._mobile + "]";
  }

  static fromJson(userProfileJson) {
    return new UserProfile(userProfileJson.name,
                           userProfileJson.mobile);
  }

  toJson() {
    return {
      name: this._name,
      mobile: this._mobile
    };
  }
}

module.exports = { UserProfile };
