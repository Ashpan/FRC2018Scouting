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

    if (typeof $('label#position.active').attr('value') === "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for starting position.");
        check = false;
    }
    if (typeof $('input[name="climb"]:checked').val() === "undefined") {
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
        match_scouter: $('#scouter').val() === "" ? "-" : $('#scouter').val(),
        match_comment: $('#comment').val() === "" ? "-" : $('#comment').val(),
        match_disconnect: $('#dcs').val() === "" ? "-" : $('#dcs').val(),
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


    if (document.getElementById('climb_other').value === "" || document.getElementById('climb_other').value === null) {
        document.getElementById('climb_other').value = "-";
    }

    if (document.getElementById('comment').value === "" || document.getElementById('comment').value === null) {
        document.getElementById('comment').value = "-";
    }

    if (document.getElementById('dcs').value === "" || document.getElementById('dcs').value === null) {
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

    fetchTBAInfo(newKey);


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
        console.log('published data to /rawdata/' + keys)
        window.location.href = '/html/inputter2.html';

    });
}

function fetchTBAInfo(newKey) {
    console.log('testing');
    var request = new XMLHttpRequest();
    const year = '2018';
    const event = 'onbar';
    var match = $('#matchnumber').val();
    const api = 'https://www.thebluealliance.com/api/v3/match/' + year + event + '_qm' + match + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
    var switch_cycle = 'none';
    var scale_cycle = 'none';
    var baseline = '';
    var starting_position = $('label#position.active').attr('value');
    var team = $('#team').val();
    request.open('GET', api, true);
    request.onload = function() {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        var plate_assignment = data.score_breakdown.blue.tba_gameData;
        
//      Figure out the alliance of team
        if(data.alliances.blue.team_keys.indexOf("frc" + team) >= 0){
            var alliance = 'blue' + (data.alliances.blue.team_keys.indexOf("frc" + team)+1);
        }else if(data.alliances.red.team_keys.indexOf("frc" + team) >= 0){
            var alliance = 'red' + (data.alliances.red.team_keys.indexOf("frc" + team)+1);
        }
        if(alliance === 'blue1'){
            if(data.score_breakdown.blue.autoRobot1 === 'AutoRun'){baseline = 'yes'}
            else if(data.score_breakdown.blue.autoRobot1 === 'None'){baseline = 'no'}
        }else if(alliance === 'blue2'){
            if(data.score_breakdown.blue.autoRobot1 === 'AutoRun'){baseline = 'yes'}
            else if(data.score_breakdown.blue.autoRobot1 === 'None'){baseline = 'no'}
        }else if(alliance === 'blue3'){
            if(data.score_breakdown.blue.autoRobot1 === 'AutoRun'){baseline = 'yes'}
            else if(data.score_breakdown.blue.autoRobot1 === 'None'){baseline = 'no'}
        }else if(alliance === 'red1'){
            if(data.score_breakdown.blue.autoRobot1 === 'AutoRun'){baseline = 'yes'}
            else if(data.score_breakdown.blue.autoRobot1 === 'None'){baseline = 'no'}
        }else if(alliance === 'red2'){
            if(data.score_breakdown.blue.autoRobot1 === 'AutoRun'){baseline = 'yes'}
            else if(data.score_breakdown.blue.autoRobot1 === 'None'){baseline = 'no'}
        }else if(alliance === 'red3'){
            if(data.score_breakdown.blue.autoRobot1 === 'AutoRun'){baseline = 'yes'}
            else if(data.score_breakdown.blue.autoRobot1 === 'None'){baseline = 'no'}
        }

        if (request.status >= 200 && request.status < 400) {
            if ($('#auto_switch_success').val() > 0) {
                if ((starting_position === 'right' && plate_assignment.charAt(0) === 'R') || (starting_position === 'left' && plate_assignment.charAt(0) === 'L')) {
                    switch_cycle = 'close';
                } else if (starting_position === 'center') {
                    switch_cycle = 'center';
                } else if ((starting_position === 'right' && plate_assignment.charAt(0) === 'L') || (starting_position === 'left' && plate_assignment.charAt(0) === 'R')) {
                    switch_cycle = 'far';
                }
            }
            if ($('#auto_scale_success').val() > 0) {
                if ((starting_position === 'right' && plate_assignment.charAt(1) === 'R') || (starting_position === 'left' && plate_assignment.charAt(1) === 'L')) {
                    scale_cycle = 'close';
                } else if (starting_position === 'center') {
                    scale_cycle = 'center';
                } else if ((starting_position === 'right' && plate_assignment.charAt(1) === 'L') || (starting_position === 'left' && plate_assignment.charAt(1) === 'R')) {
                    scale_cycle = 'far';
                }

            }
        db.child(team + '/matches/' + newKey).update({
        auto_switch_cycle: switch_cycle,
        auto_scale_cycle: scale_cycle,
        auto_baseline: baseline
        }).then(function(done) {
        console.log("Successfully uploaded cycles to allteams/" + team + "/matches/" + newKey + "/");
    });
        console.log('switch cycle ' + switch_cycle);
        console.log('scale cycle ' + scale_cycle);
        console.log('baseline ' + baseline);
    } else {
        console.log('error');
    }
}

request.send();

}