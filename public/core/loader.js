var teamsToLoad = [];
var statisticsReady = false;

function showContent() {

  $(document).ready(function(){

    $("#select-input").hide();
    $("#content").show();

  })
}

function loadStatistics() {
  console.log("Loading team statistics...");
  doneStatistics();
}

function doneStatistics() {
  if (teamsToLoad.length > 0) {
    teamStatistics(teamsToLoad[0]);
    teamsToLoad.shift();
  }
  else {
    showContent();
    console.log("Statistics Loaded.");
    statisticsReady = true;
    allLoadComplete(); // Found in main js file
  }
}

function quickLoadRanks() {
  loadStatistics();
}

function smartLoadRanks() {
  db.ref('teamlist').once('value').then(function(snapTeamList){
    snapTeamList.forEach(function(teamSnap){
      teamsToLoad.push(teamSnap.key);
    })
    loadStatistics();
  });
}

function forceLoadRanks() {
  db.ref('teamlist').once('value').then(function(snapTeamList){
    snapTeamList.forEach(function(teamSnap){
      db.ref('statisticsupdate/' + teamSnap.key).set(false);
      teamsToLoad.push(teamSnap.key);
    })
    loadStatistics();
  });
}
