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
};
