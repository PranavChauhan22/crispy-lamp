import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../config/firebase';
import { ImageBackground } from 'react-native';

const backImage = require("../assets/something.png");

export default function Signup({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to check for a valid email
    const iiitdEmailRegex = /^[^\s@]+@iiitd\.ac\.in$/; // Regex to check for email from iiitd.ac.in domain
    return emailRegex.test(email) && iiitdEmailRegex.test(email);
  };

  // const database = firebase.database();

  const onHandleSignup = () => {

    if (!username) return alert("Please fill User Name");
    if (!email) return alert("Please fill your IIITD email address");
    if (!password) return alert("Please enter a suitable Password");
    if (!isValidEmail(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email from iiitd.ac.in domain.');
    }
    console.log('hello');
    if (email !== '' && password !== '' && username!=='') {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(1);
        const user = userCredential.user;
        console.log(2);
        setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          uid: user.uid,
        });
      })
      .catch((error) => Alert.alert("Signup", error.message));
      }
  };

  return (

    <View style={styles.container}>
      <ImageBackground source = {backImage} style={styles.backImage}> 
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor = {'#fff'}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Enter username"
            autoCapitalize="none"
            placeholderTextColor = {'#fff'}
            autoCorrect={false}
            secureTextEntry={false}
            textContentType="username"
            value={username}
            onChangeText={(text) => setUserName(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            placeholderTextColor = {'#fff'}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Sign Up</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color: '#f506f9', fontWeight: '600', fontSize: 14}}> Log In</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#f506f9",
    alignSelf: "center",
    paddingTop: 80,
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#000",
    height: 58,
    marginBottom: 20,
    color: '#fff', 
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    borderColor: '#fff',
    borderWidth: 1
  },
  backImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#000',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f506f9',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});