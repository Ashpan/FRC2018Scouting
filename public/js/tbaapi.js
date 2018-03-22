// // https://www.thebluealliance.com/api/v3/team/frc1325/event/2018onbar/matches/keys
// var request = new XMLHttpRequest();
// const year = '2018';
// const event = 'onbar';

// function fetchMatches(){
// matches(1325, cleanMatchArray);
// }

// function matches(team, callback) {
//     const api = 'https://www.thebluealliance.com/api/v3/team/frc' + team + '/event/' + year + event + '/matches/keys' + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
//     var json;
//     request.open('GET', api, true);
//     request.onreadystatechange = function() {
//         if (request.readyState == 4 && request.status == 200) {
//             if (typeof callback === "function") {
//                 json = JSON.parse(this.responseText);
//                 callback.apply(json);
//             }
//         }
//     };
//     request.send();
// }

// function cleanMatchArray() {
//     var matchArray = [];
//     for (var i = 0; i < this.length; i++) {
//         if (this[i].startsWith(year + event + '_qm')) {
//             matchArray.push(this[i].substring(12));
//         }
//     }
//     console.log(matchArray);
// }


// function fetchTBAInfo(team, match) {
//     const api = 'https://www.thebluealliance.com/api/v3/match/' + year + event + '_qm' + match + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
//     var baseline = '-';
//     request.open('GET', api, true);
//     request.onload = function() {
//         // Begin accessing JSON data here
//         var data = JSON.parse(this.response);
//         console.log('Accessing data from tba at: ' + api);
//         //      Figure out the alliance of team
//         if (data.alliances.blue.team_keys.indexOf("frc" + team) >= 0) {
//             var alliance = 'blue' + (data.alliances.blue.team_keys.indexOf("frc" + team) + 1);
//         } else if (data.alliances.red.team_keys.indexOf("frc" + team) >= 0) {
//             var alliance = 'red' + (data.alliances.red.team_keys.indexOf("frc" + team) + 1);
//         }
//         if (alliance === 'blue1') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'blue2') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'blue3') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'red1') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'red2') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         } else if (alliance === 'red3') {
//             if (data.score_breakdown.blue.autoRobot1 === 'AutoRun') {
//                 baseline = 1;
//             } else if (data.score_breakdown.blue.autoRobot1 === 'None') {
//                 baseline = 0;
//             }
//         }
//         if (request.status >= 200 && request.status < 400) {
//             db.child(team + '/' + newKey).update({
//                         auto_switch_cycle: switch_cycle,
//                         auto_scale_cycle: scale_cycle,
//                         auto_baseline: baseline,
//                         plate_assignment: plate_assignment,
//                         done_upload: true
//                     })
//                     .then(function(done) {
//                         console.log("Successfully uploaded cycles to allteams/" + team + "/matches/" + newKey + "/");
//                     });
//             console.log('baseline ' + baseline);
//         } else {
//             console.log('error');
//         }
//     }
//     request.send();
// }

// // TODO: ADD BASELINE BUTTON

// // var request = new XMLHttpRequest();
// //     const year = '2018';
// //     const event = 'onbar';
// //     var match = $('#matchnumber').val();
// //     const api = 'https://www.thebluealliance.com/api/v3/match/' + year + event + '_qm' + match + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
// //     var switch_cycle = 'none';
// //     var scale_cycle = 'none';
// //     var baseline = '-';
// //     var starting_position = $('label#position.active').attr('value');
// //     var team = $('#team').val();
// //     request.open('GET', api, true);
// //     request.onload = function() {
// //         // Begin accessing JSON data here
// //         var data = JSON.parse(this.response);