const db = firebase.database().ref('pitdata/');
const storageRef = firebase.storage().ref();
const teamsDir = storageRef.child('teams/');
var teams = []


$(document).ready(function() {
    teams = ["58", "67", "303", "447", "555", "612", "694", "868", "870", "894", "1114", "1218", "1259", "1262", "1322", "1325", "1493", "1559", "1660", "1756", "1923", "2016", "2075", "2081", "2177", "2200", "2202", "2220", "2228", "2377", "2549", "2620", "2830", "3381", "3618", "3620", "3656", "3767", "3928", "4003", "4011", "4096", "4237", "4392", "4521", "4541", "4557", "4776", "4786", "4909", "5216", "5407", "5413", "5422", "5436", "5531", "5674", "5724", "5913", "6121", "6237", "6328", "6329", "6860", "6875", "6968", "7160", "7329", ""]
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
        $("#teamCheck").html("Team " + $('#team').val() + " isn't in the Archimedes Division");
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
        $('#uploading').html($('#uploading').html() + "<br>The team you entered is not attending the Archimedes Division.");
        check = false;
    }
    return check;
}

function updateDatabase() {
    var teamPhoto = document.getElementById('teamPhoto').files[0];
    var team = $('#team').val();
    db.child(team).set(1)
    console.log("Successfully uploaded data to pitdata/" + team);
    if (!(document.getElementById('teamPhoto').files[0] == null)) {
        console.log(true);
        storageRef.child('teams/' + team).put(teamPhoto).then(function(snapshot) {
            console.log('Uploaded picture of ' + team + '!');
        });
    }
    setTimeout(function() {
        location.reload();
    }, 5000);
    // updateCount['match-count'] = matchNumber;
    // db.child(team).set({
    //         switch_capable: $('label#switch.active').attr('value'),
    //         scale_capable: $('label#scale.active').attr('value'),
    //         comments: $('#comment').val(),
    //     })
    // .then(function(done) {
    // });


}