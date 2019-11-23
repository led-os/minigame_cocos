

//对齐
var LayOutVertical = cc.Class({
    extends: cc.LayOutGrid,


    properties: {

    },
    onLoad: function () {
        this.col = 1;
        this.row = this.GetChildCount();
        this.LayOut();

    },
    LayOut: function () {
        this.row = this.GetChildCount();
        this._super();
    },

});

cc.LayOutVertical = module.export = LayOutVertical; 
