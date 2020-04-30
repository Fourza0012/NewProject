// import firebase from 'firebase/app'
// import 'firebase/database'

// export const db = firebase
//   .initializeApp({ databaseURL: 'https://testforproject-932ff.firebaseio.com' })
//   .database()

import Firebase from 'firebase'
 let config = {
  apiKey: "AIzaSyDpfk-Va8cVBwy9CsLQWRKI_H1CIX9eFsE",
  authDomain: "testforproject-932ff.firebaseapp.com",
  databaseURL: "https://testforproject-932ff.firebaseio.com",
  projectId: "testforproject-932ff",
  storageBucket: "testforproject-932ff.appspot.com",
  messagingSenderId: "73553212882",
  appId: "1:73553212882:web:9c1146f355945af785440b"
  };
let app = Firebase.initializeApp(config)
export const db = app.database()