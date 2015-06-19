define(function(require){

    // Pull in a global copy of Underscore, as well as a global instance of Poker.
    var _ = require("lib/underscore"),
        Poker = require("app/Poker");

    // Assign a new, single instance of Poker to the window so we can access it.
    window.poker = new Poker;

});
