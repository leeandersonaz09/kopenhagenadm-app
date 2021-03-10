import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { useFirebase } from '../../config/firebase'

const addBanner = ({ navigation }) => {
    const { getBanner } = useFirebase();
    const [dataBanner, setdataBanner] = useState([])

    useEffect(() => {

        getBanner("Promoções", (result) => {
            console.log(result.data().banner)
            if (result) {
                setdataBanner(result.data().banner);
            }
        })

    }, []);

    return (
        <View style={styles.container}>
            {dataBanner.map((item, index) => {
                console.log(item),
                <ScrollView>
                    <View style={styles.content}>
                        <Image key={index} resizeMode="contain" style={styles.image} source={{ uri: item }} />
                        <Text>{item}</Text>
                        <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                style={styles.addCartButton}>
                                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Editar </Text>
                                <View style={{ width: 10 }} />
                                <Icon name="pencil" size={30} style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                style={styles.addCartButton}>
                                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Excluir </Text>
                                <View style={{ width: 10 }} />
                                <Icon name="trash" size={30} style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            })}
        </View>
    )
}

export default addBanner;