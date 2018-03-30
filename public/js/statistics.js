var data = {};

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
    console.log(data)
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

// function removeOutliers(dataset) {
//     dataset = dataset.sort(sortNumber);
//     var data = dataset
//     done = false
//     while (!done) {
//         var set = analyzeSet(dataset)
//         var furthestMin = Math.abs(Math.min.apply(null, data) - set[2])
//         var furthestMax = Math.abs(Math.max.apply(null, data) - set[2])
//         var toRemove = 0;
//         var diff = 1.5 * set[1]
//         if (furthestMax > furthestMin) {
//             toRemove = (furthestMax)
//         } else if (furthestMax <= furthestMin) {
//             toRemove = (furthestMin)
//         }
//         if (Math.abs(toRemove - set[2]) > diff) {
//             var index = data.indexOf(toRemove)
//             data.splice(index, 1);
//         } else {
//             done = true
//         }
//     }
//     return data
// }

function sortNumber(a, b) {
    return a - b;
}

function pushToStats(team) {
    console.log(data.team_number);
    console.log(data.auto_switch_success);
    $('#uploading').html("");
    firebase.database().ref('statistics/').child(team).set({
        team: team,
        average_auto_switch_success: analyzeSet(data.auto_switch_success)[2],
        average_auto_scale_success: analyzeSet(data.auto_scale_success)[2],
        average_teleop_switch_success: analyzeSet(data.teleop_switch_success)[2],
        average_teleop_scale_success: analyzeSet(data.teleop_scale_success)[2],
        average_teleop_opp_switch_success: analyzeSet(data.teleop_opp_switch_success)[2],
        average_teleop_vault: analyzeSet(data.teleop_vault)[2]
    }).then(function(done) {
        console.log("Successfully uploaded stats to statistics/" + team);
        $("#uploading").show();
        $('#uploading').html($('#uploading').html() + "<br>Successfully uploaded " + team + " to statistics.");
        setTimeout(function() {
            $("#uploading").hide();
        }, 750);
    });
}