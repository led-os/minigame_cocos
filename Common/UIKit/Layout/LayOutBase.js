// var Common = require("Common");

var AlignType = cc.Enum({
    //区分大小写
    NONE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    UP_LEFT: 5,
    UP_RIGHT: 6,
    DOWN_LEFT: 7,
    DOWN_RIGHT: 8,

});

var DispLayVertical = cc.Enum({
    //区分大小写
    TOP_TO_BOTTOM: 0,
    BOTTOM_TO_TOP: 1,

});

var DispLayHorizontal = cc.Enum({
    //区分大小写
    LEFT_TO_RIGHT: 0,
    RIGHT_TO_LEFT: 1,

});



//对齐
var LayOutBase = cc.Class({
    extends: cc.Component,
    statics: {
        //enum
        AlignType: AlignType,
        DispLayVertical: DispLayVertical,
        DispLayHorizontal: DispLayHorizontal,
    },

    properties: {
        _alignType: AlignType.NONE,
        alignType: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: AlignType,
            get: function () {
                return this._alignType;
            },
            set: function (value) {
                return this.UpdateType(value);
            },
        },


        //     The offset of the lower left corner of the rectangle relative to the lower left
        //     anchor.
        _offsetMin: cc.Vec2,
        offsetMin:
        {
            type: cc.Vec2,
            get: function () {
                return this._offsetMin;
            },
            set: function (value) {
                this._offsetMin = value;
                this.LayOut();
            },
        },

        _offsetMax: cc.Vec2,
        //     The offset of the upper right corner of the rectangle relative to the upper right
        //     anchor.
        offsetMax:
        {
            type: cc.Vec2,
            get: function () {
                return this._offsetMax;
            },
            set: function (value) {
                this._offsetMax = value;
                this.LayOut();
            },
        },

        dispLayVertical: DispLayVertical,
        dispLayHorizontal: DispLayHorizontal,
        enableLayout: true,
        enableHide: true,//是否过虑Hide
        space: cc.Vec2,
    },




    onLoad: function () {
        // cc.Debug.Log("onLoad this.alignType=" + this.alignType);
        this.LayOut();

    },
    LayOut: function () {
    },

    GetChildCount: function (includeHide = true) {
        var count = 0;
        for (var i = 0; i < this.node.children.length; i++) {
            var child = this.node.children[i];
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }
            //     GameObject objtmp = child.gameObject;
            //     if (this.gameObject == objtmp) {
            //         continue;
            //     }

            if (!includeHide) {
                if (!child.active) {
                    //过虑隐藏的
                    continue;
                }
            }

            var le = child.getComponent(cc.LayOutElement);
            if (le != null && le.ignoreLayout) {
                continue;
            }
 
            //     if (objtmp.transform.parent != this.gameObject.transform) {
            //         //只找第一层子物体
            //         continue;
            //     }
            count++;


        }

        return count;
    }

});

cc.LayOutBase = module.export = LayOutBase; 
