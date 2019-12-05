// var Common = require("Common");


//相对布局 位于target的左边 右边 下边 上边
var LayOutRelation = cc.Class({
    extends: cc.LayOutBase,//HorizontalOrVerticalLayoutBase

    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayOutRelation",
        help: " ",
        // inspector: ' ',
    },

    properties: {
        target: cc.Node,

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
        var pt = this.node.getPosition();
        x = pt.x;
        y = pt.y;
        if (this.target == null) {
            return;
        }
        var rctran = this.node.getComponent(cc.RectTransform);
        if (rctran == null) {
            return;
        }
        w = rctran.width;
        h = rctran.height;

        var rctranTarget = this.target.getComponent(cc.RectTransform);
        if (rctranTarget == null) {
            return;
        }
        var ptTarget = this.target.getPosition();
        //位于target的左边
        if (this.align == cc.Align.LEFT) {
            x = ptTarget.x - rctranTarget.width / 2 - w / 2 - this.offset.x;
        }
        if (this.align == cc.Align.RIGHT) {
            x = ptTarget.x + rctranTarget.width / 2 + w / 2 + this.offset.x;
        }
        if (this.align == cc.Align.UP) {
            y = ptTarget.y + rctranTarget.height / 2 + h / 2 + this.offset.y;
        }
        if (this.align == cc.Align.DOWN) {
            y = ptTarget.y - rctranTarget.height / 2 - h / 2 - this.offset.y;
        }

        //相同位置
        if (this.align == cc.Align.SAME_POSTION) {
            x = ptTarget.x;
            y = ptTarget.y;
        }


        this.node.setPosition(x, y);

    },


});

cc.LayOutRelation = module.export = LayOutRelation; 
