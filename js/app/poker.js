// poker.js
define(function(require){

	var _ = require("lib/underscore"),
		constants = require("app/constants"),
		Player = require("object/Player"),
		Table = require("object/Table"),
		Seat = require("object/Seat"),
		Deck = require("object/Deck");

	// SETUP

	// Creating New Players
	var kyle = new Player({
		name: "Kyle"
	});
	var ryan = new Player({
		name: "Spooky"
	});

	// Create Table
	var table = new Table({
		name: "No Limit Texas Hold'em 20/40"
	});

	// Creating Seats
	var seatOne = new Seat({
		player: kyle
	});
	var seatTwo = new Seat({
		player: ryan
	});

	// Move Seats to Table
	table.seats.push(seatOne, seatTwo);

	// Generate Deck
	var deck = new Deck;

	// Place Deck on Fucking Table
	table.deck = deck;

	// Put the table on Window so its accessible outside of this scope.
	window.table = table;

});
