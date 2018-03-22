const db = firebase.database();

$(document).ready(function() {

var teams = ["188", "746", "771", "854", "907", "919", "1075", "1310", "1325", "1360", "4001", "4343", "4618", "4939", "4946", "4976", "5031", "5036", "5428", "5519", "5699", "5776", "5921", "6009", "6135", "6140", "6141", "6397", "6513", "6564", "6632", "6867", "6975", "7013", "7136", "7329"]
    $("#team").autocomplete({
        source: teams
    });

  hideAll();

  $("#section-stats").show();

  $("button[id^=tab]").click(function() {

    hideAll();

    $("#section-" + $(this).attr("id")).show();
    $("#menu").text($(this).text());

  });

});

function hideAll() {
  $("#section-tab-stats").hide();
  $("#section-tab-statsgraphs").hide();
  $("#section-tab-matches").hide();
  $("#section-tab-matchesgraphs").hide();
  $("#section-tab-insights").hide();
}

var team = 0;

var data = {};

function loadTeam() {

  if (isNaN(parseInt($("#team").val()))) {
    $("#alerts").text("Please enter a valid team number.");
    return;
  }

  team = parseInt($("#team").val());

  retrieveData();
}

function retrieveData() {
  db.ref("allteams/" + team).on('value', function(snap){

    if (snap.exists()) {

      $("#alerts").html("Viewing data for team: " + team);
      console.log("Viewing data for team: " + team);
      data = {};

      snap.forEach(function(matchsnap) {
        parseMatch(matchsnap);
      });

      // Matches have been retrieved
      populateStats();
      populateMatchHistory();

    }
    else {

      $("#alerts").html("Failed to retrieve data for team: " + team + "<br>Please check your internet connection and if the team exists in the database.");

    }

  });
}

function parseMatch(matchsnap) {

  matchsnap.forEach(function(infosnap) {

    if (typeof data[infosnap.key] == "undefined") {
      data[infosnap.key] = [];
    }

    data[infosnap.key].push(infosnap.val());

  });

}