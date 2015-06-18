define(function(){
    var Game = function(options){
        this.name = "";
        this.cardsPerPlayer = 0;
        this.handRanks = [];

        _.extend(this, options);

        return this;
    };

    return Game;
});
