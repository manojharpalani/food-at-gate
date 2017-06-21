import Sentry from 'sentry-expo';

const Environment = require('./Environment');
const logPrefix = "FOODATGATE-LOG-";

/**
 * Initialize Sentry logger
 **/
 function init() {
   console.log("Initializing Sentry : " + Environment.sentryDNS);
   Sentry.config(Environment.sentryDNS).install();
 }

/**
 * Log levels supported :
 * RAW - Verbose log level is for logging raw wire logs like service request/response
 * ERROR - Error log level is for logging application exceptions or errors
 * INFO - Info log level is for logging informational logs
 * DEBUG - Debug log level is for logging debugging statements
 **/
function log(level, message) {
  if (Environment.logLevel == "RAW") {
    console.log(logPrefix + " : " + message);
  } else if (Environment.logLevel == "ERROR" && level == "ERROR") {
    console.log(logPrefix + " : " + message);
    Sentry.captureMessage(message);
  } else if (Environment.logLevel == "INFO" && level == "INFO") {
    console.log(logPrefix + " : " + message);
  } else if (Environment.logLevel == "DEBUG" && (level == "DEBUG" || level == "INFO")) {
    console.log(logPrefix + " : " + message);
  }
}

function raw(message) {
  log("RAW", message);
}

function error(message) {
  log("ERROR", message);
}

function debug(message) {
  log("DEBUG", message);
}

function info(message) {
  log("INFO", message);
}

module.exports = { log, raw, error, debug, info, init };
