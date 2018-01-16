function allLoadComplete() {
  refreshRankings();
}

function refreshRankings() {
  if (!statisticsReady)
    return;
  if (!(($('input[name="options-auto-g"]:checked').val() != "" || $('input[name="options-auto-h"]:checked').val() != "" || $('input[name="options-auto-l"]:checked').val() != "") && ($('input[name="options-teleop-g"]:checked').val() != "" || $('input[name="options-teleop-h"]:checked').val() != "" || $('input[name="options-teleop-l"]:checked').val() != "")))
    return;

  fancyLabels();
  $("#rank-list").html(" ");

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

  var sortRank = $('option[name="selectrank-stat"]:checked').val();
  var sortRankSplit = sortRank.split("_");
  var statisticDirectory = "";

  if (sortRankSplit[0] == "overall") {
    statisticDirectory = 'overall/' + autoCondition + '--' + teleopCondition + '/' + sortRank;
  }
  else if (sortRankSplit[0] == "goal") {
    statisticDirectory = 'goal/accuracy/' + sortRank;
  }
  else if (sortRankSplit[0] == "auto") {
    if (sortRankSplit[1] == "accuracy") {
      statisticDirectory = 'auto/accuracy/' + autoCondition + '/' + sortRank;
    }
    else {
      statisticDirectory = 'auto/' + sortRankSplit[1] + '/' + autoCondition + '/' + sortRankSplit[2] + '/' + sortRank;
    }
  }
  else if (sortRankSplit[0] == "teleop") {
    if (sortRankSplit[1] == "accuracy") {
      statisticDirectory = 'teleop/accuracy/' + teleopCondition + '/' + sortRank;
    }
    else {
      statisticDirectory = 'teleop/' + sortRankSplit[1] + '/' + teleopCondition + '/' + sortRankSplit[2] + '/' + sortRank;
    }
  }

  db.ref('teamlist').once('value').then(function(listSnap){

    var rankList = {};
    var counter = 0;

    listSnap.forEach(function(team){

      db.ref('statistics/' + team.key + '/' + statisticDirectory).once('value').then(function(statSnap){
        counter += 1;
        id = 'team' + team.key;
        rankList[id] = statSnap.val();
        if (counter >= listSnap.numChildren()){
          outputRanks(rankList);
        }
      })

    });

  });

}

function outputRanks(rankList) {

  // Create items array
  var sortedRankList = Object.keys(rankList).map(function(key) {
      return [key, rankList[key]];
  });

  // Sort the array based on the second element
  sortedRankList.sort(function(first, second) {
      return second[1] - first[1];
  });

  sortedRankList.forEach(function(entry){
    $("#rank-list").append('<li class="list-group-item col-xs-6">' + entry[0].slice(4) + '</li>');
    $("#rank-list").append('<li class="list-group-item col-xs-6">' + (entry[1] != null ? entry[1] : "null") + '</li>');
  });

}

function fancyLabels() {

  $("#rank-header").html("Ranked By: " + $('option[name="selectrank-stat"]:checked').html());

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

  var teleopDisplay = "";
  $('input[name="options-teleop-and"]:checked').val() == "selective" ? teleopDisplay += "Selective" : teleopDisplay += "Inclusive";
  $('input[name="options-teleop-g"]:checked').val() == "g" ? teleopDisplay += " Gears" : teleopDisplay += "";
  $('input[name="options-teleop-h"]:checked').val() == "h" ? teleopDisplay += " High" : teleopDisplay += "";
  $('input[name="options-teleop-l"]:checked').val() == "l" ? teleopDisplay += " Low" : teleopDisplay += "";

  if ($('input[name="options-viewall"]:checked').val() == "yes") {
    autoDisplay = "Full Auto Statistics";
    teleopDisplay = "Full Teleop Statistics";
  }

  $("#autocondition-header").html("Auto: " + autoDisplay);
  $("#teleopcondition-header").html("Teleop: " + teleopDisplay);


}
