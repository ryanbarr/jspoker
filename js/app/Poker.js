define(function(require){

	var constants = require("app/constants"),
		Player = require("object/Player"),
		Table = require("object/Table"),
		Seat = require("object/Seat"),
		TexasHoldem = require("game/TexasHoldem");

    var Poker = function(options){
		this.players = [];
		this.idlePlayers = [];
		this.tables = [];

		// Temporary manual table creation. This will be removed.
		var table = new Table({
			game: TexasHoldem,
			name: "No Limit Texas Hold'em 20/40"
		});
		this.tables.push(table);

		// Creating New Players
		var kyle = new Player({ name: "Kyle" });
		var ryan = new Player({	name: "Spooky" });
		var john = new Player({	name: "John" });
		var pete = new Player({	name: "Pete" });
		var bill = new Player({	name: "Bill" });

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

		$(table).on("deal:player", function(e, currentCard, currentSeat){
			// Find seat
			var $seat = $("#seat" + (currentSeat.position + 1) + " .cards");

			// Put card in seat
			$seat.append('<div class="card card-'+ currentCard.rank + currentCard.suit +'">&nbsp;</div>');
		});

		$(table).on("deal:community", function(e, currentCard){
			// Put card in community
			$("#community .cards").append('<div class="card card-'+ currentCard.rank + currentCard.suit +'">&nbsp;</div>');
		});

		$(table).on("clear:player:cards", function(e){
			// Put card in community
			$(".seat .cards").empty();
		});

		$(table).on("clear:community:cards", function(e){
			// Put card in community
			$("#community .cards").empty();
		});

        _.extend(this, options);

        return this;
    };

	return Poker;
});
