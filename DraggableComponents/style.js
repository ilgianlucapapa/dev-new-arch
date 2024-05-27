import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  toolbar: {
    height: 35,
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icons: {
    color: '#333',
    marginHorizontal: 8
  },
  box: {
    height: 350,
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 1
    // position: 'absolute',
    // bottom: 50,
    // left: 0,
    // right: 0
  },
  boxFullScreen: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#333',
    borderRadius: 0,
    padding: 1
  },
  boxMinimize: {
    height: 25,
    width: Dimensions.get('window').width,
    backgroundColor: '#333',
    borderRadius: 0,
    padding: 1,
    position: 'absolute',
    bottom: 35
  }
});

export default styles;
