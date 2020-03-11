

//对齐
var LayOutVertical = cc.Class({
    extends: cc.HorizontalOrVerticalLayoutBase,

    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayOutVertical",
        help: " ",
        // inspector: ' ',
    },

    properties: {

    },
    onLoad: function () {
        //this.directionVertical = cc.LayOutBase.directionVertical.TOP_TO_BOTTOM;
        this.col = 1; 
        this.LayOut();

    },
 
    LayOut: function () {
        this.row = cc.LayoutUtil.main().GetChildCount(this.node,this.enableHide);
        this._super();
    },

});

cc.LayOutVertical = module.export = LayOutVertical; 
