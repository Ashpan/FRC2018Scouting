// const functions = require('firebase-functions');

// exports.populateStats = functions.database
// 	.ref('/allteams/{userId}')
// 	.onWrite(event => {
// 		const object = event.data.val()
// 		var team = event.data.key
// 		console.log('key: ' + team)
// 		retrieveData(team);
// 	})




// var data = {};

// function retrieveData(team) {
// 	console.log(team);
//     functions.database.ref("allteams/" + team).on('value', function(snap) {
//         if (snap.exists()) {
//             data = {};
//             snap.forEach(function(matchsnap) {
//                 parseMatch(matchsnap, team);
//             });
//         } else {
//             console.log("Failed to retrieve data for team: " + team + "<br>Please check your internet connection and if the team exists in the database.");
//         }
//     });
// }

// function parseMatch(matchsnap, team) {
//     matchsnap.forEach(function(infosnap) {
//         if (typeof data[infosnap.key] === "undefined") {
//             data[infosnap.key] = [];
//         }
//         data[infosnap.key].push(infosnap.val());
//     });
//     console.log(data);
//     pushToStats(team);
// }

// function analyzeSet(dataset) {
//     var median = math.median(dataset);
//     // split the data by the median
//     var firstHalf = dataset.filter(function(f) {
//         return f <= median
//     });
//     var secondHalf = dataset.filter(function(f) {
//         return f >= median
//     });
//     // find the medians for each split
//     var q1 = math.median(firstHalf);
//     var q3 = math.median(secondHalf);
//     var IQR = q3 - q1;
//     var mean = math.mean(dataset);
//     var stdev = math.std(dataset);
//     var range = Math.max(...dataset) - Math.min(...dataset);
//     return [median, IQR.toFixed(1), mean.toFixed(2), stdev.toFixed(2), range];
// }

// function pushToStats(team) {
//     $('#uploading').html("");
//     return functions.database.ref('statistics/').child(team).set({
//         team: team,
//         average_auto_switch_success: analyzeSet(data.auto_switch_success)[0],
//         average_auto_scale_success: analyzeSet(data.auto_scale_success)[0],
//         average_teleop_switch_success: analyzeSet(data.teleop_switch_success)[0],
//         average_teleop_scale_success: analyzeSet(data.teleop_scale_success)[0],
//         average_teleop_opp_switch_success: analyzeSet(data.teleop_opp_switch_success)[0],
//         average_teleop_vault: analyzeSet(data.teleop_vault)[0]
//     }).then(function(done) {
//         console.log("Successfully uploaded stats to statistics/" + team);
//         $("#uploading").show();
//         $('#uploading').html($('#uploading').html() + "<br>Successfully uploaded " + team + " to statistics.");
//         setTimeout(function(){
//             $("#uploading").hide();
//         }, 750); 
//         return true
//     });
// }