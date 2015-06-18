// poker.js

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
