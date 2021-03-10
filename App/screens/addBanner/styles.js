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
        marginTop:20
    },
    image:{
        height: metrics.screenHeight / 2,
        width: metrics.screenWidth - 40,
        borderRadius: 10,
        marginHorizontal: 20
    },
    addCartButton: {
        width: 180,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
        padding: 4
    },

});