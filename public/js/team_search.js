const db = firebase.database();

const storage = firebase.storage();
const storageRef = storage.ref();

var team = 0;
var matchCount = 0;



function loadTeam() {

    document.getElementById('team-input').style.display = "none";
    document.getElementById('content-list').style.display = "";

    const teamText = document.getElementById('team-header');
    team = document.getElementById('team').value;
    teamText.innerText = "Team: " + team;

    const matchcountText = document.getElementById('matchcount-header');
    db.ref('/allteams/' + team + '/match-count').once('value').then(function(snap) {
        matchCount = parseInt(snap.val());
        matchcountText.innerText = "Matches Played: " + matchCount;
        setData();
    });
}


function setData() {

    const dbTeam = firebase.database().ref('/allteams/' + team);

    const statAutoSwitch = document.getElementById('stat_auto_switch');
    const statAutoScale = document.getElementById('stat_auto_scale');
    const statAutoBaseline = document.getElementById('stat_auto_baseline');

    const statTeleopSwitch = document.getElementById('stat_teleop_switch');
    const statTeleopScale = document.getElementById('stat_teleop_scale');
    const statTeleopOppSwitch = document.getElementById('stat_teleop_opp_switch');
    const statTeleopVault = document.getElementById('stat_teleop_vault');
    const statTeleopClimb = document.getElementById('stat_teleop_climb');

    // const statScore = document.getElementById('stat_score');

    // const statGears = document.getElementById('stat_gears');
    // const statKPA = document.getElementById('stat_kpa');

    // const statConsistency = document.getElementById('stat_consistency');

    // const statAutoGearAcc = document.getElementById('stat_auto_gearacc');
    // const statTeleopGearAcc = document.getElementById('stat_teleop_gearacc');
    // const statHighScoreAcc = document.getElementById('stat_high_scoreacc');
    // const statLowScoreAcc = document.getElementById('stat_low_scoreacc');
    // const statClimbAcc = document.getElementById('stat_climbacc');
    // const statReachlineAcc = document.getElementById('stat_reachlineacc');

    var totalAutoSwitchScore = 0;
    var totalAutoSwitchMiss = 0;

    var totalAutoScaleScore = 0;
    var totalAutoScaleMiss = 0;

    var totalAutoReachlineYes = 0;
    var totalAutoReachlineNo = 0;

    var totalTeleopSwitchScore = 0;
    var totalTeleopSwitchMiss = 0;

    var totalTeleopScaleScore = 0;
    var totalTeleopScaleMiss = 0;

    var totalTeleopOppSwitchScore = 0;
    var totalTeleopOppSwitchMiss = 0;

    var totalTeleopVault = 0;



    dbTeam.child('matches').once('value').then(function(snap) {

            const autoTable = document.getElementById('table_auto');
            const teleopTable = document.getElementById('table_teleop');
            const commentTable = document.getElementById('table_comment');
            const disconnectTable = document.getElementById('table_disconnect');

            snap.forEach(function(matchsnap) {

                    const newAutoSwitch = document.createElement('li');
                    newAutoSwitch.setAttribute('class', 'list-group-item col-xs-3');

                    const newAutoScale = document.createElement('li');
                    newAutoScale.setAttribute('class', 'list-group-item col-xs-3');

                    const newAutoBaseline = document.createElement('li');
                    newAutoBaseline.setAttribute('class', 'list-group-item col-xs-3');

                    // const newAutoBaseline = document.createElement('li');
                    // newAutoBaseline.setAttribute('class', 'list-group-item col-xs-2');


                    const newTeleopSwitch = document.createElement('li');
                    newTeleopSwitch.setAttribute('class', 'list-group-item col-xs-2');

                    const newTeleopScale = document.createElement('li');
                    newTeleopScale.setAttribute('class', 'list-group-item col-xs-2');

                    const newTeleopOppSwitch = document.createElement('li');
                    newTeleopOppSwitch.setAttribute('class', 'list-group-item col-xs-2');

                    const newTeleopVault = document.createElement('li');
                    newTeleopVault.setAttribute('class', 'list-group-item col-xs-2');

                    const newTeleopClimb = document.createElement('li');
                    newTeleopClimb.setAttribute('class', 'list-group-item col-xs-2');

                    const newComments = document.createElement('li');
                    newComments.setAttribute('class', 'list-group-item col-xs-2');

                    const newDisconnect = document.createElement('li');
                    newDisconnect.setAttribute('class', 'list-group-item col-xs-2');


                    matchsnap.forEach(function(infosnap) {

                            if (infosnap.key == "auto_switch_success") {
                                newAutoSwitch.innerText = infosnap.val() + ":" + newAutoSwitch.innerText;
                                totalAutoSwitchScore += parseInt(infosnap.val());
                            } else if (infosnap.key == "auto_switch_fail") {
                                newAutoSwitch.innerText = infosnap.val();
                                totalAutoSwitchMiss += parseInt(infosnap.val());
                            } else if (infosnap.key == "auto_scale_success") {
                                newAutoScale.innerText = infosnap.val() + ":" + newAutoScale.innerText;
                                totalAutoScaleScore += parseInt(infosnap.val());
                            } else if (infosnap.key == "auto_scale_fail") {
                                newAutoScale.innerText = infosnap.val();
                                totalAutoScaleMiss += parseInt(infosnap.val());
                            } else if (infosnap.key == "auto_baseline") {
                                if (infosnap.val() == "Yes") {
                                    totalAutoReachlineYes += 1;
                                } else if (infosnap.val() == "No") {
                                    totalAutoReachlineNo += 1;
                                }
                                newAutoBaseline.innerText = infosnap.val();
                            } else if (infosnap.key == "teleop_switch_success") {
                                newTeleopSwitch.innerText = infosnap.val() + ":" + newTeleopSwitch.innerText;
                                totalTeleopSwitchScore += parseInt(infosnap.val());
                            } else if (infosnap.key == "teleop_switch_fail") {
                                newTeleopSwitch.innerText = infosnap.val();
                                totalTeleopSwitchMiss += parseInt(infosnap.val());
                            } else if (infosnap.key == "teleop_scale_success") {
                                newTeleopScale.innerText = infosnap.val() + ":" + newTeleopScale.innerText;
                                totalTeleopScaleScore += parseInt(infosnap.val());
                            } else if (infosnap.key == "teleop_scale_fail") {
                                newTeleopScale.innerText = infosnap.val();
                                totalTeleopScaleMiss += parseInt(infosnap.val());
                            } else if (infosnap.key == "teleop_opp_switch_success") {
                                newTeleopOppSwitch.innerText = infosnap.val() + ":" + newTeleopOppSwitch.innerText;
                                totalTeleopOppSwitchScore += parseInt(infosnap.val());
                            } else if (infosnap.key == "teleop_opp_switch_fail") {
                                newTeleopOppSwitch.innerText = infosnap.val();
                                totalTeleopOppSwitchMiss += parseInt(infosnap.val());
                            } else if (infosnap.key == "teleop_vault") {
                                newTeleopVault.innerText = infosnap.val();
                                totalTeleopVault += parseInt(infosnap.val());
                            } else if (infosnap.key == "climb") {
                                if (infosnap.val() == "Other") {
                                    matchsnap.forEach(function(infosnap) {
                                            if (infosnap.key == "climb_notes") {
                                                newTeleopClimb.innerText = infosnap.val();
                                            }
                                        });
                                    }
                                    else {
                                        newTeleopClimb.innerText = infosnap.val();
                                    }
                                }

                            });

                        dbTeam.child('matches-info/' + matchsnap.key + '/number').once('value').then(function(numsnap) {

                            const newMatchAuto = document.createElement('li');
                            newMatchAuto.setAttribute('class', 'list-group-item col-xs-3');
                            newMatchAuto.innerText = numsnap.val();

                            const newMatchTeleop = document.createElement('li');
                            newMatchTeleop.setAttribute('class', 'list-group-item col-xs-2');
                            newMatchTeleop.innerText = numsnap.val();


                            const newMatchComment = document.createElement('li');
                            newMatchComment.setAttribute('class', 'list-group-item col-xs-2');
                            newMatchComment.innerText = numsnap.val();
                            const newMatchDisconnect = document.createElement('li');
                            newMatchDisconnect.setAttribute('class', 'list-group-item col-xs-2');
                            newMatchDisconnect.innerText = numsnap.val();


                            const emptyAuto = document.createElement('li');
                            emptyAuto.setAttribute('class', 'list-group-item col-xs-3');
                            emptyAuto.innerText = "-";

                            dbTeam.child('matches-info/' + matchsnap.key + '/comment').once('value').then(function(commentsnap) {

                                const newComment = document.createElement('li');
                                newComment.setAttribute('class', 'list-group-item col-xs-10');
                                newComment.innerText = commentsnap.val();

                                autoTable.appendChild(newMatchAuto);
                                autoTable.appendChild(newAutoSwitch);
                                autoTable.appendChild(newAutoScale);
                                autoTable.appendChild(newAutoBaseline);

                                teleopTable.appendChild(newMatchTeleop);
                                teleopTable.appendChild(newTeleopSwitch);
                                teleopTable.appendChild(newTeleopScale);
                                teleopTable.appendChild(newTeleopOppSwitch);
                                teleopTable.appendChild(newTeleopVault);
                                teleopTable.appendChild(newTeleopClimb);



                                commentTable.appendChild(newMatchComment);
                                commentTable.appendChild(newComment);

                            });
                            dbTeam.child('matches-info/' + matchsnap.key + '/disconnects').once('value').then(function(commentsnap) {

                                const newDisconnect = document.createElement('li');
                                newDisconnect.setAttribute('class', 'list-group-item col-xs-10');
                                newDisconnect.innerText = commentsnap.val();
                                disconnectTable.appendChild(newMatchDisconnect);
                                disconnectTable.appendChild(newDisconnect);
                            });

                        });

                    });

                var averageAutoSwitchScore = totalAutoSwitchScore / matchCount;
                var averageAutoSwitchMiss = totalAutoSwitchMiss / matchCount;

                var averageAutoScaleScore = totalAutoScaleScore / matchCount;
                var averageAutoScaleMiss = totalAutoScaleMiss / matchCount;

                var averageAutoReachlineYes = totalAutoReachlineYes / matchCount;
                var averageAutoReachlineNo = totalAutoReachlineNo / matchCount;

                var averageTeleopSwitchScore = totalTeleopScaleScore / matchCount;
                var averageTeleopSwitchMiss = totalTeleopScaleMiss / matchCount;

                var averageTeleopScaleScore = totalTeleopScaleScore / matchCount;
                var averageTeleopScaleMiss = totalTeleopScaleMiss / matchCount;

                var averageTeleopOppSwitchScore = totalTeleopOppSwitchScore / matchCount;
                var averageTeleopOppSwitchMiss = totalTeleopOppSwitchMiss / matchCount;

                var averageTeleopVault = totalTeleopVault / matchCount;

                statAutoSwitch.innerText = averageAutoSwitchScore + " : " + averageAutoSwitchMiss; statAutoScale.innerText = averageAutoScaleScore + " : " + averageAutoScaleMiss; statAutoBaseline.innerText = averageAutoReachlineYes + " : " + averageAutoReachlineNo;

                statTeleopSwitch.innerText = averageTeleopSwitchScore + " : " + averageTeleopSwitchMiss; statTeleopScale.innerText = averageTeleopScaleScore + " : " + averageAutoScaleMiss; statTeleopOppSwitch.innerText = averageTeleopOppSwitchScore + " : " + averageTeleopOppSwitchMiss; statTeleopVault.innerText = averageTeleopVault; statTeleopClimb.innerText = "tbd";


            });




    }