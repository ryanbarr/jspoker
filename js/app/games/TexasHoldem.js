define(function(require){

	var Game = require("object/Game");

    var TexasHoldem = new Game({
    	name: "Texas Hold'em",
    	cardsPerPlayer: 2,
    	handRanks: [
    		{name: "High Card", method: "highCard", rank: 0},
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
    		highCard: function(){},
    		pair: function(allCards){
    			var pairs = _.groupBy(allCards, function(card){
    				return card.rank;
    			});

    			var hasPair = _.find(pairs, function(pair){
    				return pair.length === 2;
    			});

    			return hasPair;
    		},
    		twoPair: function(){},
    		threeOfAKind: function(){},
    		straight: function(){},
    		flush: function(){},
    		fullHouse: function(){},
    		fourOfAKind: function(){},
    		straightFlush: function(){},
    		royalFlush: function(){}
    	},

    	parseHand: function(hand, community){
 			var self = this,
 				handRank = -1,
 				allCards = _.union(hand, community);

 			_.each(self.handRanks, function(handRank){
 				var hasHand = self.handMethods[handRank.method](allCards);

 				if (hasHand) {
 					handRank = handRank.rank;
 				}
 			});

 			return handRank;
    	},

    	determineWinner: function(table){
    		// Determine Players' Hands
    		_.each(table.seats, function(seat){
    			var currentPlayer = seat.player;

    			
    		});

    		// Determine Winner
    	}
    });

    return TexasHoldem;
});
