import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//others imports
import { Button, Overlay } from 'react-native-elements';
import { Icon, Spinner } from 'native-base';
//firebase imports
import { useFirebase } from '../../config/firebase'
//stylesheet import
import styles from './styles'
//import my componets
import { Card } from '../';
import { fonts, colors } from '../../styles';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import metrics from '../../styles/metrics';

export const DataItem = ({ item }) => {

    return (
        <>
            {
                item.map((data, index) => {
                    return (
                        <View key={index}>
                            <View>
                                <Text>{data.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontWeight: 'bold' }}>Quantidade:</Text>
                                <Text> {data.quantity} </Text>
                            </View>
                            <View style={{ marginBottom: 10 }} />
                        </View>
                    )
                })
            }


        </>
    )
}

export default function Pedidos({ documentDataIndex, loadingIndex }) {

    const { authUser, getMyrequest, getDocument, editStatus } = useFirebase();
    const [userData, setuserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [documentData, setdocumentData] = useState([]);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };


    React.useEffect(() => {
        if (authUser) {

            setLoading(true)

            getMyrequest(

                (result) => {

                    if (!result.empty) {

                        let list = [];

                        result.forEach(doc => {
                            let mapData = Object.values(doc.data().pedido);
                            const { total, status, userId, name, phone, adress, bairro, city } = doc.data();

                            list.push({
                                id: doc.id,
                                total,
                                status,
                                pedido: mapData,
                                userId,
                                name,
                                phone,
                                adress,
                                bairro,
                                city
                            })

                        });
                        setdocumentData(list);
                        setTimeout(() => {
                            setLoading(false);
                        }, 2000);

                    } else {
                        setTimeout(() => {
                            setLoading(false);
                        }, 2000);
                        setdocumentData(null);
                    }
                },
            );
        }
    }, []);

    const RightActions = (progress, dragX, item) => {

        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7, 0]
        });

        return (
            <>
                <TouchableOpacity onPress={() => statusItem(item.id, "cancelado")}>
                    <View
                        style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
                        <Animated.Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 10,
                                fontWeight: '600',
                                transform: [{ scale }]
                            }}>
                            <Icon style={{ fontSize: 28, color: colors.text, }} type={'MaterialCommunityIcons'} name={'close-octagon'} />
                        </Animated.Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => statusItem(item.id, "entregue")}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'green',
                            justifyContent: 'center'
                        }}>
                        <Animated.Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 10,
                                fontWeight: '600',
                                transform: [{ scale }]
                            }}>
                            <Icon style={{ fontSize: 28, color: colors.text }} type={'MaterialCommunityIcons'} name={'check-all'} />
                        </Animated.Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => statusItem(item.id, "a caminho")}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'blue',
                            justifyContent: 'center'
                        }}>
                        <Animated.Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 10,
                                fontWeight: '600',
                                transform: [{ scale }]
                            }}>
                            <Icon style={{ fontSize: 28, color: colors.text }} type={'MaterialCommunityIcons'} name={'moped'} />
                        </Animated.Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const statusItem = (id, value) => {
        editStatus("Pedidos", id, { status: value })
    }

    const renderData = () => {

        if (loading) {

            return (
                <>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        textAlign: 'center',
                        alignContent: 'center',
                        justifyContent: 'center'

                    }}>
                        <View>
                            <Spinner color='red' />
                            <Text style={styles.textMessage}>Aguarde, procurando itens disponíveis...</Text>
                        </View>

                    </View>
                </>
            )
        } else {

            return (
                <>
                    { documentData ? (
                        <>
                            <ScrollView>
                                {documentData.map((data, index) => {

                                    return (
                                        <Swipeable key={index} renderRightActions={(progress, dragX) => RightActions(progress, dragX, data)} >
                                            <View style={styles2.container}>
                                                <TouchableOpacity onPress={toggleOverlay}>
                                                    <Card>
                                                        <View style={styles2.content}>
                                                            <View>
                                                                <Text style={styles2.data}>{data.id}</Text>
                                                            </View>
                                                            <View style={[styles2.statusView, { backgroundColor: data.status == 'ativo' || data.status == 'entregue' || data.status == 'a caminho' ? colors.green : colors.red }]}>
                                                                <Text style={styles2.status}>{data.status}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={styles2.separator} />
                                                        <Text>Cliente: {data.name}</Text>
                                                        <Text>Telefone: {data.phone}</Text>
                                                        <Overlay isVisible={visible}>
                                                            <View style={{ width: metrics.screenWidth - 80, height: metrics.screenHeight - 170, }}>
                                                                <View>
                                                                    <Text style={styles2.data}>{data.id}</Text>
                                                                    <View style={{ borderColor: '#f5f5f5', borderWidth: 1, marginTop: 15, marginBottom: 15, marginHorizontal: 25 }} />
                                                                    <Text>Cliente: {data.name}</Text>
                                                                    <View style={{ borderColor: '#f5f5f5', borderWidth: 1, marginTop: 15, marginBottom: 15, marginHorizontal: 25 }} />
                                                                    <Text>{data.adress}</Text>
                                                                    <Text>{data.bairro} - {data.city}</Text>
                                                                    <View style={{ borderColor: '#f5f5f5', borderWidth: 1, marginTop: 15, marginBottom: 15, marginHorizontal: 25 }} />
                                                                    <Text>Telefone: {data.phone}</Text>
                                                                </View>
                                                                <View style={styles2.separator} />
                                                                <DataItem item={data.pedido} />
                                                                <View style={styles2.separator} />
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: 25 }}>
                                                                    <View>
                                                                        <Text style={styles2.totalText}>Total</Text>
                                                                    </View>
                                                                    <View >
                                                                        <Text style={styles2.totalValue}>R${data.total}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ paddingTop: 190, paddingHorizontal: 50 }}>
                                                                    <Button title="Fechar" onPress={toggleOverlay} />
                                                                </View>
                                                            </View>
                                                        </Overlay>
                                                        <View style={styles2.separator} />

                                                        <View style={styles2.content}>
                                                            <View>
                                                                <Text style={styles2.totalText}>Total</Text>
                                                            </View>
                                                            <View >
                                                                <Text style={styles2.totalValue}>R${data.total}</Text>
                                                            </View>
                                                        </View>
                                                    </Card>
                                                </TouchableOpacity>
                                            </View>
                                        </Swipeable>
                                    )

                                }
                                )}
                            </ScrollView>
                        </>
                    ) : (
                        <>
                            <View style={styles.container2}>
                                <Text style={styles.textMessage}>Nenhum Pedido</Text>
                            </View>
                        </>
                    )}
                </>
            )
        }
    }

    const LoadingAnimation = () => {

        return (
            <>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    textAlign: 'center',
                    paddingTop: 180
                }}>
                    <View>
                        <Spinner color='red' />
                        <Text style={styles.textMessage}>Aguarde, procurando itens disponíveis...</Text>
                    </View>

                </View>
            </>
        )

    }

    return (
        <>

            { renderData()}

        </>

    );
}

const styles2 = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    data: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.regular
    },
    statusView: {
        width: 'auto',
        height: 20,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    status: {
        color: colors.white,
        paddingHorizontal: 5
    },
    myItens: {

    },
    separator: {
        borderColor: '#f5f5f5',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },
    totalText: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.headertitle
    },
    totalValue: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.headertitle
    }
});