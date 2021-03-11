import { StyleSheet } from 'react-native';

import { colors, metrics } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical:10
    },
    image: {
        height: metrics.screenHeight / 2 - 160,
        width: metrics.screenWidth - 40,
        borderRadius: 10,
        marginHorizontal: 20
    },
    addCartButton: {
        width: 180,
        backgroundColor: colors.black,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
    },
    buttonViewContainer: {
        flexDirection: 'row'
    },
    editbuttonView: {
        textAlign: 'center',
        alignItems: 'center',
        paddingRight: 15
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

});