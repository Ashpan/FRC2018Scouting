function populateMatchHistory() {
    matchHistoryOverall();
    matchHistoryAuto();
    matchHistoryTeleop();
    matchHistoryMisc();
    matchHistoryComments();
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
        row.append($('<td></td>').text(data.auto_vault[i] + " : " + data.auto_scale_fail[i]));
        row.append($('<td></td>').text(data.auto_baseline[i] == 1 ? "Yes" : "No"));

        $('#auto_table').append(row);

    }

}

function matchHistoryTeleop() {

    $('#teleop_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.teleop_switch_success[i] + " : " + data.teleop_switch_fail[i]));
        row.append($('<td></td>').text(data.teleop_scale_success[i] + " : " + data.teleop_scale_fail[i]));
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