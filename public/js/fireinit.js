var request = new XMLHttpRequest();
const year = '2018';
const event = 'onnyo';
// Initialize YORK DATABASE
//
 var config = {
    apiKey: "AIzaSyCxahRnzexvO_C-K6hFxgFb8Jvavr95Ick",
    authDomain: "scouting-compiler-onnyo.firebaseapp.com",
    databaseURL: "https://scouting-compiler-onnyo.firebaseio.com",
    projectId: "scouting-compiler-onnyo",
    storageBucket: "scouting-compiler-onnyo.appspot.com",
    messagingSenderId: "577025368281"
  };
  firebase.initializeApp(config);

// Initialize DEV DATABASE 
// var config = {
//   apiKey: "AIzaSyAUxp-Hz_5ZKo2WabIiEU3PUU8TEGwWAQE",
//     authDomain: "scouting-compiler-dev.firebaseapp.com",
//     databaseURL: "https://scouting-compiler-dev.firebaseio.com",
//     projectId: "scouting-compiler-dev",
//     storageBucket: "scouting-compiler-dev.appspot.com",
//     messagingSenderId: "211665111326"
// };
// firebase.initializeApp(config);

