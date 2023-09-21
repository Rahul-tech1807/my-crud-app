import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCWiobtqE-gMXpzVoA3MOcwurFI6MJpK1M",
    authDomain: "vue-frontend-cf97b.firebaseapp.com",
    projectId: "vue-frontend-cf97b",
    storageBucket: "vue-frontend-cf97b.appspot.com",
    messagingSenderId: "652249691520",
    appId: "1:652249691520:web:76552666619600bb4a3d65",
    measurementId: "G-8HSG3XHEVM"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

export { db };
