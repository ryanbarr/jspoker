define(function(){
    var Seat = function(options){
        this.player = {};

        _.extend(this, options);

        return this;
    };

    return Seat;
});
