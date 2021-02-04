import firebase from 'firebase/app';
import 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAZ8KxqVHd1AGizuXWSsx31plPMXXsg0r8',
  authDomain: 'ecommerce-4c445.firebaseapp.com',
  projectId: 'ecommerce-4c445',
  storageBucket: 'ecommerce-4c445.appspot.com',
  messagingSenderId: '282800598497',
  appId: '1:282800598497:web:6e602ae401be92c71d76a0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
