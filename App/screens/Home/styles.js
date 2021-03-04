import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.white
  },
  ProductContainer: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: fonts.header,
    color: colors.white,
    fontWeight: "bold",
  },
  addButton: {
    position: 'absolute',
    backgroundColor: '#ff5b77',
    elevation: 4,
    borderRadius: 100,
    height: 57,
    width: 58,
    right: 15,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgrounImage: {
    width: '100%',
    height: 100,
    paddingRight:40,
    marginLeft:20
  },

  darkOverlay: {
    position: 'absolute',
    top: 0,
    right: 40,
    left: 0,
    height: 100,
    backgroundColor: colors.black,
    opacity: 0.2,
    borderRadius: 25,
    paddingRight:10,
  },

  imageContainer: {
    paddingTop: 30,
    paddingLeft: 16
  },

  UserGreat: {
    fontSize: fonts.big,
    fontWeight: 'bold',
    color: colors.white,
  },

  userText: {
    fontSize: fonts.regular,
    fontWeight: 'normal',
    color: colors.white,
  },

});

export default styles;

