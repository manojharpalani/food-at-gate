/**
 * @class Database
 */

import * as firebase from 'firebase';
import { User } from '../model/User';
import { UserProfile } from "../model/UserProfile";
import { Airport } from "../model/Airport";
import { Terminal } from "../model/Terminal";
import { Gate } from "../model/Gate";
import { Restaurant } from "../model/Restaurant";
import { MenuItem } from "../model/MenuItem";
import { MenuItemInfo } from "../model/MenuItemInfo";
import { MenuItemOption } from "../model/MenuItemOption";
import { Cart } from "../model/Cart";
import { CartInfo } from "../model/CartInfo";
import { CartItem } from "../model/CartItem";
import { Order } from "../model/Order";
import { OrderInfo } from '../model/OrderInfo';

const logger = require('../common/Logger');
const sortBy = require('sort-by');

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
     * Returns list of all menu items for restaurant at input airport and terminal.
     *
     **/
    static getMenuItems(airportId, terminalId, restaurantId, callback) {
      let menuPath = "/menu/" + airportId + "_" + terminalId + "_" + restaurantId;
      firebase.database().ref(menuPath).once('value', (snapshot) => {
        var menuItems = [];
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach(function(menuItemId) {
          let menuItem = new MenuItem(menuItemId, snapshot.val()[menuItemId]);
            logger.debug("Reading Menu Item ID " + menuItemId + " - " + menuItem);
            menuItems.push(menuItem);
          });
        }
        callback(menuItems);
      });
    }

    /**
     * Saves user cart info.
     *
     **/
    static saveUserCartInfo(userId, cartInfo) {
      let userCartInfoPath = "/cart/" + userId + "/info";
      return firebase.database().ref(userCartInfoPath).set(cartInfo.toJson());
    }

    /**
     * Registers a listener to user cart info updates.
     *
     **/
    static listenUserCartInfo(userId, callback) {
      let userCartInfoPath = "/cart/" + userId + "/info";
      firebase.database().ref(userCartInfoPath).on('value', (snapshot) => {
          var userCartInfo = "";
          if (snapshot.val()) {
              userCartInfo = CartInfo.fromJson(snapshot.val());
          }
          callback(userCartInfo)
      });
    }

    /**
     * - Insert cartItem to user's cart in database
     * - Update user's cart info
     **/
    static addItemToUserCart(userId, cart, cartItem) {
      let userCartItemsPath = "/cart/" + userId + "/" + "items";
      let userCartInfoCountPath = "/cart/" + userId + "/" + "info/count";
      // Create new entry for cartItem in DB
      let newCartItemRef = firebase.database().ref(userCartItemsPath).push();
      let userCartInfoCountRef = firebase.database().ref(userCartInfoCountPath);
      // Save cartItem to database and increment count in cart info
      newCartItemRef.set(cartItem.toJson(), function(error) {
          if (error) {
            logger.error('Add item to user cart failed abnormally!', error);
          } else {
            logger.debug('Successfully added item to users cart!');
            userCartInfoCountRef.transaction(function(currentCount) {
              if (currentCount) {
                return currentCount + 1;
              } else {
                return 1;
              }
            });
          }
        });
    }

    /**
     * Remove item from users cart.
     *
     **/
    static removeItemFromUserCart(userId, cartItemId) {
      let userCartItemPath = "/cart/" + userId + "/" + "items" + "/" + cartItemId;
      let userCartInfoCountPath = "/cart/" + userId + "/" + "info/count";
      // Create new entry for cartItem in DB
      let userCartItemRef = firebase.database().ref(userCartItemPath);
      let userCartInfoCountRef = firebase.database().ref(userCartInfoCountPath);
      // Save cartItem to database and decrement count in cart info
      userCartItemRef.remove(function(error) {
          if (error) {
            logger.error('Remove item from user cart failed abnormally!', error);
          } else {
            logger.debug('Successfully removed item to users cart!');
            userCartInfoCountRef.transaction(function(currentCount) {
              if (currentCount) {
                return currentCount - 1;
              } else {
                return 0;
              }
            });
          }
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
     * Save order for user in the database.
     * - Generate orderId
     * - Save order info and items in database
     * - Invoke callback with order
     *
     **/
    static createOrder(userId, order, callback) {
      let userOrderPath = "/order/" + userId;
      let newOrderRef = firebase.database().ref(userOrderPath).push();
      let userOrderCountPath = userOrderPath + "/" + count;
      let userOrderCount = firebase.database().ref(userOrderCountPath)

      return newOrderRef.set(order.toJson()).onComplete(function(error) {
        if (error) {
          logger.error('Error while creating order!', error);
        } else {
          userOrderCount.transaction(function(currentCount) {
            if (currentCount) {
              return currentCount + 1;
            } else {
              return 0;
            }
          });
        }
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
