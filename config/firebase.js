import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import 'firebase/compat/firestore';
import Constants from 'expo-constants';

//Firebase config
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    databaseURL: Constants.manifest.extra.databaseURL
};

// initialize firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);