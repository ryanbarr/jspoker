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
		player: kyle,
		position: 0
	}), new Seat({
		player: ryan,
		position: 1
	}), new Seat({
		player: john,
		position: 2
	}), new Seat({
		player: pete,
		position: 3
	}), new Seat({
		player: bill,
		position: 4
	}));

	// Put the table on Window so its accessible outside of this scope.
	window.table = table;

	$(table).on("deal:player", function(e, currentCard, currentSeat){
		// Find seat
		var $seat = $("#seat" + (currentSeat.position + 1) + " .cards");

		// Put card in seat
		$seat.append('<div class="card card-'+ currentCard.rank + currentCard.suit +'">&nbsp;</div>');
	});

	$(table).on("deal:community", function(e, currentCard){
		// Put card in community
		$("#community").append('<div class="card card-'+ currentCard.rank + currentCard.suit +'">&nbsp;</div>');
	});
});
