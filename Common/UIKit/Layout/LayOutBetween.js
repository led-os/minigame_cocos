// var Common = require("Common");


/*相对布局 
在target1和target2的中心位置 Horizontal  Vertical
在target1和屏幕边界的中心位置cc.Align.LEFT cc.Align.RIGHT cc.Align.UP cc.Align.DOWN

*/

var LayOutBetween = cc.Class({
    extends: cc.LayOutBase,//HorizontalOrVerticalLayoutBase

    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayOutBetween",
        help: " ",
        // inspector: ' ',
    },

    properties: {
        target1: cc.Node,
        target2: cc.Node,
        _offset: cc.Vec2.ZERO,
        offset:
        {
            type: cc.Vec2,
            get: function () {
                return this._offset;
            },
            set: function (value) {
                this._offset = value;
                this.LayOut();
            },
        },
    },

    onLoad: function () {
        //  this.row = 1;
        //  this.col = this.GetChildCount(); 
        this.LayOut();

    },
    start: function () {
        this.LayOut();
    },
    LayOut: function () {
        /// this.col = this.GetChildCount(); 
        this._super();
        var x, y, w, h;
        cc.Debug.Log("LayOutBetween LayOut");
        var pt = this.node.getPosition();
        x = pt.x;
        y = pt.y;
        if (this.target1 == null) {
            return;
        }

        var rctran = this.node.getComponent(cc.RectTransform);
        if (rctran == null) {
            return;
        }
        //左右
        if (this.align == cc.Align.Horizontal) {
            x = cc.LayoutUtil.main().GetBetweenCenterX(this.target1, this.target2);
        }
        if (this.align == cc.Align.Vertical) {
            y = cc.LayoutUtil.main().GetBetweenCenterY(this.target1, this.target2);
        }

        //屏幕边界
        if ((this.align == cc.Align.LEFT) || (this.align == cc.Align.RIGHT)) {
            x = cc.LayoutUtil.main().GetBetweenScreenCenter(this.target1, this.align);
        }
        if ((this.align == cc.Align.UP) || (this.align == cc.Align.DOWN)) {
            y = cc.LayoutUtil.main().GetBetweenScreenCenter(this.target1, this.align);
        }
        cc.Debug.Log("LayOutBetween x=" + x + " y=" + y + " align=" + this.align);
        this.node.setPosition(x, y);

    },


});

cc.LayOutBetween = module.export = LayOutBetween; 
