/**
 * @class Database
 */

import * as firebase from 'firebase';
import { User } from '../model/User';
import { UserProfile } from "../model/UserProfile";
import { Order } from "../model/Order";
import { OrderInfo } from '../model/OrderInfo';

const logger = require('../common/Logger');

class Database {

    /**
     * Sets a users profile
     * @param userId
     * @param profile
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static setUserProfile(userId, profile) {
        let userProfilePath = "/user/" + userId + "/profile";
        return firebase.database().ref(userProfilePath).set(profile.toJson())
    }

    /**
     * Listen for changes to a users profile
     * @param userId
     * @param callback Users profile
     */
    static listenUserProfile(userId, callback) {
        let userProfilePath = "/user/" + userId + "/profile";
        firebase.database().ref(userProfilePath).on('value', (snapshot) => {
            var profile;
            if (snapshot.val()) {
                profile = UserProfile.fromJson(snapshot.val());
            }
            callback(profile)
        });
    }

    /**
     * Register a listener for order info.
     *
     **/
    static listenOrderInfo(userId, orderId, callback) {
      let userOrderPath = "/order/" + userId + "/" + orderId + "/info";
      firebase.database().ref(userOrderPath).on('value', (snapshot) => {
          var order = "";
          if (snapshot.val()) {
              order = new OrderInfo(snapshot.val());
          }
          callback(order);
      });
    }

    /**
     * Save payment info to users order in database.
     *
     **/
    static savePaymentInfo(userId, orderId, paymentInfo) {
        let paymentInfoPath = "/order/" + userId + "/" + orderId + "/payment";
        return firebase.database().ref(paymentInfoPath).set(paymentInfo.toJson());
    }

    /**
     * Get limit number of recent orders for input user.
     *
     **/
    static getOrders(userId, limit, offset, callback) {
      let userOrderPath = "/order/" + userId;
      let userOrderListRef = firebase.database().ref(userOrderPath);
      let userOrderCountPath = userOrderPath + "/" + count;
      let userOrderCount = firebase.database().ref(userOrderCountPath)
        .once('value', function(snapshot) {
          if (snapshot) {
            var orderCount = snapshot.val();
            userOrderListRef.orderByKey().endAt(orderCount - offset)
              .limitToLast(limit).once('value',
                function(snapshot) {
                  var orders = [];
                  snapshot.forEach(function(childSnapshot) {
                    orders.push(Order.fromJson(childSnapshot.val()));
                  });
                  callback(orders);
                });
          }
        });
    }
}

module.exports = Database;
