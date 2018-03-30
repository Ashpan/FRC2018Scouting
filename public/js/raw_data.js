const teamsList = document.getElementById('allteams');
const dbTeamsList = firebase.database().ref('/allteams/');
// for each team
dbTeamsList.on('child_added', snap => {

    var teamLi = $('<li></li>').attr("class", "list-group-item");

    var teamUl = $('<ul></ul>').attr("class", "list-group");
    teamLi.append($('<h2></h2>').text(snap.key));
    teamLi.append(teamUl);
    $('#allmatches').append(teamLi);
    snap.forEach(function(matchsnap) {
        var matchLi = $('<li></li>').attr("class", "list-group-item");
        teamUl.append(matchLi);

        matchsnap.forEach(function(datasnap) {

            matchLi.append($('<p></p>').text(datasnap.key + ": " + datasnap.val()));

        });
    });
});