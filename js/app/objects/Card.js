define(function(){
    var Card = function(options){
        this.rank = -1;
        this.suit = -1;

        _.extend(this, options);

        return this;
    };

    return Card;
});
