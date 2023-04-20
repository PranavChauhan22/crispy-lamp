import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const img = require("../assets/flash.png")

export default function Flash({navigation}) {

	useEffect(() => {

		const timer = setTimeout(() => {

			navigation.navigate('Login');
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigation]);
	
	return (
		<ImageBackground source = {img} style = {{flex:1, resizeMode: "cover", justifyContent: "center"}}></ImageBackground>
	)
}

const styles = StyleSheet.create({})