define(function(){
    var Player = function(options){
        this.name = "";
        this.id = ++currentId;
        this.chips = 0;

        _.extend(this, options);

        return this;
    };

    return Player;
});
