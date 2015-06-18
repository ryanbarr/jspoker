var Table = function(options){
    this.seats = [];
    this.deck = {};

    _.extend(this, options);

    return this;
};
