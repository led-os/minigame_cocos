

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
        this.col = 1;
        this.row = cc.LayoutUtil.main().GetChildCount(this.node);
        this.LayOut();

    },
    LayOut: function () {
        this.row = cc.LayoutUtil.main().GetChildCount(this.node);
        this._super();
    },

});

cc.LayOutVertical = module.export = LayOutVertical; 
