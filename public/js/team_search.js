var dataReady = false;
var statisticsObject = {};
var team = 0;

$(document).ready(function(){

  $('input[name^="options-view"]').click(function(){
    var mode = $(this).attr("name").slice(12);
    if ($(this).val() == "yes") {
      $('input[name^="options-' + mode + '"]').prop('disabled', false);
    }
    else {
      $('input[name^="options-' + mode + '"]').prop('disabled', true);
    }
  });

})

function loadTeam() {
  $(document).ready(function(){

    team = $("#team").val();
    statisticsObject = {};
    dataReady = false;

    $("#team-input").hide();
    $("#content").show();

    $("#team-header").html("Team: " + team);
    db.ref('matchcounter/' + team).once('value').then(function(snapMatchCount){
      $("#matchcount-header").html("Matches Played: " + snapMatchCount.val());
    });
    db.ref('specifications/' + team).once('value').then(function(snapSpecs){
      if (snapSpecs.val() != null)
        specsTable(snapSpecs);
    });

    teamStatistics($("#team").val());

  })
}

function specsTable(snapSpecs) {

  $("#specstable").html(" ");

  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">Weight</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">' + snapSpecs.val().specs_weight +'</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">Length</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">' + snapSpecs.val().specs_length +'</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">Width</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">' + snapSpecs.val().specs_width +'</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">Height</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">' + snapSpecs.val().specs_height +'</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">System Capabilities</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">' + snapSpecs.val().specs_capabilities +'</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">Comments</li>');
  $("#specstable").append('<li class="list-group-item col-xs-6 wrap-all">' + snapSpecs.val().specs_comment +'</li>');

  $("#specstable").append('<li id="specstable_image" class="list-group-item col-xs-12 wrap-all text-center"></li>');

  storageRef.child(team + '.jpg').getDownloadURL().then(function(url){
    $("#specstable_image").append('<img id="specstable_image_ref" alt="Robot Image" src="' + url + '">');
  }).catch(function(){
    console.log("Error! Maybe there's no image? Attempted team: " + team);
  });

}

function refreshTable() {
  if (!dataReady)
    return;

  doneStatistics();
}

function doneStatistics() {
  $(document).ready(function(){
    dataReady = true;

    adjustTables();

    db.ref('statistics/' + team).once('value').then(function(statisticsSnap){
      statisticsObject = statisticsSnap;

      var autoCondition = "";

      autoCondition += $('input[name="options-auto-s"]:checked').val();
      autoCondition += "-";
      autoCondition += $('input[name="options-auto-g"]:checked').val();
      autoCondition += $('input[name="options-auto-h"]:checked').val();
      autoCondition += $('input[name="options-auto-l"]:checked').val();
      autoCondition += "-";
      autoCondition += $('input[name="options-auto-and"]:checked').val();

      var teleopCondition = "";

      teleopCondition += $('input[name="options-teleop-g"]:checked').val();
      teleopCondition += $('input[name="options-teleop-h"]:checked').val();
      teleopCondition += $('input[name="options-teleop-l"]:checked').val();
      teleopCondition += "-"
      teleopCondition += $('input[name="options-teleop-and"]:checked').val();

      if ($('input[name="options-viewall"]:checked').val() == "yes") {

        autoCondition = "all-all-selective";
        teleopCondition = "all-selective";

      }

      if($('input[name="options-viewauto"]:checked').val() == "yes" && ($('input[name="options-auto-g"]:checked').val() != "" || $('input[name="options-auto-h"]:checked').val() != "" || $('input[name="options-auto-l"]:checked').val() != ""))
        autoTableStatistics(autoCondition);

      if($('input[name="options-viewteleop"]:checked').val() == "yes" && ($('input[name="options-teleop-g"]:checked').val() != "" || $('input[name="options-teleop-h"]:checked').val() != "" || $('input[name="options-teleop-l"]:checked').val() != ""))
        teleopTableStatistics(teleopCondition);

      if(($('input[name="options-auto-g"]:checked').val() != "" || $('input[name="options-auto-h"]:checked').val() != "" || $('input[name="options-auto-l"]:checked').val() != "") && ($('input[name="options-teleop-g"]:checked').val() != "" || $('input[name="options-teleop-h"]:checked').val() != "" || $('input[name="options-teleop-l"]:checked').val() != ""))
        overallTableStatistics(autoCondition, teleopCondition)


      infoTableStatistics();
      goalTableStatistics();

    });

    matchesTable();
  })
}

function overallTableStatistics(autoCondition, teleopCondition) {

  $("#stat_overall_score").html(statisticsObject.val().overall[autoCondition + "--" + teleopCondition].overall_score);
  $("#stat_overall_accuracy").html(statisticsObject.val().overall[autoCondition + "--" + teleopCondition].overall_accuracy + "%");
  $("#stat_overall_gears").html(statisticsObject.val().overall[autoCondition + "--" + teleopCondition].overall_gears);
  $("#stat_overall_kpa").html(statisticsObject.val().overall[autoCondition + "--" + teleopCondition].overall_kpa);

}

function adjustTables() {
  var autoDisplay = "";
  $('input[name="options-auto-and"]:checked').val() == "selective" ? autoDisplay += "Selective" : autoDisplay += "Inclusive";
  $('input[name="options-auto-g"]:checked').val() == "g" ? autoDisplay += " Gears" : autoDisplay += "";
  $('input[name="options-auto-h"]:checked').val() == "h" ? autoDisplay += " High" : autoDisplay += "";
  $('input[name="options-auto-l"]:checked').val() == "l" ? autoDisplay += " Low" : autoDisplay += "";
  if ($('input[name="options-auto-s"]:checked').val() == "boiler")
    autoDisplay += " at Boiler";
  else if ($('input[name="options-auto-s"]:checked').val() == "center")
    autoDisplay += " at Center";
  else if ($('input[name="options-auto-s"]:checked').val() == "loading")
    autoDisplay += " at Loading Station";
  else
    autoDisplay += " at Any Position";



  $("#stat_auto_weight_gears").html("{}");
  $("#stat_auto_accuracy_gears").html("{} %");
  $("#stat_auto_average_gears").html("{} : {}");
  $("#stat_auto_maximum_gears").html("{} : {}");
  $("#stat_auto_minimum_gears").html("{} : {}");

  $("#stat_auto_weight_high").html("{}");
  $("#stat_auto_accuracy_high").html("{} %");
  $("#stat_auto_average_high").html("{} : {}");
  $("#stat_auto_maximum_high").html("{} : {}");
  $("#stat_auto_minimum_high").html("{} : {}");

  $("#stat_auto_weight_low").html("{}");
  $("#stat_auto_accuracy_low").html("{} %");
  $("#stat_auto_average_low").html("{} : {}");
  $("#stat_auto_maximum_low").html("{} : {}");
  $("#stat_auto_minimum_low").html("{} : {}");

  if($('input[name="options-viewauto"]:checked').val() == "yes" && ($('input[name="options-auto-g"]:checked').val() != "" || $('input[name="options-auto-h"]:checked').val() != "" || $('input[name="options-auto-l"]:checked').val() != "")) {
    $('#table-stat-auto').show();
  }
  else {
    $('#table-stat-auto').hide();
    $('#header-statistics-viewauto').html("Auto View Disabled.");
  }

  var teleopDisplay = "";
  $('input[name="options-teleop-and"]:checked').val() == "selective" ? teleopDisplay += "Selective" : teleopDisplay += "Inclusive";
  $('input[name="options-teleop-g"]:checked').val() == "g" ? teleopDisplay += " Gears" : teleopDisplay += "";
  $('input[name="options-teleop-h"]:checked').val() == "h" ? teleopDisplay += " High" : teleopDisplay += "";
  $('input[name="options-teleop-l"]:checked').val() == "l" ? teleopDisplay += " Low" : teleopDisplay += "";



  $("#stat_teleop_weight_gears").html("{}");
  $("#stat_teleop_accuracy_gears").html("{} %");
  $("#stat_teleop_average_gears").html("{} : {}");
  $("#stat_teleop_maximum_gears").html("{} : {}");
  $("#stat_teleop_minimum_gears").html("{} : {}");

  $("#stat_teleop_weight_high").html("{}");
  $("#stat_teleop_accuracy_high").html("{} %");
  $("#stat_teleop_average_high").html("{} : {}");
  $("#stat_teleop_maximum_high").html("{} : {}");
  $("#stat_teleop_minimum_high").html("{} : {}");

  $("#stat_teleop_weight_low").html("{}");
  $("#stat_teleop_accuracy_low").html("{} %");
  $("#stat_teleop_average_low").html("{} : {}");
  $("#stat_teleop_maximum_low").html("{} : {}");
  $("#stat_teleop_minimum_low").html("{} : {}");

  if($('input[name="options-viewteleop"]:checked').val() == "yes" && ($('input[name="options-teleop-g"]:checked').val() != "" || $('input[name="options-teleop-h"]:checked').val() != "" || $('input[name="options-teleop-l"]:checked').val() != "")) {
    $('#table-stat-teleop').show();
  }
  else {
    $('#table-stat-teleop').hide();
    $('#header-statistics-viewteleop').html("Teleop View Disabled.");
  }

  if ($('input[name="options-viewall"]:checked').val() == "yes") {

    autoDisplay = "Full Auto Statistics";
    teleopDisplay = "Full Teleop Statistics";

  }

  $('#header-statistics-viewauto').html(autoDisplay);
  $('#header-statistics-viewteleop').html(teleopDisplay);

}

function infoTableStatistics() {
  var infoCount = statisticsObject.val().robot.count;
  var infoSystem = statisticsObject.val().robot.system;
  //var infoDescription = statisticsObject.val().robot.description;

  $("#stat_robot_system_hopperdump").html(infoSystem.robot_system_hopperdump ? "Yes" : "No");
  $("#stat_robot_count_hopperdump").html(infoCount.robot_count_hopperdump);

  $("#stat_robot_system_fuelintake").html(infoSystem.robot_system_fuelintake ? "Yes" : "No");
  $("#stat_robot_count_fuelintake").html(infoCount.robot_count_fuelintake);

  $("#stat_robot_system_gearintake").html(infoSystem.robot_system_gearintake ? "Yes" : "No");
  $("#stat_robot_count_gearintake").html(infoCount.robot_count_gearintake);

  $("#stat_robot_system_mechgear").html(infoSystem.robot_system_mechgear ? "Yes" : "No");
  $("#stat_robot_count_mechgear").html(infoCount.robot_count_mechgear);
}

function goalTableStatistics() {
  var goalAccuracy = statisticsObject.val().goal.accuracy;
  var goalTotal = statisticsObject.val().goal.total;

  $("#stat_goal_accuracy_reachline").html(goalAccuracy.goal_accuracy_reachline + "%");
  $("#stat_goal_total_reachline_yes").html(goalTotal.goal_total_reachline_yes);
  $("#stat_goal_total_reachline_no").html(goalTotal.goal_total_reachline_no);

  $("#stat_goal_accuracy_climb").html(goalAccuracy.goal_accuracy_climb + "%");
  $("#stat_goal_total_climb_success").html(goalTotal.goal_total_climb_success);
  $("#stat_goal_total_climb_fail").html(goalTotal.goal_total_climb_fail);

  $("#stat_goal_accuracy_touchpad").html(goalAccuracy.goal_accuracy_touchpad + "%");
  $("#stat_goal_total_touchpad_success").html(goalTotal.goal_total_climb_success);
  $("#stat_goal_total_touchpad_fail").html(goalTotal.goal_total_climb_fail + goalTotal.goal_total_climb_miss);
}

function autoTableStatistics(condition) {

  var autoAccuracy = statisticsObject.val().auto.accuracy[condition];
  var autoAverage = statisticsObject.val().auto.average[condition];
  var autoMaximum = statisticsObject.val().auto.maximum[condition];
  var autoMaxmatch = statisticsObject.val().auto.maxmatch[condition];
  var autoMinimum = statisticsObject.val().auto.minimum[condition];
  var autoMinmatch = statisticsObject.val().auto.minmatch[condition];
  var autoTotal = statisticsObject.val().auto.total[condition];
  var autoWeight = statisticsObject.val().auto.weight[condition];

  $("#stat_auto_weight_gears").html(autoWeight.auto_weight_gears);
  $("#stat_auto_accuracy_gears").html(autoAccuracy.auto_accuracy_gears + "%");
  $("#stat_auto_average_gears").html(autoAverage.gears.auto_average_gears_score + " : " + autoAverage.gears.auto_average_gears_miss);
  $("#stat_auto_maximum_gears").html(autoMaximum.gears.auto_maximum_gears_score + " : " + autoMaximum.gears.auto_maximum_gears_miss + " [" + autoMaxmatch.gears.auto_maxmatch_gears_score + " : " + autoMaxmatch.gears.auto_maxmatch_gears_miss +"]");
  $("#stat_auto_minimum_gears").html(autoMinimum.gears.auto_minimum_gears_score + " : " + autoMinimum.gears.auto_minimum_gears_miss + " [" + autoMinmatch.gears.auto_minmatch_gears_score + " : " + autoMinmatch.gears.auto_minmatch_gears_miss +"]");

  $("#stat_auto_weight_high").html(autoWeight.auto_weight_high);
  $("#stat_auto_accuracy_high").html(autoAccuracy.auto_accuracy_high + "%");
  $("#stat_auto_average_high").html(autoAverage.high.auto_average_high_score + " : " + autoAverage.high.auto_average_high_miss);
  $("#stat_auto_maximum_high").html(autoMaximum.high.auto_maximum_high_score + " : " + autoMaximum.high.auto_maximum_high_miss + " [" + autoMaxmatch.high.auto_maxmatch_high_score + " : " + autoMaxmatch.high.auto_maxmatch_high_miss +"]");
  $("#stat_auto_minimum_high").html(autoMinimum.high.auto_minimum_high_score + " : " + autoMinimum.high.auto_minimum_high_miss + " [" + autoMinmatch.high.auto_minmatch_high_score + " : " + autoMinmatch.high.auto_minmatch_high_miss +"]");

  $("#stat_auto_weight_low").html(autoWeight.auto_weight_low);
  $("#stat_auto_accuracy_low").html(autoAccuracy.auto_accuracy_low + "%");
  $("#stat_auto_average_low").html(autoAverage.low.auto_average_low_score + " : " + autoAverage.low.auto_average_low_miss);
  $("#stat_auto_maximum_low").html(autoMaximum.low.auto_maximum_low_score + " : " + autoMaximum.low.auto_maximum_low_miss + " [" + autoMaxmatch.low.auto_maxmatch_low_score + " : " + autoMaxmatch.low.auto_maxmatch_low_miss +"]");
  $("#stat_auto_minimum_low").html(autoMinimum.low.auto_minimum_low_score + " : " + autoMinimum.low.auto_minimum_low_miss + " [" + autoMinmatch.low.auto_minmatch_low_score + " : " + autoMinmatch.low.auto_minmatch_low_miss +"]");
}

function teleopTableStatistics(condition) {

  var teleopAccuracy = statisticsObject.val().teleop.accuracy[condition];
  var teleopAverage = statisticsObject.val().teleop.average[condition];
  var teleopMaximum = statisticsObject.val().teleop.maximum[condition];
  var teleopMaxmatch = statisticsObject.val().teleop.maxmatch[condition];
  var teleopMinimum = statisticsObject.val().teleop.minimum[condition];
  var teleopMinmatch = statisticsObject.val().teleop.minmatch[condition];
  var teleopTotal = statisticsObject.val().teleop.total[condition];
  var teleopWeight = statisticsObject.val().teleop.weight[condition];

  $("#stat_teleop_weight_gears").html(teleopWeight.teleop_weight_gears);
  $("#stat_teleop_accuracy_gears").html(teleopAccuracy.teleop_accuracy_gears + "%");
  $("#stat_teleop_average_gears").html(teleopAverage.gears.teleop_average_gears_score + " : " + teleopAverage.gears.teleop_average_gears_miss);
  $("#stat_teleop_maximum_gears").html(teleopMaximum.gears.teleop_maximum_gears_score + " : " + teleopMaximum.gears.teleop_maximum_gears_miss + " [" + teleopMaxmatch.gears.teleop_maxmatch_gears_score + " : " + teleopMaxmatch.gears.teleop_maxmatch_gears_miss +"]");
  $("#stat_teleop_minimum_gears").html(teleopMinimum.gears.teleop_minimum_gears_score + " : " + teleopMinimum.gears.teleop_minimum_gears_miss + " [" + teleopMinmatch.gears.teleop_minmatch_gears_score + " : " + teleopMinmatch.gears.teleop_minmatch_gears_miss +"]");

  $("#stat_teleop_weight_high").html(teleopWeight.teleop_weight_high);
  $("#stat_teleop_accuracy_high").html(teleopAccuracy.teleop_accuracy_high + "%");
  $("#stat_teleop_average_high").html(teleopAverage.high.teleop_average_high_score + " : " + teleopAverage.high.teleop_average_high_miss);
  $("#stat_teleop_maximum_high").html(teleopMaximum.high.teleop_maximum_high_score + " : " + teleopMaximum.high.teleop_maximum_high_miss + " [" + teleopMaxmatch.high.teleop_maxmatch_high_score + " : " + teleopMaxmatch.high.teleop_maxmatch_high_miss +"]");
  $("#stat_teleop_minimum_high").html(teleopMinimum.high.teleop_minimum_high_score + " : " + teleopMinimum.high.teleop_minimum_high_miss + " [" + teleopMinmatch.high.teleop_minmatch_high_score + " : " + teleopMinmatch.high.teleop_minmatch_high_miss +"]");

  $("#stat_teleop_weight_low").html(teleopWeight.teleop_weight_low);
  $("#stat_teleop_accuracy_low").html(teleopAccuracy.teleop_accuracy_low + "%");
  $("#stat_teleop_average_low").html(teleopAverage.low.teleop_average_low_score + " : " + teleopAverage.low.teleop_average_low_miss);
  $("#stat_teleop_maximum_low").html(teleopMaximum.low.teleop_maximum_low_score + " : " + teleopMaximum.low.teleop_maximum_low_miss + " [" + teleopMaxmatch.low.teleop_maxmatch_low_score + " : " + teleopMaxmatch.low.teleop_maxmatch_low_miss +"]");
  $("#stat_teleop_minimum_low").html(teleopMinimum.low.teleop_minimum_low_score + " : " + teleopMinimum.low.teleop_minimum_low_miss + " [" + teleopMinmatch.low.teleop_minmatch_low_score + " : " + teleopMinmatch.low.teleop_minmatch_low_miss +"]");
}

function matchesTable() {
  $("#matchtable-auto").html(" ");
  $("#matchtable-teleop").html(" ");
  $("#matchtable-goal").html(" ");
  $("#matchtable-robot").html(" ");
  $("#matchtable-comment").html(" ");
  db.ref('matches/' + team).once('value').then(function(snap){

    snap.forEach(function(matchsnap){

      $("#matchtable-auto").append('<li class="list-group-item col-xs-3">' + matchsnap.val().match.match_number + '</li>');
      $("#matchtable-auto").append('<li class="list-group-item col-xs-3">' + matchsnap.val().auto.gears.auto_gears_score + " : " + matchsnap.val().auto.gears.auto_gears_miss + '</li>');
      $("#matchtable-auto").append('<li class="list-group-item col-xs-3">' + matchsnap.val().auto.high.auto_high_score + " : " + matchsnap.val().auto.high.auto_high_miss + '</li>');
      $("#matchtable-auto").append('<li class="list-group-item col-xs-3">' + matchsnap.val().auto.low.auto_low_score + " : " + matchsnap.val().auto.low.auto_low_miss + '</li>');

      $("#matchtable-teleop").append('<li class="list-group-item col-xs-3">' + matchsnap.val().match.match_number + '</li>');
      $("#matchtable-teleop").append('<li class="list-group-item col-xs-3">' + matchsnap.val().teleop.gears.teleop_gears_score + " : " + matchsnap.val().teleop.gears.teleop_gears_miss + '</li>');
      $("#matchtable-teleop").append('<li class="list-group-item col-xs-3">' + matchsnap.val().teleop.high.teleop_high_score + " : " + matchsnap.val().teleop.high.teleop_high_miss + '</li>');
      $("#matchtable-teleop").append('<li class="list-group-item col-xs-3">' + matchsnap.val().teleop.low.teleop_low_score + " : " + matchsnap.val().teleop.low.teleop_low_miss + '</li>');

      $("#matchtable-goal").append('<li class="list-group-item col-xs-3">' + matchsnap.val().match.match_number + '</li>');
      $("#matchtable-goal").append('<li class="list-group-item col-xs-3">' + (matchsnap.val().objective.auto.objective_auto_s == "boiler" ? "Boiler" : (matchsnap.val().objective.auto.objective_auto_s == "center" ? "Center" : "Loading Station")) + '</li>');
      $("#matchtable-goal").append('<li class="list-group-item col-xs-3">' + (matchsnap.val().goal.goal_reachline == "yes" ? "Yes" : "No") + '</li>');
      $("#matchtable-goal").append('<li class="list-group-item col-xs-3">' + (matchsnap.val().goal.goal_climb == "yes" ? "Success" : (matchsnap.val().goal.goal_climb == "no" ? "Failure" : "No Attempt")) + '</li>');


      $("#matchtable-robot").append('<li class="list-group-item col-xs-2">' + matchsnap.val().match.match_number + '</li>');
      $("#matchtable-robot").append('<li class="list-group-item col-xs-2">' + (matchsnap.val().objective.teleop.objective_teleop_d == "yes" ? "Yes" : "No") + '</li>');
      $("#matchtable-robot").append('<li class="list-group-item col-xs-2">' + (matchsnap.val().robot.system.robot_system_hopperdump == "yes" ? "Yes" : "No") + '</li>');
      $("#matchtable-robot").append('<li class="list-group-item col-xs-2">' + (matchsnap.val().robot.system.robot_system_fuelintake == "yes" ? "Yes" : "No") + '</li>');
      $("#matchtable-robot").append('<li class="list-group-item col-xs-2">' + (matchsnap.val().robot.system.robot_system_gearintake == "yes" ? "Yes" : "No") + '</li>');
      $("#matchtable-robot").append('<li class="list-group-item col-xs-2">' + (matchsnap.val().robot.system.robot_system_mechgear == "yes" ? "Yes" : "No") + '</li>');

      $("#matchtable-comment").append('<li class="list-group-item col-xs-2">' + matchsnap.val().match.match_number + '</li>');
      $("#matchtable-comment").append('<li class="list-group-item col-xs-10 wrap-all">' + matchsnap.val().match.match_comment + " -- " + matchsnap.val().match.match_scouter + '</li>');

    });

  });
}
