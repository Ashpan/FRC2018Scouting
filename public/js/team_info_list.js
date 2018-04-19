const teamsList = document.getElementById('allteams');
const dbTeamsList = firebase.database().ref('/pitdata/');
var teams = ["188", "610", "772", "1285", "1305", "1325", "1334", "2013", "2056", "2200", "2386", "2702", "2706", "2852", "3161", "3683", "4343", "4476", "4618", "4678", "4814", "4903", "4914", "4936", "5036", "5426", "5834", "6140", "6141", "6331", "6336", "6378", "6544", "6856", "6864", "6867", "6875", "6917", "6978", "7329", ""]
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