// poker.js
define(function(require){

	var _ = require("lib/underscore"),
		constants = require("app/constants"),
		Player = require("object/Player"),
		Table = require("object/Table"),
		Seat = require("object/Seat"),
		TexasHoldem = require("game/TexasHoldem")

	// SETUP

	// Creating New Players
	var kyle = new Player({ name: "Kyle" });
	var ryan = new Player({	name: "Spooky" });
	var john = new Player({	name: "John" });
	var pete = new Player({	name: "Pete" });
	var bill = new Player({	name: "Bill" });

	// Create Table
	var table = new Table({
		game: TexasHoldem,
		name: "No Limit Texas Hold'em 20/40"
	});

	// Move Seats to Table
	table.seats.push(new Seat({
		player: kyle
	}), new Seat({
		player: ryan
	}), new Seat({
		player: john
	}), new Seat({
		player: pete
	}), new Seat({
		player: bill
	}));

	// Put the table on Window so its accessible outside of this scope.
	window.table = table;

});
