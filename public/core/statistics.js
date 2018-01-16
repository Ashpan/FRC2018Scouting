var finalStatisticsObject = {
  auto: {
    accuracy: {},
    average: {},
    maximum: {},
    maxmatch: {},
    minimum: {},
    minmatch: {},
    total: {},
    weight: {}
  },
  goal: {

  },
  overall: {

  },
  robot: {

  },
  teleop: {
    accuracy: {},
    average: {},
    maximum: {},
    maxmatch: {},
    minimum: {},
    minmatch: {},
    total: {},
    weight: {}
  }
};

var team = 0;

// var doneCounter = 0;
// var numberPosts = 561;
// var processing = false;
//
// function finishedPost() {
//   doneCounter += 1;
//   if (doneCounter >= numberPosts){
//     doneCounter = 0;
//     processing = false;
//     db.ref('statistics/' + team).once('value').then(function(snapTeamStatistics){
//       overallStatistics(snapTeamStatistics);
//     });
//   }
// }

// var overallDoneCounter = 0;
// var overallNumberPosts = 785;
// var overallProcessing = false;
//
// function finishedOverallPost() {
//   overallDoneCounter += 1;
//   if (overallDoneCounter >= overallNumberPosts){
//     db.ref('statisticsupdate/' + team).set(true);
//     overallDoneCounter = 0;
//     overallProcessing = false;
//     doneStatistics(); // Found in other js file attached.
//   }
// }

function teamStatistics(inputteam) {

  db.ref('statisticsupdate/' + inputteam).once('value').then(function(snapUpdate){

    if (snapUpdate.val()) {
      doneStatistics();
      return;
    }

    // if (processing || overallProcessing) return;
    // processing = true;

    team = inputteam;

    db.ref('matches/' + team).once('value').then(function(snapTeamMatches){
      startTeamStatistics(snapTeamMatches);
    });

  });

}

function startTeamStatistics(snapTeamMatches) {

  for (var ipos = 0; ipos < 4; ipos++)
  {
    var pos = "";
    if (ipos == 0){pos = "boiler";}
    else if (ipos == 1){pos = "center";}
    else if (ipos == 2){pos = "loading";}
    else if (ipos == 3){pos = "all";}

    for (var iobj = 0; iobj < 14; iobj++) {
      if      (iobj == 0) {autoStatistics(snapTeamMatches, "g", false, pos);}
      else if (iobj == 1) {autoStatistics(snapTeamMatches, "h", false, pos);}
      else if (iobj == 2) {autoStatistics(snapTeamMatches, "l", false, pos);}
      else if (iobj == 3) {autoStatistics(snapTeamMatches, "gh", false, pos);}
      else if (iobj == 4) {autoStatistics(snapTeamMatches, "hl", false, pos);}
      else if (iobj == 5) {autoStatistics(snapTeamMatches, "gl", false, pos);}
      else if (iobj == 6) {autoStatistics(snapTeamMatches, "ghl", false, pos);}
      else if (iobj == 7) {autoStatistics(snapTeamMatches, "g", true, pos);}
      else if (iobj == 8) {autoStatistics(snapTeamMatches, "h", true, pos);}
      else if (iobj == 9) {autoStatistics(snapTeamMatches, "l", true, pos);}
      else if (iobj == 10) {autoStatistics(snapTeamMatches, "gh", true, pos);}
      else if (iobj == 11) {autoStatistics(snapTeamMatches, "hl", true, pos);}
      else if (iobj == 12) {autoStatistics(snapTeamMatches, "gl", true, pos);}
      else if (iobj == 13) {autoStatistics(snapTeamMatches, "ghl", true, pos);}
    }
  }
  autoStatistics(snapTeamMatches, "all", false, "all");

  for (var iobj = 0; iobj < 14; iobj++) {
    if      (iobj == 0) {teleopStatistics(snapTeamMatches, "g", false);}
    else if (iobj == 1) {teleopStatistics(snapTeamMatches, "h", false);}
    else if (iobj == 2) {teleopStatistics(snapTeamMatches, "l", false);}
    else if (iobj == 3) {teleopStatistics(snapTeamMatches, "gh", false);}
    else if (iobj == 4) {teleopStatistics(snapTeamMatches, "hl", false);}
    else if (iobj == 5) {teleopStatistics(snapTeamMatches, "gl", false);}
    else if (iobj == 6) {teleopStatistics(snapTeamMatches, "ghl", false);}
    else if (iobj == 7) {teleopStatistics(snapTeamMatches, "g", true);}
    else if (iobj == 8) {teleopStatistics(snapTeamMatches, "h", true);}
    else if (iobj == 9) {teleopStatistics(snapTeamMatches, "l", true);}
    else if (iobj == 10) {teleopStatistics(snapTeamMatches, "gh", true);}
    else if (iobj == 11) {teleopStatistics(snapTeamMatches, "hl", true);}
    else if (iobj == 12) {teleopStatistics(snapTeamMatches, "gl", true);}
    else if (iobj == 13) {teleopStatistics(snapTeamMatches, "ghl", true);}
  }
  teleopStatistics(snapTeamMatches, "all", false);

  infoStatistics(snapTeamMatches);
  goalStatistics(snapTeamMatches);

  overallStatistics();

  db.ref('statisticsupdate/' + team).set(true);
  db.ref('statistics/' + team).set(finalStatisticsObject).then(function(){
    doneStatistics();
  });


}

function overallStatistics() {

  // if (processing || overallProcessing) return;
  // overallProcessing = true;

  for (var ipos = 0; ipos < 4; ipos++)
  {
    var pos = "";
    if (ipos == 0){pos = "boiler";}
    else if (ipos == 1){pos = "center";}
    else if (ipos == 2){pos = "loading";}
    else if (ipos == 3){pos = "all";}

    for (var iauto = 0; iauto < 14; iauto++) {
      var auto = "";
      if      (iauto == 0) {auto = "g-selective";}
      else if (iauto == 1) {auto = "h-selective";}
      else if (iauto == 2) {auto = "l-selective";}
      else if (iauto == 3) {auto = "gh-selective";}
      else if (iauto == 4) {auto = "hl-selective";}
      else if (iauto == 5) {auto = "gl-selective";}
      else if (iauto == 6) {auto = "ghl-selective";}
      else if (iauto == 7) {auto = "g-graball";}
      else if (iauto == 8) {auto = "h-graball";}
      else if (iauto == 9) {auto = "l-graball";}
      else if (iauto == 10) {auto = "gh-graball";}
      else if (iauto == 11) {auto = "hl-graball";}
      else if (iauto == 12) {auto = "gl-graball";}
      else if (iauto == 13) {auto = "ghl-graball";}

      for (var iteleop = 0; iteleop < 14; iteleop++) {
        var autoCondition = pos + "-" + auto;

        if      (iteleop == 0) {createOverallStatistics(autoCondition, "g-selective");}
        else if (iteleop == 1) {createOverallStatistics(autoCondition, "h-selective");}
        else if (iteleop == 2) {createOverallStatistics(autoCondition, "l-selective");}
        else if (iteleop == 3) {createOverallStatistics(autoCondition, "gh-selective");}
        else if (iteleop == 4) {createOverallStatistics(autoCondition, "hl-selective");}
        else if (iteleop == 5) {createOverallStatistics(autoCondition, "gl-selective");}
        else if (iteleop == 6) {createOverallStatistics(autoCondition, "ghl-selective");}
        else if (iteleop == 7) {createOverallStatistics(autoCondition, "g-graball");}
        else if (iteleop == 8) {createOverallStatistics(autoCondition, "h-graball");}
        else if (iteleop == 9) {createOverallStatistics(autoCondition, "l-graball");}
        else if (iteleop == 10) {createOverallStatistics(autoCondition, "gh-graball");}
        else if (iteleop == 11) {createOverallStatistics(autoCondition, "hl-graball");}
        else if (iteleop == 12) {createOverallStatistics(autoCondition, "gl-graball");}
        else if (iteleop == 13) {createOverallStatistics(autoCondition, "ghl-graball");}
      }
    }
  }

  createOverallStatistics("all-all-selective", "all-selective");

}

function createOverallStatistics(autoCondition, teleopCondition) {

  // Find Accuracy

  var overallAccuracy = 0;
  var countOverallAccuracy = 0;

  var reachline = finalStatisticsObject.goal.accuracy.goal_accuracy_reachline;
  if (reachline != -1) {
    overallAccuracy += reachline;
    countOverallAccuracy += 1;
  }
  else {
    reachline = 0;
  }

  var climb = finalStatisticsObject.goal.accuracy.goal_accuracy_climb;
  if (climb != -1) {
    overallAccuracy += climb;
    countOverallAccuracy += 1;
  }
  else {
    climb = 0;
  }


  var autogearsAccuracy = finalStatisticsObject.auto.accuracy[autoCondition].auto_accuracy_gears;
  if (autogearsAccuracy != -1) {
    overallAccuracy += autogearsAccuracy;
    countOverallAccuracy += 1;
  }
  else {
    autogearsAccuracy = 0;
  }
  var autohighAccuracy = finalStatisticsObject.auto.accuracy[autoCondition].auto_accuracy_high;
  if (autohighAccuracy != -1) {
    overallAccuracy += autohighAccuracy;
    countOverallAccuracy += 1;
  }
  else {
    autohighAccuracy = 0;
  }
  var autolowAccuracy = finalStatisticsObject.auto.accuracy[autoCondition].auto_accuracy_low;
  if (autolowAccuracy != -1) {
    overallAccuracy += autolowAccuracy;
    countOverallAccuracy += 1;
  }
  else {
    autolowAccuracy = 0;
  }

  var teleopgearsAccuracy = finalStatisticsObject.teleop.accuracy[teleopCondition].teleop_accuracy_gears;
  if (teleopgearsAccuracy != -1) {
    overallAccuracy += teleopgearsAccuracy;
    countOverallAccuracy += 1;
  }
  else {
    teleopgearsAccuracy = 0;
  }
  var teleophighAccuracy = finalStatisticsObject.teleop.accuracy[teleopCondition].teleop_accuracy_high;
  if (teleophighAccuracy != -1) {
    overallAccuracy += teleophighAccuracy;
    countOverallAccuracy += 1;
  }
  else {
    teleophighAccuracy = 0;
  }
  var teleoplowAccuracy = finalStatisticsObject.teleop.accuracy[teleopCondition].teleop_accuracy_low;
  if (teleoplowAccuracy != -1) {
    overallAccuracy += teleoplowAccuracy;
    countOverallAccuracy += 1;
  }
  else {
    teleoplowAccuracy = 0;
  }

  if (countOverallAccuracy > 0)
    overallAccuracy = Math.ceil(overallAccuracy/countOverallAccuracy);
  else
    overallAccuracy = -1;

  // Find Overall Gears

  var overallGears = 0;
  if (finalStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score != -1) overallGears += Math.ceil(finalStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score);
  if (finalStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score != -1) overallGears += Math.ceil(finalStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score);

  // Find Overall kPa

  var overallKPA = 0;

  var overallautohigh = finalStatisticsObject.auto.average[autoCondition].high.auto_average_high_score;
  if (overallautohigh != -1) overallKPA += Math.ceil(overallautohigh);
  var overallautolow = finalStatisticsObject.auto.average[autoCondition].low.auto_average_low_score;
  if (overallautolow != -1) overallKPA += Math.floor(Math.ceil(overallautolow) / 3);

  var overallteleophigh = finalStatisticsObject.teleop.average[teleopCondition].high.teleop_average_high_score;
  if (overallteleophigh != -1) overallKPA += Math.floor(Math.ceil(overallteleophigh) / 3);
  var overallteleoplow = finalStatisticsObject.teleop.average[teleopCondition].low.teleop_average_low_score;
  if (overallteleoplow != -1) overallKPA += Math.floor(Math.ceil(overallteleoplow) / 9);

  // Find Overall Score Contribution

  var overallScore = 0;

  overallScore += Math.ceil(reachline / 100) * 5;
  overallScore += Math.ceil(climb / 100) * 50;
  overallScore += overallKPA;
  if (finalStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score != -1) overallScore += Math.ceil(finalStatisticsObject.auto.average[autoCondition].gears.auto_average_gears_score) * 20;
  if (finalStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score != -1) overallScore += Math.ceil(finalStatisticsObject.teleop.average[teleopCondition].gears.teleop_average_gears_score) * 15;

  // Assign to HTML file

  // $("#stat_overall_score").html(overallScore);
  // $("#stat_overall_accuracy").html(overallAccuracy + "%");
  // $("#stat_overall_gears").html(overallGears);
  // $("#stat_overall_kpa").html(overallKPA);

  // Push Info to Database

  finalStatisticsObject.overall[autoCondition + "--" + teleopCondition] = {
    overall_score: overallScore,
    overall_accuracy: overallAccuracy,
    overall_gears: overallGears,
    overall_kpa: overallKPA
  };

  // db.ref('statistics/' + team + '/overall/' + autoCondition + "--" + teleopCondition).set({
  //
  //   overall_score: overallScore,
  //   overall_accuracy: overallAccuracy,
  //   overall_gears: overallGears,
  //   overall_kpa: overallKPA
  //
  // }).then(finishedOverallPost());

}

function infoStatistics(snapTeamMatches) {

  var hopperdump = false;
  var fuelintake = false;
  var gearintake = false;
  var mechgear = false;

  var hopperdumpCount = 0;
  var fuelintakeCount = 0;
  var gearintakeCount = 0;
  var mechgearCount = 0;

  // var hopperdumpDescriptions = {};
  // var fuelintakeDescriptions = {};
  // var gearintakeDescriptions = {};

  snapTeamMatches.forEach(function(snapMatch){

    if (snapMatch.val().robot.system.robot_system_hopperdump == "yes") {
      hopperdump = true;
      hopperdumpCount += 1;
      //hopperdumpDescriptions[snapMatch.val().match.match_number] = snapMatch.val().robot.description.robot_description_hopperdump;
    }
    if (snapMatch.val().robot.system.robot_system_fuelintake == "yes") {
      fuelintake = true;
      fuelintakeCount += 1;
      //fuelintakeDescriptions[snapMatch.val().match.match_number] = snapMatch.val().robot.description.robot_description_fuelintake;
    }
    if (snapMatch.val().robot.system.robot_system_gearintake == "yes") {
      gearintake = true;
      gearintakeCount += 1;
      //gearintakeDescriptions[snapMatch.val().match.match_number] = snapMatch.val().robot.description.robot_description_gearintake;
    }
    if (snapMatch.val().robot.system.robot_system_mechgear == "yes") {
      mechgear = true;
      mechgearCount += 1;
    }

  });

  finalStatisticsObject.robot = {

    system: {
      robot_system_hopperdump: hopperdump,
      robot_system_fuelintake: fuelintake,
      robot_system_gearintake: gearintake,
      robot_system_mechgear: mechgear
    },
    count: {
      robot_count_hopperdump: hopperdumpCount,
      robot_count_fuelintake: fuelintakeCount,
      robot_count_gearintake: gearintakeCount,
      robot_count_mechgear: mechgearCount
    }

  };

  // db.ref('statistics/' + team + '/robot/').set({
  //
  //   system: {
  //     robot_system_hopperdump: hopperdump,
  //     robot_system_fuelintake: fuelintake,
  //     robot_system_gearintake: gearintake,
  //     robot_system_mechgear: mechgear
  //   },
  //   count: {
  //     robot_count_hopperdump: hopperdumpCount,
  //     robot_count_fuelintake: fuelintakeCount,
  //     robot_count_gearintake: gearintakeCount,
  //     robot_count_mechgear: mechgearCount
  //   }
  //   // description: {
  //   //   robot_description_hopperdump: hopperdumpDescriptions,
  //   //   robot_description_fuelintake: fuelintakeDescriptions,
  //   //   robot_description_gearintake: gearintakeDescriptions
  //   // }
  //
  // }).then(finishedPost());

}

function goalStatistics(snapTeamMatches) {

  var totalAutoReachlineYes = 0;
  var totalAutoReachlineNo = 0;

  var totalTeleopClimbSuccess = 0;
  var totalTeleopClimbFail = 0;
  var totalTeleopClimbMiss = 0;

  var counterMatches = 0;

  snapTeamMatches.forEach(function(snapMatch){

    snapMatch.val().goal.goal_reachline == "yes" ? totalAutoReachlineYes += 1 : totalAutoReachlineNo += 1;
    snapMatch.val().goal.goal_climb == "yes" ? totalTeleopClimbSuccess += 1 : (snapMatch.val().goal.goal_climb == "no" ? totalTeleopClimbFail += 1 : totalTeleopClimbMiss += 1);

    counterMatches += 1;

  });

  var accuracyAutoReachline = -1;

  if (counterMatches > 0) {
    accuracyAutoReachline = totalAutoReachlineYes / counterMatches * 100;
  }

  var accuracyTeleopClimb = -1;
  var accuracyTeleopTouchpad = -1;

  if ((totalTeleopClimbSuccess + totalTeleopClimbFail) > 0) {
    accuracyTeleopClimb = totalTeleopClimbSuccess / (totalTeleopClimbSuccess + totalTeleopClimbFail) * 100;
  }
  if (counterMatches > 0) {
    accuracyTeleopTouchpad = totalTeleopClimbSuccess / counterMatches * 100;
  }

  accuracyAutoReachline = +accuracyAutoReachline.toFixed(0);
  accuracyTeleopClimb = +accuracyTeleopClimb.toFixed(0);
  accuracyTeleopTouchpad = +accuracyTeleopTouchpad.toFixed(0);

  finalStatisticsObject.goal = {
    total: {
      goal_total_reachline_yes: totalAutoReachlineYes,
      goal_total_reachline_no: totalAutoReachlineNo,
      goal_total_climb_success: totalTeleopClimbSuccess,
      goal_total_climb_fail: totalTeleopClimbFail,
      goal_total_climb_miss: totalTeleopClimbMiss
    },
    accuracy: {
      goal_accuracy_reachline: accuracyAutoReachline,
      goal_accuracy_climb: accuracyTeleopClimb,
      goal_accuracy_touchpad: accuracyTeleopTouchpad
    }
  };

  // db.ref('statistics/' + team + '/goal/').set({
  //
  //   total: {
  //     goal_total_reachline_yes: totalAutoReachlineYes,
  //     goal_total_reachline_no: totalAutoReachlineNo,
  //     goal_total_climb_success: totalTeleopClimbSuccess,
  //     goal_total_climb_fail: totalTeleopClimbFail,
  //     goal_total_climb_miss: totalTeleopClimbMiss
  //   },
  //   accuracy: {
  //     goal_accuracy_reachline: accuracyAutoReachline,
  //     goal_accuracy_climb: accuracyTeleopClimb,
  //     goal_accuracy_touchpad: accuracyTeleopTouchpad
  //   }
  //
  // }).then(finishedPost());

}

function autoStatistics(snapTeamMatches, ghl, or, pos) {

  // Keep Maximums and Minimums

  var maxAutoGearsScore = -1;
  var maxAutoGearsMiss = -1;

  var maxAutoHighScore = -1;
  var maxAutoHighMiss = -1;

  var maxAutoLowScore = -1;
  var maxAutoLowMiss = -1;

  var minAutoGearsScore = -1;
  var minAutoGearsMiss = -1;

  var minAutoHighScore = -1;
  var minAutoHighMiss = -1;

  var minAutoLowScore = -1;
  var minAutoLowMiss = -1;

  // Keep Respective Match to Each Max/Min

  var maxMatchAutoGearsScore = 0;
  var maxMatchAutoGearsMiss = 0;

  var maxMatchAutoHighScore = 0;
  var maxMatchAutoHighMiss = 0;

  var maxMatchAutoLowScore = 0;
  var maxMatchAutoLowMiss = 0;

  var minMatchAutoGearsScore = 0;
  var minMatchAutoGearsMiss = 0;

  var minMatchAutoHighScore = 0;
  var minMatchAutoHighMiss = 0;

  var minMatchAutoLowScore = 0;
  var minMatchAutoLowMiss = 0;

  // Collect Total Values

  var totalAutoGearsScore = 0;
  var totalAutoGearsMiss = 0;

  var totalAutoHighScore = 0;
  var totalAutoHighMiss = 0;

  var totalAutoLowScore = 0;
  var totalAutoLowMiss = 0;

  var counterAutoGears = 0;

  var counterAutoHigh = 0;

  var counterAutoLow = 0;

  var counterMatches = 0;

  // Process All Matches

  snapTeamMatches.forEach(function(snapMatch){

    var checkGHL = ghl == snapMatch.val().objective.auto.objective_auto_ghl;
    if (or) {
      ghl.split('').forEach(function(objChar) {
        if (snapMatch.val().objective.auto.objective_auto_ghl.indexOf(objChar) != -1) {
          checkGHL = true;
        }
      });
    }

    if (ghl == "all") {
      or = false;
      checkGHL = true;
    }

    var checkPos = (pos == snapMatch.val().objective.auto.objective_auto_s) || (pos == "all");

    if (checkGHL && checkPos) {

      var varMatchValAutoGearsScore = 0;
      var varMatchValAutoGearsMiss = 0;

      var varMatchValAutoHighScore = 0;
      var varMatchValAutoHighMiss = 0;

      var varMatchValAutoLowScore = 0;
      var varMatchValAutoLowMiss = 0;

      if (!or || snapMatch.val().objective.auto.objective_auto_ghl.indexOf("g") != -1) {
        matchValAutoGearsScore = parseInt(snapMatch.val().auto.gears.auto_gears_score);
        matchValAutoGearsMiss = parseInt(snapMatch.val().auto.gears.auto_gears_miss);

        totalAutoGearsScore += matchValAutoGearsScore;
        totalAutoGearsMiss += matchValAutoGearsMiss;

        if (matchValAutoGearsScore > maxAutoGearsScore || maxAutoGearsScore == -1) {
          maxAutoGearsScore = matchValAutoGearsScore;
          maxMatchAutoGearsScore = snapMatch.val().match.match_number;
        }
        if (matchValAutoGearsMiss > maxAutoGearsMiss || maxAutoGearsMiss == -1) {
          maxAutoGearsMiss = matchValAutoGearsMiss;
          maxMatchAutoGearsMiss = snapMatch.val().match.match_number;
        }

        if (matchValAutoGearsScore < minAutoGearsScore || minAutoGearsScore == -1) {
          minAutoGearsScore = matchValAutoGearsScore;
          minMatchAutoGearsScore = snapMatch.val().match.match_number;
        }
        if (matchValAutoGearsMiss < minAutoGearsMiss || minAutoGearsMiss == -1) {
          minAutoGearsMiss = matchValAutoGearsMiss;
          minMatchAutoGearsMiss = snapMatch.val().match.match_number;
        }

        counterAutoGears += 1;
      }

      if (!or || snapMatch.val().objective.auto.objective_auto_ghl.indexOf("h") != -1) {
        matchValAutoHighScore = parseInt(snapMatch.val().auto.high.auto_high_score);
        matchValAutoHighMiss = parseInt(snapMatch.val().auto.high.auto_high_miss);

        totalAutoHighScore += matchValAutoHighScore;
        totalAutoHighMiss += matchValAutoHighMiss;

        if (matchValAutoHighScore > maxAutoHighScore || maxAutoHighScore == -1) {
          maxAutoHighScore = matchValAutoHighScore;
          maxMatchAutoHighScore = snapMatch.val().match.match_number;
        }
        if (matchValAutoHighMiss > maxAutoHighMiss || maxAutoHighMiss == -1) {
          maxAutoHighMiss = matchValAutoHighMiss;
          maxMatchAutoHighMiss = snapMatch.val().match.match_number;
        }

        if (matchValAutoHighScore < minAutoHighScore || minAutoHighScore == -1) {
          minAutoHighScore = matchValAutoHighScore;
          minMatchAutoHighScore = snapMatch.val().match.match_number;
        }
        if (matchValAutoHighMiss < minAutoHighMiss || minAutoHighMiss == -1) {
          minAutoHighMiss = matchValAutoHighMiss;
          minMatchAutoHighMiss = snapMatch.val().match.match_number;
        }

        counterAutoHigh += 1;
      }

      if (!or || snapMatch.val().objective.auto.objective_auto_ghl.indexOf("l") != -1) {
        matchValAutoLowScore = parseInt(snapMatch.val().auto.low.auto_low_score);
        matchValAutoLowMiss = parseInt(snapMatch.val().auto.low.auto_low_miss);

        totalAutoLowScore += matchValAutoLowScore;
        totalAutoLowMiss += matchValAutoLowMiss;

        if (matchValAutoLowScore > maxAutoLowScore || maxAutoLowScore == -1) {
          maxAutoLowScore = matchValAutoLowScore;
          maxMatchAutoLowScore = snapMatch.val().match.match_number;
        }
        if (matchValAutoLowMiss > maxAutoLowMiss || maxAutoLowMiss == -1) {
          maxAutoLowMiss = matchValAutoLowMiss;
          maxMatchAutoLowMiss = snapMatch.val().match.match_number;
        }

        if (matchValAutoLowScore < minAutoLowScore || minAutoLowScore == -1) {
          minAutoLowScore = matchValAutoLowScore;
          minMatchAutoLowScore = snapMatch.val().match.match_number;
        }
        if (matchValAutoLowMiss < minAutoLowMiss || minAutoLowMiss == -1) {
          minAutoLowMiss = matchValAutoLowMiss;
          minMatchAutoLowMiss = snapMatch.val().match.match_number;
        }

        counterAutoLow += 1;
      }
      counterMatches += 1;
    }

  });

  // Reset Max/Min Values to 0 if -1

  if(maxAutoGearsScore == -1) {maxAutoGearsScore = 0;}
  if(maxAutoGearsMiss == -1) {maxAutoGearsMiss = 0;}

  if(maxAutoHighScore == -1) {maxAutoHighScore = 0;}
  if(maxAutoHighMiss == -1) {maxAutoHighMiss = 0;}

  if(maxAutoLowScore == -1) {maxAutoLowScore = 0;}
  if(maxAutoLowMiss == -1) {maxAutoLowMiss = 0;}

  if(minAutoGearsScore == -1) {minAutoGearsScore = 0;}
  if(minAutoGearsMiss == -1) {minAutoGearsMiss = 0;}

  if(minAutoHighScore == -1) {minAutoHighScore = 0;}
  if(minAutoHighMiss == -1) {minAutoHighMiss = 0;}

  if(minAutoLowScore == -1) {minAutoLowScore = 0;}
  if(minAutoLowMiss == -1) {minAutoLowMiss = 0;}

  // Calculate Averages

  var averageAutoHighScore = -1;
  var averageAutoHighMiss = -1;

  var averageAutoLowScore = -1;
  var averageAutoLowMiss = -1;

  var averageAutoGearsScore = -1;
  var averageAutoGearsMiss = -1;

  var accuracyAutoHigh = -1;
  var accuracyAutoLow = -1;
  var accuracyAutoGears = -1;

  if (counterAutoHigh > 0) {
    averageAutoHighScore = totalAutoHighScore / counterAutoHigh;
    averageAutoHighMiss = totalAutoHighMiss / counterAutoHigh;

    (averageAutoHighScore + averageAutoHighMiss) > 0 ? accuracyAutoHigh = averageAutoHighScore/(averageAutoHighScore + averageAutoHighMiss) * 100 : -1;
  }

  if (counterAutoLow > 0) {
    averageAutoLowScore = totalAutoLowScore / counterAutoLow;
    averageAutoLowMiss = totalAutoLowMiss / counterAutoLow;

    (averageAutoLowScore + averageAutoLowMiss) > 0 ? accuracyAutoLow = averageAutoLowScore/(averageAutoLowScore + averageAutoLowMiss) * 100 : -1;
  }

  if (counterAutoGears > 0) {
    averageAutoGearsScore = totalAutoGearsScore / counterAutoGears;
    averageAutoGearsMiss = totalAutoGearsMiss / counterAutoGears;

    (averageAutoGearsScore + averageAutoGearsMiss) > 0 ? accuracyAutoGears = averageAutoGearsScore/(averageAutoGearsScore + averageAutoGearsMiss) * 100 : -1;
  }

  averageAutoHighScore = +averageAutoHighScore.toFixed(2);
  averageAutoHighMiss = +averageAutoHighMiss.toFixed(2);

  averageAutoLowScore = +averageAutoLowScore.toFixed(2);
  averageAutoLowMiss = +averageAutoLowMiss.toFixed(2);

  averageAutoGearsScore = +averageAutoGearsScore.toFixed(2);
  averageAutoGearsMiss = +averageAutoGearsMiss.toFixed(2);

  accuracyAutoHigh = +accuracyAutoHigh.toFixed(0);
  accuracyAutoLow = +accuracyAutoLow.toFixed(0);
  accuracyAutoGears = +accuracyAutoGears.toFixed(0);

  // Push Info to Database for Future Quickload

  var identifier = pos + '-' + ghl + '-' + (or ? "graball" : "selective" );

  finalStatisticsObject.auto.total[identifier] = {
    gears: {
      auto_total_gears_score: totalAutoGearsScore,
      auto_total_gears_miss: totalAutoGearsMiss
    },
    high: {
      auto_total_high_score: totalAutoHighScore,
      auto_total_high_miss: totalAutoHighMiss
    },
    low: {
      auto_total_low_score: totalAutoLowScore,
      auto_total_low_miss: totalAutoLowMiss
    }
  };
  finalStatisticsObject.auto.weight[identifier] = {
    auto_weight_gears: counterAutoGears,
    auto_weight_high: counterAutoHigh,
    auto_weight_low: counterAutoLow,
    auto_weight_matches: counterMatches
  };
  finalStatisticsObject.auto.average[identifier] = {
    gears: {
      auto_average_gears_score: averageAutoGearsScore,
      auto_average_gears_miss: averageAutoGearsMiss
    },
    high: {
      auto_average_high_score: averageAutoHighScore,
      auto_average_high_miss: averageAutoHighMiss
    },
    low: {
      auto_average_low_score: averageAutoLowScore,
      auto_average_low_miss: averageAutoLowMiss
    }
  };
  finalStatisticsObject.auto.accuracy[identifier] = {
    auto_accuracy_gears: accuracyAutoGears,
    auto_accuracy_high: accuracyAutoHigh,
    auto_accuracy_low: accuracyAutoLow
  };
  finalStatisticsObject.auto.maximum[identifier] = {
    gears: {
      auto_maximum_gears_score: maxAutoGearsScore,
      auto_maximum_gears_miss: maxAutoGearsMiss
    },
    high: {
      auto_maximum_high_score: maxAutoHighScore,
      auto_maximum_high_miss: maxAutoHighMiss
    },
    low: {
      auto_maximum_low_score: maxAutoLowScore,
      auto_maximum_low_miss: maxAutoLowMiss
    }
  };
  finalStatisticsObject.auto.maxmatch[identifier] = {
    gears: {
      auto_maxmatch_gears_score: maxMatchAutoGearsScore,
      auto_maxmatch_gears_miss: maxMatchAutoGearsMiss
    },
    high: {
      auto_maxmatch_high_score: maxMatchAutoHighScore,
      auto_maxmatch_high_miss: maxMatchAutoHighMiss
    },
    low: {
      auto_maxmatch_low_score: maxMatchAutoLowScore,
      auto_maxmatch_low_miss: maxMatchAutoLowMiss
    }
  };
  finalStatisticsObject.auto.minimum[identifier] = {
    gears: {
      auto_minimum_gears_score: minAutoGearsScore,
      auto_minimum_gears_miss: minAutoGearsMiss
    },
    high: {
      auto_minimum_high_score: minAutoHighScore,
      auto_minimum_high_miss: minAutoHighMiss
    },
    low: {
      auto_minimum_low_score: minAutoLowScore,
      auto_minimum_low_miss: minAutoLowMiss
    }
  };
  finalStatisticsObject.auto.minmatch[identifier] = {
    gears: {
      auto_minmatch_gears_score: minMatchAutoGearsScore,
      auto_minmatch_gears_miss: minMatchAutoGearsMiss
    },
    high: {
      auto_minmatch_high_score: minMatchAutoHighScore,
      auto_minmatch_high_miss: minMatchAutoHighMiss
    },
    low: {
      auto_minmatch_low_score: minMatchAutoLowScore,
      auto_minmatch_low_miss: minMatchAutoLowMiss
    }
  };

  // db.ref('statistics/' + team + '/auto/total/' + pos + '-' + ghl + "-" + (or ? "graball" : "selective" )).set({
  //
  //   gears: {
  //     auto_total_gears_score: totalAutoGearsScore,
  //     auto_total_gears_miss: totalAutoGearsMiss
  //   },
  //   high: {
  //     auto_total_high_score: totalAutoHighScore,
  //     auto_total_high_miss: totalAutoHighMiss
  //   },
  //   low: {
  //     auto_total_low_score: totalAutoLowScore,
  //     auto_total_low_miss: totalAutoLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/auto/weight/' + pos + '-' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   auto_weight_gears: counterAutoGears,
  //   auto_weight_high: counterAutoHigh,
  //   auto_weight_low: counterAutoLow,
  //   auto_weight_matches: counterMatches
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/auto/average/' + pos + '-' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     auto_average_gears_score: averageAutoGearsScore,
  //     auto_average_gears_miss: averageAutoGearsMiss
  //   },
  //   high: {
  //     auto_average_high_score: averageAutoHighScore,
  //     auto_average_high_miss: averageAutoHighMiss
  //   },
  //   low: {
  //     auto_average_low_score: averageAutoLowScore,
  //     auto_average_low_miss: averageAutoLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/auto/accuracy/' + pos + '-' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   auto_accuracy_gears: accuracyAutoGears,
  //   auto_accuracy_high: accuracyAutoHigh,
  //   auto_accuracy_low: accuracyAutoLow
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/auto/maximum/' + pos + '-' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     auto_maximum_gears_score: maxAutoGearsScore,
  //     auto_maximum_gears_miss: maxAutoGearsMiss
  //   },
  //   high: {
  //     auto_maximum_high_score: maxAutoHighScore,
  //     auto_maximum_high_miss: maxAutoHighMiss
  //   },
  //   low: {
  //     auto_maximum_low_score: maxAutoLowScore,
  //     auto_maximum_low_miss: maxAutoLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/auto/maxmatch/' + pos + '-' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     auto_maxmatch_gears_score: maxMatchAutoGearsScore,
  //     auto_maxmatch_gears_miss: maxMatchAutoGearsMiss
  //   },
  //   high: {
  //     auto_maxmatch_high_score: maxMatchAutoHighScore,
  //     auto_maxmatch_high_miss: maxMatchAutoHighMiss
  //   },
  //   low: {
  //     auto_maxmatch_low_score: maxMatchAutoLowScore,
  //     auto_maxmatch_low_miss: maxMatchAutoLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/auto/minimum/' + pos + '-' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     auto_minimum_gears_score: minAutoGearsScore,
  //     auto_minimum_gears_miss: minAutoGearsMiss
  //   },
  //   high: {
  //     auto_minimum_high_score: minAutoHighScore,
  //     auto_minimum_high_miss: minAutoHighMiss
  //   },
  //   low: {
  //     auto_minimum_low_score: minAutoLowScore,
  //     auto_minimum_low_miss: minAutoLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/auto/minmatch/' + pos + '-' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     auto_minmatch_gears_score: minMatchAutoGearsScore,
  //     auto_minmatch_gears_miss: minMatchAutoGearsMiss
  //   },
  //   high: {
  //     auto_minmatch_high_score: minMatchAutoHighScore,
  //     auto_minmatch_high_miss: minMatchAutoHighMiss
  //   },
  //   low: {
  //     auto_minmatch_low_score: minMatchAutoLowScore,
  //     auto_minmatch_low_miss: minMatchAutoLowMiss
  //   }
  //
  // }).then(finishedPost());

}

function teleopStatistics(snapTeamMatches, ghl, or) {

  // Keep Maximums and Minimums

  var maxTeleopGearsScore = -1;
  var maxTeleopGearsMiss = -1;

  var maxTeleopHighScore = -1;
  var maxTeleopHighMiss = -1;

  var maxTeleopLowScore = -1;
  var maxTeleopLowMiss = -1;

  var minTeleopGearsScore = -1;
  var minTeleopGearsMiss = -1;

  var minTeleopHighScore = -1;
  var minTeleopHighMiss = -1;

  var minTeleopLowScore = -1;
  var minTeleopLowMiss = -1;

  // Keep Respective Match to Each Max/Min

  var maxMatchTeleopGearsScore = 0;
  var maxMatchTeleopGearsMiss = 0;

  var maxMatchTeleopHighScore = 0;
  var maxMatchTeleopHighMiss = 0;

  var maxMatchTeleopLowScore = 0;
  var maxMatchTeleopLowMiss = 0;

  var minMatchTeleopGearsScore = 0;
  var minMatchTeleopGearsMiss = 0;

  var minMatchTeleopHighScore = 0;
  var minMatchTeleopHighMiss = 0;

  var minMatchTeleopLowScore = 0;
  var minMatchTeleopLowMiss = 0;

  // Collect Total Values

  var totalTeleopGearsScore = 0;
  var totalTeleopGearsMiss = 0;

  var totalTeleopHighScore = 0;
  var totalTeleopHighMiss = 0;

  var totalTeleopLowScore = 0;
  var totalTeleopLowMiss = 0;

  var counterTeleopGears = 0;

  var counterTeleopHigh = 0;

  var counterTeleopLow = 0;

  var counterMatches = 0;

  // Process All Matches

  snapTeamMatches.forEach(function(snapMatch){

    var checkGHL = ghl == snapMatch.val().objective.teleop.objective_teleop_ghl;
    if (or) {
      ghl.split('').forEach(function(objChar) {
        if (snapMatch.val().objective.teleop.objective_teleop_ghl.indexOf(objChar) != -1) {
          checkGHL = true;
        }
      });
    }

    if (ghl == "all"){
      or = false;
      checkGHL = true;
    }

    if (checkGHL) {

      var varMatchValTeleopGearsScore = 0;
      var varMatchValTeleopGearsMiss = 0;

      var varMatchValTeleopHighScore = 0;
      var varMatchValTeleopHighMiss = 0;

      var varMatchValTeleopLowScore = 0;
      var varMatchValTeleopLowMiss = 0;

      if (!or || snapMatch.val().objective.teleop.objective_teleop_ghl.indexOf("g") != -1) {
        matchValTeleopGearsScore = parseInt(snapMatch.val().teleop.gears.teleop_gears_score);
        matchValTeleopGearsMiss = parseInt(snapMatch.val().teleop.gears.teleop_gears_miss);

        totalTeleopGearsScore += matchValTeleopGearsScore;
        totalTeleopGearsMiss += matchValTeleopGearsMiss;

        if (matchValTeleopGearsScore > maxTeleopGearsScore || maxTeleopGearsScore == -1) {
          maxTeleopGearsScore = matchValTeleopGearsScore;
          maxMatchTeleopGearsScore = snapMatch.val().match.match_number;
        }
        if (matchValTeleopGearsMiss > maxTeleopGearsMiss || maxTeleopGearsMiss == -1) {
          maxTeleopGearsMiss = matchValTeleopGearsMiss;
          maxMatchTeleopGearsMiss = snapMatch.val().match.match_number;
        }

        if (matchValTeleopGearsScore < minTeleopGearsScore || minTeleopGearsScore == -1) {
          minTeleopGearsScore = matchValTeleopGearsScore;
          minMatchTeleopGearsScore = snapMatch.val().match.match_number;
        }
        if (matchValTeleopGearsMiss < minTeleopGearsMiss || minTeleopGearsMiss == -1) {
          minTeleopGearsMiss = matchValTeleopGearsMiss;
          minMatchTeleopGearsMiss = snapMatch.val().match.match_number;
        }

        counterTeleopGears += 1;
      }

      if (!or || snapMatch.val().objective.teleop.objective_teleop_ghl.indexOf("h") != -1) {
        matchValTeleopHighScore = parseInt(snapMatch.val().teleop.high.teleop_high_score);
        matchValTeleopHighMiss = parseInt(snapMatch.val().teleop.high.teleop_high_miss);

        totalTeleopHighScore += matchValTeleopHighScore;
        totalTeleopHighMiss += matchValTeleopHighMiss;

        if (matchValTeleopHighScore > maxTeleopHighScore || maxTeleopHighScore == -1) {
          maxTeleopHighScore = matchValTeleopHighScore;
          maxMatchTeleopHighScore = snapMatch.val().match.match_number;
        }
        if (matchValTeleopHighMiss > maxTeleopHighMiss || maxTeleopHighMiss == -1) {
          maxTeleopHighMiss = matchValTeleopHighMiss;
          maxMatchTeleopHighMiss = snapMatch.val().match.match_number;
        }

        if (matchValTeleopHighScore < minTeleopHighScore || minTeleopHighScore == -1) {
          minTeleopHighScore = matchValTeleopHighScore;
          minMatchTeleopHighScore = snapMatch.val().match.match_number;
        }
        if (matchValTeleopHighMiss < minTeleopHighMiss || minTeleopHighMiss == -1) {
          minTeleopHighMiss = matchValTeleopHighMiss;
          minMatchTeleopHighMiss = snapMatch.val().match.match_number;
        }

        counterTeleopHigh += 1;
      }

      if (!or || snapMatch.val().objective.teleop.objective_teleop_ghl.indexOf("l") != -1) {
        matchValTeleopLowScore = parseInt(snapMatch.val().teleop.low.teleop_low_score);
        matchValTeleopLowMiss = parseInt(snapMatch.val().teleop.low.teleop_low_miss);

        totalTeleopLowScore += matchValTeleopLowScore;
        totalTeleopLowMiss += matchValTeleopLowMiss;

        if (matchValTeleopLowScore > maxTeleopLowScore || maxTeleopLowScore == -1) {
          maxTeleopLowScore = matchValTeleopLowScore;
          maxMatchTeleopLowScore = snapMatch.val().match.match_number;
        }
        if (matchValTeleopLowMiss > maxTeleopLowMiss || maxTeleopLowMiss == -1) {
          maxTeleopLowMiss = matchValTeleopLowMiss;
          maxMatchTeleopLowMiss = snapMatch.val().match.match_number;
        }

        if (matchValTeleopLowScore < minTeleopLowScore || minTeleopLowScore == -1) {
          minTeleopLowScore = matchValTeleopLowScore;
          minMatchTeleopLowScore = snapMatch.val().match.match_number;
        }
        if (matchValTeleopLowMiss < minTeleopLowMiss || minTeleopLowMiss == -1) {
          minTeleopLowMiss = matchValTeleopLowMiss;
          minMatchTeleopLowMiss = snapMatch.val().match.match_number;
        }


        counterTeleopLow += 1;
      }
      counterMatches += 1;
    }

  });

  // Reset Max/Min Values to 0 if -1

  if(maxTeleopGearsScore == -1) {maxTeleopGearsScore = 0;}
  if(maxTeleopGearsMiss == -1) {maxTeleopGearsMiss = 0;}

  if(maxTeleopHighScore == -1) {maxTeleopHighScore = 0;}
  if(maxTeleopHighMiss == -1) {maxTeleopHighMiss = 0;}

  if(maxTeleopLowScore == -1) {maxTeleopLowScore = 0;}
  if(maxTeleopLowMiss == -1) {maxTeleopLowMiss = 0;}

  if(minTeleopGearsScore == -1) {minTeleopGearsScore = 0;}
  if(minTeleopGearsMiss == -1) {minTeleopGearsMiss = 0;}

  if(minTeleopHighScore == -1) {minTeleopHighScore = 0;}
  if(minTeleopHighMiss == -1) {minTeleopHighMiss = 0;}

  if(minTeleopLowScore == -1) {minTeleopLowScore = 0;}
  if(minTeleopLowMiss == -1) {minTeleopLowMiss = 0;}

  // Calculate Statistics

  var averageTeleopHighScore = -1;
  var averageTeleopHighMiss = -1;

  var averageTeleopLowScore = -1;
  var averageTeleopLowMiss = -1;

  var averageTeleopGearsScore = -1;
  var averageTeleopGearsMiss = -1;

  var accuracyTeleopHigh = -1;
  var accuracyTeleopLow = -1;
  var accuracyTeleopGears = -1;

  if (counterTeleopHigh > 0) {
    averageTeleopHighScore = totalTeleopHighScore / counterTeleopHigh;
    averageTeleopHighMiss = totalTeleopHighMiss / counterTeleopHigh;

    (averageTeleopHighScore + averageTeleopHighMiss) > 0 ? accuracyTeleopHigh = averageTeleopHighScore/(averageTeleopHighScore + averageTeleopHighMiss) * 100 : -1;
  }

  if (counterTeleopLow > 0) {
    averageTeleopLowScore = totalTeleopLowScore / counterTeleopLow;
    averageTeleopLowMiss = totalTeleopLowMiss / counterTeleopLow;

    (averageTeleopLowScore + averageTeleopLowMiss) > 0 ? accuracyTeleopLow = averageTeleopLowScore/(averageTeleopLowScore + averageTeleopLowMiss) * 100 : -1;
  }

  if (counterTeleopGears > 0) {
    averageTeleopGearsScore = totalTeleopGearsScore / counterTeleopGears;
    averageTeleopGearsMiss = totalTeleopGearsMiss / counterTeleopGears;

    (averageTeleopGearsScore + averageTeleopGearsMiss) > 0 ? accuracyTeleopGears = averageTeleopGearsScore/(averageTeleopGearsScore + averageTeleopGearsMiss) * 100 : -1;
  }

  averageTeleopHighScore = +averageTeleopHighScore.toFixed(2);
  averageTeleopHighMiss = +averageTeleopHighMiss.toFixed(2);

  averageTeleopLowScore = +averageTeleopLowScore.toFixed(2);
  averageTeleopLowMiss = +averageTeleopLowMiss.toFixed(2);

  averageTeleopGearsScore = +averageTeleopGearsScore.toFixed(2);
  averageTeleopGearsMiss = +averageTeleopGearsMiss.toFixed(2);

  accuracyTeleopHigh = +accuracyTeleopHigh.toFixed(0);
  accuracyTeleopLow = +accuracyTeleopLow.toFixed(0);
  accuracyTeleopGears = +accuracyTeleopGears.toFixed(0);

  // Push Info to Database for Future Quickload

  var identifier = ghl + '-' + (or ? "graball" : "selective" );

  finalStatisticsObject.teleop.total[identifier] = {
    gears: {
      teleop_total_gears_score: totalTeleopGearsScore,
      teleop_total_gears_miss: totalTeleopGearsMiss
    },
    high: {
      teleop_total_high_score: totalTeleopHighScore,
      teleop_total_high_miss: totalTeleopHighMiss
    },
    low: {
      teleop_total_low_score: totalTeleopLowScore,
      teleop_total_low_miss: totalTeleopLowMiss
    }
  };
  finalStatisticsObject.teleop.weight[identifier] = {
    teleop_weight_gears: counterTeleopGears,
    teleop_weight_high: counterTeleopHigh,
    teleop_weight_low: counterTeleopLow,
    teleop_weight_matches: counterMatches
  };
  finalStatisticsObject.teleop.average[identifier] = {
    gears: {
      teleop_average_gears_score: averageTeleopGearsScore,
      teleop_average_gears_miss: averageTeleopGearsMiss
    },
    high: {
      teleop_average_high_score: averageTeleopHighScore,
      teleop_average_high_miss: averageTeleopHighMiss
    },
    low: {
      teleop_average_low_score: averageTeleopLowScore,
      teleop_average_low_miss: averageTeleopLowMiss
    }
  };
  finalStatisticsObject.teleop.accuracy[identifier] = {
    teleop_accuracy_gears: accuracyTeleopGears,
    teleop_accuracy_high: accuracyTeleopHigh,
    teleop_accuracy_low: accuracyTeleopLow
  };
  finalStatisticsObject.teleop.maximum[identifier] = {
    gears: {
      teleop_maximum_gears_score: maxTeleopGearsScore,
      teleop_maximum_gears_miss: maxTeleopGearsMiss
    },
    high: {
      teleop_maximum_high_score: maxTeleopHighScore,
      teleop_maximum_high_miss: maxTeleopHighMiss
    },
    low: {
      teleop_maximum_low_score: maxTeleopLowScore,
      teleop_maximum_low_miss: maxTeleopLowMiss
    }
  };
  finalStatisticsObject.teleop.maxmatch[identifier] = {
    gears: {
      teleop_maxmatch_gears_score: maxMatchTeleopGearsScore,
      teleop_maxmatch_gears_miss: maxMatchTeleopGearsMiss
    },
    high: {
      teleop_maxmatch_high_score: maxMatchTeleopHighScore,
      teleop_maxmatch_high_miss: maxMatchTeleopHighMiss
    },
    low: {
      teleop_maxmatch_low_score: maxMatchTeleopLowScore,
      teleop_maxmatch_low_miss: maxMatchTeleopLowMiss
    }
  };
  finalStatisticsObject.teleop.minimum[identifier] = {
    gears: {
      teleop_minimum_gears_score: minTeleopGearsScore,
      teleop_minimum_gears_miss: minTeleopGearsMiss
    },
    high: {
      teleop_minimum_high_score: minTeleopHighScore,
      teleop_minimum_high_miss: minTeleopHighMiss
    },
    low: {
      teleop_minimum_low_score: minTeleopLowScore,
      teleop_minimum_low_miss: minTeleopLowMiss
    }
  };
  finalStatisticsObject.teleop.minmatch[identifier] = {
    gears: {
      teleop_minmatch_gears_score: minMatchTeleopGearsScore,
      teleop_minmatch_gears_miss: minMatchTeleopGearsMiss
    },
    high: {
      teleop_minmatch_high_score: minMatchTeleopHighScore,
      teleop_minmatch_high_miss: minMatchTeleopHighMiss
    },
    low: {
      teleop_minmatch_low_score: minMatchTeleopLowScore,
      teleop_minmatch_low_miss: minMatchTeleopLowMiss
    }
  };

  // db.ref('statistics/' + team + '/teleop/total/' + ghl + "-" + (or ? "graball" : "selective" )).set({
  //
  //   gears: {
  //     teleop_total_gears_score: totalTeleopGearsScore,
  //     teleop_total_gears_miss: totalTeleopGearsMiss
  //   },
  //   high: {
  //     teleop_total_high_score: totalTeleopHighScore,
  //     teleop_total_high_miss: totalTeleopHighMiss
  //   },
  //   low: {
  //     teleop_total_low_score: totalTeleopLowScore,
  //     teleop_total_low_miss: totalTeleopLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/teleop/weight/' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   teleop_weight_gears: counterTeleopGears,
  //   teleop_weight_high: counterTeleopHigh,
  //   teleop_weight_low: counterTeleopLow,
  //   teleop_weight_matches: counterMatches
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/teleop/average/' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     teleop_average_gears_score: averageTeleopGearsScore,
  //     teleop_average_gears_miss: averageTeleopGearsMiss
  //   },
  //   high: {
  //     teleop_average_high_score: averageTeleopHighScore,
  //     teleop_average_high_miss: averageTeleopHighMiss
  //   },
  //   low: {
  //     teleop_average_low_score: averageTeleopLowScore,
  //     teleop_average_low_miss: averageTeleopLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/teleop/accuracy/' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   teleop_accuracy_gears: accuracyTeleopGears,
  //   teleop_accuracy_high: accuracyTeleopHigh,
  //   teleop_accuracy_low: accuracyTeleopLow
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/teleop/maximum/' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     teleop_maximum_gears_score: maxTeleopGearsScore,
  //     teleop_maximum_gears_miss: maxTeleopGearsMiss
  //   },
  //   high: {
  //     teleop_maximum_high_score: maxTeleopHighScore,
  //     teleop_maximum_high_miss: maxTeleopHighMiss
  //   },
  //   low: {
  //     teleop_maximum_low_score: maxTeleopLowScore,
  //     teleop_maximum_low_miss: maxTeleopLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/teleop/maxmatch/' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     teleop_maxmatch_gears_score: maxMatchTeleopGearsScore,
  //     teleop_maxmatch_gears_miss: maxMatchTeleopGearsMiss
  //   },
  //   high: {
  //     teleop_maxmatch_high_score: maxMatchTeleopHighScore,
  //     teleop_maxmatch_high_miss: maxMatchTeleopHighMiss
  //   },
  //   low: {
  //     teleop_maxmatch_low_score: maxMatchTeleopLowScore,
  //     teleop_maxmatch_low_miss: maxMatchTeleopLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/teleop/minimum/' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     teleop_minimum_gears_score: minTeleopGearsScore,
  //     teleop_minimum_gears_miss: minTeleopGearsMiss
  //   },
  //   high: {
  //     teleop_minimum_high_score: minTeleopHighScore,
  //     teleop_minimum_high_miss: minTeleopHighMiss
  //   },
  //   low: {
  //     teleop_minimum_low_score: minTeleopLowScore,
  //     teleop_minimum_low_miss: minTeleopLowMiss
  //   }
  //
  // }).then(finishedPost());
  // db.ref('statistics/' + team + '/teleop/minmatch/' + ghl + '-' + (or ? 'graball' : 'selective')).set({
  //
  //   gears: {
  //     teleop_minmatch_gears_score: minMatchTeleopGearsScore,
  //     teleop_minmatch_gears_miss: minMatchTeleopGearsMiss
  //   },
  //   high: {
  //     teleop_minmatch_high_score: minMatchTeleopHighScore,
  //     teleop_minmatch_high_miss: minMatchTeleopHighMiss
  //   },
  //   low: {
  //     teleop_minmatch_low_score: minMatchTeleopLowScore,
  //     teleop_minmatch_low_miss: minMatchTeleopLowMiss
  //   }
  //
  // }).then(finishedPost());

}
// TODO: add defense bot to statistics?
