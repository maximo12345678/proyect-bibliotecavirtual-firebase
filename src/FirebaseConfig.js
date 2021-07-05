import firebase from 'firebase'
import 'firebase/auth' //servicio de autenticacion
import 'firebase/firestore' //servicio de base de datos

//import * as admin from 'firebase-admin';

const firebaseConfig = {
    apiKey: "AIzaSyCNvBugl1KZ_ccPkjL4hlcGS1vSP8S5RsE",
    authDomain: "biblioteca-virtual-b941e.firebaseapp.com",
    projectId: "biblioteca-virtual-b941e",
    storageBucket: "biblioteca-virtual-b941e.appspot.com",
    messagingSenderId: "28718500728",
    appId: "1:28718500728:web:ea0ef2629341e04fa8568d"
  };


// Inicializando el servicio de Firebase. 
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth() //aca esta todo el objeto o el servicio de firebase autenticacion
const store = fire.firestore(); //aca esta todo para la base de datos



//const app = admin.initializeApp(firebaseConfig)


export { auth } //lo exportamos 
export { store } //lo exportamos 
