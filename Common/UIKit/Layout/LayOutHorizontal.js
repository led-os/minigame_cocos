// var Common = require("Common");


//对齐
var LayOutHorizontal = cc.Class({
    extends: cc.HorizontalOrVerticalLayoutBase,


    properties: {

    },

    onLoad: function () {
        this.row = 1;
        this.col = this.GetChildCount();
        this.LayOut();

    },
    start: function () {
        this.LayOut();
    },
    LayOut: function () {
        this.col = this.GetChildCount();
        this._super();
    },


});

cc.LayOutHorizontal = module.export = LayOutHorizontal; 
