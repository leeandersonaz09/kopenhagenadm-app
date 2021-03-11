import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { useFirebase } from '../../config/firebase'
import { Button, Overlay } from 'react-native-elements';
import { metrics } from '../../styles';
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import FireFunctions from "../../config/FireFunctions";
import { showMessage } from 'react-native-flash-message';

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
        setImage(null);
    };
    /*
    const handleEdit = (index) => {

        let newArr = [...dataBanner]; // copying the old datas array
        newArr[index] = newImg; // replace e.target.value with whatever you want to change it to
        // updating the dataBanner on firestorage
        updateBanner({ banner: newArr })
    }
    */
    const handleDelete = (index) => {
        if (dataBanner.length > 1) {
            // assigning the dataBanner to newArr variable
            let newArr = [...dataBanner]; // copying the old datas array
            // removing the element using splice
            newArr.splice(index, 1);
            // updating the dataBanner on firestorage
            updateBanner({ banner: newArr });
        } else {
            showMessage({
                message: `Você precisa de pelo menos um banner!`,
                type: 'warning'
            })
        }

    }

    const handleaddNew = async () => {
        if (image) {
            //Upload local image to store on firebase and return a link url to remoteUri
            const remoteUri = await FireFunctions.shared.uploadPhotoAsync(image)
            console.log('REMOTE' + remoteUri);
            const index = dataBanner.length;
            console.log('INDEX' + index);
            // assigning the dataBanner to newArr variable
            let newArr = [...dataBanner]; // copying the old datas array
            // removing the element using splice
            newArr[index] = remoteUri;
            // updating the dataBanner on firestorage
            updateBanner({ banner: newArr })
            console.log('DATABANNER' + dataBanner);
            toggleOverlay();
        } else {
            showMessage({
                message: `Você precisa de pelo menos uma imagem selecionada!`,
                type: 'warning'
            })
            toggleOverlay();
        }

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

                        <View style={styles.deletebuttonView}>
                            <TouchableOpacity
                                onPress={() => handleDelete(key)}
                                style={styles.addCartButton}>
                                <Text style={styles.buttonText}>Excluir </Text>
                                <View style={{ width: 10 }} />
                                <Icon name="trash" size={30} style={styles.Icon} />
                            </TouchableOpacity>
                        </View>

                    </View>
                )
                )}
                <View style={styles.addButton}>
                    <TouchableOpacity
                        onPress={() => toggleOverlay()}
                        style={styles.addCartButton}>
                        <Text style={styles.textaddButton}>Adicionar </Text>
                        <View style={{ width: 10 }} />
                        <Icon name="add" size={30} style={styles.Icon} />
                    </TouchableOpacity>
                </View>
                <Overlay isVisible={visible}>
                    <View style={styles.screenWidth}>
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={styles.imageOverlay}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => pickImage()}>
                                <Image style={styles.ButtonImg} source={require('../../assets/add_p.png')} />
                            </TouchableOpacity>
                        )}
                        <View style={{ paddingTop: 190, paddingHorizontal: 50 }}>
                            <Button title="Enviar " onPress={() => handleaddNew()} />
                        </View>
                        <View style={{ paddingTop: 10, paddingHorizontal: 50 }}>
                            <Button title="Fechar" onPress={toggleOverlay} />
                        </View>
                    </View>
                </Overlay>
            </ScrollView>
        </View>
    )
}

export default addBanner;

