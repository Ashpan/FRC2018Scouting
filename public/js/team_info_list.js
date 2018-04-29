const teamsList = document.getElementById('allteams');
const dbTeamsList = firebase.database().ref('/pitdata/');
var teams = ["58", "67", "303", "447", "555", "612", "694", "868", "870", "894", "1114", "1218", "1259", "1262", "1322", "1325", "1493", "1559", "1660", "1756", "1923", "2016", "2075", "2081", "2177", "2200", "2202", "2220", "2228", "2377", "2549", "2620", "2830", "3381", "3618", "3620", "3656", "3767", "3928", "4003", "4011", "4096", "4237", "4392", "4521", "4541", "4557", "4776", "4786", "4909", "5216", "5407", "5413", "5422", "5436", "5531", "5674", "5724", "5913", "6121", "6237", "6328", "6329", "6860", "6875", "6968", "7160", "7329", ""]
var doneTeams = []
var notDoneTeams = []

// for each team
dbTeamsList.on('child_added', snap => {
    console.log(teams.includes(snap.key));
    for (i = 0; i < teams.length; i++) {
        if (teams[i] === (snap.key)) {
            doneTeams.push(teams[i])
        }
    }
    notDoneTeams = teams.filter(function(obj) {
        return doneTeams.indexOf(obj) == -1;
    });


    var teamLi = $('<li></li>').attr("class", "list-group-item");
    var teamUl = $('<ul></ul>').attr("class", "list-group");
    console.log(notDoneTeams);
    for (x = 0; x < notDoneTeams.length; x++) {
        $('#allmatches').empty();
        teamLi.append($('<p></p>').text(notDoneTeams[x]));
        teamLi.append(teamUl);
    }
    $('#allmatches').append(teamLi);



    // snap.forEach(function(matchsnap) {
    //     var matchLi = $('<li></li>').attr("class", "list-group-item");
    //     teamUl.append(matchLi);

    //     // matchsnap.forEach(function(datasnap) {

    //     //     matchLi.append($('<p></p>').text(datasnap.key + ": " + datasnap.val()));

    //     // });
    // });
});