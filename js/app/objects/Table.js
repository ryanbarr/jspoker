define(function(require){

	var Deck = require("object/Deck"),
		Game = require("object/Game");


    var Table = function(options){
    	var self = this;
    	self.game = new Game;
        self.seats = [];
        self.deck = new Deck;
        self.community = [];

        self.givePlayersCards = function(numberOfCards){
        	for (var c = 0; c < numberOfCards; c++){
	        	for (var s = 0; s < self.seats.length; s++){
					var currentSeat = self.seats[s];
					var currentCard = self.deck.cards.pop();

					currentSeat.cards.push(currentCard);
					window.pokerLog("Dealing Card " + currentCard.rank + " of " + currentCard.suit + " to " + currentSeat.player.name);
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
			};
        };

        self.deal = function(){

        	// Randomly Select Dealer
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

			// Determine Winner

		};

        _.extend(self, options);

        return self;
    };

    return Table;
});
