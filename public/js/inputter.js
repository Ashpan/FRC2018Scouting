const db = firebase.database().ref('allteams/');


var matchNumber = 0;
var valKey = [];
var matchArray = [];

// var counter = 0;
function submitData() {

    $('#uploading').html("");

    if (inputVerification()) {

        pushData();

    }

}

function inputVerification() {

    var check = true;

    if (isNaN(parseInt($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a team number as an integer.");
        check = false;
    }

    if (isNaN(parseInt($('#matchnumber').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a match number as an integer.");
        check = false;
    }

    if (typeof $('label#position.active').attr('value') == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for starting position.");
        check = false;
    }
    if (typeof $('input[name="climb"]:checked').val() == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for climb.");
        check = false;
    }
    return check;
}

function pushData() {

    var team = $('#team').val();

    $('#uploading').html($('#uploading').html() + "<br>Uploading...");
    var newKey = db.push().key;
    db.child(team + '/matches-info/' + newKey).set({
        match_number: $('#matchnumber').val(),
        match_scouter: $('#scouter').val() == "" ? "-" : $('#scouter').val(),
        match_comment: $('#comment').val() == "" ? "-" : $('#comment').val(),
        match_disconnect: $('#dcs').val() == "" ? "-" : $('#dcs').val(),
        match_startpos: $('label#position.active').attr('value'),

    }).then(function(done) {
        $('#uploading').html($('#uploading').html() + "<br>Done publishing data!");
    });
    updateDatabase(newKey);
}

function updateDatabase(newKey) {

    var team = $('#team').val();
    var updateCount = {};
    updateCount['match-count'] = matchNumber;
    db.child(team).update(updateCount);

        db.child(team + '/matches/' + newKey).set({
            starting_position: $('label#position.active').attr('value'),
            auto_baseline: $('label#baseline.active').attr('value'),
            auto_switch_success: $('#auto_switch_success').val(),
            auto_switch_fail: $('#auto_switch_fail').val(),
            auto_scale_success: $('#auto_scale_success').val(),
            auto_scale_fail: $('#auto_scale_fail').val(),
            teleop_switch_success: $('#teleop_switch_success').val(),
            teleop_switch_fail: $('#teleop_switch_fail').val(),
            teleop_scale_success: $('#teleop_scale_success').val(),
            teleop_scale_fail: $('#teleop_scale_fail').val(),
            teleop_opp_switch_success: $('#teleop_opp_switch_success').val(),
            teleop_opp_switch_fail: $('#teleop_opp_switch_fail').val(),
            teleop_vault: $('#teleop_vault').val(),
            offense: $('label#offense.active').attr('value'),
            defense: $('label#defense.active').attr('value'),
            climb: document.querySelector('input[name="climb"]:checked').value,
            climb_notes: $('#climb_other').val(),
            team_number: $('#team').val(),
            match_number: $('#matchnumber').val(),
            scouter: $('#scouter').val(),
            comment: $('#comment').val()
        }).then(function(done) {
            console.log("Successfully uploaded data to allteams/" + team + "/matches/" + newKey);
        });


    if (document.getElementById('climb_other').value == "" || document.getElementById('climb_other').value == null) {
        document.getElementById('climb_other').value = "-";
    }

    if (document.getElementById('comment').value == "" || document.getElementById('comment').value == null) {
        document.getElementById('comment').value = "-";
    }

    if (document.getElementById('dcs').value == "" || document.getElementById('dcs').value == null) {
        document.getElementById('dcs').value = "-";
    }

    firebase.database().ref().child('teamlist/' + team).set(1);

    console.log("Team " + team + " added to teamlist.");

    var counter = firebase.database().ref('allteams/' + team + '/matches/').orderByKey();
    counter.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var list_of_matches = childSnapshot.key;
            matchArray.push(list_of_matches);
        });
        var length_of_matches = matchArray.length;
        firebase.database().ref().child('allteams/' + team + '/match-count').set(length_of_matches);
    });

    var query = firebase.database().ref("rawdata").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            valKey.push(key);
        });
        var keys = valKey.length;
        RawData(keys);
    });
}

function RawData(keys) {
    firebase.database().ref().child('rawdata/' + keys).set({
        starting_position: $('label#position.active').attr('value'),
            auto_baseline: $('label#baseline.active').attr('value'),
            auto_switch_success: $('#auto_switch_success').val(),
            auto_switch_fail: $('#auto_switch_fail').val(),
            auto_scale_success: $('#auto_scale_success').val(),
            auto_scale_fail: $('#auto_scale_fail').val(),
            teleop_switch_success: $('#teleop_switch_success').val(),
            teleop_switch_fail: $('#teleop_switch_fail').val(),
            teleop_scale_success: $('#teleop_scale_success').val(),
            teleop_scale_fail: $('#teleop_scale_fail').val(),
            teleop_opp_switch_success: $('#teleop_opp_switch_success').val(),
            teleop_opp_switch_fail: $('#teleop_opp_switch_fail').val(),
            teleop_vault: $('#teleop_vault').val(),
            offense: $('label#offense.active').attr('value'),
            defense: $('label#defense.active').attr('value'),
            climb: document.querySelector('input[name="climb"]:checked').value,
            climb_notes: $('#climb_other').val(),
            team_number: $('#team').val(),
            match_number: $('#matchnumber').val(),
            scouter: $('#scouter').val(),
            comment: $('#comment').val()
    }).then(function(done){
        window.location.href = '/html/inputter2.html';

    });
}