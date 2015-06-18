define(function(){
    var Seat = function(options){
        this.player = {};
        this.cards = [];

        _.extend(this, options);

        return this;
    };

    return Seat;
});
