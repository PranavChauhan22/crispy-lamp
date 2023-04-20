import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Font from 'expo-font';

const customFonts = {
  	AlegreyaRegular: require('../assets/Alegreya-Bold.ttf'),
	OpenSans: require('../assets/OpenSans-Bold.ttf')
};

async function loadFonts() {
	await Font.loadAsync(customFonts);
}

loadFonts();

export default function Counsellors({ navigation }) {

	const counsellors = [

		{   
            uid: "1",
			email: 'khushpinder@iiitd.ac.in',
			name: 'Khushpinder P. Sharma',
			image: require("../assets/prof1.jpg"),
			type: 'Counselling Psychologist',
			room: 'Room no. A-206, Academic Block',
			time: 'Availability: Monday to Friday'
		},
		{
            uid: "2",
			email: 'amitapuri@iiitd.ac.in',
			name: 'Amita Puri ',
			image: require("../assets/prof2.jpg"),
			type: 'Visiting Psychologist',
			room: 'Room no. A-205, Academic Block',
			time: 'Availability: Friday (11 am to 4 pm)'
		}
	]

    return (

		<View style = {{flex: 1, backgroundColor:'#000'}}>
        <View style = {{flex: 1, marginTop:15, backgroundColor: '#000'}}>

		<View style = {{flex:1, backgroundColor: '#000'}}>
			<Text style = {styles.heading}>Available Counsellors</Text>
			<View style = {{marginTop: 40}}></View>
			<ScrollView style = {styles.container}>
				{counsellors.map(({uid, email, name, image, type, room, time}) => (
					<View key = {uid} style = {styles.list}>
						<View style = {styles.pfp}>
							<Image 
							source = {image}
							style = {styles.imageCard}/>
						</View>	
						<View style = {styles.Text}>	
							<Text style = {{paddingTop: 10, fontSize: 22, color: '#cccccc'}}>{name}</Text>
							<Text style = {{paddingTop: 25,fontSize: 15, color: '#fff'}}>{type}</Text>
							<Text style = {{paddingTop: 18, fontSize: 12, color: '#fff'}}>{email}</Text>
							<Text style = {{paddingTop: 5,fontSize: 12, color: '#fff'}}>{room}</Text>
							<Text style = {{paddingTop: 5,fontSize: 12, color: '#fff'}}>{time}</Text>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
		</View>
		</View>
	)
}

const styles = StyleSheet.create({

    heading: {

        textAlign: 'center',
        fontSize: 38,
		color: '#f7bfb4',
		fontFamily: 'AlegreyaRegular'
    },

	container: {

		flex: 1,
		height: 400,
		backgroundColor: '#000',
		margin: 8,
		borderRadius: 8
	},

	Text: {

		flex: 1,
		flexGrow: 1,
		width: 180,
		// justifyContent: 'center',
		margin: 10,
		paddingLeft: 6,
		// backgroundColor: 'blue'
	},

	list: {

		flex: 1,
		flexDirection: 'row',
		// width: 300,
		alignContent: 'center',
		// alignItems: 'center',
		margin: 8,
		height: 215,
		borderRadius: 8,
		// backgroundColor: 'white',
		// borderWidth: 2,
		borderColor: '#fff'
	},

	pfp : {

		width: 140,
		height: 200,
		borderRadius: 8,
		borderColor: 'black',
	},

	imageCard: {

		height: 200,
		width: 140,
		borderRadius: 8,
		margin: 5,
		borderColor: 'white',
		borderWidth: 2
	}
})