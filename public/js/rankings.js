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
    });
}



// function quickLoadRanks() {

//     document.getElementById('stat-input').style.display = "none";
//     document.getElementById('content-list').style.display = "";

//     var sortRank = document.querySelector('option[name="selectrank-stat"]:checked').value;
//     document.getElementById('rank-header').innerText = "Ranked By: " + document.querySelector('option[name="selectrank-stat"]:checked').innerText;

//     db.child('teamlist').once('value').then(function(listsnap) {

//         var rankList = {};

//         var counter = 0;

//         listsnap.forEach(function(team) {

//             db.child('allteams/' + team.key + "/statistics/" + sortRank).once('value').then(function(statsnap) {

//                 counter += 1;

//                 id = 'team' + team.key;

//                 rankList[id] = statsnap.val();

//                 if (counter >= listsnap.numChildren()) {
//                     outputRanks(rankList);
//                 }

//             });

//         });

//     });

// }

// function outputRanks(rankList) {

//     const contentList = document.getElementById('rank-list');

//     // Create items array
//     var sortedRankList = Object.keys(rankList).map(function(key) {
//         return [key, rankList[key]];
//     });

//     // Sort the array based on the second element
//     sortedRankList.sort(function(first, second) {
//         return second[1] - first[1];
//     });

//     sortedRankList.forEach(function(entry) {
//         const newEntry = document.createElement('li');
//         newEntry.setAttribute('class', 'list-group-item col-xs-6');
//         newEntry.innerText = entry[0].slice(4);
//         contentList.appendChild(newEntry);

//         const newValue = document.createElement('li');
//         newValue.setAttribute('class', 'list-group-item col-xs-6');
//         newValue.innerText = entry[1];
//         if (entry[1] == null) {
//             newValue.innerText = "null";
//         }
//         contentList.appendChild(newValue);
//     });

// }

// function processStatsRanks() {

//     db.child('teamlist').once('value').then(function(listsnap) {

//         statisticsLoaderCounter = 0;
//         teamCount = listsnap.numChildren();

//         listsnap.forEach(function(team) {

//             db.child('/allteams/' + team.key + '/match-count').once('value').then(function(snap) {

//                 teamStatistics(team.key, parseInt(snap.val()));

//             });

//         });

//     });

// }

// function teamStatistics(team, matchCount) {

//     const dbTeam = db.child('/allteams/' + team);

//     var totalAutoSwitchScore = 0;
//     var totalAutoSwitchMiss = 0;

//     var totalAutoScaleScore = 0;
//     var totalAutoScaleMiss = 0;

//     var totalAutoReachlineYes = 0;
//     var totalAutoReachlineNo = 0;

//     var totalTeleopSwitchScore = 0;
//     var totalTeleopSwitchMiss = 0;

//     var totalTeleopScaleScore = 0;
//     var totalTeleopScaleMiss = 0;

//     var totalTeleopOppSwitchScore = 0;
//     var totalTeleopOppSwitchMiss = 0;

//     var totalTeleopVault = 0;

//     dbTeam.child('matches').once('value').then(function(snap) {

//         snap.forEach(function(matchsnap) {

//             matchsnap.forEach(function(infosnap) {

//                 if (infosnap.key == "auto_switch_success") {
//                     totalAutoSwitchScore += parseInt(infosnap.val());
//                 } else if (infosnap.key == "auto_switch_fail") {
//                     totalAutoSwitchMiss += parseInt(infosnap.val());
//                 } else if (infosnap.key == "auto_scale_success") {
//                     totalAutoScaleScore += parseInt(infosnap.val());
//                 } else if (infosnap.key == "auto_scale_fail") {
//                     totalAutoScaleMiss += parseInt(infosnap.val());
//                 } else if (infosnap.key == "auto_baseline") {
//                     if (infosnap.val() == "yes") {
//                         totalAutoReachlineYes += 1;
//                     } else if (infosnap.val() == "no") {
//                         totalAutoReachlineNo += 1;
//                     }
//                 } else if (infosnap.key == "teleop_switch_success") {
//                     totalTeleopSwitchScore += parseInt(infosnap.val());
//                 } else if (infosnap.key == "teleop_switch_fail") {
//                     totalTeleopSwitchMiss += parseInt(infosnap.val());
//                 } else if (infosnap.key == "teleop_scale_success") {
//                     totalTeleopScaleScore += parseInt(infosnap.val());
//                 } else if (infosnap.key == "teleop_scale_fail") {
//                     totalTeleopScaleMiss += parseInt(infosnap.val());
//                 } else if (infosnap.key == "teleop_opp_switch_success") {
//                     totalTeleopOppSwitchScore += parseInt(infosnap.val());
//                 } else if (infosnap.key == "teleop_opp_switch_fail") {
//                     totalTeleopOppSwitchMiss += parseInt(infosnap.val());
//                 } else if (infosnap.key == "teleop_vault") {
//                     totalTeleopVault += parseInt(infosnap.val());
//                 }
//             });

//         });

//         var averageAutoSwitchScore = totalAutoSwitchScore / matchCount;
//         var averageAutoSwitchMiss = totalAutoSwitchMiss / matchCount;

//         var averageAutoScaleScore = totalAutoScaleScore / matchCount;
//         var averageAutoScaleMiss = totalAutoScaleMiss / matchCount;

//         var averageAutoReachlineYes = totalAutoReachlineYes / matchCount;
//         var averageAutoReachlineNo = totalAutoReachlineNo / matchCount;

//         var averageTeleopSwitchScore = totalTeleopSwitchScore / matchCount;
//         var averageTeleopSwitchMiss = totalTeleopSwitchMiss / matchCount;

//         var averageTeleopScaleScore = totalTeleopScaleScore / matchCount;
//         var averageTeleopScaleMiss = totalTeleopScaleMiss / matchCount;

//         var averageTeleopOppSwitchScore = totalTeleopOppSwitchScore / matchCount;
//         var averageTeleopOppSwitchMiss = totalTeleopOppSwitchMiss / matchCount;

//         var averageTeleopVault = totalTeleopVault / matchCount;




//         averageAutoSwitchScore = +averageAutoSwitchScore.toFixed(2);
//         averageAutoSwitchMiss = +averageAutoSwitchMiss.toFixed(2);
//         averageAutoScaleScore = +averageAutoScaleScore.toFixed(2);
//         averageAutoScaleMiss = +averageAutoScaleMiss.toFixed(2);
//         averageAutoReachlineYes = +averageAutoReachlineYes.toFixed(2);
//         averageAutoReachlineNo = +averageAutoReachlineNo.toFixed(2);

//         averageTeleopSwitchScore = +averageTeleopSwitchScore.toFixed(2);
//         averageTeleopSwitchMiss = +averageTeleopSwitchMiss.toFixed(2);
//         averageTeleopScaleScore = +averageTeleopScaleScore.toFixed(2);
//         averageTeleopScaleMiss = +averageTeleopScaleMiss.toFixed(2);
//         averageTeleopOppSwitchScore = +averageTeleopOppSwitchScore.toFixed(2);
//         averageTeleopOppSwitchMiss = +averageTeleopOppSwitchMiss.toFixed(2);

//         averageTeleopVault = +averageTeleopVault.toFixed(2);


//         dbTeam.child('statistics').set({
//             // total_auto_reachline_yes: totalAutoReachlineYes,
//             // total_auto_reachline_no: totalAutoReachlineNo,

//             average_auto_switch_score: averageAutoSwitchScore,
//             // average_auto_switch_miss: averageAutoSwitchMiss,
//             average_auto_scale_score: averageAutoScaleScore,
//             // average_auto_scale_miss: averageAutoScaleMiss,
//             average_auto_baselineyes: averageAutoReachlineYes,
//             // average_auto_baselineno: averageAutoReachlineNo,

//             average_teleop_switch_score: averageTeleopSwitchScore,
//             // average_teleop_switch_miss: averageTeleopSwitchMiss,
//             average_teleop_scale_score: averageTeleopScaleScore,
//             // average_teleop_scale_miss: averageTeleopScaleMiss,
//             average_teleop_opp_switch_score: averageTeleopOppSwitchScore,
//             // average_teleop_opp_switch_miss: averageTeleopOppSwitchMiss,

//             average_teleop_vault: averageTeleopVault,

//         }).then(function() {

//             console.log("Done! " + team);

//             statisticsLoaderCounter += 1;

//             if (statisticsLoaderCounter >= teamCount) {
//                 console.log("All done!");

//                 quickLoadRanks();
//             }

//         });

//     });


// }