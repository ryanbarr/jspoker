define(function(){
    var Seat = function(options){
        var self = this;
        self.player = {};
        self.cards = [];
        self.balance = 0;

        self.withdraw = function(amount){
            self.balance = self.balance - amount;
        };

        self.deposit = function(amount){
        	self.balance = self.balance + amount;
        };

        _.extend(self, options);

        return self;
    };

    return Seat;
});
