const db = firebase.database();

$(document).ready(function() {


});



var team1 = 0;
var team2 = 0;

var data1 = {};
var data2 = {};

function loadTeam() {
    $("#section-tab-matches").show();
    if (isNaN(parseInt($("#team1").val()))) {
        $("#alerts1").text("Please enter a valid team number.");
        return;
    } else {
        $("#alerts1").text("");
    }

    // if (isNaN(parseInt($("#team2").val()))) {
    //     $("#alerts2").text("Please enter a valid team number.");
    //     return;
    // } else {
    //     $("#alerts2").text("");
    // }

    team1 = parseInt($("#team1").val());
    team2 = parseInt($("#team2").val());

    retrieveData();
}

function retrieveData() {
    db.ref("allteams/" + team1).on('value', function(snap) {

        if (snap.exists()) {

            $("#alerts1").html("Viewing data for team: " + team1);
            console.log("Viewing data for team: " + team1);
            data1 = {};
            snap.forEach(function(matchsnap) {
                parseMatch1(matchsnap);
            });
            // Matches have been retrieved
            populateMatchHistory();
            console.log("pls");

        } else {

            $("#alerts").html("Failed to retrieve data for team: " + team1 + "<br>Please check your internet connection and if the team exists in the database.");

        }

    });

    db.ref("allteams/" + team2).on('value', function(snap) {

        if (snap.exists()) {

            $("#alerts2").html("Viewing data for team: " + team2);
            console.log("Viewing data for team: " + team2);
            data2 = {};

            snap.forEach(function(matchsnap) {
                parseMatch2(matchsnap);
            });

            // Matches have been retrieved
            populateMatchHistory();

        } else {

            $("#alerts").html("Failed to retrieve data for team: " + team2 + "<br>Please check your internet connection and if the team exists in the database.");

        }

    });
}

function parseMatch1(matchsnap) {

    matchsnap.forEach(function(infosnap) {

        if (typeof data1[infosnap.key] == "undefined") {
            data1[infosnap.key] = [];
        }

        data1[infosnap.key].push(infosnap.val());

    });

}

function parseMatch2(matchsnap) {

    matchsnap.forEach(function(infosnap) {

        if (typeof data2[infosnap.key] == "undefined") {
            data2[infosnap.key] = [];
        }

        data2[infosnap.key].push(infosnap.val());

    });

}