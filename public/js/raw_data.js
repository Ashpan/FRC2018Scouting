const teamsList = document.getElementById('allteams');
const dbTeamsList = firebase.database().ref('/allteams');

const storage = firebase.storage();
const storageRef = storage.ref();

// for each team
dbTeamsList.on('child_added', snap => {

  // Create team entry in allteams list
  const teamLi = document.createElement('li');
  teamLi.id = snap.key;
  teamLi.setAttribute("class", "list-group-item");
  teamsList.appendChild(teamLi);

  // Add header to entry -> eg "1325"
  const teamHeader = document.createElement('h2');
  teamHeader.id = snap.key + "-header";
  teamHeader.innerText = snap.key;
  teamLi.appendChild(teamHeader);
  teamLi.appendChild(document.createElement('br'));

  // Add content list (matches)
  const teamUl = document.createElement('ul');
  teamUl.id = snap.key + "-list";
  teamUl.setAttribute("class", "list-group");
  teamLi.appendChild(teamUl);

  // Navigate to "matches" object in [team]
  snap.child('matches').forEach(function(matchsnap){

    const dbMatchesInfo = snap.child('/matches-info/' + matchsnap.key)

    // Add entry in content list
    const matchLi = document.createElement('li');
    matchLi.id = snap.key + "-" + matchsnap.key;
    matchLi.setAttribute("class", "list-group-item");
    teamUl.appendChild(matchLi);

    // Add header to entry
    const matchHeader = document.createElement('h4');
    matchHeader.id = snap.key + "-" + matchsnap.key + "-header";
    matchHeader.innerText = "Qualification Match " + parseInt(dbMatchesInfo.child('match_number').val());
    matchLi.appendChild(matchHeader);

    // Add match info list to entry
    const matchUl = document.createElement('ul');
    matchUl.id = snap.key + "-" + matchsnap.key + "-info";
    matchUl.setAttribute("class", "list-group");
    matchLi.appendChild(matchUl);

    matchsnap.forEach(function(snapshot){
      const dataLi = document.createElement('li');
      dataLi.id = snap.key + "-" + matchsnap.key + "-" + snapshot.key;
      dataLi.innerText = snapshot.key + ": " + snapshot.val();
      dataLi.setAttribute("class", "list-group-item");
      matchUl.appendChild(dataLi);
    });

    const matchFooter = document.createElement('h4');
    matchFooter.id = snap.key + "-" + matchsnap.key + "-footer";
    matchFooter.innerText = "Match Scouted By: " + dbMatchesInfo.child('match_scouter').val();
    matchFooter.innerText += "\n\nComments: " + dbMatchesInfo.child('match_comment').val();
    matchFooter.setAttribute("class", "wrap-all");
    matchLi.appendChild(matchFooter);

  });

});