function populateMatchHistory() {
    matchHistoryOverall();
    matchHistoryAuto();
    matchHistoryTeleop();
    matchHistoryMisc();
    matchHistoryComments();
    pitData();
}

function matchHistoryOverall() {

    $('#overall_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.overall_auto_success[i] + " : " + data.overall_auto_fail[i]));
        row.append($('<td></td>').text(data.overall_teleop_success[i] + " : " + data.overall_teleop_fail[i]));

        $('#overall_table').append(row);

    }

}

function matchHistoryAuto() {

    $('#auto_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.auto_switch_success[i] + " : " + data.auto_switch_fail[i]));
        row.append($('<td></td>').text(data.auto_scale_success[i] + " : " + data.auto_scale_fail[i]));
        // row.append($('<td></td>').text(data.auto_vault[i]));
        row.append($('<td></td>').text(data.auto_baseline[i] == 1 ? "Yes" : "No"));
        row.append($('<td></td>').text(data.scale_position[i]));

        $('#auto_table').append(row);

    }

}

function matchHistoryTeleop() {

    $('#teleop_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.teleop_switch_success[i] + " : " + data.teleop_switch_fail[i]));
        row.append($('<td></td>').text(data.teleop_scale_winning_success[i] + " : " + data.teleop_scale_winning_fail[i]));
        row.append($('<td></td>').text(data.teleop_scale_losing_success[i] + " : " + data.teleop_scale_losing_fail[i]));
        row.append($('<td></td>').text(data.teleop_opp_switch_success[i] + " : " + data.teleop_opp_switch_fail[i]));
        row.append($('<td></td>').text(data.teleop_vault[i]));

        $('#teleop_table').append(row);

    }

}

function matchHistoryMisc() {

    $('#misc_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.match_startpos[i][0].toUpperCase() + data.match_startpos[i].substring(1)));
        row.append($('<td></td>').text(data.climb[i] + ". " + data.climb_notes[i]));
        row.append($('<td></td>').text(data.climb_assist[i]));
        row.append($('<td></td>').text(data.climb_lift[i]));


        $('#misc_table').append(row);

    }

}

function matchHistoryComments() {

    $('#comment_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.match_scouter[i]));
        row.append($('<td></td>').text(data.match_comment[i]));
        row.append($('<td></td>').text(data.compiler_email[i]));

        $('#comment_table').append(row);

    }

}


function pitData() {
    var pitdata = []
    firebase.database().ref('pitdata/' + team + '/switch_capable').on('value', function(snapshot) {
        pitdata[0] = snapshot.val()
    });
    firebase.database().ref('pitdata/' + team + '/scale_capable').on('value', function(snapshot) {
        pitdata[1] = snapshot.val()
    });
    firebase.database().ref('pitdata/' + team + '/comments').on('value', function(snapshot) {
        pitdata[2] = snapshot.val()
        $('#pit_table').html("");
        var row = $('<tr></tr>');
        row.append($('<td></td>').text(pitdata[0]));
        row.append($('<td></td>').text(pitdata[1]));
        row.append($('<td></td>').text(pitdata[2]));
        $('#pit_table').append(row);
    });

}