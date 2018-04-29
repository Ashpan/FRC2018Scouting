const db = firebase.database().ref();

var statisticsLoaderCounter = 0;
var teamCount = 0;
var rankingSelection = "";

$(document).ready(function() {

    $("button[id^=tab]").click(function() {
        rankingSelection = $(this).text();
        $("#menu").text(rankingSelection);
        rankingSelection = databaseRanking(rankingSelection);

    });

});

function databaseRanking(rankingSelection) {
    var toReturn = "";
    switch (rankingSelection) {
        case "Auto Switch":
            toReturn = "auto_switch_success";
            break;
        case "Auto Scale":
            toReturn = "auto_scale_success";
            break;
        case "Auto Vault":
            toReturn = "auto_vault";
            break;
        case "Teleop Switch":
            toReturn = "teleop_switch_success";
            break;
        case "Teleop Winning Scale":
            toReturn = "teleop_scale_winning_success";
            break;
        case "Teleop Losing Scale":
            toReturn = "teleop_scale_losing_success";
            break;
        case "Teleop Opposite Switch":
            toReturn = "teleop_opp_switch_success";
            break;
        case "Teleop Vault":
            toReturn = "teleop_vault";
            break;
        case "Alliance Switch Accuracy":
            toReturn = "switch_accuracy";
            break;
    }
    return toReturn;
}

function loadRankings() {
    var teamDone = [];
    var maxStat = -1;
    var maxTeam = 0;
    var numTeams = 0;
    var query = firebase.database().ref("statistics").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            numTeams++;
        });
        while (teamDone.length < numTeams) {
            maxTeam = 0;
            maxStat = -1;
            snapshot.forEach(function(childSnapshot) { //Cycling through each team
                var team = parseInt(childSnapshot.key);
                if ((teamDone.indexOf(team)) === -1) {

                    console.log(team); //team number
                    console.log(teamDone); //array of teams done
                    console.log((teamDone.indexOf(team))); //index where team is in array

                    childSnapshot.forEach(function(stats) { //Cycling through stats of Team

                        var statinfo = stats.key; //stat name (Eg: "average_auto_scale_success")
                        var actualstat = stats.val(); //stat value
                        if (statinfo == rankingSelection) { //if the stat name is the same as the selected in dropdown
                            console.log('looking at correct stat');
                            if (actualstat >= maxStat) { //if team stat is greater than stats already analyzed
                                console.log("actualstat >= maxStat");
                                maxStat = actualstat; //set team stat to max
                                maxTeam = team; //set team to max team
                            }
                        }
                    });
                }
            });
            teamDone.push(maxTeam);
            console.log(teamDone);
        }
    }).then(function(done) {

        addToTable(teamDone);
    });
}

function addToTable(teamDone) {
    var team = 0;
    var auto_switch_success = 0;
    var auto_scale_success = 0;
    var auto_vault = 0;
    var teleop_switch_success = 0;
    var teleop_scale_winning_success = 0;
    var teleop_scale_losing_success = 0;
    var teleop_opp_switch_success = 0;
    var teleop_vault = 0;
    $("#rankings_table").html("");
    for (var i = 0; i < teamDone.length; i++) {
        currTeam = teamDone[i];
        var query = firebase.database().ref("statistics/" + currTeam).orderByKey();
        query.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.key === "auto_switch_success") {
                    auto_switch_success = childSnapshot.val();
                }
                if (childSnapshot.key === "auto_scale_success") {
                    auto_scale_success = childSnapshot.val();
                }
                if (childSnapshot.key === "auto_vault") {
                    auto_vault = childSnapshot.val();
                }
                if (childSnapshot.key === "teleop_switch_success") {
                    teleop_switch_success = childSnapshot.val();
                }
                if (childSnapshot.key === "teleop_scale_winning_success") {
                    teleop_vault = childSnapshot.val();
                }
                if (childSnapshot.key === "teleop_scale_losing_success") {
                    teleop_vault = childSnapshot.val();
                }
                if (childSnapshot.key === "teleop_opp_switch_success") {
                    teleop_opp_switch_success = childSnapshot.val();
                }
                if (childSnapshot.key === "teleop_vault") {
                    teleop_vault = childSnapshot.val();
                }
                if (childSnapshot.key === "team") {
                    team = childSnapshot.val();
                }
            });
        }).then(function(done) {
            var row = $('<tr></tr>');
            row.append($('<th scope="row"></th>').text(team));
            row.append($('<td></td>').text(auto_switch_success));
            row.append($('<td></td>').text(auto_scale_success));
            row.append($('<td></td>').text(auto_vault));
            row.append($('<td></td>').text(teleop_switch_success));
            row.append($('<td></td>').text(teleop_scale_winning_success));
            row.append($('<td></td>').text(teleop_scale_losing_success));
            row.append($('<td></td>').text(teleop_opp_switch_success));
            row.append($('<td></td>').text(teleop_vault));
            $('#rankings_table').append(row);
            $("#section-tab-rankings").show();
        });
    }
}

var data = {};

function fetchStats() {
    var query = firebase.database().ref("allteams").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var team = parseInt(childSnapshot.key);
            retrieveData(team);
        });
    });
}

function retrieveData(team) {
    firebase.database().ref("allteams/" + team).on('value', function(snap) {
        if (snap.exists()) {
            data = {};
            snap.forEach(function(matchsnap) {
                parseMatch(matchsnap, team);
            });
        } else {
            console.log("Failed to retrieve data for team: " + team + "<br>Please check your internet connection and if the team exists in the database.");
        }
    });
}

function parseMatch(matchsnap, team) {
    matchsnap.forEach(function(infosnap) {
        if (typeof data[infosnap.key] == "undefined") {
            data[infosnap.key] = [];
        }
        data[infosnap.key].push(infosnap.val());
    });
    console.log(data);
    pushToStats(team);
}