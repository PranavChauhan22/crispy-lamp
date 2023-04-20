import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, ImageBackground } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; 

const backImage = require("../assets/something.png");

export default function Login({ navigation }) {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  var newemail;

  const onHandleLogin = async () => {
    if (username !== "" && password !== "") {
      const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", username)));
      if (querySnapshot && !querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const {email} = doc.data();
          newemail = email;
          console.log(newemail);
        });
      }
      else {
        console.log("No documents found");
      }
      signInWithEmailAndPassword(auth, newemail, password)
        .then(() => { 
          console.log("Login success")
        })
        .catch((error) => Alert.alert("Login error", error.message));
    }
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source = {backImage} style = {styles.backImage} >
      <View style = {styles.whiteSheet} />
      <SafeAreaView style = {styles.form}>
        <Text style = {styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor = {'#fff'}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
          textContentType="username"
          value={username}
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor = {'#fff'}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
        </TouchableOpacity>
        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{color: '#f506f9', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
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
    color: "#F506f9",
    alignSelf: "center",
    paddingTop: 20,
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
    resizeMode: 'cover',
    justifyContent: 'center',
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