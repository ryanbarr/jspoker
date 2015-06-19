define(function(){
    var constants = require("app/constants");

    var Player = function(options){
        this.name = "";
        this.id = ++constants.currentId;
        this.chips = 0;

        _.extend(this, options);

        return this;
    };

    return Player;
});
