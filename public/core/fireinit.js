// Initialize Firebase
//
// var config = {
//   apiKey: "AIzaSyBN0t6kDqp9E1lkj6s1tFncl1yXojkWybk",
//   authDomain: "scouting-compiler.firebaseapp.com",
//   databaseURL: "https://scouting-compiler.firebaseio.com",
//   storageBucket: "scouting-compiler.appspot.com",
//   messagingSenderId: "1024340362739"
// };
// //
// var config = {
//   apiKey: "AIzaSyCT_QffKeMhyhj-Do9sAIatIY4oKsHreDw",
//   authDomain: "dev-scouting-compiler.firebaseapp.com",
//   databaseURL: "https://dev-scouting-compiler.firebaseio.com",
//   storageBucket: "dev-scouting-compiler.appspot.com",
//   messagingSenderId: "424826179751"
// };
//
// var config = {
//   apiKey: "AIzaSyB3BIt6HKzH__TAc8fkoTkNK3QmYaqc6m8",
//   authDomain: "tdplqyg75gttdeuqsmhaqfdea4y.firebaseapp.com",
//   databaseURL: "https://tdplqyg75gttdeuqsmhaqfdea4y.firebaseio.com",
//   projectId: "tdplqyg75gttdeuqsmhaqfdea4y",
//   storageBucket: "tdplqyg75gttdeuqsmhaqfdea4y.appspot.com",
//   messagingSenderId: "675769870063"
// };

var config = {
  apiKey: "AIzaSyBQYkbfc-j59is-yW7Trq9ZUn_CYXxF9ss",
  authDomain: "qie7djdmghx9afqw5sida.firebaseapp.com",
  databaseURL: "https://qie7djdmghx9afqw5sida.firebaseio.com",
  projectId: "qie7djdmghx9afqw5sida",
  storageBucket: "qie7djdmghx9afqw5sida.appspot.com",
  messagingSenderId: "246917024511"
};

firebase.initializeApp(config);

const db = firebase.database();
const storage = firebase.storage();
const storageRef = storage.ref();
