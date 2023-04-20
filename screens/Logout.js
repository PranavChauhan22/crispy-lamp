import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export default function Logout() {

	return (

		(() => {
			signOut(auth).catch(error => console.log('Error logging out: ', error));	
		})()
	);
}

const styles = StyleSheet.create({})