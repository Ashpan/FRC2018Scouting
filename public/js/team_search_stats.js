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
    row.append($('<td></td>').text("Auto Vault"));
    row.append($('<td></td>').text(analysis[2]));
    $('#stats_table').append(row);
    
    row = $('<tr></tr>');
    row.append($('<td></td>').text("Teleop Switch"));
    row.append($('<td></td>').text(analysis[3]));
    $('#stats_table').append(row);
    
    row = $('<tr></tr>');
    row.append($('<td></td>').text("Teleop Scale"));
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
}

