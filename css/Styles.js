import {  StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  homeLogo: {
    width: 200,
    height: 200,
  },
  buttons: {
    backgroundColor: "whitesmoke"
  },
  header: {
    position: 'absolute',
    top: 60,
    justifyContent: 'center'
  },
  body: {
    position: 'absolute',
    top: 160,
    justifyContent: 'center'
  },
  footer: {

  },
  back: {
    position: 'absolute',
    bottom: 20,
    left: 40
  },
  next: {
    position: 'absolute',
    bottom: 40,
    right: 40
  },
  topLeft: {
    position: 'absolute',
    left: 40,
    top: 40,
  },
  picker: {
    width: 300
  },
  pickerheading: {
    justifyContent: "flex-start"
  },
});

export { styles };

//module.export = styles;
