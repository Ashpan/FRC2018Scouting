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

  dbTeam.child('matches').once('value').then(function(snap){

    const autoTable = document.getElementById('table_auto');
    const teleopTable = document.getElementById('table_teleop');
    const commentTable = document.getElementById('table_comment');
    const disconnectTable = document.getElementById('table_disconnect');

    snap.forEach(function(matchsnap){

      const newAutoSwitch = document.createElement('li');
      newAutoSwitch.setAttribute('class', 'list-group-item col-xs-3');

      const newAutoScale = document.createElement('li');
      newAutoScale.setAttribute('class', 'list-group-item col-xs-3');

      const newAutoBaseline = document.createElement('li');
      newAutoBaseline.setAttribute('class', 'list-group-item col-xs-3');

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



      matchsnap.forEach(function(infosnap){

        if (infosnap.key == "auto_switch_success") {newAutoSwitch.innerText = infosnap.val() + ":" + newAutoSwitch.innerText;}
        else if (infosnap.key == "auto_switch_fail") {newAutoSwitch.innerText = infosnap.val();}
        else if (infosnap.key == "auto_scale_success") {newAutoScale.innerText = infosnap.val() + ":" + newAutoScale.innerText;}
        else if (infosnap.key == "auto_scale_fail") {newAutoScale.innerText = infosnap.val();}
        else if (infosnap.key == "auto_baseline") {newAutoBaseline.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_switch_success") {newTeleopSwitch.innerText = infosnap.val() + ":" + newTeleopSwitch.innerText;}
        else if (infosnap.key == "teleop_switch_fail") {newTeleopSwitch.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_scale_success") {newTeleopScale.innerText = infosnap.val() + ":" + newTeleopScale.innerText;}
        else if (infosnap.key == "teleop_scale_fail") {newTeleopScale.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_opp_switch_success") {newTeleopOppSwitch.innerText = infosnap.val() + ":" + newTeleopOppSwitch.innerText;}
        else if (infosnap.key == "teleop_opp_switch_fail") {newTeleopOppSwitch.innerText = infosnap.val();}
        else if (infosnap.key == "teleop_vault") {newTeleopVault.innerText = infosnap.val();}
        else if (infosnap.key == "climb") {newTeleopClimb.innerText = infosnap.val();}
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
        const newMatchDisconnect = document.createElement('li');
        newMatchDisconnect.setAttribute ('class', 'list-group-item col-xs-2');
        newMatchDisconnect.innerText = numsnap.val();

        const emptyAuto = document.createElement('li');
        emptyAuto.setAttribute ('class', 'list-group-item col-xs-3');
        emptyAuto.innerText = "-";

        dbTeam.child('matches-info/' + matchsnap.key + '/comment').once('value').then(function(commentsnap){

          const newComment = document.createElement('li');
          newComment.setAttribute ('class', 'list-group-item col-xs-10');
          newComment.innerText = commentsnap.val();

        dbTeam.child('matches-info/' + matchsnap.key + '/disconnects').once('value').then(function(disconnectsnap){

          const newDisconnect = document.createElement('li');
          newDisconnect.setAttribute ('class', 'list-group-item col-xs-10');
          newDisconnect.innerText = disconnectsnap.val();

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

          disconnectTable.appendChild(newMatchDisconnect);
          disconnectTable.appendChild(newDisconnect);

        });

      });

    });

    // statAutoReachline.innerText = totalAutoReachlineYes + " : " + totalAutoReachlineNo;
    statTeleopClimb.innerText = totalTeleopClimbSuccess + " : " + totalTeleopClimbFailure;
    

  });




}