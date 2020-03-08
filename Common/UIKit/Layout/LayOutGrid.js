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

        //是否控制大小
        childControlHeight: false,
        childControlWidth: false,

        //是否整个区域展开
        childForceExpandHeight: false,
        childForceExpandWidth: false,

    },


    onLoad: function () {
        //this.directionVertical = cc.LayOutBase.directionVertical.TOP_TO_BOTTOM;
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

            //从顶部往底部显示
            if (this.directionVertical == cc.LayOutBase.Direction.TOP_TO_BOTTOM) {
                r = this.row - 1 - r;
            }

            //从右往左显示
            if (this.directionHorizontal == cc.LayOutBase.Direction.RIGHT_TO_LEFT) {
                c = this.col - 1 - c;
            }

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
        w = rctran.width;
        h = rctran.height;
        var item_w = 0, item_h = 0, x_left = 0, y_bottom = 0, w_total = 0, h_total = 0;

        var rctranItem = nodeItem.getComponent(cc.RectTransform);

        if (this.childControlWidth) {
            item_w = (w - (this.space.x * (this.col - 1))) / this.col;
            // rctranItem.sizeDelta = new Vector2(item_w, rctranItem.sizeDelta.y);
            rctranItem.width = item_w;
        }
        else {
            item_w = rctranItem.width;
        }

        if (this.childControlHeight) {
            item_h = (h - (this.space.y * (this.row - 1))) / this.row;
            // rctranItem.sizeDelta = new Vector2(rctranItem.sizeDelta.x, item_h);
            rctranItem.height = item_w;
        }
        else {
            item_h = rctranItem.height;
        }

        w_total = item_w * this.col + (this.space.x * (this.col - 1));
        h_total = item_h * this.row + (this.space.y * (this.row - 1));

        if (this.childForceExpandWidth) {
            x_left = -w / 2;
        }
        else {
            if (this.align == cc.Align.LEFT) {
                x_left = -w / 2;
            }
            else if (this.align == cc.Align.RIGHT) {
                x_left = w / 2 - w_total;
            }
            else {
                //CENTER
                x_left = -w_total / 2;
            }
        }

        x = x_left + item_w * c + item_w / 2 + this.space.x * c;
        cc.Debug.Log("x_left=" + " item_w=" + item_w);

        if (this.childForceExpandHeight) {
            y_bottom = -h / 2;
        }
        else {
            if (this.align == cc.Align.DOWN) {
                y_bottom = -h / 2;
            }
            else if (this.align == cc.Align.UP) {
                y_bottom = h / 2 - h_total;
            }
            else {
                //CENTER
                y_bottom = -h_total / 2;
            }
        }
        y = y_bottom + item_h * r + item_h / 2 + this.space.y * r;
        return new cc.Vec2(x, y);

    },

    // // r 行 ; c 列  返回中心位置 Vector2
    // GetItemPostion: function (nodeItem, r, c) {
    //     var x, y, w, h;
    //     var rctran = this.node.getComponent(cc.RectTransform);
    //     if (rctran == null) {
    //         cc.Debug.Log("GetItemPostion  rctran= null");
    //         return cc.Vec2.ZERO;
    //     }

    //     w = rctran.width - (this.offsetMin.x + this.offsetMax.x);
    //     h = rctran.height - (this.offsetMin.y + this.offsetMax.y);

    //     var item_w = (w - (this.space.x * (this.col - 1))) / this.col;
    //     var item_h = (h - (this.space.y * (this.row - 1))) / this.row;
    //     x = (-rctran.width / 2 + this.offsetMin.x) + item_w * c + item_w / 2 + this.space.x * c;
    //     y = (-rctran.height / 2 + this.offsetMin.y) + item_h * r + item_h / 2 + this.space.y * r;
    //     //  y=-192;
    //     cc.Debug.Log("GetItemPostion w=" + w + " h=" + h + " x=" + x + " y=" + y + " r=" + r + " c=" + c + " row=" + this.row + " col=" + this.col);
    //     return new cc.Vec2(x, y);

    // },



});

cc.LayOutGrid = module.export = LayOutGrid; 
