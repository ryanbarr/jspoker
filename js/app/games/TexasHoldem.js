define(function(require){

	var constants = require("app/constants"),
		Game = require("object/Game");

    var TexasHoldem = new Game({
    	name: "Texas Hold'em",
    	cardsPerPlayer: 2,
    	handRanks: [
    		{name: "High Card Two", method: "highCardTwo", rank: 0.01},
			{name: "High Card Three", method: "highCardThree", rank: 0.02},
			{name: "High Card Four", method: "highCardFour", rank: 0.03},
			{name: "High Card Five", method: "highCardFive", rank: 0.04},
			{name: "High Card Six", method: "highCardSix", rank: 0.05},
			{name: "High Card Seven", method: "highCardSeven", rank: 0.06},
			{name: "High Card Eight", method: "highCardEight", rank: 0.07},
			{name: "High Card Nine", method: "highCardNine", rank: 0.08},
			{name: "High Card Ten", method: "highCardTen", rank: 0.09},
			{name: "High Card Jack", method: "highCardJack", rank: 0.10},
			{name: "High Card Queen", method: "highCardQueen", rank: 0.11},
			{name: "High Card King", method: "highCardKing", rank: 0.12},
			{name: "High Card Ace", method: "highCardAce", rank: 0.13},
    		{name: "Pair", method: "pair", rank: 1},
    		{name: "Two Pair", method: "twoPair", rank: 2},
    		{name: "Three of a Kind", method: "threeOfAKind", rank: 3},
    		{name: "Straight", method: "straight", rank: 4},
    		{name: "Flush", method: "flush", rank: 5},
    		{name: "Full House", method: "fullHouse", rank: 6},
    		{name: "Four of a Kind", method: "fourOfAKind", rank: 7},
    		{name: "Straight Flush", method: "straightFlush", rank: 8},
    		{name: "Royal Flush", method: "royalFlush", rank: 9}
    	],

    	handMethods: {
    		highCardTwo: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "2"; });
				return hasCard;
			},
			highCardThree: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "3"; });
				return hasCard;
			},
			highCardFour: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "4"; });
				return hasCard;
			},
			highCardFive: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "5"; });
				return hasCard;
			},
			highCardSix: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "6"; });
				return hasCard;
			},
			highCardSeven: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "7"; });
				return hasCard;
			},
			highCardEight: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "8"; });
				return hasCard;
			},
			highCardNine: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "9"; });
				return hasCard;
			},
			highCardTen: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "10"; });
				return hasCard;
			},
			highCardJack: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "J"; });
				return hasCard;
			},
			highCardQueen: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "Q"; });
				return hasCard;
			},
			highCardKing: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "K"; });
				return hasCard;
			},
			highCardAce: function(allCards){ // High Card
				var hasCard = _.find(allCards, function(card) { return card.rank === "A"; });
				return hasCard;
			},
    		pair: function(allCards){ // High Pair
				// Group seven cards into potential pairs.
    			var pairs = _.groupBy(allCards, function(card){
    				return card.rank;
    			});

				// Iterate over potential pairs and return true is a pair is found.
    			var hasPair = _.find(pairs, function(pair){
    				return pair.length === 2;
    			});

				// Return whether or not the hand has a pair.
    			return hasPair;
    		},
    		twoPair: function(allCards){ // High Pair
				var numberOfPairs = 0;

				// Group seven cards into potential pairs.
    			var pairs = _.groupBy(allCards, function(card){
    				return card.rank;
    			});

				// Iterate over potential pairs and increase when a pair is found.
    			var hasPair = _.find(pairs, function(pair){
					if (pair.length === 2) {
	    				numberOfPairs++;
					}
    			});

				// Return whether or not the player has more than one pair.
    			return numberOfPairs > 1;
			},
    		threeOfAKind: function(allCards){ // High Trips
				// Group seven cards into matches.
    			var groups = _.groupBy(allCards, function(card){
    				return card.rank;
    			});

				// Iterate over potential pairs and return true trips is found.
    			var hasTrips = _.find(groups, function(group){
    				return group.length === 3;
    			});

				// Return whether or not the hand has trips.
    			return hasTrips;
			},
    		straight: function(allCards){ // High Card
				// Pull all of the ranks from the hand.
				var ranks = _.map(allCards, function(card){ return card.rank; });

				// Turn ranks into their matching key values from constants.
				var ranksKeys = [];
				_.each(ranks, function(rank){
					ranksKeys.push(_.indexOf(constants.ranks, rank));
				});

				// Sort the ranks keys to put them in order before we identify a sequence.
				ranksKeys = _.sortBy(ranksKeys, function(rankIndex){ return rankIndex; });

				// Set a counter for how many cards are in order. A single card will technically always be "in order".
				var inOrder = 1;

				// Iterate over the sorted ranksKeys and if the difference between the current and previous is one,
				// then increase inOrder by one. If they are not in order, reset inOrder to 1. If inOrder ever reaches
				// 5, then we know we have a straight and we should stop checking.
				for (var i = 0; i < ranksKeys.length-1; i++) {
					if (inOrder === 5) { break; }

					var currentCard = ranksKeys[i],
						nextCard = ranksKeys[i+1];

					if (nextCard-currentCard === 1) {
						inOrder++;
					} else {
						inOrder = 1;
					}
				}

				return inOrder === 5;
			},
    		flush: function(allCards){ // High Card
				// Group seven cards into matches of suits.
    			var groups = _.groupBy(allCards, function(card){
    				return card.suit;
    			});

				// Iterate over potential matches and return true a flush is found.
    			var hasFlush = _.find(groups, function(group){
    				return group.length >= 5;
    			});

				return hasFlush;
			},
    		fullHouse: function(allCards){ // Full Of
				// Identify if the player has trips.
    			var hasTrips = this.threeOfAKind(allCards);

				// Identify if the player has a pair.
    			var hasPair = this.pair(allCards);

				// Return true if the player has both trips and a pair.
				return (hasTrips && hasPair);
			},
    		fourOfAKind: function(allCards){ // High Quads
				// Group seven cards into matches of ranks.
    			var groups = _.groupBy(allCards, function(card){
    				return card.rank;
    			});

				// Iterate over potential matches and return true quads are found.
    			var hasQuads = _.find(groups, function(group){
    				return group.length === 4;
    			});

				return hasQuads;
			},
    		straightFlush: function(allCards){ // High Card
				// If the player doesn't have a flush, then no straight flush.
				if (!this.flush(allCards)) { return false; }

				// If the player doesn't have a straight, then no straight flush.
				if (!this.straight(allCards)) { return false; }

				// Group cards into matches of suits.
    			var groups = _.groupBy(allCards, function(card){
    				return card.suit;
    			});

				// Retrieve the group that has the flush cards (5 or more).
				var flushGroup = _.find(groups, function(group){
    				return group.length >= 5;
    			});

				// Reuse our straight method to see if a straight exists within the flush group.
				var hasStraightFlush = this.straight(flushGroup);

				return hasStraightFlush;
			},
    		royalFlush: function(allCards){ // Auto-tie (Will fall to High Card and tie out)
				// If the player doesn't have a flush, then no royal flush.
				if (!this.flush(allCards)) { return false; }

				// If the player doesn't have a straight, then no royal flush.
				if (!this.straight(allCards)) { return false; }

				// If the player doesn't have a straight flush, then no royal flush.
				if (!this.straightFlush(allCards)) { return false; }

				// Group cards into matches of suits.
    			var groups = _.groupBy(allCards, function(card){
    				return card.suit;
    			});

				// Retrieve the group that has the flush cards (5 or more).
				var flushGroup = _.find(groups, function(group){
    				return group.length >= 5;
    			});

				var hasAce = _.find(flushGroup, function(card){ return card.rank === "A"; });
				var hasKing = _.find(flushGroup, function(card){ return card.rank === "K"; });
				var hasQueen = _.find(flushGroup, function(card){ return card.rank === "Q"; });
				var hasJack = _.find(flushGroup, function(card){ return card.rank === "J"; });
				var hasTen = _.find(flushGroup, function(card){ return card.rank === "10"; });

				var hasRoyalFlush = (hasAce && hasKing && hasQueen && hasJack && hasTen);

				return hasRoyalFlush;
			}
    	},

    	determineHandRank: function(hand, community){
 			var self = this,
 				playerHandRank = -1,
 				allCards = _.union(hand, community);

			// Iterate over all handRanks.
 			_.each(self.handRanks, function(handRank){
				// Call the handRank method to determine if the player has the hand.
 				var hasHand = self.handMethods[handRank.method](allCards);

				// If the player has the current hand, increase their hand rank.
 				if (hasHand) {
					// Only increase hand rank if the new rank is higher.
 					playerHandRank = (handRank.rank > playerHandRank) ? handRank.rank : playerHandRank;
 				}
 			});

 			return playerHandRank;
    	},

    	determineWinner: function(table){
			var self = this,
				seats = table.seats,
				winningSeats = [];

    		// Determine Players' Hands
    		_.each(seats, function(seat){
				seat.handRank = self.determineHandRank(seat.cards, table.community);
    		});

    		// Determine Best Hands (Group Seats by Hand Rank).
			var groupedRanks = _.groupBy(seats, function(seat){
				return parseFloat(seat.handRank);
			});

			// Sort the applicable hand ranks, and reverse them so 0 key is the highest.
			var sortedRanks = _.sortBy(_.keys(groupedRanks), function(rank){ return parseFloat(rank); }).reverse();

			// Pull the winner(s) from the groupedRanks.
			var winners = groupedRanks[sortedRanks[0]];
			console.log("Winners: ", winners);
			// If there are more than one winner, determine the best hand.
			if (winners.length > 1) {
				// Determine what type of hand we have. (High card, higher pair, higher trips, full house.)
				var highPair = [1, 2], // Pair, Two Pair
					highTrips = [3], // Trips
					highQuads = [7], // Quads
					fullOf = [6], // Full House
					winningHandRank = parseFloat(sortedRanks[0]),
					winningSeatsKeys = [];

				// If its not high pair, high trips, or full house then we assume High Card.
				if (_.contains(highPair, winningHandRank)) { // Pair, Two Pair

					if (winningHandRank === 1) { // Pair

						console.log("Multiple winners with a Pair")
						var winningPairs = {};

						// Iterate over all the winners and store their pairs.
						_.each(winners, function(currentWinner){
							// Group community and current player's cards together.
			    			var pairs = _.groupBy(_.union(table.community, currentWinner.cards), function(card){
			    				return card.rank;
			    			});

							// Identify the pair the player has by finding which group has two cards.
							var playerPair = _.find(pairs, function(groups){ return groups.length === 2; });

							// Pull the hand rank key (A is 13, K is 12, etc.)
							var handRankKey = _.indexOf(constants.ranks, playerPair[0].rank);

							console.log("Player has Pair of ", handRankKey);

							// If no player has had this pair before, create an array for the pair.
							if (!_.isArray(winningPairs[handRankKey])) {
								winningPairs[handRankKey] = [];
							}

							// Put the current seat in the list for this pair.
							console.log("Current Winner: ", currentWinner);
							winningPairs[handRankKey].push(currentWinner.position);
						});

						// Now that we've grouped the pairs, identify the highest pair.
						var highestPair = _.sortBy(_.keys(winningPairs), function(rank){ return parseFloat(rank); }).reverse();
						console.log("Highest Pair: ", highestPair);
						// If there are multiple players with highest pair, check kickers.
						if (winningPairs[highestPair[0]].length > 1) {

							// Remove pair from card list.

							// Sort remaining five cards high to low.

							// Iterate over remaining high cards until a player beats out the other two.

						// Otherwise, we found our winner!
						} else {
							winningSeatsKeys.push(winningPairs[highestPair[0]][0]);
							console.warn("Winning Pairs ", winningPairs);
							console.info("Highest Pair ", highestPair);
						}
						console.log("Winning seats keys: ", winningSeatsKeys);
					} else { // Two Pair

					}

				} else if (_.contains(highTrips, winningHandRank)) { // Trips

				} else if (_.contains(highQuads, winningHandRank)) { // Quads

				} else if (_.contains(fullOf, winningHandRank)) { // Full House

				} else { // High Card

				}

				// Take winning seat numbers and pull their actual seats again.
				for (var key in winners) {
					if (_.contains(winningSeatsKeys, winners[key].position)) {
						console.log("Adding winning seat to list.");
						winningSeats.push(_.find(winners, function(wn){ return wn.position === winners[key].position; }))
					}
				}
				console.log("Winning Seats: ", winningSeats);
				return winningSeats;
			// If there is only one winner, they are the winner.
			} else {
				var winner = winners[0],
					winningHand = _.find(self.handRanks, function(handRank) { return handRank.rank === winner.handRank; });

				window.pokerLog(winner.player.name + " wins with " + winningHand.name);
				return winner;
			}

    	}
    });

    return TexasHoldem;
});
