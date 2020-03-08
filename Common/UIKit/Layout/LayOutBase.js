// var Common = require("Common");

// var AlignType = cc.Enum({
//     //区分大小写
//     NONE: 0,
//     UP: 1,
//     DOWN: 2,
//     LEFT: 3,
//     RIGHT: 4,
//     UP_LEFT: 5,
//     UP_RIGHT: 6,
//     DOWN_LEFT: 7,
//     DOWN_RIGHT: 8,
//     CENTER: 9,
// });

var Direction = cc.Enum({
    //区分大小写
    TOP_TO_BOTTOM: 0,
    BOTTOM_TO_TOP: 1,
    LEFT_TO_RIGHT: 2,
    RIGHT_TO_LEFT: 3,

});



//对齐
var LayOutBase = cc.Class({
    extends: cc.Component,
    statics: {
        //enum
        // AlignType: AlignType,
        Direction: Direction,
    },

    properties: {
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

        enableLayout: true,
        enableHide: true,//是否包含Hide true 包含 false  不包含
        space: cc.Vec2,
        // align: cc.AlignNONE,
        align: {
            default: cc.Align.Horizontal,
            type: cc.Align
        },
        directionVertical: {
            default: Direction.TOP_TO_BOTTOM,
            type: Direction
        },
        directionHorizontal: {
            default: Direction.LEFT_TO_RIGHT,
            type: Direction
        },

    },




    onLoad: function () {
        // cc.Debug.Log("onLoad this.alignType=" + this.alignType);
        this.LayOut();

    },
    LayOut: function () {
    },


});

cc.LayOutBase = module.export = LayOutBase; 
