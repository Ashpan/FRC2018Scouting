function populateStats() {

    $("#stats_table").html("");

    analysis = analyzeData();


    var row = $('<tr></tr>');
    row.append($('<td></td>').text("Auto Switch"));
    row.append($('<td></td>').text(analysis[0]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Auto Scale"));
    row.append($('<td></td>').text(analysis[1]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Teleop Switch"));
    row.append($('<td></td>').text(analysis[2]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Teleop Scale Winning"));
    row.append($('<td></td>').text(analysis[3]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Teleop Scale Losing"));
    row.append($('<td></td>').text(analysis[4]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Teleop Opp. Switch"));
    row.append($('<td></td>').text(analysis[5]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Teleop Vault"));
    row.append($('<td></td>').text(analysis[6]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Alliance Switch Accuracy"));
    row.append($('<td></td>').text(analysis[7] + '%'));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Opposite Switch Accuracy"));
    row.append($('<td></td>').text(analysis[8] + '%'));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Overall Scale Accuracy"));
    row.append($('<td></td>').text(analysis[11] + '%'));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Winning Scale Accuracy"));
    row.append($('<td></td>').text(analysis[9] + '%'));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Losing Scale Accuracy"));
    row.append($('<td></td>').text(analysis[10] + '%'));
    $('#stats_table').append(row);
}