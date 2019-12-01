// var Common = require("Common");


//对齐
var LayOutGrid = cc.Class({
    extends: cc.LayOutBase,
    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayOutGrid",
        help: " ",
        // inspector: ' ',
    },

    properties: {
        row: 1,//行
        col: 1,//列  

    },


    onLoad: function () {
        // cc.Debug.Log("onLoad this.alignType=" + this.alignType);
        this.LayOut();

    },

    start: function () {
        this.LayOut();
    },

    // update: function () {
    //     this.LayOut();
    // },

    LayOut: function () {

        var idx = 0;
        var r = 0, c = 0;
        if (!this.enableLayout) {
            return;
        }

        for (var i = 0; i < this.node.children.length; i++) {
            var child = this.node.children[i];
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }

            var le = child.getComponent(cc.LayOutElement);
            if (le != null && le.ignoreLayout) {
                continue;
            }

            if (!this.enableHide) {
                if (!child.active) {
                    //过虑隐藏的
                    continue;
                }
            }

            // if (objtmp.transform.parent != this.gameObject.transform) {
            //     //只找第一层子物体
            //     continue;
            // }

            //  LayoutElement
            //floor 小于等于 x，且与 x 最接近的整数。
            r = Math.floor(idx / this.col);
            c = idx - Math.floor(r * this.col);

            // //从顶部往底部显示
            // if (this.dispLayVertical == cc.LayOutBase.DispLayVertical.TOP_TO_BOTTOM) {
            //     r = this.row - 1 - r;
            // }

            // //从右往左显示
            // if (this.dispLayHorizontal == cc.LayOutBase.DispLayHorizontal.RIGHT_TO_LEFT) {
            //     c = this.col - 1 - c;
            // }

            var pt = this.GetItemPostion(child, r, c);
            var rctran = child.getComponent(cc.RectTransform);
            if (rctran != null) {
                // rctran.anchoredPosition = pt;
                //  Debug.Log("GetItemPostion:idx=" + idx + " r=" + r + " c=" + c + " pt=" + pt);
            }
            child.setPosition(pt.x, pt.y);
            idx++;

        }


    },

    // r 行 ; c 列  返回中心位置 Vector2
    GetItemPostion: function (nodeItem, r, c) {
        var x, y, w, h;
        var rctran = this.node.getComponent(cc.RectTransform);
        if (rctran == null) {
            cc.Debug.Log("GetItemPostion  rctran= null");
            return cc.Vec2.ZERO;
        }

        w = rctran.width - (this.offsetMin.x + this.offsetMax.x);
        h = rctran.height - (this.offsetMin.y + this.offsetMax.y);

        var item_w = (w - (this.space.x * (this.col - 1))) / this.col;
        var item_h = (h - (this.space.y * (this.row - 1))) / this.row;
        x = (-rctran.width / 2 + this.offsetMin.x) + item_w * c + item_w / 2 + this.space.x * c;
        y = (-rctran.height / 2 + this.offsetMin.y) + item_h * r + item_h / 2 + this.space.y * r;
        //  y=-192;
        cc.Debug.Log("GetItemPostion w=" + w + " h=" + h + " x=" + x + " y=" + y + " r=" + r + " c=" + c + " row=" + this.row + " col=" + this.col);
        return new cc.Vec2(x, y);

    },



});

cc.LayOutGrid = module.export = LayOutGrid; 
