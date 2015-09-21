PlayersList = new Mongo.Collection('players');
var clicked = 0;
if(Meteor.isClient){
 Template.leaderboard.helpers({  
     'player': function player(){
         return PlayersList.find({}, {sort: {score: -1, name: 1} })
      },
      'selectedClass': function selectedClass(){
         var playerId = this._id;
         var selectedPlayer = Session.get('selectedPlayer');
         if(playerId === selectedPlayer){
          return "selected"
         }
      },
      'showSelectedPlayer': function showSelectedPlayer(){
          var selectedPlayer = Session.get('selectedPlayer');
          return PlayersList.findOne(selectedPlayer)
      }
 });

 Template.leaderboard.events({
  'click .player': function clickedOn(){
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    PlayersList.clicked + 1;
  },
  'click .increment': function incrementClick() {
     var selectedPlayer = Session.get('selectedPlayer');
     PlayersList.update(selectedPlayer, {$inc: {score: 5} });
  },
  'click .decrement': function decrementClick() {
     var selectedPlayer = Session.get('selectedPlayer');
     PlayersList.update(selectedPlayer, {$inc: {score: -5} });
  }
 });
}
