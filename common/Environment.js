
const firebaseConfig = {
  apiKey: "AIzaSyDqzUpxJUs8n4pm-d8FEwKh9hEVGP8OyWk",
  authDomain: "foodatgate-77f82.firebaseapp.com",
  databaseURL: "https://foodatgate-77f82.firebaseio.com",
  projectId: "foodatgate-77f82",
  storageBucket: "foodatgate-77f82.appspot.com",
  messagingSenderId: "439766210032"
};

const Environment = {
  googleApiKey: 'AIzaSyClGlMUq7VVpOltAzd3RgPBON1RuLMdVHM',
  logLevel: "DEBUG", //RAW, DEBUG, INFO
  firebaseConfig: firebaseConfig,
  sentryDNS: 'https://4f59b4e78142429886745f75fd469769:51efd4f8edbc486da0330e5b2804e138@sentry.io/181859'
};

module.exports = Environment;
