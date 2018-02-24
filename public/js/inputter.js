const db = firebase.database().ref('allteams/');

var team = 0;

var matchNumber = 0;
var valKey = [];

// var counter = 0;
function enterTeam() {

    const teamText = document.getElementById('team-header');
    team = document.getElementById('team').value;
    teamText.innerText = "Current team: " + team;

    const matchnumberText = document.getElementById('matchnumber-header');
    matchnumberText.innerText = "Match number: " + document.getElementById('matchnumber').value;

    document.getElementById('team-input').style.display = "none";
    document.getElementById('content-input').style.display = "";

    db.child(team + '/match-count').once('value').then(function(snap) {
        if (snap.val() != null) {
            matchNumber = snap.val() + 1;
        } else {
            matchNumber = 1;
        }
    });

}

function submitData() {

    document.getElementById('content-input').style.display = "none";
    document.getElementById('uploading-wait').style.display = "";

    if (team == 0 || team == null || team == "") {
        console.log("Team is null.");
        failDataUpload('matchdata-loading', "Match data upload failed.");
        failDataUpload('matchinfo-loading', "Match data upload failed.");
        return;
    }

    db.child(team + '/match-count').once('value').then(function(snap) {

        if (snap.val() != null) {
            matchNumber = snap.val() + 1;
        } else {
            matchNumber = 1;
        }
        updateDatabase();

    });

}

function finishReset() {
    window.location.reload(false);
}

function failDataUpload(id, message) {

    const dataAlert = document.getElementById(id);
    dataAlert.setAttribute("class", "alert alert-danger");
    dataAlert.innerText = message;

    const icon = document.createElement('span');
    icon.setAttribute("class", "glyphicon glyphicon-remove pull-right");
    dataAlert.appendChild(icon);

}

function successDataUpload(id, message) {

    const dataAlert = document.getElementById(id);
    dataAlert.setAttribute("class", "alert alert-success");
    dataAlert.innerText = message;

    const icon = document.createElement('span');
    icon.setAttribute("class", "glyphicon glyphicon-ok pull-right");
    dataAlert.appendChild(icon);

}

function updateDatabase() {

    var matchString = 'match' + parseInt(matchNumber);

    var updateCount = {};
    updateCount['match-count'] = matchNumber;
    db.child(team).update(updateCount);

    try {

        db.child(team + '/matches/' + matchString).set({
            starting_position: document.getElementById('position').value,
            auto_baseline: document.querySelector('input[name="baseline"]:checked').value,
            auto_switch: document.querySelector('input[name="auto_switch"]:checked').value,
            auto_scale: document.querySelector('input[name="auto_scale"]:checked').value,
            teleop_switch_success: document.getElementById('teleop_switch_success').value,
            teleop_switch_fail: document.getElementById('teleop_switch_fail').value,
            teleop_scale_success: document.getElementById('teleop_scale_success').value,
            teleop_scale_fail: document.getElementById('teleop_scale_fail').value,
            teleop_opp_switch_success: document.getElementById('teleop_opp_switch_success').value,
            teleop_opp_switch_fail: document.getElementById('teleop_opp_switch_fail').value,
            teleop_vault: document.getElementById('teleop_vault').value,
            offense: document.getElementById('offense').checked,
            defense: document.getElementById('defense').checked,
            climb: document.querySelector('input[name="climb"]:checked').value,
            boost: document.getElementById('boost').checked,
            force: document.getElementById('force').checked,
            levitate: document.getElementById('levitate').checked,
            powerup_times: document.getElementById('powerup_time').value,
            disconnects: document.getElementById('dcs').value,
            team_number: document.getElementById('team').value,
            match_number: document.getElementById('matchnumber').value,
            scouter: document.getElementById('scouter').value,
            comment: document.getElementById('comment').value
        }).then(function(done) {
            console.log("Successfully uploaded data to allteams/" + team + "/matches/" + matchString);
            successDataUpload('matchdata-loading', "Match data upload succeeded!");
        });

    } catch (err) {
        failDataUpload('matchdata-loading', "Match data upload failed.");
        console.log("Match data upload failed /matches/");
    }

    if (document.getElementById('comment').value == "" || document.getElementById('comment').value == null) {
        document.getElementById('comment').value = "-";
    }

    try {
        db.child(team + '/matches-info/' + matchString).set({
            number: document.getElementById('matchnumber').value,
            scouter: document.getElementById('scouter').value,
            comment: document.getElementById('comment').value
        }).then(function(done) {
            console.log("Successfully uploaded data to allteams/" + team + "/matches-info/" + matchString);
            successDataUpload('matchinfo-loading', "Match info upload succeeded!");
        });
    } catch (err) {
        failDataUpload('matchinfo-loading', "Match data upload failed.");
        console.log("Match data upload failed /matches-info/");
    } 

    firebase.database().ref().child('teamlist/' + team).set(1);

    console.log("Team " + team + " added to teamlist.");

    var query = firebase.database().ref("rawdata").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            console.log("UP: " + key);
            valKey.push(key);
            console.log("valkey in fetch: " + valKey);
        });
        console.log("length: " + valKey.length);
        var keys = valKey.length;
        console.log("key: " + keys);
        RawData(keys);
    });
}

function RawData(keys) {
    firebase.database().ref().child('rawdata/' + keys).set({
        starting_position: document.getElementById('position').value,
        auto_baseline: document.querySelector('input[name="baseline"]:checked').value,
        auto_switch: document.querySelector('input[name="auto_switch"]:checked').value,
        auto_scale: document.querySelector('input[name="auto_scale"]:checked').value,
        teleop_switch_success: document.getElementById('teleop_switch_success').value,
        teleop_switch_fail: document.getElementById('teleop_switch_fail').value,
        teleop_scale_success: document.getElementById('teleop_scale_success').value,
        teleop_scale_fail: document.getElementById('teleop_scale_fail').value,
        teleop_opp_switch_success: document.getElementById('teleop_opp_switch_success').value,
        teleop_opp_switch_fail: document.getElementById('teleop_opp_switch_fail').value,
        teleop_vault: document.getElementById('teleop_vault').value,
        offense: document.getElementById('offense').checked,
        defense: document.getElementById('defense').checked,
        climb: document.querySelector('input[name="climb"]:checked').value,
        boost: document.getElementById('boost').checked,
        force: document.getElementById('force').checked,
        levitate: document.getElementById('levitate').checked,
        powerup_times: document.getElementById('powerup_time').value,
        disconnects: document.getElementById('dcs').value,
        team_number: document.getElementById('team').value,
        match_number: document.getElementById('matchnumber').value,
        scouter: document.getElementById('scouter').value,
        comment: document.getElementById('comment').value
    })
}
//document.querySelector('input[name="genderS"]:checked').value;