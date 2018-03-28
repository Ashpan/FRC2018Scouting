const db = firebase.database().ref('allteams/');

var matchNumber = 0;
var valKey = [];
var matchArray = [];
var teams = []



$(document).ready(function() {
    teams = ["188", "746", "771", "854", "907", "919", "1075", "1310", "1325", "1360", "4001", "4343", "4618", "4939", "4946", "4976", "5031", "5036", "5428", "5519", "5699", "5776", "5921", "6009", "6135", "6140", "6141", "6397", "6513", "6564", "6632", "6867", "6975", "7013", "7136", "7329"]
    $( "#auto_switch_success" ).change(function() {
        if ((parseInt($('#auto_switch_success').val()) > 0) || (parseInt($('#auto_scale_success').val()) > 0) ) {
            $("#baseline_n").removeClass("active");
            $("#baseline_y").addClass("active");
        }else{
            $("#baseline_n").addClass("active");
            $("#baseline_y").removeClass("active");        
        }
    });
    $( "#auto_scale_success" ).change(function() {
        if ((parseInt($('#auto_switch_success').val()) > 0) || (parseInt($('#auto_scale_success').val()) > 0) ) {
            $("#baseline_n").removeClass("active");
            $("#baseline_y").addClass("active");
        }else{
            $("#baseline_n").addClass("active");
            $("#baseline_y").removeClass("active");        
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

function inputVerification() {

    var check = true;

    if (!(firebase.auth().currentUser)) {
        alert("Please Login to your account to input data");
        check = false;
    }
    if (isNaN(parseInt($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a team number as an integer.");
        check = false;
    }
    if(!(teams.includes($('#team').val()))){
     $('#uploading').html($('#uploading').html() + "<br>The team you entered is not attending York.");
        check = false;
    }
    if ( (parseInt($('#auto_switch_success').val()))>5 || (parseInt($('#auto_scale_success').val()))>5 || (parseInt($('#auto_switch_fail').val()))>5 || (parseInt($('#auto_scale_fail').val()))>5 ) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter an auto cube number less than 5.");
        check = false;
    }
    if ( (parseInt($('#teleop_switch_success').val()))>54 || (parseInt($('#teleop_scale_success').val()))>54 || (parseInt($('#teleop_switch_fail').val()))>54 || (parseInt($('#teleop_scale_fail').val()))>54 || (parseInt($('#teleop_opp_switch_success').val()))>54 || (parseInt($('#teleop_opp_switch_fail').val()))>54 ) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter an teleop cube number less than 54.");
        check = false;
    }
    if ( (parseInt($('#teleop_vault').val()))>15 ) {
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
                auto_vault: parseInt($('#auto_vault').val()),

                teleop_switch_success: parseInt($('#teleop_switch_success').val()),
                teleop_switch_fail: parseInt($('#teleop_switch_fail').val()),
                teleop_scale_success: parseInt($('#teleop_scale_success').val()),
                teleop_scale_fail: parseInt($('#teleop_scale_fail').val()),
                teleop_opp_switch_success: parseInt($('#teleop_opp_switch_success').val()),
                teleop_opp_switch_fail: parseInt($('#teleop_opp_switch_fail').val()),
                teleop_vault: parseInt($('#teleop_vault').val()),

                climb: document.querySelector('input[name="climb"]:checked').value,
                climb_notes: $('#climb_other').val(),

                team_number: parseInt($('#team').val()),
                match_number: parseInt($('#matchnumber').val()),
                match_scouter: $('#scouter').val() === "" ? "-" : $('#scouter').val(),
                match_comment: $('#comment').val() === "" ? "-" : $('#comment').val(),
                match_startpos: $('label#position.active').attr('value'),

                overall_teleop_success: parseInt($('#teleop_switch_success').val()) + parseInt($('#teleop_scale_success').val()) + parseInt($('#teleop_opp_switch_success').val()) + parseInt($('#teleop_vault').val()),
                overall_teleop_fail: parseInt($('#teleop_switch_fail').val()) + parseInt($('#teleop_scale_fail').val()) + parseInt($('#teleop_opp_switch_fail').val()),
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


    firebase.database().ref().child('teamlist/' + team).set(1);

    console.log("Team " + team + " added to teamlist.");
    location.reload();

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