const db = firebase.database().ref('pitdata/');
const storageRef = firebase.storage().ref();
const teamsDir = storageRef.child('teams/');
var teams = []


$(document).ready(function() {
    teams = ["188", "610", "772", "1285", "1305", "1325", "1334", "2013", "2056", "2200", "2386", "2702", "2706", "2852", "3161", "3683", "4343", "4476", "4618", "4678", "4814", "4903", "4914", "4936", "5036", "5426", "5834", "6140", "6141", "6331", "6336", "6378", "6544", "6856", "6864", "6867", "6875", "6917", "6978", "7329", ""]

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
        $("#teamCheck").html("Team " + $('#team').val() + " isn't in the Science Division");
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
        $('#uploading').html($('#uploading').html() + "<br>The team you entered is not attending the Science Division.");
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