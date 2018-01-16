var team = 0;

const totalCapabilities = 2;

function enterTeam(){

  team = $("#team").val()

  $('#team-input').hide();
  $('#content-input').show();

  db.ref('specifications/' + team).once('value').then(function(snapSpecs){

    $("#team-header").html("Current Team: " + team);

    $("#specs_weight").val(snapSpecs.val().specs_weight);
    $("#specs_length").val(snapSpecs.val().specs_length);
    $("#specs_width").val(snapSpecs.val().specs_width);
    $("#specs_height").val(snapSpecs.val().specs_height);
    $("#comment").val(snapSpecs.val().specs_comment);

    var capabilities = snapSpecs.val().specs_capabilities.split(", ");

    for(var i in capabilities) {
      var n = $('input[value="' + capabilities[i] + '"]').attr("name");
      $('input[name=' + n + ']').prop('checked', false);

      $('input[value="' + capabilities[i] + '"]').prop('checked', true);
    }

  });

}

function submitData() {

  $('#content-input').hide();
  $('#uploading-wait').show();

  if (team == 0 || team == null || team == "") {
    failDataUpload('upload-specs', "Invalid team..");
    failDataUpload('upload-image', "Invalid team.")
    return;
  }

  updateDatabase();
  uploadFile();

}

function finishReset() {
  window.location.reload(false);
}

function successDataUpload(id, message) {
  $("#" + id).attr("class", "alert alert-success");
  $("#" + id).html(message + '<span class="glyphicon glyphicon-ok pull-right"></span>');
}

function failDataUpload(id, message) {
  $("#" + id).attr("class", "alert alert-danger");
  $("#" + id).html(message + '<span class="glyphicon glyphicon-remove pull-right"></span>');
}

function uploadFile() {
  var file = document.getElementById('robot-upload').files[0];

  if (file != null) {
    var robotImageRef = storageRef.child(team + '.jpg');
    robotImageRef.put(file).then(function(){successDataUpload('upload-image', "Image upload succeeded!");});
  }
  else {
    failDataUpload('upload-image', "No image from user.");
  }
}

function updateDatabase() {

  if ($("#comment").val() == "" || $("#comment").val() == null) {
    $("#comment").val("-");
  }

  var robotCapabilities = "";

  for(var i = 1; i <= totalCapabilities; i++) {
    var addedString = $('input[name="specs_capabilities_' + i + '"]:checked').val();
    if (addedString != "" && i > 1 && robotCapabilities != "") {
      robotCapabilities += ", "
    }
    robotCapabilities += addedString;
  }

  if (robotCapabilities == "") {
    robotCapabilities = "-";
  }

  db.ref('/specifications/' + team).set({
    specs_weight: $("#specs_weight").val(),
    specs_length: $("#specs_length").val(),
    specs_width: $("#specs_width").val(),
    specs_height: $("#specs_height").val(),
    specs_comment: $("#comment").val(),
    specs_capabilities: robotCapabilities
  }).then(function(){successDataUpload('upload-specs', "Data upload succeeded!");});

  // db.ref('teamlist/' + team).set(1).then(function(){successDataUpload('upload-teamlist', "Team added to list.");});

}
