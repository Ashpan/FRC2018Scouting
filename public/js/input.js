function finishReset() {
  window.location.reload(false);
}

$(document).ready(function(){

  $('input[name^="objective"]').click(function(){
    var targetInputField = "#input_" + $(this).attr("name");
    if ($(this).val() != ""){
      $(targetInputField).show();
    }
    else {
      $(targetInputField).hide();
    }
  });

  // $('input[name^="robot"]').click(function(){
  //   var targetInputField = "#input_" + $(this).attr("name");
  //   if ($(this).val() != "no"){
  //     $(targetInputField).show();
  //   }
  //   else {
  //     $(targetInputField).hide();
  //   }
  // });

})


function submitData() {

  $(document).ready(function() {

    $("#uploading").show();
    $("#machine").hide();

    var team = $("#team").val();
    db.ref('matchcounter/' + team).once('value').then(function(dbsnapMatchCount){
      var matchCount = 1;
      if (dbsnapMatchCount.val() != null){matchCount = dbsnapMatchCount.val() + 1;}

      var matchString = 'match';
      if (matchCount < 10) {matchString += '0' + matchCount;}
      else {matchString += matchCount;}

      var updateCount = {};
      updateCount[team] = matchCount;

      db.ref('matchcounter').update(updateCount).then(function(){successDataUpload('upload-count', "Match count updated.");});

      db.ref('teamlist/' + team).set(1).then(function(){successDataUpload('upload-teamlist', "Team added to list.");});

      db.ref('statisticsupdate/' + team).set(false).then(function(){successDataUpload('upload-statisticsupdate', "Statistics update check completed.");});

      db.ref('matches/' + team + '/' + matchString).set({
        match: {
          match_number: $('#match').val(),
          match_scouter: $('#scouter').val() != "" ? $('#scouter').val() : "-",
          match_comment: $('#comment').val() != "" ? $('#comment').val() : "-"
        },

        auto: {
          gears: {
            auto_gears_miss: $('#auto_gears_miss').val() != "" ? $('#auto_gears_miss').val() : "0",
            auto_gears_score: $('#auto_gears_score').val() != "" ? $('#auto_gears_score').val() : "0"
          },
          high: {
            auto_high_miss: $('#auto_high_miss').val() != "" ? $('#auto_high_miss').val() : "0",
            auto_high_score: $('#auto_high_score').val() != "" ? $('#auto_high_score').val() : "0"
          },
          low: {
            auto_low_miss: $('#auto_low_miss').val() != "" ? $('#auto_low_miss').val() : "0",
            auto_low_score: $('#auto_low_score').val() != "" ? $('#auto_low_score').val() : "0"
          }
        },

        teleop: {
          gears: {
            teleop_gears_miss: $('#teleop_gears_miss').val() != "" ? $('#teleop_gears_miss').val() : "0",
            teleop_gears_score: $('#teleop_gears_score').val() != "" ? $('#teleop_gears_score').val() : "0"
          },
          high: {
            teleop_high_miss: $('#teleop_high_miss').val() != "" ? $('#teleop_high_miss').val() : "0",
            teleop_high_score: $('#teleop_high_score').val() != "" ? $('#teleop_high_score').val() : "0"
          },
          low: {
            teleop_low_miss: $('#teleop_low_miss').val() != "" ? $('#teleop_low_miss').val() : "0",
            teleop_low_score: $('#teleop_low_score').val() != "" ? $('#teleop_low_score').val() : "0"
          }
        },

        goal: {
          goal_reachline: $('input[name="auto_reachline"]:checked').val(),
          goal_climb: $('input[name="teleop_climb"]:checked').val()
        },

        robot: {
          system: {
            robot_system_hopperdump: $('input[name="robot_system_hopperdump"]:checked').val(),
            robot_system_fuelintake: $('input[name="robot_system_fuelintake"]:checked').val(),
            robot_system_gearintake: $('input[name="robot_system_gearintake"]:checked').val(),
            robot_system_mechgear: $('input[name="robot_system_mechgear"]:checked').val()
          }
          // description: {
          //   robot_description_hopperdump: $('#robot_description_hopperdump').val(),
          //   robot_description_fuelintake: $('#robot_description_fuelintake').val(),
          //   robot_description_gearintake: $('#robot_description_gearintake').val()
          // }
        },

        objective: {
          auto: {
            objective_auto_ghl: $('input[name="objective_auto_g"]:checked').val() + $('input[name="objective_auto_h"]:checked').val() + $('input[name="objective_auto_l"]:checked').val(),
            objective_auto_s: $('input[name="objective_auto_s"]:checked').val()
          },
          teleop: {
            objective_teleop_ghl: $('input[name="objective_teleop_g"]:checked').val() + $('input[name="objective_teleop_h"]:checked').val() + $('input[name="objective_teleop_l"]:checked').val(),
            objective_teleop_d: $('input[name="_objective_teleop_d"]:checked').val()
          }
        }

      }).then(function(){successDataUpload('upload-data', "Match data uploaded.")});

    });

  })

}

function successDataUpload(id, message) {
  $("#" + id).attr("class", "alert alert-success");
  $("#" + id).html(message + '<span class="glyphicon glyphicon-ok pull-right"></span>');
}

function failDataUpload(id, message) {
  $("#" + id).attr("class", "alert alert-danger");
  $("#" + id).html(message + '<span class="glyphicon glyphicon-remove pull-right"></span>');
}
