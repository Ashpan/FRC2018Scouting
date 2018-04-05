const db = firebase.database().ref('pitdata/');
const storageRef = firebase.storage().ref();
const teamsDir = storageRef.child('teams/');
var teams = []


$(document).ready(function() {
    teams = ["188", "1241", "1325", "1334", "1374", "2056", "2200", "2386", "2609", "2935", "3161", "3560", "3571", "3683", "4039", "4069", "4308", "4519", "4618", "4902", "4932", "4976", "4992", "5406", "5409", "5699", "5776", "5921", "6070", "6130", "6135", "6323", "6339", "6342", "6461", "6537", "6632", "6878", ""]

    $("input[type=file]").change(function() {
        var fieldVal = $(this).val();
        // Change the node's value by removing the fake path (Chrome)
        fieldVal = fieldVal.replace("C:\\fakepath\\", "");
        if (fieldVal != undefined || fieldVal != "") {
            $(this).next(".custom-file-label").text(fieldVal);
        }

    });
});


function submitData() {
    $('#uploading').html("");
    if (inputVerification()) {
        updateDatabase();
    }
}

function validTeam() {
    if (!(teams.includes($('#team').val()))) {
        $("#teamCheck").html("Team " + $('#team').val() + " isn't at McMaster");
    } else if ((teams.includes($('#team').val())) || ($('#team').val() == "")) {
        $("#teamCheck").html("");
    }
}

function inputVerification() {

    var check = true;
    if (isNaN(parseInt($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a team number as an integer.");
        check = false;
    }
    if (!(teams.includes($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>The team you entered is not attending McMaster.");
        check = false;
    }
    return check;
}

function updateDatabase() {
    var teamPhoto = document.getElementById('teamPhoto').files[0];
    var team = $('#team').val();
    // updateCount['match-count'] = matchNumber;
    db.child(team).set({
            switch_capable: $('label#switch.active').attr('value'),
            scale_capable: $('label#scale.active').attr('value'),
            comments: $('#comment').val(),
        })
        .then(function(done) {
            console.log("Successfully uploaded data to pitdata/" + team);
            storageRef.child('teams/' + team).put(teamPhoto).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
                location.reload();
            });
        });


    if (document.getElementById('comment').value === "" || document.getElementById('comment').value === null) {
        document.getElementById('comment').value = "-";
    }


}