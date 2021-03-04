import React from 'react';
import { View, StatusBar, Text, ActivityIndicator } from 'react-native';
import Lottie from 'lottie-react-native';
import dataloading from '../../loaders/order-option.json';
import { colors } from '../../styles';

function Loading({ navigation }) {
 
  return (

    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white
    }}>
      <StatusBar style="auto" />
      <Lottie
        source={dataloading}
        style={{
          width: 250,
          height: 250
        }}
        autoPlay loop
      />
    <Text style={{ color: colors.brown, fontWeight: 'bold', fontSize: 12, marginVertical: 20}}>Aguarde enquanto arrumamos tudo para você!</Text>
        <ActivityIndicator size="small" color={colors.brown} />
    </View>

  );


}

export default Loading;