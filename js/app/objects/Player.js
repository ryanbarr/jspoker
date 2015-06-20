define(function(){
    var constants = require("app/constants");

    var Player = function(options){
    	var self = this;
        self.name = "";
        self.id = ++constants.currentId;
        self.balance = 1000;

        self.withdraw = function(amount){
            self.balance = self.balance - amount;
        };

        self.deposit = function(amount){
        	self.balance = self.balance + amount;
        };

        _.extend(self, options);

        return self;
    };

    return Player;
});
