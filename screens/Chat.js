import React, {
	useState,
	useEffect,
	useLayoutEffect,
	useCallback
  } from 'react';
  import { TouchableOpacity, Text } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import {
	collection,
	addDoc,
	orderBy,
	query,
	onSnapshot,
	where,
	or,
	and,
	getDocs
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import { auth, db } from '../config/firebase';
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import colors from '../colors';
  
  export default function Chat({route}) {
  
	const [messages, setMessages] = useState([]);
	const [senderName, setSenderName] = useState('');
	const navigation = useNavigation();
	// const route = useRoute();
  
	const onSignOut = () => {
		signOut(auth).catch(error => console.log('Error logging out: ', error));
	  };
  
	useLayoutEffect(() => {
		navigation.setOptions({
		  headerRight: () => (
			<TouchableOpacity
			  style={{
				marginRight: 10
			  }}
			  onPress={onSignOut}
			>
			  <AntDesign name="logout" size={24} color={colors.lightGray} style={{marginRight: 10}}/>
			</TouchableOpacity>
		  )
		});
	  }, [navigation]);
  
	useLayoutEffect(() => {
	  const collectionRef = collection(db, 'chats');
	  const q = query(collectionRef, orderBy('createdAt', 'desc'), 
		or(and(where('sender','==',auth?.currentUser?.email), where('receiver','==',route.params.toUser)), 
		and(where('sender','==',route.params.toUser), where('receiver','==',auth?.currentUser?.email)))
	  );
  
	  const unsubscribe = onSnapshot(q, querySnapshot => {
		  console.log('querySnapshot unsusbscribe');
		  console.log(route.params.toUser);
			setMessages(
			  querySnapshot.docs.map(doc => ({
				_id: doc.data()._id,
				createdAt: doc.data().createdAt.toDate(),
				text: doc.data().text,
				user: doc.data().user,
				receiver: doc.data().receiver,
				sender: doc.data().sender,
				recname: doc.data().recname,
				senderName: doc.data().senderName
			  }))
			);
		  });
	  return unsubscribe;
	}, [route.params.toUser]);
  
	const onSend = useCallback((messages = [], senderName) => {
  
		setMessages(previousMessages =>
		  GiftedChat.append(previousMessages, messages)
		);
		
		// setMessages([...messages, ...messages]);
		const recname = route.params.receiverName;
		const receiver = route.params.toUser;
		const sender = auth?.currentUser?.email;
		const { _id, createdAt, text, user } = messages[0];
		
  
		const getSenderName = async () => {
		  const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", sender)));
		  if (querySnapshot && !querySnapshot.empty) {
			querySnapshot.forEach((doc) => {
			  const {username} = doc.data();
			  setSenderName(username);
			});
		  }
		  else{
			querySnapshot.forEach((doc) => {
			  const {username} = doc.data();
			  setSenderName(username);
			});
		  }
		};
		getSenderName();
		
		addDoc(collection(db, 'chats'), {
		  _id,
		  createdAt,
		  text,
		  user,
		  receiver,
		  sender,
		  recname,
		  senderName
		});    
	  }, [route.params.toUser]);
  
	  return (
		<GiftedChat
		  messages={messages}
		  showAvatarForEveryMessage={false}
		  showUserAvatar={false}
		  onSend={messages => onSend(messages, senderName)}
		  messagesContainerStyle={{
			backgroundColor: '#000'
		  }}
		  textInputStyle={{
			backgroundColor: '#fff',
			borderRadius: 20,
		  }}
		  user={{
			_id: auth?.currentUser?.email,
			avatar: 'https://play-lh.googleusercontent.com/_qUtBpMVsGY-CLPx2DreAENHAbr4KHwBGn2w_3jhGSzoRVFRKn0SXUaK0wXSU0SJ7A=w240-h480-rw'
		  }}
        />
      );
  }