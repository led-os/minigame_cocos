// var Common = require("Common");


//对齐
var LayOutHorizontal = cc.Class({
    extends: cc.HorizontalOrVerticalLayoutBase,//HorizontalOrVerticalLayoutBase
    properties: {

    },

    onLoad: function () {
        //  this.row = 1;
        //  this.col = this.GetChildCount();
        cc.Debug.Log("LayOutHorizontal onLoad"); 
        this.LayOut();

    },
    start: function () {
        cc.Debug.Log("LayOutHorizontal start");
        this.LayOut();
    },
    LayOut: function () {
        this.col = this.GetChildCount();
        cc.Debug.Log("LayOutHorizontal LayOut");
        this._super();
    },


});

cc.LayOutHorizontal = module.export = LayOutHorizontal; 
