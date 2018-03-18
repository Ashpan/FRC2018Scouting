window.onload = function() {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
        document.getElementById('login').text = 'Welcome ' + user.email;
        document.getElementById('login_link').text = 'Log Out';
        document.getElementById('login_link').href = '';
        document.getElementById('login_link').onclick = log_out();
        function log_out(){
	firebase.auth().signOut();
}
    } else {
    	login = document.getElementById('login').style.color = "#f93e3e"; 
        document.getElementById('login').text = 'Signed Out';
    }
};

