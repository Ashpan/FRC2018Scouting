
var team = 0;

function loadHistory() {
  $(document).ready(function(){

    team = $("#team").val();

    $("#team-input").hide();
    $("#content").show();

    $("#team-header").html("Team: " + team);
    db.ref('matchcounter/' + team).once('value').then(function(snapMatchCount){
      $("#matchcount-header").html("Matches Played: " + snapMatchCount.val());
    });

    refreshHistory();

  })
}

function refreshHistory() {
  $(document).ready(function(){

    var pickGraphStat = $('option[name="selectgraph-stat"]:checked').val();
    var pickGraphSplit = pickGraphStat.split("_");

    db.ref('matches/' + team).once('value').then(function(snapTeamMatches){

      if (pickGraphStat == "goal_reachline") {

        var matchNumbers = [];
        var goalValues = [];

        snapTeamMatches.forEach(function(snapMatch) {

          snapMatch.val().goal.goal_reachline == "yes" ? goalValues.push(1) : goalValues.push(0);
          matchNumbers.push(snapMatch.val().match.match_number);

        });
        fillChartSingle("Auto Mobility (Yes = 1, No = 0)", "rgba(50, 0, 0, 1)", matchNumbers, goalValues);
      }
      else if (pickGraphStat == "goal_climb") {

        var matchNumbers = [];
        var goalValues = [];

        snapTeamMatches.forEach(function(snapMatch) {

          snapMatch.val().goal.goal_climb == "yes" ? goalValues.push(2) : (snapMatch.val().goal.goal_climb == "no" ? goalValues.push(0) : goalValues.push(1));
          matchNumbers.push(snapMatch.val().match.match_number);

        });
        fillChartSingle("Climb (Success = 2, Fail = 0, No Attempt = 1)", "rgba(0, 50, 0, 1)", matchNumbers, goalValues);
      }
      else {

        var matchNumbers = [];
        var goalValues = [];
        var secondGoalValues = []

        snapTeamMatches.forEach(function(snapMatch) {

          goalValues.push(snapMatch.val()[pickGraphSplit[0]][pickGraphSplit[1]][pickGraphStat + '_score']);
          secondGoalValues.push(snapMatch.val()[pickGraphSplit[0]][pickGraphSplit[1]][pickGraphStat + '_miss']);
          matchNumbers.push(snapMatch.val().match.match_number);

        });

        fillChartDouble(capitalizeFirstLetter(pickGraphSplit[0]) + " " + capitalizeFirstLetter(pickGraphSplit[1]) + " Score", capitalizeFirstLetter(pickGraphSplit[0]) + " " + capitalizeFirstLetter(pickGraphSplit[1]) + " Miss", "rgba(10, 10, 10, 1)", "rgba(170, 170, 170, 1)", matchNumbers, goalValues, secondGoalValues);

      }

    });

  })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fillChartSingle(mainLabel, lineColour, matchNumberLabels, matchValues) {

  var historyChart = new Chart($("#historyChart"), {
      type: 'line',
      data: {
          labels: matchNumberLabels,
          datasets: [
            {
              type: 'line',
              label: mainLabel,
              data: matchValues,
              fill: false,
              borderColor: lineColour,
              borderWidth: 2,
              pointBorderColor: lineColour,
              pointBackgroundColor: lineColour,
              pointRadius: 4
            }
          ]
      },
      options: {
          scales: {
              yAxes: [{
                ticks: {
                    beginAtZero:true
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Match Numbers'
                }
              }]
          },
          elements: {
            line: {
              tension: 0
            }
          }
      }
  });

}

function fillChartDouble(labelOne, labelTwo, lineColourOne, lineColourTwo, matchNumberLabels, matchValuesOne, matchValuesTwo) {

  var historyChart = new Chart($("#historyChart"), {
      type: 'line',
      data: {
          labels: matchNumberLabels,
          datasets: [
            {
              type: 'line',
              label: labelOne,
              data: matchValuesOne,
              fill: false,
              borderColor: lineColourOne,
              borderWidth: 2,
              pointBorderColor: lineColourOne,
              pointBackgroundColor: lineColourOne,
              pointRadius: 4
            },
            {
              type: 'line',
              label: labelTwo,
              data: matchValuesTwo,
              fill: false,
              borderColor: lineColourTwo,
              borderWidth: 2,
              pointBorderColor: lineColourTwo,
              pointBackgroundColor: lineColourTwo,
              pointRadius: 4
            }
          ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Match Numbers'
                }
              }]
          },
          elements: {
            line: {
              tension: 0
            }
          }
      }
  });

}
