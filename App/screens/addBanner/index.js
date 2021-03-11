import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { useFirebase } from '../../config/firebase'
import { Button, Overlay } from 'react-native-elements';
import { metrics } from '../../styles';
import * as ImagePicker from "expo-image-picker";
import FireFunctions from "../../config/FireFunctions";

const addBanner = ({ navigation }) => {
    const { getBanner, updateBanner } = useFirebase();
    const [dataBanner, setdataBanner] = useState([])
    const [image, setImage] = useState(null)
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        getBanner("Promoções", (result) => {
            console.log(result.data().banner)
            if (result) {
                setdataBanner(result.data().banner);
            }
        })
        const unsubscribe = getPhotoPermission()
        return () => {
            unsubscribe
        }

    }, []);

    const getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

            if (status != "granted") {
                alert("We need permission to use your camera roll if you'd like to incude a photo.");
            }
        }
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const handleEdit = (index, newImg) => {

        let newArr = [...dataBanner]; // copying the old datas array
        newArr[index] = newImg; // replace e.target.value with whatever you want to change it to
        // updating the dataBanner on firestorage
        updateBanner({ banner: newArr })
    }

    const handleDeletete = (index) => {
        if (dataBanner.length > 1) {
            // assigning the dataBanner to newArr variable
            let newArr = [...dataBanner]; // copying the old datas array
            // removing the element using splice
            newArr.splice(index, 1);
            // updating the dataBanner on firestorage
            updateBanner({ banner: newArr })
        }

    }

    const handleaddNew = async () => {

        const remoteUri = await FireFunctions.shared.uploadPhotoAsync(image)
        const index = dataBanner.length;
        // assigning the dataBanner to newArr variable
        let newArr = [...dataBanner]; // copying the old datas array
        // removing the element using splice
        newArr[index] = remoteUri;
        // updating the dataBanner on firestorage
        updateBanner({ banner: newArr })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {dataBanner.map((item, key) => (
                    <View key={key} style={styles.content}>
                        <Image resizeMode="contain" style={styles.image} source={{ uri: item }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 6, paddingRight: 15 }}>
                                <TouchableOpacity
                                    onPress={() => handleEdit(key, "https://vivariomarrecife.com.br/wp-content/uploads/2020/10/kopenhagen.png")}
                                    style={styles.addCartButton}>
                                    <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Editar </Text>
                                    <View style={{ width: 10 }} />
                                    <Icon name="pencil" size={30} style={{ color: '#fff' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 6 }}>
                                <TouchableOpacity
                                    onPress={() => handleDeletete(key)}
                                    style={styles.addCartButton}>
                                    <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Excluir </Text>
                                    <View style={{ width: 10 }} />
                                    <Icon name="trash" size={30} style={{ color: '#fff' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
                )}
                <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity
                        onPress={() => toggleOverlay()}
                        style={styles.addCartButton}>
                        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Adicionar </Text>
                        <View style={{ width: 10 }} />
                        <Icon name="add" size={30} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
                <Overlay isVisible={visible}>
                    <View style={{ width: metrics.screenWidth - 80, height: metrics.screenHeight - 170, }}>
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={{ width: '100%', height: 300, borderRadius: 20 }}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => pickImage()}>
                                <Image style={styles.ButtonImg} source={require('../../assets/add_p.png')} />
                            </TouchableOpacity>
                        )}
                        <View style={{ paddingTop: 190, paddingHorizontal: 50 }}>
                            <Button title="Fechar" onPress={toggleOverlay} />
                        </View>
                    </View>
                </Overlay>
            </ScrollView>
        </View>
    )
}

export default addBanner;

