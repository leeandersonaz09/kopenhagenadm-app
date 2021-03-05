import React, { useState, useEffect } from "react";
import { View, Alert, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Image, Button, StatusBar, Picker } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import FireFunctions from "../../config/FireFunctions";
import * as ImagePicker from "expo-image-picker";
import Lottie from 'lottie-react-native';
import dataloading from '../../loaders/mario.json';
import { Container, Textarea } from "native-base"

import { fonts, colors, metrics } from '../../styles';

export default function addProductScreen({ navigation }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState();

    useEffect(() => {
        const unsubscribe = getPhotoPermission()
        return () => {
            unsubscribe
        }
    }, [])

    const getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != "granted") {
                alert("We need permission to use your camera roll if you'd like to incude a photo.");
            }
        }
    };

    const handlePost = async () => {
        setLoading(true)
        FireFunctions.shared
            .addPost({ title: title.trim(), price: price.trim(), description: description.trim(), img: image })
            .then(ref => {

                setTimeout(() => {
                    Alert.alert('Tudo certo!', 'Cupon de desconto disponível.', [
                        {
                            text: 'Fechar',
                            style: 'cancel',
                        }
                    ]);

                    setTitle(""); setImage(null); setLoading(false); setDescription("");
                    navigation.push('Home');
                },
                    1000);
            })
            .catch(error => {
                alert(error);
            });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    if (loading == true) {
        return (
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#ffff' }}>
                <Lottie source={dataloading} style={{ width: 350, height: 350 }} autoPlay loop />
                <Text style={{ textAlign: 'center', color: '#ff5b77', fontSize: 12 }}>Aguarde... Estamos Salvando as Alterações</Text>
            </View>
        )
    }

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
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

                    <View style={styles.filds}>

                        <Text style={styles.Tittle} >Adicionar um cupom de desconto</Text>

                        <TextInput
                            style={styles.inputTittle}
                            placeholder="Titulo"
                            value={title}
                            onChangeText={text => setTitle(text)}
                        />
                        <View style={{ borderWidth: 1, borderColor: colors.gray, borderRadius: 20 }}>
                            <Picker
                                selectedValue={selectedLanguage}
                                style={styles.onePicker}
                                itemStyle={styles.onePickerItem}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                }>

                                <Picker.Item label="Clássicos" value="classicos" />
                                <Picker.Item label="Infantil" value="infantil" />
                                <Picker.Item label="Soul Good" value="soulgood" />
                                <Picker.Item label="Variedades" value="variedades" />
                                <Picker.Item label="Presentes" value="presentes" />
                                <Picker.Item label="Keepkop" value="keepkop" />
                                <Picker.Item label="Tabletes" value="tabletes" />
                                <Picker.Item label="Outros" value="outros" />
                            </Picker>
                        </View>
                        <Textarea
                            style={styles.inputDescription}
                            rowSpan={5}
                            bordered
                            value={description}
                            placeholder="Descrição"
                            placeholderStyle={{ fontFamily: fonts.SFP_regular, paddingHorizontal: 20, marginTop: 20 }}
                            onChangeText={description => setDescription(description)}
                        />
                        <TextInput
                            style={styles.inputPrice}
                            placeholder="Valor"
                            keyboardType='phone-pad'
                            autoCompleteType='cc-number'
                            value={price}
                            placeholderStyle={{ fontFamily: fonts.SFP_regular, paddingHorizontal: 20, marginTop: 20 }}
                            onChangeText={price => setPrice(price)}
                        />

                        <View style={styles.ButtonSend}>
                            <Button
                                status='success'
                                title='Cadastrar'
                                onPress={() => handlePost()}
                                disabled={
                                    image && title && description && price
                                        ? false
                                        : true
                                }>
                            </Button>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center'
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#ff5b77',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
        fontWeight: "bold",
    },
    filds: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginBottom: 40
    },
    Tittle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    ButtonImg: {
        marginBottom: 100,
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    ButtonSend: {
        marginTop: 10
    },
    inputTittle: {
        borderWidth: 1,
        borderColor: '#DDD',
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 10,
        borderRadius: 10
    },
    inputDescription: {
        borderWidth: 1,
        borderColor: '#DDD',
        fontSize: 16,
        color: '#444',
        marginBottom: 10,
        borderRadius: 10
    },
    inputPrice: {
        borderWidth: 1,
        borderColor: '#DDD',
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 10,
        borderRadius: 10
    }

});