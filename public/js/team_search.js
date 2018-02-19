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
    const commentTable = document.getElementById('table_comment');

    snap.forEach(function(matchsnap){

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



      matchsnap.forEach(function(infosnap){

        if (infosnap.key == "auto_switch") {newAutoSwitch.innerText = infosnap.val();}
        else if (infosnap.key == "auto_scale") {newAutoScale.innerText = infosnap.val();}
        else if (infosnap.key == "auto_baseline") {newAutoBaseline.innerText = infosnap.val();}
        // else if (infosnap.key == "auto_reachline") {
        //   if (infosnap.val() == "Yes") {
        //     totalAutoReachlineYes += 1;
        //   }
        //   else if (infosnap.val() == "No") {
        //     totalAutoReachlineNo += 1;
        //   }
        //   newAutoReachline.innerText = infosnap.val();
        // }

        else if (infosnap.key == "teleop_switch_success") {newTeleopSwitch.innerText = infosnap.val() + ":" + newTeleopSwitch.innerText;}
        else if (infosnap.key == "teleop_switch_fail") {newTeleopSwitch.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_scale_success") {newTeleopScale.innerText = infosnap.val() + ":" + newTeleopScale.innerText;}
        else if (infosnap.key == "teleop_scale_fail") {newTeleopScale.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_opp_switch_success") {newTeleopOppSwitch.innerText = infosnap.val() + ":" + newTeleopOppSwitch.innerText; console.log(infosnap.val());}
        else if (infosnap.key == "teleop_opp_switch_fail") {newTeleopOppSwitch.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_vault") {newTeleopVault.innerText = infosnap.val();}
        else if (infosnap.key == "climb") {newTeleopClimb.innerText = infosnap.val(); console.log(infosnap.val());}


        // else if (infosnap.key == "teleop_cycletime") {
        //   if (infosnap.val() != "") {
        //     totalTeleopCycletime += parseInt(infosnap.val());
        //     newTeleopCycletime.innerText = infosnap.val();
        //   }
        //   else {
        //     cycleTimeNulls += 1;
        //     newTeleopCycletime.innerText = "-";
        //   }
        // }

        // else if (infosnap.key == "teleop_climb") {
        //   if (infosnap.val() == "Success") {
        //     totalTeleopClimbSuccess += 1;
        //   }
        //   else if (infosnap.val() == "Failure") {
        //     totalTeleopClimbFailure += 1;
        //   }
        //   newTeleopClimb.innerText = infosnap.val();
        // }

      });

      dbTeam.child('matches-info/' + matchsnap.key + '/number').once('value').then(function(numsnap){

        const newMatchAuto = document.createElement('li');
        newMatchAuto.setAttribute ('class', 'list-group-item col-xs-3');
        newMatchAuto.innerText = numsnap.val();

        const newMatchTeleop = document.createElement('li');
        newMatchTeleop.setAttribute ('class', 'list-group-item col-xs-2');
        newMatchTeleop.innerText = numsnap.val();


        const newMatchComment = document.createElement('li');
        newMatchComment.setAttribute ('class', 'list-group-item col-xs-2');
        newMatchComment.innerText = numsnap.val();

        const emptyAuto = document.createElement('li');
        emptyAuto.setAttribute ('class', 'list-group-item col-xs-3');
        emptyAuto.innerText = "-";

        dbTeam.child('matches-info/' + matchsnap.key + '/comment').once('value').then(function(commentsnap){

          const newComment = document.createElement('li');
          newComment.setAttribute ('class', 'list-group-item col-xs-10');
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

      });

    });

    // statAutoReachline.innerText = totalAutoReachlineYes + " : " + totalAutoReachlineNo;
    statTeleopClimb.innerText = totalTeleopClimbSuccess + " : " + totalTeleopClimbFailure;
    

  });




}