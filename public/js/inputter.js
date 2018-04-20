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
});

$(document).ready(function() {
    teams = ["188", "610", "772", "1285", "1305", "1325", "1334", "2013", "2056", "2200", "2386", "2702", "2706", "2852", "3161", "3683", "4343", "4476", "4618", "4678", "4814", "4903", "4914", "4936", "5036", "5426", "5834", "6140", "6141", "6331", "6336", "6378", "6544", "6856", "6864", "6867", "6875", "6917", "6978", "7329", ""]
    teamMatches = {
            1285: [10, 18, 21, 29, 35, 43, 48, 5, 56, 66, 72, 80],
            1305: [12, 20, 27, 3, 31, 39, 43, 51, 55, 61, 69, 75, ],
            1325: [11, 16, 21, 27, 36, 45, 53, 56, 62, 7, 73, 80, ],
            1334: [11, 15, 22, 29, 34, 4, 42, 51, 59, 63, 71, 76, ],
            188: [17, 27, 32, 39, 47, 53, 56, 6, 63, 67, 76, 9, ],
            2013: [1, 12, 15, 24, 29, 38, 42, 53, 58, 65, 68, 80, ],
            2056: [18, 2, 23, 30, 38, 46, 53, 60, 66, 71, 74, 9, ],
            2200: [14, 21, 3, 31, 34, 42, 53, 57, 66, 73, 78, 8, ],
            2386: [1, 14, 17, 25, 33, 36, 45, 51, 56, 66, 70, 75, ],
            2702: [10, 18, 23, 27, 34, 41, 52, 58, 67, 7, 72, 75, ],
            2706: [10, 17, 26, 32, 38, 44, 51, 57, 61, 7, 70, 78, ],
            2852: [17, 22, 30, 35, 46, 5, 52, 59, 64, 73, 79, 8, ],
            3161: [11, 14, 21, 28, 3, 39, 44, 49, 58, 64, 68, 74, ],
            3683: [12, 20, 26, 33, 40, 47, 52, 57, 6, 63, 74, 80, ],
            4343: [13, 18, 21, 28, 3, 36, 42, 47, 55, 61, 70, 79, ],
            4476: [15, 22, 28, 35, 45, 50, 54, 6, 61, 72, 78, 9, ],
            4618: [1, 15, 21, 31, 40, 44, 48, 60, 64, 72, 77, 9, ],
            4678: [11, 16, 2, 25, 33, 40, 43, 49, 55, 67, 73, 78, ],
            4814: [13, 16, 27, 30, 35, 42, 51, 54, 65, 69, 7, 74, ],
            4903: [18, 24, 29, 4, 40, 47, 50, 59, 62, 68, 75, 8, ],
            4914: [13, 20, 23, 28, 38, 4, 41, 48, 56, 67, 73, 77, ],
            4936: [14, 20, 25, 30, 36, 46, 52, 55, 6, 65, 68, 77, ],
            5036: [1, 13, 20, 26, 30, 37, 41, 53, 59, 62, 72, 78, ],
            5426: [10, 20, 24, 33, 39, 44, 5, 54, 60, 67, 70, 80, ],
            5834: [19, 25, 30, 37, 4, 46, 49, 58, 61, 67, 80, 9, ],
            610: [12, 19, 23, 3, 32, 40, 45, 48, 59, 65, 70, 76, ],
            6140: [10, 16, 22, 32, 37, 4, 44, 50, 55, 66, 69, 74, ],
            6141: [13, 19, 2, 22, 31, 36, 45, 54, 57, 63, 68, 75, ],
            6331: [14, 26, 34, 38, 45, 49, 5, 59, 65, 69, 79, 9, ],
            6336: [12, 17, 25, 29, 3, 35, 41, 49, 60, 63, 69, 79, ],
            6378: [10, 15, 25, 28, 39, 46, 5, 52, 57, 62, 71, 76, ],
            6544: [13, 17, 24, 34, 40, 43, 50, 58, 6, 62, 73, 76, ],
            6856: [14, 22, 32, 38, 4, 43, 47, 60, 64, 7, 72, 76, ],
            6864: [12, 16, 2, 26, 31, 34, 46, 50, 56, 64, 70, 77, ],
            6867: [1, 19, 23, 33, 39, 42, 50, 55, 64, 7, 71, 79, ],
            6875: [15, 2, 24, 33, 36, 41, 48, 58, 61, 74, 79, 8, ],
            6917: [1, 19, 27, 32, 35, 44, 49, 57, 62, 71, 77, 8, ],
            6978: [16, 23, 29, 37, 43, 5, 51, 54, 63, 68, 77, 8, ],
            7329: [11, 18, 26, 31, 37, 41, 48, 54, 6, 65, 71, 75, ],
            772: [11, 19, 2, 24, 28, 37, 47, 52, 60, 66, 69, 78, ]
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



// USE TO FETCH TEAM LIST ARRAY... USE FOR NEW COMPETITION
// function fetchTeams() {
//     console.log('hey');
//     var xmlhttp = new XMLHttpRequest();
//     const year = '2018';
//     const event = 'onham';
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

// function sortNumber(a,b) {
//     return a - b;
// }
// window.onload = fetchTeams;