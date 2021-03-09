import React from 'react';
import { View, Text } from 'react-native';

import { useSelector } from 'react-redux';
import { cartQuantitySelector } from "../../store/cart";

import styles from './styles';

export default function Badge() {
	const length = 0;

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{length}</Text>
		</View>
	);
}
