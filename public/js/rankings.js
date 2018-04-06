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
        case "Teleop Scale":
            toReturn = "teleop_scale_success";
            break;
        case "Teleop Opposite Switch":
            toReturn = "teleop_opp_switch_success";
            break;
        case "Teleop Vault":
            toReturn = "teleop_vault";
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
    var teleop_scale_success = 0;
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
                if (childSnapshot.key === "teleop_scale_success") {
                    teleop_scale_success = childSnapshot.val();
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
            row.append($('<td></td>').text(teleop_scale_success));
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





// BASELINE SHIT
// function fetchMatches(team){
// matches(team, function(){
//     var matchArray = [];
//     for (var i = 0; i < this.length; i++) {
//         if (this[i].startsWith(year + event + '_qm'))
//             matchArray.push(this[i].substring(12));
//     }
//     matchArray.sort(function(a,b) {
//     return a - b;
// });
//     // USE MATCH ARRAY HERE
//     for(int i = 0; i < matchArray.length; i++){
//         baseLine(team, matchArray[i])
//     }
//     prit(matchArray)
// });
// }

// function prit(pls){
//     console.log(pls)
// }

// function matches(team, callback) {
//     const api = 'https://www.thebluealliance.com/api/v3/team/frc' + team + '/event/' + year + event + '/matches/keys' + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
//     var json;
//     request.open('GET', api, true);
//     request.onreadystatechange = function() {
//         if (request.readyState == 4 && request.status == 200) {
//             if (typeof callback === "function") {
//                 json = JSON.parse(this.responseText);
//                 callback.apply(json);
//             }
//         }
//     };
//     request.send();
// }

// function baseLine(team, match){
//     firebase.database().ref('/allteams/' + team).on('child_added', function(snap) {

//         firebase.database().ref('/allteams/' + team + '/' + snap.key).on('child_added', function(snapchild) {
//             if(snapchild.key === "match_number" && snapchild.val() === match){}
//                 if(snapchild.key === "auto_baseline"){
//                     db.child(team + '/' + newKey).update({

//                     });
//                 }
//         }
//         });
//     });
// }

// function fetchTBAInfo(team, match) {
//     const api = 'https://www.thebluealliance.com/api/v3/match/' + year + event + '_qm' + match + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
//     var baseline = '-';
//     request.open('GET', api, true);
//     request.onload = function() {
//         // Begin accessing JSON data here
//         var data = JSON.parse(this.response);
//         console.log('Accessing data from tba at: ' + api);
//         //      Figure out the alliance of team
//         if (data.alliances.blue.team_keys.indexOf("frc" + team) >= 0) {
//             var alliance = 'blue' + (data.alliances.blue.team_keys.indexOf("frc" + team) + 1);
//         } else if (data.alliances.red.team_keys.indexOf("frc" + team) >= 0) {
//             var alliance = 'red' + (data.alliances.red.team_keys.indexOf("frc" + team) + 1);
//         }
//         if (alliance === 'blue1') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'blue2') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'blue3') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'red1') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'red2') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'red3') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         }
//         if (request.status >= 200 && request.status < 400) {
//             db.child(team + '/' + newKey).update({
//                         auto_switch_cycle: switch_cycle,
//                         auto_scale_cycle: scale_cycle,
//                         auto_baseline: baseline,
//                         plate_assignment: plate_assignment,
//                         done_upload: true
//                     })
//                     .then(function(done) {
//                         console.log("Successfully uploaded cycles to allteams/" + team + "/matches/" + newKey + "/");
//                     });
//             console.log('baseline ' + baseline);
//         } else {
//             console.log('error');
//         }
//     }
//     request.send();
// }