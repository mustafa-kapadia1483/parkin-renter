// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'parkin-e5c4e.firebaseapp.com',
  databaseURL: 'https://parkin-e5c4e-default-rtdb.firebaseio.com',
  projectId: 'parkin-e5c4e',
  storageBucket: 'parkin-e5c4e.appspot.com',
  messagingSenderId: '47062812420',
  appId: '1:47062812420:web:8fbc8d16d91d8f44883251',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;
