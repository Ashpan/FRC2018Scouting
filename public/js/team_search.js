const db = firebase.database();

$(document).ready(function() {

    hideAll();

    $("#section-stats").show();

    $("button[id^=tab]").click(function() {

        hideAll();

        $("#section-" + $(this).attr("id")).show();
        $("#menu").text($(this).text());

    });
});

function hideAll() {
    $("#section-tab-stats").hide();
    $("#section-tab-statsgraphs").hide();
    $("#section-tab-matches").hide();
    $("#section-tab-matchesgraphs").hide();
    $("#section-tab-insights").hide();
}

var team = 0;

var data = {};

function loadTeam() {
    $("#section-tab-matches").show();
    if (isNaN(parseInt($("#team").val()))) {
        $("#alerts").text("Please enter a valid team number.");
        return;
    }

    team = parseInt($("#team").val());

    retrieveData();
}

function retrieveData() {
    db.ref("allteams/" + team).on('value', function(snap) {

        if (snap.exists()) {

            $("#alerts").html("Viewing data for team: " + team);
            console.log("Viewing data for team: " + team);
            data = {};

            snap.forEach(function(matchsnap) {
                parseMatch(matchsnap);
            });

            // Matches have been retrieved
            populateStats();
            populateMatchHistory();

        } else {

            $("#alerts").html("Failed to retrieve data for team: " + team + "<br>Please check your internet connection and if the team exists in the database.");

        }

    });
    firebase.storage().ref().child('teams/' + team).getDownloadURL().then(function(teamPic) {
        var img = document.getElementById('teamPic').src = teamPic;
    }).catch(function(error) {
        console.log("err");
        console.log(error.code);
        var img = document.getElementById('teamPic').src = "";
    });
}

function parseMatch(matchsnap) {

    matchsnap.forEach(function(infosnap) {

        if (typeof data[infosnap.key] == "undefined") {
            data[infosnap.key] = [];
        }

        data[infosnap.key].push(infosnap.val());

    });

}