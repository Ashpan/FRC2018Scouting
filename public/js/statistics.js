var data = {};


function fetchStats() {
    var query = firebase.database().ref("statistics").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var team = parseInt(childSnapshot.key);
            var pls = retrieveData(team);
            console.log(pls);
            console.log('retrieving data');
            console.log(data);
            pushToStats(team);
            console.log('pushing to stats');
        });
    });
}

function retrieveData(team) {
    firebase.database().ref("allteams/" + team).on('value', function(snap) {
        if (snap.exists()) {
            data = {};
            snap.forEach(function(matchsnap) {
                parseMatch(matchsnap);
            });
        } else {
            console.log("Failed to retrieve data for team: " + team + "<br>Please check your internet connection and if the team exists in the database.");
        }
    }).then(function(done){
    	return true;
    });
}

function parseMatch(matchsnap) {
    matchsnap.forEach(function(infosnap) {
        if (typeof data[infosnap.key] == "undefined") {
            data[infosnap.key] = [];
        }
        data[infosnap.key].push(infosnap.val());
    });
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
    firebase.database().ref('statistics/').child(team).set({
        average_auto_switch_success: analyzeSet(data.auto_switch_success)[0],
        average_auto_scale_success: analyzeSet(data.auto_scale_success)[0],
        average_teleop_switch_success: analyzeSet(data.teleop_switch_success)[0],
        average_teleop_scale_success: analyzeSet(data.teleop_scale_success)[0],
        average_teleop_opp_switch_success: analyzeSet(data.teleop_opp_switch_success)[0],
        average_teleop_vault: analyzeSet(data.teleop_vault)[0]
    }).then(function(done) {
        console.log("Successfully uploaded stats to statistics/" + team);
    });
}