import { StyleSheet } from 'react-native';

import { colors, metrics, fonts} from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        alignContent: 'center',
        marginHorizontal:20
    },
    image: {
        height: metrics.screenHeight / 2 - 160,
        width: metrics.screenWidth - 40,
        borderRadius: 10,
    },
    textBox:{
        flexDirection: 'row', 
        justifyContent:'space-between',
        marginBottom:40
    },
    textPrice:{
        fontSize: fonts.headertitle,
        fontFamily: fonts.SFP_regular
    },
    textBairro:{
        fontSize: fonts.headertitle,
        fontFamily: fonts.SFP_regular
    },
    addCartButton: {
        width: 180,
        backgroundColor: colors.black,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
    },
    addeditButton: {
        width: 40,
        height:40,
        backgroundColor: colors.black,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 85,
    },
    buttonViewContainer: {
        flexDirection: 'row',
        marginHorizontal:20,
    },
    editbuttonView: {
        textAlign: 'center',
        alignItems: 'center',
        paddingRight: 15,
    },
    deletebuttonView: {
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold"
    },
    addButton: {
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    textaddButton: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold"
    },
    Icon: {
        color: colors.white
    },
    screenWidth: {
        width: metrics.screenWidth - 80,
        height: metrics.screenHeight - 170,
    },
    imageOverlay: {
        width: '100%',
        height: 300,
        borderRadius: 20,
    },
    ButtonImg: {
        marginTop: 50,
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    filds: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginBottom: 40
      },
      inputadress: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 10,
        borderRadius: 20
      },
      tittleOverlay:{
          fontFamily:fonts.SFP_bold,
          fontSize:20,
          marginTop:20,
          marginBottom:25,
          textAlign: 'center'
      }

});