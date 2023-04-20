import React from "react";
import { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Flash from "./screens/Flash";
import Counsellors from "./screens/Counsellors";
import Menu from "./screens/Menu";
import BookAppointment from "./screens/BookAppointment";
import Logout from "./screens/Logout";
import Menu_C from "./screens/Menu_C";
import Home_C from "./screens/Home_C";
import Students_C from "./screens/Students_C";
import Logout_C from "./screens/Logout_C";
import Talk_to_couns from "./screens/Talk_to_couns";


const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  return (

    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function ChatStack(props) {

  email = props.currentUser.email;

  const stud_proff = () => {
    
    if (email === 'khushpinder@iiitd.ac.in' || email === 'amitapuri@iiitd.ac.in') {
      
      return true;
    }
    
    return false;
  }
  
  console.log('App', stud_proff());
  
  return (

    <Stack.Navigator screenOptions={{headerShown: false}}>

      {stud_proff() ? (
        <>
          <Stack.Screen name = 'Home_C' component = {Home_C} options = {{ headerShown: false }} />
          <Stack.Screen name = 'Students_C' component = {Students_C} initialParams={{ myVariable: email }}/>
          <Stack.Screen name = 'Menu_C' component = {Menu_C} options = {{ headerShown: false }}/>
          <Stack.Screen name = 'Logout_C' component = {Logout_C} options = {{ headerShown: false }}/>
        </>
      ) : (
        <>
          <Stack.Screen name = 'Home' component = {Home} options = {{ headerShown: false }} />
          <Stack.Screen name = 'Talk_to_couns' component = {Talk_to_couns} options = {{ headerShown: false }} />
          <Stack.Screen name = 'Chat' component = {Chat} options = {{ headerShown: false }} />
          <Stack.Screen name = 'Menu' component = {Menu} options = {{ headerShown: false }}/>
          <Stack.Screen name = 'Logout' component = {Logout} options = {{ headerShown: false }}/>
          <Stack.Screen name = 'Counsellors' component = {Counsellors} options = {{ headerShown: false }}/>
        </>
      )}
    </Stack.Navigator>
  );
}

function AuthStack() {

  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name = 'Flash' component = {Flash} />
      <Stack.Screen name = 'Login' component = {Login} />
      <Stack.Screen name = 'Signup' component = {Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    tmp = user;
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (

    <NavigationContainer>
      {user ? <ChatStack currentUser = {user} /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}