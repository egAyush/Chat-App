/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyD38sql9fbfKt8sRUD3Zrm5p3Hg7hCULVE',
  authDomain: 'chat-web-app1-1f335.firebaseapp.com',
  databaseURL:
    'https://chat-web-app1-1f335-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-web-app1-1f335',
  storageBucket: 'chat-web-app1-1f335.appspot.com',
  messagingSenderId: '104608603919',
  appId: '1:104608603919:web:a6f9ed8477371c7012e87a',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.messaging();
