import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD38sql9fbfKt8sRUD3Zrm5p3Hg7hCULVE',
  authDomain: 'chat-web-app1-1f335.firebaseapp.com',
  databaseURL:
    'https://chat-web-app1-1f335-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-web-app1-1f335',
  storageBucket: 'chat-web-app1-1f335.appspot.com',
  messagingSenderId: '104608603919',
  appId: '1:104608603919:web:a6f9ed8477371c7012e87a',
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();

export const database = app.database();
