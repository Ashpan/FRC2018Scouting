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
            toReturn = "average_auto_switch_success";
            break;
        case "Auto Scale":
            toReturn = "average_auto_scale_success";
            break;
        case "Teleop Switch":
            toReturn = "average_teleop_switch_success";
            break;
        case "Teleop Scale":
            toReturn = "average_teleop_scale_success";
            break;
        case "Teleop Opposite Switch":
            toReturn = "average_teleop_opp_switch_success";
            break;
        case "Teleop Vault":
            toReturn = "average_teleop_vault";
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
    var teleop_switch_success = 0;
    var teleop_scale_success = 0;
    var teleop_opp_switch_success = 0;
    var teleop_vault = 0;
    $("#rankings_table").html("");
    for (var i = 0; i < teamDone.length; i++) {
        currTeam = teamDone[i];
        console.log(currTeam);
        var query = firebase.database().ref("statistics/" + currTeam).orderByKey();
        query.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.key + ' : ' + childSnapshot.val());
                if (childSnapshot.key === "average_auto_switch_success") {
                    auto_switch_success = childSnapshot.val();
                }
                if (childSnapshot.key === "average_auto_scale_success") {
                    console.log('working');
                    auto_scale_success = childSnapshot.val();
                }
                if (childSnapshot.key === "average_teleop_switch_success") {
                    teleop_switch_success = childSnapshot.val();
                }
                if (childSnapshot.key === "average_teleop_scale_success") {
                    teleop_scale_success = childSnapshot.val();
                }
                if (childSnapshot.key === "average_teleop_opp_switch_success") {
                    teleop_opp_switch_success = childSnapshot.val();
                }
                if (childSnapshot.key === "average_teleop_vault") {
                    teleop_vault = childSnapshot.val();
                }
                if (childSnapshot.key === "team") {
                    team = childSnapshot.val();
                }
            });
        }).then(function(done){
        console.log(team);
        console.log(auto_switch_success);
        console.log(auto_scale_success);
        console.log(teleop_switch_success);
        console.log(teleop_scale_success);
        console.log(teleop_opp_switch_success);
        console.log(teleop_vault);
        var row = $('<tr></tr>');
        row.append($('<th scope="row"></th>').text(team));
        row.append($('<td></td>').text(auto_switch_success));
        row.append($('<td></td>').text(auto_scale_success));
        row.append($('<td></td>').text(teleop_switch_success));
        row.append($('<td></td>').text(teleop_scale_success));
        row.append($('<td></td>').text(teleop_opp_switch_success));
        row.append($('<td></td>').text(teleop_vault));
        $('#rankings_table').append(row);
        $("#section-tab-rankings").show();
});
    }
}