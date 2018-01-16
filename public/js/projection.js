const threshold = 0.20;

function smarterLoadRanks() {

  redTeamOne = $("#red-team-one").val();
  redTeamTwo = $("#red-team-two").val();
  redTeamThree = $("#red-team-three").val();

  blueTeamOne = $("#blue-team-one").val();
  blueTeamTwo = $("#blue-team-two").val();
  blueTeamThree = $("#blue-team-three").val();

  db.ref('teamlist').once('value').then(function(listsnap){

    var teamList = [];

    listsnap.forEach(function(team){
      teamList.push(team.key);
    })

    if (teamList.indexOf(redTeamOne) == -1 || teamList.indexOf(redTeamTwo) == -1 || teamList.indexOf(redTeamThree) == -1 || teamList.indexOf(blueTeamOne) == -1 || teamList.indexOf(blueTeamTwo) == -1 || teamList.indexOf(blueTeamThree) == -1){
      $('#warning').html("Invalid team(s)! Not in database.");
      console.log("Cannot find teams in teamlist.");
      return;
    }

  });

  teamsToLoad.push(parseInt($("#red-team-one").val()));
  teamsToLoad.push(parseInt($("#red-team-two").val()));
  teamsToLoad.push(parseInt($("#red-team-three").val()));

  teamsToLoad.push(parseInt($("#blue-team-one").val()));
  teamsToLoad.push(parseInt($("#blue-team-two").val()));
  teamsToLoad.push(parseInt($("#blue-team-three").val()));

  loadStatistics();

}

var redTeamOne = 0;
var redTeamTwo = 0;
var redTeamThree = 0;

var redTeamScore = 0;

var redReachlineCount = 0;
var redClimbCount = 0;
var redPressureCount = 0;
var redAutoGearsCount = 0;
var redTeleopGearsCount = 0;

var redAutoRotorCount = 0;
var redTeleopRotorCount = 0;

var blueTeamOne = 0;
var blueTeamTwo = 0;
var blueTeamThree = 0;

var blueTeamScore = 0;

var blueReachlineCount = 0;
var blueClimbCount = 0;
var bluePressureCount = 0;
var blueAutoGearsCount = 0;
var blueTeleopGearsCount = 0;

var blueAutoRotorCount = 0;
var blueTeleopRotorCount = 0;


function allLoadComplete() {
  refreshProjection();
}

function refreshProjection() {

  redTeamOne = $("#red-team-one").val();
  redTeamTwo = $("#red-team-two").val();
  redTeamThree = $("#red-team-three").val();

  blueTeamOne = $("#blue-team-one").val();
  blueTeamTwo = $("#blue-team-two").val();
  blueTeamThree = $("#blue-team-three").val();

  redTeamScore = 0;

  redReachlineCount = 0;
  redClimbCount = 0;
  redPressureCount = 0;
  redAutoGearsCount = 0;
  redTeleopGearsCount = 0;

  redAutoRotorCount = 0;
  redTeleopRotorCount = 0;

  blueTeamScore = 0;

  blueReachlineCount = 0;
  blueClimbCount = 0;
  bluePressureCount = 0;
  blueAutoGearsCount = 0;
  blueTeleopGearsCount = 0;

  blueAutoRotorCount = 0;
  blueTeleopRotorCount = 0;

  db.ref('teamlist').once('value').then(function(listsnap){

    var teamList = [];

    listsnap.forEach(function(team){
      teamList.push(team.key);
    })

    if (teamList.indexOf(redTeamOne) == -1 || teamList.indexOf(redTeamTwo) == -1 || teamList.indexOf(redTeamThree) == -1 || teamList.indexOf(blueTeamOne) == -1 || teamList.indexOf(blueTeamTwo) == -1 || teamList.indexOf(blueTeamThree) == -1){
      $('#warning').html("Invalid team(s)! Not in database.");
      console.log("Cannot find teams in teamlist.");
      return;
    }

    db.ref('statistics/' + redTeamOne).once('value').then(function(statisticsSnapredTeamOne) {
      db.ref('statistics/' + redTeamTwo).once('value').then(function(statisticsSnapredTeamTwo) {
        db.ref('statistics/' + redTeamThree).once('value').then(function(statisticsSnapredTeamThree) {
          db.ref('statistics/' + blueTeamOne).once('value').then(function(statisticsSnapblueTeamOne) {
            db.ref('statistics/' + blueTeamTwo).once('value').then(function(statisticsSnapblueTeamTwo) {
              db.ref('statistics/' + blueTeamThree).once('value').then(function(statisticsSnapblueTeamThree) {
                fillProjection(statisticsSnapredTeamOne.val(), statisticsSnapredTeamTwo.val(), statisticsSnapredTeamThree.val(), statisticsSnapblueTeamOne.val(), statisticsSnapblueTeamTwo.val(), statisticsSnapblueTeamThree.val());
              });
            });
          });
        });
      });
    });


  });

}

function fillProjection(statisticsredTeamOne, statisticsredTeamTwo, statisticsredTeamThree, statisticsblueTeamOne, statisticsblueTeamTwo, statisticsblueTeamThree) {

  projectTeam("red", 1, statisticsredTeamOne);
  projectTeam("red", 2, statisticsredTeamTwo);
  projectTeam("red", 3, statisticsredTeamThree);
  projectTeam("blue", 1, statisticsblueTeamOne);
  projectTeam("blue", 2, statisticsblueTeamTwo);
  projectTeam("blue", 3, statisticsblueTeamThree);

  finalizeAllianceStats();
  finalizeScores();

  if (redTeamScore > blueTeamScore)
    fillMainHeader(true, false);

  else if (redTeamScore < blueTeamScore)
    fillMainHeader(false, true);

  else
    fillMainHeader(false, false);

  fillTableHeader();
}

function finalizeScores() {

  var redMobilityScore = 0;
  var redClimbScore = 0;
  var redPressureScore = 0;
  var redRotorScore = 0;

  redMobilityScore = redReachlineCount * 5;
  redClimbScore = redClimbCount * 50;
  redPressureScore = redPressureCount;
  redRotorScore = redAutoRotorCount * 60 + redTeleopRotorCount * 40;

  redTeamScore = redMobilityScore + redClimbScore + redPressureScore + redRotorScore;

  var blueMobilityScore = 0;
  var blueClimbScore = 0;
  var bluePressureScore = 0;
  var blueRotorScore = 0;

  blueMobilityScore = blueReachlineCount * 5;
  blueClimbScore = blueClimbCount * 50;
  bluePressureScore = bluePressureCount;
  blueRotorScore = blueAutoRotorCount * 60 + blueTeleopRotorCount * 40;

  blueTeamScore = blueMobilityScore + blueClimbScore + bluePressureScore + blueRotorScore;

  // Assign to html

  $("#redalliance-score-reachline").html(redMobilityScore);
  $("#redalliance-score-readyfortakeoff").html(redClimbScore);
  $("#redalliance-score-pressure").html(redPressureScore);
  $("#redalliance-score-rotors").html(redRotorScore);
  $("#redalliance-totalscore").html(redTeamScore);

  $("#bluealliance-score-reachline").html(blueMobilityScore);
  $("#bluealliance-score-readyfortakeoff").html(blueClimbScore);
  $("#bluealliance-score-pressure").html(bluePressureScore);
  $("#bluealliance-score-rotors").html(blueRotorScore);
  $("#bluealliance-totalscore").html(blueTeamScore);


}

function finalizeAllianceStats() {
  redPressureCount = Math.floor(redPressureCount/9);

  if (redAutoGearsCount >= 1 && redAutoGearsCount < 3)
    redAutoRotorCount = 1;
  else if (redAutoGearsCount >= 3 && redAutoGearsCount < 7)
    redAutoRotorCount = 2;
  else if (redAutoGearsCount >= 7 && redAutoGearsCount < 13)
    redAutoRotorCount = 3;
  else if (redAutoGearsCount >= 13)
    redAutoRotorCount = 4;

  redTeleopGearsCount += 1;
  redTeleopGearsCount += redAutoGearsCount;

  if (redTeleopGearsCount >= 1 && redTeleopGearsCount < 3)
    redTeleopRotorCount = 1;
  else if (redTeleopGearsCount >= 3 && redTeleopGearsCount < 7)
    redTeleopRotorCount = 2;
  else if (redTeleopGearsCount >= 7 && redTeleopGearsCount < 13)
    redTeleopRotorCount = 3;
  else if (redTeleopGearsCount >= 13)
    redTeleopRotorCount = 4;

  redTeleopRotorCount -= redAutoRotorCount;

  bluePressureCount = Math.floor(bluePressureCount/9);

  if (blueAutoGearsCount >= 1 && blueAutoGearsCount < 3)
    blueAutoRotorCount = 1;
  else if (blueAutoGearsCount >= 3 && blueAutoGearsCount < 7)
    blueAutoRotorCount = 2;
  else if (blueAutoGearsCount >= 7 && blueAutoGearsCount < 13)
    blueAutoRotorCount = 3;
  else if (blueAutoGearsCount >= 13)
    blueAutoRotorCount = 4;

  blueTeleopGearsCount += 1;
  blueTeleopGearsCount += blueAutoGearsCount;

  if (blueTeleopGearsCount >= 1 && blueTeleopGearsCount < 3)
    blueTeleopRotorCount = 1;
  else if (blueTeleopGearsCount >= 3 && blueTeleopGearsCount < 7)
    blueTeleopRotorCount = 2;
  else if (blueTeleopGearsCount >= 7 && blueTeleopGearsCount < 13)
    blueTeleopRotorCount = 3;
  else if (blueTeleopGearsCount >= 13)
    blueTeleopRotorCount = 4;

  blueTeleopRotorCount -= blueAutoRotorCount;
}

function projectTeam(alliance, index, teamStatisticsObject) {

  var autoCondition = "";
  var teleopCondition = "";

  autoCondition += $('input[name="options' + alliance + index + '-auto-s"]:checked').val();
  autoCondition += "-";
  autoCondition += $('input[name="options' + alliance + index + '-auto-g"]:checked').val();
  autoCondition += $('input[name="options' + alliance + index + '-auto-h"]:checked').val();
  autoCondition += $('input[name="options' + alliance + index + '-auto-l"]:checked').val();
  autoCondition += "-";
  autoCondition += $('input[name="options' + alliance + index + '-auto-and"]:checked').val();

  teleopCondition += $('input[name="options' + alliance + index + '-teleop-g"]:checked').val();
  teleopCondition += $('input[name="options' + alliance + index + '-teleop-h"]:checked').val();
  teleopCondition += $('input[name="options' + alliance + index + '-teleop-l"]:checked').val();
  teleopCondition += "-"
  teleopCondition += $('input[name="options' + alliance + index + '-teleop-and"]:checked').val();

  if ($('input[name="options' + alliance + index + '-viewall"]:checked').val() == "yes") {
    autoCondition = "all-all-selective";
    teleopCondition = "all-selective";
  }

  if (teamStatisticsObject.goal.accuracy.goal_accuracy_reachline > 0 )
    alliance == "red" ? redReachlineCount += 1 : blueReachlineCount += 1;

  $("#" + alliance + "alliance" + index + "-reachline-frequency").html(teamStatisticsObject.goal.accuracy.goal_accuracy_reachline + "%");


  if (teamStatisticsObject.goal.accuracy.goal_accuracy_climb > 0)
    alliance == "red" ? redClimbCount += 1 : blueClimbCount += 1;

  $("#" + alliance + "alliance" + index + "-climb-frequency").html(teamStatisticsObject.goal.accuracy.goal_accuracy_climb + "%");

  if (alliance == "red") {
    if (teamStatisticsObject.auto.average[autoCondition].low.auto_average_low_score != -1)
      redPressureCount += Math.round(teamStatisticsObject.auto.average[autoCondition].low.auto_average_low_score) * 3;

    if (teamStatisticsObject.auto.average[autoCondition].high.auto_average_high_score != -1)
      redPressureCount += Math.round(teamStatisticsObject.auto.average[autoCondition].high.auto_average_high_score) * 9;

    if (teamStatisticsObject.teleop.average[teleopCondition].low.teleop_average_low_score != -1)
      redPressureCount += Math.round(teamStatisticsObject.teleop.average[teleopCondition].low.teleop_average_low_score);

    if (teamStatisticsObject.teleop.average[teleopCondition].high.teleop_average_high_score != -1)
      redPressureCount += Math.round(teamStatisticsObject.teleop.average[teleopCondition].high.teleop_average_high_score) * 3;

    if (teamStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score != -1)
      redAutoGearsCount += Math.round(teamStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score);

    if (teamStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score != -1) {
      var statgearsthing = teamStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score;
      var decimalpart = statgearsthing % 1;
      if (decimalpart >= threshold)
        redTeleopGearsCount += Math.ceil(statgearsthing);
      else if (decimalpart < threshold)
        redTeleopGearsCount += Math.floor(statgearsthing);
    }
  }
  else {
    if (teamStatisticsObject.auto.average[autoCondition].low.auto_average_low_score != -1)
      bluePressureCount += Math.round(teamStatisticsObject.auto.average[autoCondition].low.auto_average_low_score) * 3;

    if (teamStatisticsObject.auto.average[autoCondition].high.auto_average_high_score != -1)
      bluePressureCount += Math.round(teamStatisticsObject.auto.average[autoCondition].high.auto_average_high_score) * 9;

    if (teamStatisticsObject.teleop.average[teleopCondition].low.teleop_average_low_score != -1)
      bluePressureCount += Math.round(teamStatisticsObject.teleop.average[teleopCondition].low.teleop_average_low_score);

    if (teamStatisticsObject.teleop.average[teleopCondition].high.teleop_average_high_score != -1)
      bluePressureCount += Math.round(teamStatisticsObject.teleop.average[teleopCondition].high.teleop_average_high_score) * 3;

    if (teamStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score != -1)
      blueAutoGearsCount += Math.round(teamStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score);

    if (teamStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score != -1) {
      var statgearsthing = teamStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score;
      var decimalpart = statgearsthing % 1;
      if (decimalpart >= threshold)
        blueTeleopGearsCount += Math.ceil(statgearsthing);
      else if (decimalpart < threshold)
        blueTeleopGearsCount += Math.floor(statgearsthing);
    }
  }

  $("#" + alliance + "alliance" + index + "-pressure-autolow").html(Math.round(teamStatisticsObject.auto.average[autoCondition].low.auto_average_low_score));
  $("#" + alliance + "alliance" + index + "-pressure-autohigh").html(Math.round(teamStatisticsObject.auto.average[autoCondition].high.auto_average_high_score));
  $("#" + alliance + "alliance" + index + "-pressure-teleoplow").html(Math.round(teamStatisticsObject.teleop.average[teleopCondition].low.teleop_average_low_score));
  $("#" + alliance + "alliance" + index + "-pressure-teleophigh").html(Math.round(teamStatisticsObject.teleop.average[teleopCondition].high.teleop_average_high_score));
  $("#" + alliance + "alliance" + index + "-gears-auto").html(Math.round(teamStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score));
  $("#" + alliance + "alliance" + index + "-gears-teleop").html(Math.round(teamStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score));

}

function fillMainHeader(redWin, blueWin) {

  if (redWin) {
    $("#redalliance1-mainheader").html("<strong>" + redTeamOne + "</strong>");
    $("#redalliance2-mainheader").html("<strong>" + redTeamTwo + "</strong>");
    $("#redalliance3-mainheader").html("<strong>" + redTeamThree + "</strong>");
    $("#redalliance-scoreheader").html("<strong>" + redTeamScore + "</strong>");

    $("#bluealliance1-mainheader").html(blueTeamOne);
    $("#bluealliance2-mainheader").html(blueTeamTwo);
    $("#bluealliance3-mainheader").html(blueTeamThree);
    $("#bluealliance-scoreheader").html(blueTeamScore);
  }
  else if (blueWin) {
    $("#bluealliance1-mainheader").html("<strong>" + blueTeamOne + "</strong>");
    $("#bluealliance2-mainheader").html("<strong>" + blueTeamTwo + "</strong>");
    $("#bluealliance3-mainheader").html("<strong>" + blueTeamThree + "</strong>");
    $("#bluealliance-scoreheader").html("<strong>" + blueTeamScore + "</strong>");

    $("#redalliance1-mainheader").html(redTeamOne);
    $("#redalliance2-mainheader").html(redTeamTwo);
    $("#redalliance3-mainheader").html(redTeamThree);
    $("#redalliance-scoreheader").html(redTeamScore);
  }
  else {
    $("#bluealliance1-mainheader").html(blueTeamOne);
    $("#bluealliance2-mainheader").html(blueTeamTwo);
    $("#bluealliance3-mainheader").html(blueTeamThree);
    $("#bluealliance-scoreheader").html(blueTeamScore);

    $("#redalliance1-mainheader").html(redTeamOne);
    $("#redalliance2-mainheader").html(redTeamTwo);
    $("#redalliance3-mainheader").html(redTeamThree);
    $("#redalliance-scoreheader").html(redTeamScore);
  }

}

function fillTableHeader() {

  $("#redalliance1-header").html(redTeamOne);
  $("#redalliance2-header").html(redTeamTwo);
  $("#redalliance3-header").html(redTeamThree);

  $("#bluealliance1-header").html(blueTeamOne);
  $("#bluealliance2-header").html(blueTeamTwo);
  $("#bluealliance3-header").html(blueTeamThree);

  $("#redalliance1-optionsheader").html("Red - " + redTeamOne);
  $("#redalliance2-optionsheader").html("Red - " + redTeamTwo);
  $("#redalliance3-optionsheader").html("Red - " + redTeamThree);

  $("#bluealliance1-optionsheader").html("Blue - " + blueTeamOne);
  $("#bluealliance2-optionsheader").html("Blue - " + blueTeamTwo);
  $("#bluealliance3-optionsheader").html("Blue - " + blueTeamThree);

  $("#redalliance-reachline").html(redReachlineCount);
  $("#redalliance-readyfortakeoff").html(redClimbCount);
  $("#redalliance-pressure").html(redPressureCount);
  $("#redalliance-rotors-auto").html(redAutoRotorCount);
  $("#redalliance-rotors-teleop").html(redTeleopRotorCount);

  $("#bluealliance-reachline").html(blueReachlineCount);
  $("#bluealliance-readyfortakeoff").html(blueClimbCount);
  $("#bluealliance-pressure").html(bluePressureCount);
  $("#bluealliance-rotors-auto").html(blueAutoRotorCount);
  $("#bluealliance-rotors-teleop").html(blueTeleopRotorCount);

}
