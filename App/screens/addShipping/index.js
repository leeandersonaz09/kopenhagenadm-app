import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { useFirebase } from '../../config/firebase'
import { Button, Overlay } from 'react-native-elements';
import { metrics } from '../../styles';
import { Card } from '../../components'
import { showMessage } from 'react-native-flash-message';

const addShipping = ({ navigation }) => {
    const { setCollection, getColletionFrete, deleteItembyId } = useFirebase();
    const [dataFrete, setdataFrete] = useState([])
    const [bairro, setBairro] = useState('')
    const [valor, setValor] = useState(0.00)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const getCFrete = getColletionFrete((querySnapshot) => {

            if (!querySnapshot.empty) {
                const list = [];
                querySnapshot.forEach(doc => {

                    const { valor } = doc.data();
                    list.push({
                        id: doc.id,
                        valor
                    });
                });
                setdataFrete(list);
            } else {
                setdataFrete(null)
            }
        })

        return () => {
            getCFrete;
        }

    }, []);


    const toggleOverlay = () => {
        setVisible(!visible);
    };
  
    const handleEdit = (index) => {

        console.log('EDIT')
    }
 
    const handleDelete = (id) => {
        if (dataFrete.length > 1) {
            const collectionref = 'Frete'
            deleteItembyId(collectionref, id);
            showMessage({
                message: `Ação conluída com sucesso!`,
                type: 'success'
            })

        } else {
            showMessage({
                message: `Você precisa de pelo menos um bairro cadastrado!`,
                type: 'warning'
            })
        }

    }

    const handleaddNew = async () => {
        const collectionref = 'Frete'
        const docref = bairro

        try {
            setCollection(collectionref, docref, { valor: valor});
            showMessage({
                message: `Ação conluída com sucesso!`,
                type: 'success'
            })
            toggleOverlay();
        } catch (error) {
            showMessage({
                message: `Houve um erro, tente novamente!`,
                type: 'warning'
            })
            toggleOverlay();
        }
       
    }

    return (    
        <View style={styles.container}>
            <ScrollView>
                {dataFrete.map((item, key) => (
                    <View key={key} style={styles.content}>
                        <Card>
                            <View style={styles.textBox}>

                                <Text style={styles.textBairro}>Bairro: {item.id}</Text>
                                <Text style={styles.textPrice}>Valor: {item.valor}</Text>

                            </View>
                            <View style={styles.deletebuttonView}>
                                <View style={styles.buttonViewContainer}>
                                    <TouchableOpacity
                                        onPress={() =>( toggleOverlay(), setBairro(item.id), setValor(item.valor))}
                                        style={[styles.addeditButton, { marginRight: 20 }]}>
                                        <Icon name="pencil" size={30} style={styles.Icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDelete(item.id)}
                                        style={styles.addeditButton}>
                                        <Icon name="trash" size={30} style={styles.Icon} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Card>
                    </View>
                )
                )}
                <View style={styles.addButton}>
                    <TouchableOpacity
                        onPress={() => ( toggleOverlay(), setBairro(''), setValor(0.00))}
                        style={styles.addCartButton}>
                        <Text style={styles.textaddButton}>Adicionar </Text>
                        <View style={{ width: 10 }} />
                        <Icon name="add" size={30} style={styles.Icon} />
                    </TouchableOpacity>
                </View>
                <Overlay isVisible={visible}>
                    <View style={styles.screenWidth}>
                        <Text style={styles.tittleOverlay}>Frete</Text>
                        <View style={styles.filds}>
                            <TextInput
                                style={styles.inputadress}
                                value={bairro}
                                placeholder="Bairro"
                                autoCorrect={false}
                                onChangeText={value => setBairro(value)}
                            />
                            <TextInput
                                style={styles.inputadress}
                                value={valor}
                                placeholder="Valor"
                                autoCorrect={false}
                                onChangeText={value => setValor(value)}
                            />
                        </View>

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

export default addShipping;

