// poker.js

// Constants
var ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"],
	suits = ["C","D","H","S"],
	currentId = 0;

// Objects
var Deck = function(options){
		this.cards = [];

		// Iterate Over Ranks
		for (var i = 0; i < ranks.length; i++){
			// Iterate Over Suits
			for (var x = 0; x < suits.length; x++){
				var card = new Card({
					suit: suits[x],
					rank: ranks[i]
				});

				this.cards.push(card);
			}
		}

		_.extend(this, options);

		return this;
	},
	Card = function(options){
		this.rank = -1;
		this.suit = -1;

		_.extend(this, options);

		return this;
	},
	Table = function(options){
		this.seats = [];
		this.deck = {};

		_.extend(this, options);

		return this;
	},
	Seat = function(options){
		this.player = {};

		_.extend(this, options);

		return this;
	},
	Player = function(options){
		this.name = "";
		this.id = ++currentId;
		this.chips = 0;

		_.extend(this, options);

		return this;
	};

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