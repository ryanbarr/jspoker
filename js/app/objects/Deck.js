define(function(require){

	var constants = require("app/constants"),
		Card = require("object/Card");

	var Deck = function(options){
		this.cards = [];

		// Iterate Over Ranks
		for (var i = 0; i < constants.ranks.length; i++){
			// Iterate Over Suits
			for (var x = 0; x < constants.suits.length; x++){
				var card = new Card({
					suit: constants.suits[x],
					rank: constants.ranks[i]
				});

				this.cards.push(card);
			}
		}

		_.extend(this, options);

		return this;
	};

	return Deck;
});
