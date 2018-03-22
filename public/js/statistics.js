var data = {};

function tbaBaseline(){
    var match = $('#matchnumber').val();
    const api = 'https://www.thebluealliance.com/api/v3/match/' + year + event + '_qm' + match + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
    var switch_cycle = 'none';
    var scale_cycle = 'none';
    var baseline = '-';
    var starting_position = $('label#position.active').attr('value');
    var team = $('#team').val();
    request.open('GET', api, true);
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        var plate_assignment = data.score_breakdown.blue.tba_gameData;
        console.log('Accessing data from tba at: ' + api);
        console.log("Plate assignment: " + plate_assignment);
}
request.send();
}
function fetchStats() {
    var query = firebase.database().ref("allteams").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var team = parseInt(childSnapshot.key);
            retrieveData(team);
        });
    });
}

function retrieveData(team) {
	console.log(team);
    firebase.database().ref("allteams/" + team).on('value', function(snap) {
        if (snap.exists()) {
            data = {};
            snap.forEach(function(matchsnap) {
                parseMatch(matchsnap, team);
            });
        } else {
            console.log("Failed to retrieve data for team: " + team + "<br>Please check your internet connection and if the team exists in the database.");
        }
    });
}

function parseMatch(matchsnap, team) {
    matchsnap.forEach(function(infosnap) {
        if (typeof data[infosnap.key] == "undefined") {
            data[infosnap.key] = [];
        }
        data[infosnap.key].push(infosnap.val());
    });
    console.log(data);
    pushToStats(team);
}

function analyzeSet(dataset) {
    var median = math.median(dataset);
    // split the data by the median
    var firstHalf = dataset.filter(function(f) {
        return f <= median
    });
    var secondHalf = dataset.filter(function(f) {
        return f >= median
    });
    // find the medians for each split
    var q1 = math.median(firstHalf);
    var q3 = math.median(secondHalf);
    var IQR = q3 - q1;
    var mean = math.mean(dataset);
    var stdev = math.std(dataset);
    var range = Math.max(...dataset) - Math.min(...dataset);
    return [median, IQR.toFixed(1), mean.toFixed(2), stdev.toFixed(2), range];
}

function pushToStats(team) {
    $('#uploading').html("");
    firebase.database().ref('statistics/').child(team).set({
        team: team,
        average_auto_switch_success: analyzeSet(data.auto_switch_success)[0],
        average_auto_scale_success: analyzeSet(data.auto_scale_success)[0],
        average_teleop_switch_success: analyzeSet(data.teleop_switch_success)[0],
        average_teleop_scale_success: analyzeSet(data.teleop_scale_success)[0],
        average_teleop_opp_switch_success: analyzeSet(data.teleop_opp_switch_success)[0],
        average_teleop_vault: analyzeSet(data.teleop_vault)[0]
    }).then(function(done) {
        console.log("Successfully uploaded stats to statistics/" + team);
        $("#uploading").show();
        $('#uploading').html($('#uploading').html() + "<br>Successfully uploaded " + team + " to statistics.");
        setTimeout(function(){
            $("#uploading").hide();
        }, 750); 
    });
}

function BlueAllianceBaselineMatchKey(team) {
    var key
    firebase.database().ref('/allteams/' + team).on('child_added', function(snap) {
        key = snap.key;
        firebase.database().ref('/allteams/').child(team + '/' + key).update({
            // auto_baseline: 
        });
    });
    // firebase.database().ref('allteams/').child(team).orderByKey().once("value").then(function(snapshot){
    //     snapshot.forEach(function(childSnapshot){
    //     key = childSnapshot.key;
    //     console.log(key);
    //     })
    // });


    // firebase.database().ref('allteams/').child(team).set({
    //     team: team,
    //     average_auto_switch_success: analyzeSet(data.auto_switch_success)[0],
    //     average_auto_scale_success: analyzeSet(data.auto_scale_success)[0],
    //     average_teleop_switch_success: analyzeSet(data.teleop_switch_success)[0],
    //     average_teleop_scale_success: analyzeSet(data.teleop_scale_success)[0],
    //     average_teleop_opp_switch_success: analyzeSet(data.teleop_opp_switch_success)[0],
    //     average_teleop_vault: analyzeSet(data.teleop_vault)[0]
    // }).then(function(done) {
    //     console.log("Successfully uploaded stats to statistics/" + team);
    //     $("#uploading").show();
    //     $('#uploading').html($('#uploading').html() + "<br>Successfully uploaded " + team + " to statistics.");
    //     setTimeout(function(){
    //         $("#uploading").hide();
    //     }, 750); 
    // });
}