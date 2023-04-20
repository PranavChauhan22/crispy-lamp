import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import * as Font from 'expo-font';
import { collection, query, where, getDocs, onSnapshot, querySnapshot } from "firebase/firestore"; 
import { auth, db } from '../config/firebase';

const customFonts = {
  	AlegreyaRegular: require('../assets/Alegreya-Bold.ttf'),
	OpenSans: require('../assets/OpenSans-Bold.ttf')
};

async function loadFonts() {
	await Font.loadAsync(customFonts);
}

loadFonts();

export default function Talk_to_couns ({ navigation }) {

	var studentList = [];

	// 	{
	// 		email: 'ajcnec',
	// 		username: 'aencecc'
	// 	},
	// 	{
	// 		email: 'ajcnecd',
	// 		username: 'aencecc'
	// 	},
	// 	{
	// 		email: 'ajcnece',
	// 		username: 'aencecc'
	// 	},
	// 	{
	// 		email: 'ajcnecf',
	// 		username: 'aencecc'
	// 	},
	// 	{
	// 		email: 'ajcnecg',
	// 		username: 'aencecc'
	// 	},
	// 	{
	// 		email: 'ajcnech',
	// 		username: 'aencecc'
	// 	},
	// 	{
	// 		email: 'ajcneci',
	// 		username: 'aencecc'
	// 	},
	// 	{
	// 		email: 'ajcnecj',
	// 		username: 'aencecc'
	// 	}
	// ];

    // const onShowList = async () => {
	// 	const querySnapshot = await getDocs(query(collection(db, "chats"), where("receiver", "==", auth?.currentUser?.email)));
	// 	if (querySnapshot && !querySnapshot.empty) {
	// 		querySnapshot.forEach((doc) => {
	// 			var {sender, senderName} = doc.data();
	// 			var x = {email: sender, username: senderName};
	// 			if (studentList.findIndex((s) => s.email === x.email) === -1) {
	// 				console.log(x);
	// 				studentList.push(x);
	// 			}
	// 		});
	// 	} else {
	// 		console.log("No documents found");
	// 	}
	// };

	// onShowList();

	// console.log('------------------');

	// console.log(studentList);

	// const studentList = [];

	var finalList = [];

	console.log('before function')
	
	// const onSend = useCallback(({studentList}) => {

	const onShowList = async () => {
		
		console.log('before await');	

		const querySnapshot = await getDocs(query(collection(db, "chats"), where("receiver", "==", auth?.currentUser?.email)));

		console.log('after await');
		
		if (querySnapshot && !querySnapshot.empty) {

			querySnapshot.forEach((doc) => {
			var {sender, senderName} = doc.data();
			var x = {email: sender, username: senderName};
				if (studentList.findIndex((s) => s.email === x.email) === -1) {
					console.log(x);
					studentList.push(x);
				}
			});
		} else {

			console.log("No documents found");
		}

		console.log('stud = ', studentList);
		
		return studentList;
	};

	onShowList();

	console.log('after function');

	// async function doSomething() {
	// 	studentList = await onShowList();
	// 	console.log("Student list:", studentList);
	// 	finalList = studentList;
	// }
	
	// doSomething();

	// (async () => {
	// 	const result = await onShowList();
	// 	console.log('------------------------------------------in function');
	// 	console.log(result);
	// 	// result.forEach(function(element) {
	// 	// 	finalList.append(element);
	// 	// });
	// 	finalList = result;
	// 	console.log(finalList);
	// 	// finalList = [...result];
	// })();
	// }
	// )

	// onSend(studentList);

	console.log('-------abc-----');
	console.log(studentList);
    
	return (

		<View style = {{flex: 1, backgroundColor:'#000'}}>
        <View style = {{flex: 1, marginTop:15, backgroundColor: '#000'}}>

		{/* <TouchableOpacity onPress={() => console.log(onShowList(studentList))}> */}
		<TouchableOpacity 
			onPress={() => 
				{
					onShowList(studentList);
					console.log(studentList);
				}}>
			<View style = {{height: 10, width: 10, backgroundColor: 'blue'}}>
				<Text>Hi</Text>
			</View>
		</TouchableOpacity>

		<View style = {{flex:1, backgroundColor: '#000'}}>
			<Text style = {styles.heading}>Students List</Text>
			<View style = {{marginTop: 30}}></View>
			<ScrollView style = {styles.container}>
				{studentList.map(({email, username}) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Chat", {toUser: email, userName: username})}>
                        <View key = {email} style = {styles.list}>
                            <Text style = {{fontSize: 22, textAlign: 'center', color: '#cccccc'}}>{username}</Text>
                        </View>
                    </TouchableOpacity>
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
		height: 600,
		backgroundColor: '#000',
		margin: 8,
		borderRadius: 8,
		backgroundColor: '#000'
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

		width: 320,
		height: 50,
		alignContent: 'center',
		justifyContent: 'center',
		// alignItems: 'center',
		margin: 8,
		height: 215,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#fff',
		backgroundColor: 'white',
		// borderWidth: 2,
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