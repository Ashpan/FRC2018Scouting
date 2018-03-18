window.onload = function() {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
        document.getElementById('login').text = 'Welcome ' + user.displayName + '| Log Out';
        document.getElementById('login_link').text = '';
        document.getElementById('login_link').removeAttribute("href");
        
    } else {
    	login = document.getElementById('login').style.color = "#f93e3e"; 
        document.getElementById('login').text = 'Signed Out';
    }
};

function log_out(){
	firebase.auth().signOut();
	location.reload();
	console.log('log out');
}

// TODO: FIX SIGN OUT. Its running log_out() right away

// var user = firebase.auth().currentUser;
// if (user) {
// if (user.displayName === null || user.displayName === "undefined"){
// 	if(user.uid === "I1TVvuryPNVmNDPanLab0JC7NOA3"){
// 		user.updateProfile({
// 	  	displayName: "Ashpan School",
// 		}).then(function() {
// 		console.log('updated');
// 		}).catch(function(error) {
// 		console.log('error');
// 		});
// 	}
// 	if(user.uid === "T9SkN4j6MxdW10VMdj3U4sjmYWk2"){
// 		user.updateProfile({
// 	  	displayName: "Hannah Guo",
// 		}).then(function() {
// 		}).catch(function(error) {
// 		});
// 	}
// 	if(user.uid === "qKSJzKFqVjg2BedhbheL8tXR4OR2"){
// 		user.updateProfile({
// 	  	displayName: "Harsh Dawda",
// 		}).then(function() {
// 		}).catch(function(error) {
// 		});
// 	}

// }
// }