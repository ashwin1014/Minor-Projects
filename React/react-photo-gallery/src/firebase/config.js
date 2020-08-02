import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBFH3nqKhXNFPWx9AC3bSI8sAIV6LPyBME",
authDomain: "react-image-gallery-dadda.firebaseapp.com",
databaseURL: "https://react-image-gallery-dadda.firebaseio.com",
projectId: "react-image-gallery-dadda",
storageBucket: "react-image-gallery-dadda.appspot.com",
messagingSenderId: "426852590188",
appId: "1:426852590188:web:9b56ede7288d14361fee49"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
