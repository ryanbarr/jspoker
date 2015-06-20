define(function(require){

	var Deck = require("object/Deck"),
		Game = require("object/Game");

    var Table = function(options){
    	var self = this;
    	self.game = new Game;
		self.totalSeats = 9;
        self.seats = [];
        self.deck = new Deck;
        self.community = [];
        self.pot = [];
		self.activeBets = [];

		self.bet = function(amount, seat){
			// Acknowledge Bet
			self.activeBets[seat] = (self.activeBets[seat]) ? self.activeBets[seat] + amount : amount;
        };

        self.collectActiveBets = function(pot){
			// Iterates the active bets so they can be added to the pot
			_.each(self.activeBets, function(activeBet){
				// If there is an active bet in the current seat, add it to the pot
				if (activeBet) {
					window.pokerLog("Adding " + activeBet + " to pot " + pot);
					// If there is a pot, add active bet to the pot, otherwise start a new pot
					self.pot[pot] = (self.pot[pot]) ? self.pot[pot] + activeBet : activeBet;
				}
			});

			// Clearing the active bets
			self.activeBets.length = 0;
		};

		self.givePot = function(seat, pot){
			// Select the current seat
			var currentSeat = self.seats[seat];

			// Give motherfucker pot
			currentSeat.balance = currentSeat.balance + self.pot[pot];

			// Clearing the pot
			self.pot[pot] = 0;
		};

        self.givePlayersCards = function(numberOfCards){
        	for (var c = 0; c < numberOfCards; c++){
	        	for (var s = 0; s < self.seats.length; s++){
					var currentSeat = self.seats[s];
					var currentCard = self.deck.cards.pop();

					currentSeat.cards.push(currentCard);
					window.pokerLog("Dealing Card " + currentCard.rank + " of " + currentCard.suit + " to " + currentSeat.player.name);

					$(self).trigger("deal:player", [currentCard, currentSeat]);
				};
			};
        };

        self.giveCommunityCards = function(numberOfCards, burnCard){
        	burnCard = ( _.isUndefined(burnCard) ) ? true : burnCard;

        	if (burnCard) {
	        	// Burn Top Card
				self.deck.cards.pop();
				window.pokerLog("Burning Card");
			}

        	for (var c = 0; c < numberOfCards; c++){
	        	var currentCard = self.deck.cards.pop();

	        	self.community.push(currentCard);
				window.pokerLog("Dealing Card " + currentCard.rank + " of " + currentCard.suit + " to Community");
				$(self).trigger("deal:community", [currentCard]);
			};
        };

		self.takePlayersCards = function(){
        	for (var s = 0; s < self.seats.length; s++){
				var currentSeat = self.seats[s];

				// Setting an array's length to 0 empties it. This removes the cards from the current seat.
				currentSeat.cards.length = 0;

				$(self).trigger("clear:player:cards");
			};
		};

		self.takeCommunityCards = function(){
			// Setting an array's length to 0 empties it. This removes the cards from the community.
			self.community.length = 0;

			$(self).trigger("clear:community:cards");
		};

        self.deal = function(){

			// Remove cards from all players.
			self.takePlayersCards();

			// Remove cards from the community.
			self.takeCommunityCards();

            // Reset deck (since we "lose" cards when we deal).
            self.deck = new Deck;

        	// Shuffle Deck
        	self.deck.cards = _.shuffle(self.deck.cards);

        	// Deal to Players
        	self.givePlayersCards(2);

			// Deal Flop
			self.giveCommunityCards(3);

			// Deal Turn
			self.giveCommunityCards(1);

			// Deal River
			self.giveCommunityCards(1);

			// Determine Table Winner
			var winningSeats = self.game.determineWinner(self);

			return winningSeats;
		};

		self.simulateHands = function(numberOfHands, delay){
			// Store the current value of debug so we can reset it later.
			var oldDebug = window.debug,
				executions = 0;

			delay = delay || 0;

			// Turn debugging off to reduce console noise.
			window.debug = false;

			var self = this,
				winningHands = {},
				handRanksForGame = self.game.handRanks,
				timeStart = _.now();

			if (_.isUndefined(numberOfHands)) { return; console.warn("You must provide the numberOfHands you would like to simulate."); }

			// Declare an Immediately Invoked Function Expression (IIFE) which forces a simulation loop.
			(function simulation(i, delay){
				// Deal and get the winner.
				var winningSeat = self.deal();

				// If there were multiple winners, just pick the first for the sake of the simulation.
				// The hand still won regardless of how many people had the hand itself.
				if (_.isArray(winningSeat)) {
					winningSeat = winningSeat[0];
				}

				// If this hand hasn't won before, add it to winning hands.
				if (!winningHands[winningSeat.handRank]) {
					winningHands[winningSeat.handRank] = 0;
				}

				// Increase the number of wins for the hand that won.
				winningHands[winningSeat.handRank] = winningHands[winningSeat.handRank]+1;

				// Decrease i until it hits zero, at which point the simulation will not be run again.
				if (--i) {
					_.delay(simulation, delay, i, delay);
				} else {
					var timeEnd = _.now(),
						runTime = timeEnd - timeStart;

					console.log("Played " + numberOfHands + " hands of " + self.game.name + " in " + runTime/1000 + " seconds.");

					// Output results.
					_.each(winningHands, function(numberOfWins, winningHandRank){
						var hand = _.findWhere(self.game.handRanks, { rank: parseFloat(winningHandRank) });

						console.log(hand.name + " won:", numberOfWins, "(" + ((numberOfWins / numberOfHands) * 100).toFixed(2) + "%)");
					});
				}
			})(numberOfHands, delay);

			// Set debug back to its original state.
			window.debug = oldDebug;
		};

        _.extend(self, options);

        return self;
    };

    return Table;
});
