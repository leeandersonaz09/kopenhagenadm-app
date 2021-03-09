import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Tabs, Tab, TabHeading, Icon, ScrollableTab } from 'native-base';
import { MyRequestTab, Header } from '../../components';
import styles from './styles';
import colors from '../../styles/colors';
import { useFirebase } from '../../config/firebase'

export default function Cart({ navigation }) {
    const { authUser, getMyrequest } = useFirebase();

    function goToLogin() {
        navigation.navigate('Profile')
    }


    function checkisNologgeding () {

        if (authUser) {
            return (
                <MyRequestTab />
            )

        } else {

            return (
                <>
                    <View style={styles.container2}>
                        <Text style={styles.textMessage}>Faça login para ver seus pedidos em andamento</Text>
                        <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
                            <TouchableOpacity
                                onPress={() => goToLogin()}
                                style={styles.loginButton}>
                                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Ir par login </Text>
                                <View style={{ width: 10 }} />
                                <Icon name="log-in-outline" size={30} style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
        }

    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: colors.black }} />
            <Header>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.headerTitle}>Pedidos</Text>
                </View>
            </Header>

            {checkisNologgeding()}

        </>

    );
}
