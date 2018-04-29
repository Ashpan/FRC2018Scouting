const db = firebase.database().ref('allteams/');

var matchNumber = 0;
var valKey = [];
var matchArray = [];
var teams = []

$(window).on('load', function() {
    if (!(firebase.auth().currentUser)) {
        $('#login_modal').modal('show');
        alert("Please Login to your account to input data");
    }
    if (firebase.auth().currentUser.email == "692413@pdsb.net") {
        console.log(true);
        document.getElementById("ashpan").style.display = "block";
    }
});

$(document).ready(function() {
    teams = ["58", "67", "303", "447", "555", "612", "694", "868", "870", "894", "1114", "1218", "1259", "1262", "1322", "1325", "1493", "1559", "1660", "1756", "1923", "2016", "2075", "2081", "2177", "2200", "2202", "2220", "2228", "2377", "2549", "2620", "2830", "3381", "3618", "3620", "3656", "3767", "3928", "4003", "4011", "4096", "4237", "4392", "4521", "4541", "4557", "4776", "4786", "4909", "5216", "5407", "5413", "5422", "5436", "5531", "5674", "5724", "5913", "6121", "6237", "6328", "6329", "6860", "6875", "6968", "7160", "7329", ""]
    teamMatches = {
            1114: [107, 114, 14, 25, 38, 56, 68, 78, 88, 9, 94],
            1218: [112, 12, 26, 43, 52, 6, 67, 80, 90, 99],
            1259: [10, 108, 16, 23, 38, 50, 63, 69, 85, 98],
            1262: [10, 109, 21, 27, 39, 53, 62, 77, 87, 95],
            1322: [104, 11, 22, 28, 42, 52, 57, 78, 86, 95],
            1325: [100, 114, 16, 32, 4, 42, 49, 65, 72, 90],
            1493: [100, 105, 20, 30, 37, 52, 68, 7, 77, 91],
            1559: [106, 15, 27, 44, 49, 5, 58, 78, 91, 98],
            1660: [114, 15, 33, 45, 52, 66, 76, 83, 9, 96],
            1756: [1, 106, 13, 26, 42, 47, 59, 76, 82, 97],
            1923: [100, 113, 20, 34, 46, 5, 51, 67, 75, 80],
            2016: [113, 19, 2, 26, 45, 54, 62, 78, 85, 93],
            2075: [102, 108, 17, 26, 44, 57, 63, 72, 89, 9],
            2081: [101, 107, 17, 28, 3, 43, 49, 66, 79, 91],
            2177: [104, 12, 17, 34, 40, 47, 65, 77, 85, 94],
            2200: [112, 16, 34, 41, 55, 62, 7, 71, 83, 96],
            2202: [10, 105, 15, 29, 45, 55, 61, 72, 81, 99],
            2220: [107, 22, 32, 41, 50, 64, 7, 77, 89, 97],
            2228: [103, 19, 24, 38, 4, 46, 60, 77, 83, 92],
            2377: [107, 16, 29, 40, 47, 6, 60, 71, 86, 93],
            2549: [103, 23, 33, 39, 49, 59, 6, 75, 89, 94],
            2620: [107, 11, 114, 18, 24, 35, 53, 61, 75, 84, 92],
            2830: [108, 15, 3, 31, 41, 54, 68, 74, 86, 92],
            303: [111, 13, 24, 43, 5, 53, 68, 73, 89, 96],
            3381: [1, 105, 23, 34, 40, 56, 64, 78, 87, 92],
            3618: [113, 14, 30, 44, 50, 65, 76, 8, 81, 92],
            3620: [10, 100, 110, 18, 26, 36, 47, 66, 71, 81],
            3656: [1, 106, 19, 32, 37, 53, 66, 74, 80, 94],
            3767: [101, 112, 20, 27, 35, 48, 60, 73, 81, 9],
            3928: [1, 110, 15, 30, 39, 51, 60, 79, 88, 99],
            4003: [108, 21, 29, 46, 55, 64, 73, 8, 82, 91],
            4011: [102, 109, 11, 23, 32, 43, 55, 60, 76, 85],
            4096: [104, 2, 23, 29, 44, 51, 68, 79, 84, 97],
            4237: [11, 110, 17, 25, 38, 48, 62, 74, 82, 96],
            4392: [103, 18, 25, 44, 5, 52, 59, 72, 85, 95],
            447: [101, 108, 15, 2, 25, 36, 57, 65, 75, 90],
            4521: [101, 113, 12, 24, 42, 49, 63, 7, 70, 88],
            4541: [104, 16, 31, 36, 50, 61, 73, 82, 9, 95],
            4557: [105, 21, 31, 38, 51, 58, 7, 76, 90, 95],
            4776: [112, 2, 21, 30, 42, 47, 61, 74, 89, 98],
            4786: [101, 109, 19, 30, 35, 56, 6, 67, 72, 82],
            4909: [110, 19, 33, 40, 5, 55, 61, 69, 90, 97],
            5216: [104, 13, 31, 4, 45, 56, 63, 71, 80, 91],
            5407: [102, 111, 18, 34, 45, 50, 58, 6, 74, 91],
            5413: [10, 103, 22, 34, 43, 48, 57, 73, 88, 93],
            5422: [100, 111, 21, 28, 3, 40, 48, 63, 76, 84],
            5436: [106, 17, 2, 24, 39, 52, 64, 69, 81, 93],
            5531: [108, 18, 27, 4, 43, 51, 62, 70, 86, 94],
            555: [102, 110, 12, 20, 33, 42, 54, 64, 72, 84],
            5674: [113, 13, 23, 35, 57, 66, 77, 8, 86, 99],
            5724: [111, 17, 29, 35, 4, 54, 59, 80, 88, 98],
            58: [101, 110, 13, 29, 3, 39, 50, 67, 78, 83],
            5913: [106, 114, 14, 24, 40, 54, 67, 79, 8, 89, 95],
            612: [104, 14, 28, 35, 55, 67, 7, 74, 87, 93],
            6121: [112, 13, 25, 41, 51, 58, 6, 69, 85, 92],
            6237: [100, 105, 14, 2, 33, 41, 53, 60, 70, 82],
            6328: [102, 112, 22, 30, 38, 4, 54, 66, 75, 87],
            6329: [105, 22, 32, 39, 46, 65, 71, 84, 9, 98],
            67: [113, 22, 27, 3, 36, 47, 59, 69, 80, 96],
            6860: [109, 16, 31, 45, 5, 57, 64, 79, 87, 94],
            6875: [1, 109, 12, 28, 36, 48, 68, 75, 83, 98],
            694: [103, 20, 28, 36, 53, 58, 71, 8, 88, 97],
            6968: [10, 111, 20, 32, 44, 56, 61, 70, 83, 93],
            7160: [1, 111, 14, 31, 37, 49, 62, 69, 84, 99],
            7329: [103, 11, 21, 26, 37, 56, 65, 79, 86, 96],
            868: [109, 114, 12, 25, 3, 37, 46, 58, 70, 81, 97],
            870: [102, 107, 19, 27, 37, 48, 59, 70, 8, 90],
            894: [106, 11, 18, 33, 41, 46, 63, 73, 87, 99]
        }
        // $("#auto_switch_success").change(function() {
        //     if ((parseInt($('#auto_switch_success').val()) > 0) || (parseInt($('#auto_scale_success').val()) > 0)) {
        //         $("#baseline_n").removeClass("active");
        //         $("#baseline_y").addClass("active");
        //     } else {
        //         $("#baseline_n").addClass("active");
        //         $("#baseline_y").removeClass("active");
        //     }
        // });
        // $("#auto_scale_success").change(function() {
        //     if ((parseInt($('#auto_switch_success').val()) > 0) || (parseInt($('#auto_scale_success').val()) > 0)) {
        //         $("#baseline_n").removeClass("active");
        //         $("#baseline_y").addClass("active");
        //     } else {
        //         $("#baseline_n").addClass("active");
        //         $("#baseline_y").removeClass("active");
        //     }
        // });
    $('.climb').change(function() {
        if ($('input[id=assisted-climb]:checked').val() === "Assisted Climb") {
            console.log("true");
            document.getElementById("assisted-climb-team").style.display = "block";
        } else {
            console.log("false");
            document.getElementById("assisted-climb-team").style.display = "none";
        }
        if ($('input[id=lifted-team]:checked').val() === "Lifted Team") {
            console.log("true");
            document.getElementById("lifted-climb-team").style.display = "block";
        } else {
            console.log("false");
            document.getElementById("lifted-climb-team").style.display = "none";
        }
    });
});


// var counter = 0;
function submitData() {

    $('#uploading').html("");

    if (inputVerification()) {

        updateDatabase();

    }

}

function validTeam() {
    if (!(teams.includes($('#team').val()))) {
        $("#teamCheck").html("Team " + $('#team').val() + " is not attending the Science Division.");
    } else if ((teams.includes($('#team').val())) || ($('#team').val() == "")) {
        $("#teamCheck").html("");
    }
}

function inputVerification() {

    var check = true;
    var team = parseInt($('#team').val());
    if (!(firebase.auth().currentUser)) {
        alert("Please Login to your account to input data");
        check = false;
    }
    if (isNaN(parseInt($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a team number as an integer.");
        check = false;
    }
    if (!(teamMatches[team]).includes(parseInt($('#matchnumber').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>The team you entered is not playing the match you entered.");
        check = false;
    }

    if (!(teams.includes($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>The team you entered is not attending the Science Division.");
        check = false;
    }
    if ((parseInt($('#auto_switch_success').val())) > 5 || (parseInt($('#auto_scale_success').val())) > 5 || (parseInt($('#auto_switch_fail').val())) > 5 || (parseInt($('#auto_scale_fail').val())) > 5) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter an auto cube number less than 5.");
        check = false;
    }
    if ((parseInt($('#teleop_switch_success').val())) > 54 || (parseInt($('#teleop_scale_winning_success').val())) > 54 || (parseInt($('#teleop_scale_losing_success').val())) > 54 || (parseInt($('#teleop_switch_fail').val())) > 54 || (parseInt($('#teleop_scale_winning_fail').val())) > 54 || (parseInt($('#teleop_scale_losing_fail').val())) > 54 || (parseInt($('#teleop_opp_switch_success').val())) > 54 || (parseInt($('#teleop_opp_switch_fail').val())) > 54) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter an teleop cube number less than 54.");
        check = false;
    }
    if ((parseInt($('#teleop_vault').val())) > 15) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter an vault number less than 15.");
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

function updateDatabase() {

    var team = $('#team').val();
    var updateCount = {};
    // updateCount['match-count'] = matchNumber;
    db.child(team).update(updateCount);
    var newKey = db.push().key;
    db.child(team + '/' + newKey).set({
            auto_switch_success: parseInt($('#auto_switch_success').val()),
            auto_switch_fail: parseInt($('#auto_switch_fail').val()),
            auto_scale_success: parseInt($('#auto_scale_success').val()),
            auto_scale_fail: parseInt($('#auto_scale_fail').val()),
            auto_baseline: parseInt($('label[name="baseline"].active').attr('value')),
            scale_position: $('label[name="scale_pos"].active').attr('value'),
            // auto_vault: parseInt($('#auto_vault').val()),

            teleop_switch_success: parseInt($('#teleop_switch_success').val()),
            teleop_switch_fail: parseInt($('#teleop_switch_fail').val()),
            teleop_scale_winning_success: parseInt($('#teleop_scale_winning_success').val()),
            teleop_scale_winning_fail: parseInt($('#teleop_scale_winning_fail').val()),
            teleop_scale_losing_success: parseInt($('#teleop_scale_losing_success').val()),
            teleop_scale_losing_fail: parseInt($('#teleop_scale_losing_fail').val()),
            teleop_opp_switch_success: parseInt($('#teleop_opp_switch_success').val()),
            teleop_opp_switch_fail: parseInt($('#teleop_opp_switch_fail').val()),
            teleop_vault: parseInt($('#teleop_vault').val()),

            climb: document.querySelector('input[name="climb"]:checked').value,
            climb_assist: $('#assisted-climb-team').val(),
            climb_lift: $('#lifted-climb-team').val(),
            climb_notes: $('#climb_other').val(),

            team_number: parseInt($('#team').val()),
            match_number: parseInt($('#matchnumber').val()),
            match_scouter: $('#scouter').val() === "" ? "-" : $('#scouter').val(),
            match_comment: $('#comment').val() === "" ? "-" : $('#comment').val(),
            match_startpos: $('label#position.active').attr('value'),

            overall_teleop_success: parseInt($('#teleop_switch_success').val()) + parseInt($('#teleop_scale_winning_success').val()) + parseInt($('#teleop_scale_losing_success').val()) + parseInt($('#teleop_opp_switch_success').val()) + parseInt($('#teleop_vault').val()),
            overall_teleop_fail: parseInt($('#teleop_switch_fail').val()) + parseInt($('#teleop_scale_winning_fail').val()) + parseInt($('#teleop_scale_losing_fail').val()) + parseInt($('#teleop_opp_switch_fail').val()),
            overall_auto_success: parseInt($('#auto_switch_success').val()) + parseInt($('#auto_scale_success').val()),
            overall_auto_fail: parseInt($('#auto_switch_fail').val()) + parseInt($('#auto_scale_fail').val()),

            compiler_email: firebase.auth().currentUser.email
        })
        .then(function(done) {
            console.log("Successfully uploaded data to allteams/" + team + "/matches/" + newKey);
        });


    if (document.getElementById('climb_other').value === "" || document.getElementById('climb_other').value === null) {
        document.getElementById('climb_other').value = "-";
    }

    if (document.getElementById('comment').value === "" || document.getElementById('comment').value === null) {
        document.getElementById('comment').value = "-";
    }

    if (document.getElementById('assisted-climb-team').value === "" || document.getElementById('assisted-climb-team').value === null) {
        document.getElementById('assisted-climb-team').value = "-";
    }

    if (document.getElementById('lifted-climb-team').value === "" || document.getElementById('assisted-climb-team').value === null) {
        document.getElementById('lifted-climb-team').value = "-";
    }


    firebase.database().ref().child('teamlist/' + team).set(1);

    console.log("Team " + team + " added to teamlist.");
    location.reload();
    $('html,body').scrollTop(0);

    // var counter = firebase.database().ref('allteams/' + team).orderByKey();
    // counter.once("value").then(function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //         var list_of_matches = childSnapshot.key;
    //         matchArray.push(list_of_matches);
    //     });
    //     var length_of_matches = matchArray.length;
    //     firebase.database().ref().child('allteams/' + team + '/match-count').set(length_of_matches - 1);
    // });

}



function randomUpdateDatabase() {

    var team = teams[Math.floor((Math.random() * 68))];
    var updateCount = {};
    var teamIndex = Math.floor((Math.random() * 68))
        // updateCount['match-count'] = matchNumber;
    db.child(team).update(updateCount);
    var newKey = db.push().key;
    db.child(team + '/' + newKey).set({
            auto_switch_success: Math.floor((Math.random() * 4) + 1),
            auto_switch_fail: Math.floor((Math.random() * 4) + 1),
            auto_scale_success: Math.floor((Math.random() * 4) + 1),
            auto_scale_fail: Math.floor((Math.random() * 4) + 1),
            auto_baseline: 1,
            scale_position: "Far",
            // auto_vault: parseInt($('#auto_vault').val()),

            teleop_switch_success: Math.floor((Math.random() * 53) + 1),
            teleop_switch_fail: Math.floor((Math.random() * 53) + 1),
            teleop_scale_winning_success: Math.floor((Math.random() * 53) + 1),
            teleop_scale_winning_fail: Math.floor((Math.random() * 53) + 1),
            teleop_scale_losing_success: Math.floor((Math.random() * 53) + 1),
            teleop_scale_losing_fail: Math.floor((Math.random() * 53) + 1),
            teleop_opp_switch_success: Math.floor((Math.random() * 53) + 1),
            teleop_opp_switch_fail: Math.floor((Math.random() * 53) + 1),
            teleop_vault: Math.floor((Math.random() * 14) + 1),

            climb: "Self Climb",
            climb_assist: 0,
            climb_lift: 0,
            climb_notes: "",

            team_number: team,
            match_number: Math.floor((Math.random() * 60) + 1),
            match_scouter: $('#scouter').val() === "" ? "-" : $('#scouter').val(),
            match_comment: $('#comment').val() === "" ? "-" : $('#comment').val(),
            match_startpos: "Left",

            overall_teleop_success: Math.floor((Math.random() * 15) + 1) + Math.floor((Math.random() * 15) + 1) + Math.floor((Math.random() * 15) + 1) + Math.floor((Math.random() * 15) + 1) + Math.floor((Math.random() * 15) + 1),
            overall_teleop_fail: Math.floor((Math.random() * 15) + 1) + Math.floor((Math.random() * 15) + 1) + Math.floor((Math.random() * 15) + 1) + Math.floor((Math.random() * 15) + 1),
            overall_auto_success: Math.floor((Math.random() * 5) + 1) + Math.floor((Math.random() * 5) + 1),
            overall_auto_fail: Math.floor((Math.random() * 5) + 1) + Math.floor((Math.random() * 5) + 1),

            compiler_email: firebase.auth().currentUser.email
        })
        .then(function(done) {
            console.log("Successfully uploaded data to allteams/" + team + "/matches/" + newKey);
        });


    if (document.getElementById('climb_other').value === "" || document.getElementById('climb_other').value === null) {
        document.getElementById('climb_other').value = "-";
    }

    if (document.getElementById('comment').value === "" || document.getElementById('comment').value === null) {
        document.getElementById('comment').value = "-";
    }

    if (document.getElementById('assisted-climb-team').value === "" || document.getElementById('assisted-climb-team').value === null) {
        document.getElementById('assisted-climb-team').value = "-";
    }

    if (document.getElementById('lifted-climb-team').value === "" || document.getElementById('assisted-climb-team').value === null) {
        document.getElementById('lifted-climb-team').value = "-";
    }


    firebase.database().ref().child('teamlist/' + team).set(1);

    console.log("Team " + team + " added to teamlist.");
    location.reload();
    $('html,body').scrollTop(0);

}





// USE TO FETCH TEAM LIST ARRAY... USE FOR NEW COMPETITION
// function fetchTeams() {
//     console.log('hey');
//     var xmlhttp = new XMLHttpRequest();
//     const year = '2018';
//     const event = 'arc';
//     const api = 'https://www.thebluealliance.com/api/v3/event/' + year + event + '/teams/keys' + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
//     var teams = []
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var data = JSON.parse(this.responseText);
//             teams = data;
//             for (i = 0; i < teams.length; i++) {
//                 teams[i] = parseInt(teams[i].substring(3));
//             }

//             teams.sort(sortNumber);
//             for (i = 0; i < teams.length; i++) {
//                 teams[i] = String(teams[i]);
//             }
//             console.log(teams);
//             $("#team").autocomplete({
//                 source: teams
//             });
//         }
//     };
//     xmlhttp.open("GET", api, true);
//     xmlhttp.send();
// }

// function sortNumber(a, b) {
//     return a - b;
// }
// window.onload = fetchTeams;