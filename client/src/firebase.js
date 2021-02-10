import firebase from 'firebase/app';
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAN6vKoI9YdvMos9tkNghebNDLMjt2sgs0",
    authDomain: "shop-fd939.firebaseapp.com",
    projectId: "shop-fd939",
    storageBucket: "shop-fd939.appspot.com",
    messagingSenderId: "1048655523688",
    appId: "1:1048655523688:web:a12d2462f547daea2af0dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { auth, googleAuthProvider };