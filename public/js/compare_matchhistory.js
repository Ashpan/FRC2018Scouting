function populateMatchHistory() {
    matchHistoryAuto1();
    matchHistoryTeleop1();
    matchHistoryMisc1();
    matchHistoryComments1();
    matchHistoryAuto2();
    matchHistoryTeleop2();
    matchHistoryMisc2();
    matchHistoryComments2();
}

function matchHistoryAuto1() {

    $('#auto_table1').html("");

    for (i = 0; i < data1.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data1.match_number[i]));
        row.append($('<td></td>').text(data1.auto_switch_success[i] + " : " + data1.auto_switch_fail[i]));
        row.append($('<td></td>').text(data1.auto_scale_success[i] + " : " + data1.auto_scale_fail[i]));
        row.append($('<td></td>').text(data1.auto_baseline[i] == 1 ? "Yes" : "No"));

        $('#auto_table1').append(row);
    }

}

function matchHistoryTeleop1() {

    $('#teleop_table1').html("");

    for (i = 0; i < data1.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data1.match_number[i]));
        row.append($('<td></td>').text(data1.teleop_switch_success[i] + " : " + data1.teleop_switch_fail[i]));
        row.append($('<td></td>').text((data1.teleop_scale_winning_success[i] + data1.teleop_scale_losing_success[i]) + " : " + (data1.teleop_scale_winning_fail[i] + data1.teleop_scale_losing_fail[i])));
        row.append($('<td></td>').text(data1.teleop_opp_switch_success[i] + " : " + data1.teleop_opp_switch_fail[i]));
        row.append($('<td></td>').text(data1.teleop_vault[i]));

        $('#teleop_table1').append(row);

    }

}

function matchHistoryMisc1() {

    $('#misc_table1').html("");

    for (i = 0; i < data1.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data1.match_number[i]));
        row.append($('<td></td>').text(data1.match_startpos[i][0].toUpperCase() + data1.match_startpos[i].substring(1)));
        row.append($('<td></td>').text(data1.climb[i] + ". " + data1.climb_notes[i]));


        $('#misc_table1').append(row);

    }

}

function matchHistoryComments1() {

    $('#comment_table1').html("");

    for (i = 0; i < data1.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data1.match_number[i]));
        row.append($('<td></td>').text(data1.match_scouter[i]));
        row.append($('<td></td>').text(data1.match_comment[i]));
        row.append($('<td></td>').text(data1.compiler_email[i]));

        $('#comment_table1').append(row);

    }

}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function matchHistoryAuto2() {

    $('#auto_table2').html("");

    for (i = 0; i < data2.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data2.match_number[i]));
        row.append($('<td></td>').text(data2.auto_switch_success[i] + " : " + data2.auto_switch_fail[i]));
        row.append($('<td></td>').text(data2.auto_scale_success[i] + " : " + data2.auto_scale_fail[i]));
        row.append($('<td></td>').text(data2.auto_baseline[i] == 1 ? "Yes" : "No"));

        $('#auto_table2').append(row);
    }

}

function matchHistoryTeleop2() {

    $('#teleop_table2').html("");

    for (i = 0; i < data2.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data2.match_number[i]));
        row.append($('<td></td>').text(data2.teleop_switch_success[i] + " : " + data2.teleop_switch_fail[i]));
        row.append($('<td></td>').text((data2.teleop_scale_winning_success[i] + data2.teleop_scale_losing_success[i]) + " : " + (data2.teleop_scale_winning_fail[i] + data2.teleop_scale_losing_fail[i])));
        row.append($('<td></td>').text(data2.teleop_opp_switch_success[i] + " : " + data2.teleop_opp_switch_fail[i]));
        row.append($('<td></td>').text(data2.teleop_vault[i]));

        $('#teleop_table2').append(row);

    }

}

function matchHistoryMisc2() {

    $('#misc_table2').html("");

    for (i = 0; i < data2.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data2.match_number[i]));
        row.append($('<td></td>').text(data2.match_startpos[i][0].toUpperCase() + data2.match_startpos[i].substring(1)));
        row.append($('<td></td>').text(data2.climb[i] + ". " + data2.climb_notes[i]));


        $('#misc_table2').append(row);

    }

}

function matchHistoryComments2() {

    $('#comment_table2').html("");

    for (i = 0; i < data2.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data2.match_number[i]));
        row.append($('<td></td>').text(data2.match_scouter[i]));
        row.append($('<td></td>').text(data2.match_comment[i]));
        row.append($('<td></td>').text(data2.compiler_email[i]));

        $('#comment_table2').append(row);

    }

}