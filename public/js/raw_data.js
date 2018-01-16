$(document).ready(function(){

  db.ref().once('value').then(function(databasesnap){

    databasesnap.child('matches').forEach(function(teammatchessnap){

      $('#database-matches').append('<li id="' + teammatchessnap.key + '" class="list-group-item wrap-all">' + teammatchessnap.key + '</li>');
      $('#' + teammatchessnap.key).append('<br><ul id=' + teammatchessnap.key + '-matcheslist class="list-group"></ul>');
      teammatchessnap.forEach(function(matchsnap){
        $('#' + teammatchessnap.key + '-matcheslist').append('<li class="list-group-item wrap-all">' + JSON.stringify(matchsnap.val()).replace(/},/g, "},<br>") + '</li>');
      })
    });

  });

})
