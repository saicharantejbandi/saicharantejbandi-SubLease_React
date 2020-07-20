import firebase from 'firebase/app';
import 'firebase/storage';
var firebaseConfig = {
    apiKey: "AIzaSyAensdze6OcZoGgKTz7PcTOgEm8uroDU8Y",
    authDomain: "react-my-burger-4ff3d.firebaseapp.com",
    databaseURL: "https://react-my-burger-4ff3d.firebaseio.com",
    projectId: "react-my-burger-4ff3d",
    storageBucket: "react-my-burger-4ff3d.appspot.com",
    messagingSenderId: "373716093509",
    appId: "1:373716093509:web:97f91001439318cff0712c",
    measurementId: "G-XDBMCFPWCD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default}
