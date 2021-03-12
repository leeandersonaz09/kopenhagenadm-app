import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { useFirebase } from '../../config/firebase'
import { Button, Overlay } from 'react-native-elements';
import { metrics } from '../../styles';
import { showMessage } from 'react-native-flash-message';

const addShipping = ({ navigation }) => {
    const { updateBanner, getColletionFrete } = useFirebase();
    const [dataFrete, setdataFrete] = useState([])
    const [image, setImage] = useState(null)
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
            
           
        } else {
            showMessage({
                message: `Você precisa de pelo menos um banner!`,
                type: 'warning'
            })
        }

    }

    const handleaddNew = async () => {
        //
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {dataFrete.map((item, key) => (
                    <View key={key} style={styles.content}>
                        
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

export default addShipping;

