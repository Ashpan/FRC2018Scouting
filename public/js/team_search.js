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
  db.ref('/allteams/' + team + '/match-count').once('value').then(function(snap){
    matchCount = parseInt(snap.val());
    matchcountText.innerText = "Matches Played: " + matchCount;
    setData();
  });

  db.ref('/allteams/' + team + '/specs').once('value').then(function(specsnap){
    addSpecs(specsnap);
  });

}

function addSpecs(specsnap) {

  const specTable = document.getElementById('table_specs');

  const labelWeight = document.createElement('li');
  labelWeight.setAttribute ('class', 'list-group-item col-xs-6');
  labelWeight.innerText = "Weight";

  const specWeight = document.createElement('li');
  specWeight.setAttribute ('class', 'list-group-item col-xs-6');


  const labelLength = document.createElement('li');
  labelLength.setAttribute ('class', 'list-group-item col-xs-6');
  labelLength.innerText = "Length";

  const specLength = document.createElement('li');
  specLength.setAttribute ('class', 'list-group-item col-xs-6');


  const labelWidth = document.createElement('li');
  labelWidth.setAttribute ('class', 'list-group-item col-xs-6');
  labelWidth.innerText = "Width";

  const specWidth = document.createElement('li');
  specWidth.setAttribute ('class', 'list-group-item col-xs-6');


  const labelHeight = document.createElement('li');
  labelHeight.setAttribute ('class', 'list-group-item col-xs-6');
  labelHeight.innerText = "Height";

  const specHeight = document.createElement('li');
  specHeight.setAttribute ('class', 'list-group-item col-xs-6');


  const labelComment = document.createElement('li');
  labelComment.setAttribute ('class', 'list-group-item col-xs-6');
  labelComment.innerText = "Comments";

  const specComment = document.createElement('li');
  specComment.setAttribute ('class', 'list-group-item col-xs-6');

  const labelCapabilities = document.createElement('li');
  labelCapabilities.setAttribute ('class', 'list-group-item col-xs-6');
  labelCapabilities.innerText = "System Capabilities";

  const specCapabilities = document.createElement('li');
  specCapabilities.setAttribute ('class', 'list-group-item col-xs-6 wrap-all');

  if (specsnap.val() != null) {
    specsnap.forEach(function(spec){
      if (spec.key == "specs_weight") {
        specWeight.innerText = spec.val();
      }
      else if (spec.key == "specs_length"){
        specLength.innerText = spec.val();
      }
      else if (spec.key == "specs_width") {
        specWidth.innerText = spec.val();
      }
      else if (spec.key == "specs_height") {
        specHeight.innerText = spec.val();
      }
      else if (spec.key == "specs_comment") {
        specComment.innerText =  spec.val();
      }

      else if (spec.key == "specs_capabilities") {
        specCapabilities.innerText = spec.val();
      }
    });
  }
  else {
    specWeight.innerText = "-";
    specLength.innerText = "-";
    specWidth.innerText = "-";
    specHeight.innerText = "-";
    specComment.innerText =  "-";
    specCapabilities.innerText = "-";
  }

  specTable.appendChild(labelWeight);
  specTable.appendChild(specWeight);
  specTable.appendChild(labelLength);
  specTable.appendChild(specLength);
  specTable.appendChild(labelWidth);
  specTable.appendChild(specWidth);
  specTable.appendChild(labelHeight);
  specTable.appendChild(specHeight);

  specTable.appendChild(labelCapabilities);
  specTable.appendChild(specCapabilities);

  specTable.appendChild(labelComment);
  specTable.appendChild(specComment);

  const specImageContainer = document.createElement('div');
  specImageContainer.setAttribute ('class', 'list-group-item col-xs-12 vertical-center');
  specTable.appendChild(specImageContainer);

  storageRef.child('allteams/' + team + '/robot.jpg').getDownloadURL().then(function(url){
    const image = document.createElement('img');
    image.alt = "Robot Image";
    image.id = team + "-robot-image";
    image.src = url;
    specImageContainer.appendChild(image);
  }).catch(function(error){
    console.log("Error! Maybe there's no image? Attempted team: " + team);
  });

}

function setData() {

  const dbTeam = firebase.database().ref('/allteams/' + team);

  const statAutoHigh = document.getElementById('stat_auto_high');
  const statAutoLow = document.getElementById('stat_auto_low');
  const statAutoGears = document.getElementById('stat_auto_gears');
  const statAutoReachline = document.getElementById('stat_auto_reachline');

  const statTeleopHigh = document.getElementById('stat_teleop_high');
  const statTeleopLow = document.getElementById('stat_teleop_low');
  const statTeleopGears = document.getElementById('stat_teleop_gears');
  const statTeleopCycletime = document.getElementById('stat_teleop_cycletime');
  const statTeleopClimb = document.getElementById('stat_teleop_climb');

  const statDefense = document.getElementById('stat_defense');
  const statHopperdump = document.getElementById('stat_hopperdump');
  const statIntake = document.getElementById('stat_intake');
  const statFouls = document.getElementById('stat_fouls');

  const statScore = document.getElementById('stat_score');

  const statGears = document.getElementById('stat_gears');
  const statKPA = document.getElementById('stat_kpa');

  const statConsistency = document.getElementById('stat_consistency');

  const statAutoGearAcc = document.getElementById('stat_auto_gearacc');
  const statTeleopGearAcc = document.getElementById('stat_teleop_gearacc');
  const statHighScoreAcc = document.getElementById('stat_high_scoreacc');
  const statLowScoreAcc = document.getElementById('stat_low_scoreacc');
  const statClimbAcc = document.getElementById('stat_climbacc');
  const statReachlineAcc = document.getElementById('stat_reachlineacc');

  var totalAutoHighScore = 0;
  var totalAutoHighMiss = 0;

  var totalAutoLowScore = 0;
  var totalAutoLowMiss = 0;

  var totalAutoGearsScore = 0;
  var totalAutoGearsMiss = 0;

  var totalAutoReachlineYes = 0;
  var totalAutoReachlineNo = 0;


  var totalTeleopHighScore = 0;
  var totalTeleopHighMiss = 0;

  var totalTeleopLowScore = 0;
  var totalTeleopLowMiss = 0;

  var totalTeleopGearsScore = 0;
  var totalTeleopGearsMiss = 0;

  var totalTeleopCycletime = 0;

  var cycleTimeNulls = 0;


  var totalTeleopClimbSuccess = 0;
  var totalTeleopClimbFailure = 0;


  var totalDefenseYes = 0;
  var totalDefenseNo = 0;

  var totalHopperdumpYes = 0;
  var totalHopperdumpNo = 0;

  var totalIntakeYes = 0;
  var totalIntakeNo = 0;

  var totalFouls = 0;


  dbTeam.child('matches').once('value').then(function(snap){

    const autoTable = document.getElementById('table_auto');
    const teleopTable = document.getElementById('table_teleop');
    const robotTable = document.getElementById('table_robot');
    const commentTable = document.getElementById('table_comment');

    snap.forEach(function(matchsnap){

      const newAutoHigh = document.createElement('li');
      newAutoHigh.setAttribute('class', 'list-group-item col-xs-2');

      const newAutoLow = document.createElement('li');
      newAutoLow.setAttribute('class', 'list-group-item col-xs-2');

      const newAutoGears = document.createElement('li');
      newAutoGears.setAttribute('class', 'list-group-item col-xs-2');

      const newAutoReachline = document.createElement('li');
      newAutoReachline.setAttribute('class', 'list-group-item col-xs-2');


      const newTeleopHigh = document.createElement('li');
      newTeleopHigh.setAttribute('class', 'list-group-item col-xs-2');

      const newTeleopLow = document.createElement('li');
      newTeleopLow.setAttribute('class', 'list-group-item col-xs-2');

      const newTeleopGears = document.createElement('li');
      newTeleopGears.setAttribute('class', 'list-group-item col-xs-2');

      const newTeleopCycletime = document.createElement('li');
      newTeleopCycletime.setAttribute('class', 'list-group-item col-xs-2');

      const newTeleopClimb = document.createElement('li');
      newTeleopClimb.setAttribute('class', 'list-group-item col-xs-2');


      const newRobotDefense = document.createElement('li');
      newRobotDefense.setAttribute('class', 'list-group-item col-xs-2');

      const newRobotHopperdump = document.createElement('li');
      newRobotHopperdump.setAttribute('class', 'list-group-item col-xs-2');

      const newRobotIntake = document.createElement('li');
      newRobotIntake.setAttribute('class', 'list-group-item col-xs-2');

      const newRobotFouls = document.createElement('li');
      newRobotFouls.setAttribute('class', 'list-group-item col-xs-2');

      const newComments = document.createElement('li');
      newComments.setAttribute('class', 'list-group-item col-xs-2');



      matchsnap.forEach(function(infosnap){

        if (infosnap.key == "auto_high_score") {totalAutoHighScore += parseInt(infosnap.val()); newAutoHigh.innerText = infosnap.val() + ":" + newAutoHigh.innerText;}
        else if (infosnap.key == "auto_high_miss") {totalAutoHighMiss += parseInt(infosnap.val()); newAutoHigh.innerText = infosnap.val();}
        else if (infosnap.key == "auto_low_score") {totalAutoLowScore += parseInt(infosnap.val()); newAutoLow.innerText = infosnap.val() + ":" + newAutoLow.innerText;}
        else if (infosnap.key == "auto_low_miss") {totalAutoLowMiss += parseInt(infosnap.val()); newAutoLow.innerText = infosnap.val();}
        else if (infosnap.key == "auto_gears_score") {totalAutoGearsScore += parseInt(infosnap.val()); newAutoGears.innerText = infosnap.val() + ":" + newAutoGears.innerText;}
        else if (infosnap.key == "auto_gears_miss") {totalAutoGearsMiss += parseInt(infosnap.val()); newAutoGears.innerText = infosnap.val();}

        else if (infosnap.key == "auto_reachline") {
          if (infosnap.val() == "Yes") {
            totalAutoReachlineYes += 1;
          }
          else if (infosnap.val() == "No") {
            totalAutoReachlineNo += 1;
          }
          newAutoReachline.innerText = infosnap.val();
        }

        else if (infosnap.key == "teleop_high_score") {totalTeleopHighScore += parseInt(infosnap.val()); newTeleopHigh.innerText = infosnap.val() + ":" + newTeleopHigh.innerText;}
        else if (infosnap.key == "teleop_high_miss") {totalTeleopHighMiss += parseInt(infosnap.val()); newTeleopHigh.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_low_score") {totalTeleopLowScore += parseInt(infosnap.val()); newTeleopLow.innerText = infosnap.val() + ":" + newTeleopLow.innerText;}
        else if (infosnap.key == "teleop_low_miss") {totalTeleopLowMiss += parseInt(infosnap.val()); newTeleopLow.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_gears_score") {totalTeleopGearsScore += parseInt(infosnap.val()); newTeleopGears.innerText = infosnap.val() + ":" + newTeleopGears.innerText;}
        else if (infosnap.key == "teleop_gears_miss") {totalTeleopGearsMiss += parseInt(infosnap.val()); newTeleopGears.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_cycletime") {
          if (infosnap.val() != "") {
            totalTeleopCycletime += parseInt(infosnap.val());
            newTeleopCycletime.innerText = infosnap.val();
          }
          else {
            cycleTimeNulls += 1;
            newTeleopCycletime.innerText = "-";
          }
        }

        else if (infosnap.key == "teleop_climb") {
          if (infosnap.val() == "Success") {
            totalTeleopClimbSuccess += 1;
          }
          else if (infosnap.val() == "Failure") {
            totalTeleopClimbFailure += 1;
          }
          newTeleopClimb.innerText = infosnap.val();
        }

        else if (infosnap.key == "robot_defense") {
          if (infosnap.val() == "Yes") {
            totalDefenseYes += 1;
          }
          else if (infosnap.val() == "No") {
            totalDefenseNo += 1;
          }
          newRobotDefense.innerText = infosnap.val();
        }

        else if (infosnap.key == "robot_hopperdump") {
          if (infosnap.val() == "Yes") {
            totalHopperdumpYes += 1;
          }
          else if (infosnap.val() == "No") {
            totalHopperdumpNo += 1;
          }
          newRobotHopperdump.innerText = infosnap.val();
        }

        else if (infosnap.key == "robot_intake") {
          if (infosnap.val() == "Yes") {
            totalIntakeYes += 1;
          }
          else if (infosnap.val() == "No") {
            totalIntakeNo += 1;
          }
          newRobotIntake.innerText = infosnap.val();
        }

        else if (infosnap.key == "robot_fouls") {totalFouls += parseInt(infosnap.val()); newRobotFouls.innerText = infosnap.val()}

      });

      dbTeam.child('matches-info/' + matchsnap.key + '/number').once('value').then(function(numsnap){

        const newMatchAuto = document.createElement('li');
        newMatchAuto.setAttribute ('class', 'list-group-item col-xs-2');
        newMatchAuto.innerText = numsnap.val();

        const newMatchTeleop = document.createElement('li');
        newMatchTeleop.setAttribute ('class', 'list-group-item col-xs-2');
        newMatchTeleop.innerText = numsnap.val();

        const newMatchRobot = document.createElement('li');
        newMatchRobot.setAttribute ('class', 'list-group-item col-xs-2');
        newMatchRobot.innerText = numsnap.val();

        const newMatchComment = document.createElement('li');
        newMatchComment.setAttribute ('class', 'list-group-item col-xs-2');
        newMatchComment.innerText = numsnap.val();

        const emptyAuto = document.createElement('li');
        emptyAuto.setAttribute ('class', 'list-group-item col-xs-2');
        emptyAuto.innerText = "-";

        const emptyRobot = document.createElement('li');
        emptyRobot.setAttribute ('class', 'list-group-item col-xs-2');
        emptyRobot.innerText = "-";

        dbTeam.child('matches-info/' + matchsnap.key + '/comment').once('value').then(function(commentsnap){

          const newComment = document.createElement('li');
          newComment.setAttribute ('class', 'list-group-item col-xs-10');
          newComment.innerText = commentsnap.val();

          autoTable.appendChild(newMatchAuto);
          autoTable.appendChild(newAutoHigh);
          autoTable.appendChild(newAutoLow);
          autoTable.appendChild(newAutoGears);
          autoTable.appendChild(newAutoReachline);
          autoTable.appendChild(emptyAuto);

          teleopTable.appendChild(newMatchTeleop);
          teleopTable.appendChild(newTeleopHigh);
          teleopTable.appendChild(newTeleopLow);
          teleopTable.appendChild(newTeleopGears);
          teleopTable.appendChild(newTeleopCycletime);
          teleopTable.appendChild(newTeleopClimb);

          robotTable.appendChild(newMatchRobot);
          robotTable.appendChild(newRobotDefense);
          robotTable.appendChild(newRobotHopperdump);
          robotTable.appendChild(newRobotIntake);
          robotTable.appendChild(newRobotFouls);
          robotTable.appendChild(emptyRobot);

          commentTable.appendChild(newMatchComment);
          commentTable.appendChild(newComment);

        });

      });

    });

    statAutoReachline.innerText = totalAutoReachlineYes + " : " + totalAutoReachlineNo;
    statTeleopClimb.innerText = totalTeleopClimbSuccess + " : " + totalTeleopClimbFailure;
    statDefense.innerText = totalDefenseYes + " : " + totalDefenseNo;
    statHopperdump.innerText = totalHopperdumpYes + " : " + totalHopperdumpNo;
    statIntake.innerText = totalIntakeYes + " : " + totalIntakeNo;

    var averageAutoHighScore = totalAutoHighScore / matchCount;
    var averageAutoHighMiss = totalAutoHighMiss / matchCount;

    var averageAutoLowScore = totalAutoLowScore / matchCount;
    var averageAutoLowMiss = totalAutoLowMiss / matchCount;

    var averageAutoGearsScore = totalAutoGearsScore / matchCount;
    var averageAutoGearsMiss = totalAutoGearsMiss / matchCount;


    var averageTeleopHighScore = totalTeleopHighScore / matchCount;
    var averageTeleopHighMiss = totalTeleopHighMiss / matchCount;

    var averageTeleopLowScore = totalTeleopLowScore / matchCount;
    var averageTeleopLowMiss = totalTeleopLowMiss / matchCount;

    var averageTeleopGearsScore = totalTeleopGearsScore / matchCount;
    var averageTeleopGearsMiss = totalTeleopGearsMiss / matchCount;

    var averageTeleopCycletime = totalTeleopCycletime
    if (matchCount > cycleTimeNulls) {
      averageTeleopCycletime /= (matchCount - cycleTimeNulls);
    }
    else {
      averageTeleopCycletime = -1;
    }


    var averageFouls = totalFouls / matchCount;

    // Other statistics
    var averageScoreContribution = ((totalAutoReachlineYes/matchCount)*5) + averageAutoHighScore + (averageAutoLowScore/3) + (averageAutoGearsScore*60) + (averageTeleopHighScore/3) + (averageTeleopLowScore/9) + (averageTeleopGearsScore*15) + ((totalTeleopClimbSuccess/matchCount)*50);

    var averageGears = averageAutoGearsScore + averageTeleopGearsScore;
    var averageKPA = averageAutoHighScore + averageAutoLowScore/3 + averageTeleopHighScore/3 + averageTeleopLowScore/9;

    var counter = 0;

    var averageConsistency = 0;
    var autoGearsAccuracy = 0;
    var teleopGearsAccuracy = 0;

    var highGoalAccuracy = 0;
    var lowGoalAccuracy = 0;

    var climbAccuracy = 0;
    var reachlineAccuracy = 0;

    if ((averageAutoGearsScore + averageAutoGearsMiss) > 0) {
      autoGearsAccuracy = (averageAutoGearsScore/(averageAutoGearsScore + averageAutoGearsMiss)) * 100;
      averageConsistency += autoGearsAccuracy;
      counter += 1;
    }
    else {
      autoGearsAccuracy = -1;
    }
    if ((averageTeleopGearsScore + averageTeleopGearsMiss) > 0) {
      teleopGearsAccuracy = (averageTeleopGearsScore/(averageTeleopGearsScore + averageTeleopGearsMiss)) * 100;
      averageConsistency += teleopGearsAccuracy;
      counter += 1;
    }
    else {
      teleopGearsAccuracy = -1;
    }
    if ((averageAutoHighScore + averageAutoHighMiss + averageTeleopHighScore + averageTeleopHighMiss) > 0){
      highGoalAccuracy = (averageAutoHighScore + averageTeleopHighScore)/(averageAutoHighScore + averageAutoHighMiss + averageTeleopHighScore + averageTeleopHighMiss) * 100;
      averageConsistency += highGoalAccuracy;
      counter += 1;
    }
    else {
      highGoalAccuracy = -1;
    }
    if ((averageAutoLowScore + averageAutoLowMiss + averageTeleopLowScore + averageTeleopLowMiss) > 0){
      lowGoalAccuracy = (averageAutoLowScore + averageTeleopLowScore)/(averageAutoLowScore + averageAutoLowMiss + averageTeleopLowScore + averageTeleopLowMiss) * 100;
      averageConsistency += lowGoalAccuracy;
      counter += 1;
    }
    else {
      lowGoalAccuracy = -1;
    }
    if ((totalTeleopClimbSuccess+totalTeleopClimbFailure) > 0){
      climbAccuracy = (totalTeleopClimbSuccess/(totalTeleopClimbSuccess+totalTeleopClimbFailure)) * 100;
      averageConsistency += climbAccuracy;
      counter += 1;
    }
    else {
      climbAccuracy = -1;
    }
    if ((totalAutoReachlineYes + totalAutoReachlineNo) > 0) {
      reachlineAccuracy = (totalAutoReachlineYes/(totalAutoReachlineYes + totalAutoReachlineNo)) * 100;
      averageConsistency += reachlineAccuracy;
      counter += 1;
    }
    else {
      reachlineAccuracy = -1;
    }
    if (counter > 0) {
      averageConsistency /= counter;
    }
    else {
      averageConsistency = -1;
    }

    averageAutoHighScore = +averageAutoHighScore.toFixed(2);
    averageAutoHighMiss = +averageAutoHighMiss.toFixed(2);
    averageAutoLowScore = +averageAutoLowScore.toFixed(2);
    averageAutoLowMiss = +averageAutoLowMiss.toFixed(2);
    averageAutoGearsScore = +averageAutoGearsScore.toFixed(2);
    averageAutoGearsMiss = +averageAutoGearsMiss.toFixed(2);

    averageTeleopHighScore = +averageTeleopHighScore.toFixed(2);
    averageTeleopHighMiss = +averageTeleopHighMiss.toFixed(2);
    averageTeleopLowScore = +averageTeleopLowScore.toFixed(2);
    averageTeleopLowMiss = +averageTeleopLowMiss.toFixed(2);
    averageTeleopGearsScore = +averageTeleopGearsScore.toFixed(2);
    averageTeleopGearsMiss = +averageTeleopGearsMiss.toFixed(2);

    averageTeleopCycletime = +averageTeleopCycletime.toFixed(2);

    averageFouls = +averageFouls.toFixed(2);

    averageScoreContribution = +averageScoreContribution.toFixed(2);

    averageGears = +averageGears.toFixed(2);
    averageKPA = +averageKPA.toFixed(2);

    averageConsistency = +averageConsistency.toFixed(0);
    autoGearsAccuracy = +autoGearsAccuracy.toFixed(0);
    teleopGearsAccuracy = +teleopGearsAccuracy.toFixed(0);

    highGoalAccuracy = +highGoalAccuracy.toFixed(0);
    lowGoalAccuracy = +lowGoalAccuracy.toFixed(0);

    climbAccuracy = +climbAccuracy.toFixed(0);
    reachlineAccuracy = +reachlineAccuracy.toFixed(0);

    statAutoHigh.innerText = averageAutoHighScore + " : " + averageAutoHighMiss;
    statAutoLow.innerText = averageAutoLowScore + " : " + averageAutoLowMiss;
    statAutoGears.innerText = averageAutoGearsScore + " : " + averageAutoGearsMiss;

    statTeleopHigh.innerText = averageTeleopHighScore + " : " + averageTeleopHighMiss;
    statTeleopLow.innerText = averageTeleopLowScore + " : " + averageTeleopLowMiss;
    statTeleopGears.innerText = averageTeleopGearsScore + " : " + averageTeleopGearsMiss;

    statTeleopCycletime.innerText = averageTeleopCycletime + " sec";
    statFouls.innerText = averageFouls;

    statScore.innerText = averageScoreContribution;

    statGears.innerText = averageGears;
    statKPA.innerText = averageKPA;

    statConsistency.innerText = averageConsistency + "%";
    statAutoGearAcc.innerText = autoGearsAccuracy + "%";
    statTeleopGearAcc.innerText = teleopGearsAccuracy + "%";

    statHighScoreAcc.innerText = highGoalAccuracy + "%";
    statLowScoreAcc.innerText = lowGoalAccuracy + "%";

    statClimbAcc.innerText = climbAccuracy + "%";
    statReachlineAcc.innerText = reachlineAccuracy + "%";

    dbTeam.child('statistics').set({
      total_auto_reachline_yes: totalAutoReachlineYes,
      total_auto_reachline_no: totalAutoReachlineNo,
      total_teleop_climb_success: totalTeleopClimbSuccess,
      total_teleop_climb_failure: totalTeleopClimbFailure,
      total_defense_yes: totalDefenseYes,
      total_defense_no: totalDefenseNo,
      total_hopperdump_yes: totalHopperdumpYes,
      total_hopperdump_no: totalHopperdumpNo,
      total_intake_yes: totalIntakeYes,
      total_intake_no: totalIntakeNo,

      average_auto_high_score: averageAutoHighScore,
      average_auto_high_miss: averageAutoHighMiss,
      average_auto_low_score: averageAutoLowScore,
      average_auto_low_miss: averageAutoLowMiss,
      average_auto_gears_score: averageAutoGearsScore,
      average_auto_gears_miss: averageAutoGearsMiss,

      average_teleop_high_score: averageTeleopHighScore,
      average_teleop_high_miss: averageTeleopHighMiss,
      average_teleop_low_score: averageTeleopLowScore,
      average_teleop_low_miss: averageTeleopLowMiss,
      average_teleop_gears_score: averageTeleopGearsScore,
      average_teleop_gears_miss: averageTeleopGearsMiss,

      average_teleop_cycletime: averageTeleopCycletime,

      average_fouls: averageFouls,

      overall_score: averageScoreContribution,

      overall_gears: averageGears,
      overall_kpa: averageKPA,

      overall_consistency: averageConsistency,
      overall_auto_gearacc: autoGearsAccuracy,
      overall_teleop_gearacc: teleopGearsAccuracy,

      overall_high_scoreacc: highGoalAccuracy,
      overall_low_scoreacc: lowGoalAccuracy,

      overall_climbacc: climbAccuracy,
      overall_reachlineacc: reachlineAccuracy

    })

  });




}