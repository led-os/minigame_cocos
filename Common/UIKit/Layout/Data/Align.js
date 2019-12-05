// var Common = require("Common");

var Align = cc.Enum({
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
    CENTER: 9,
    Horizontal: 10,
    Vertical: 11,
    SAME_POSTION: 12,
});


//对齐
// var Align = cc.Class({
//     extends: cc.Object,
//     statics: {
//         //enum
//         AlignType: AlignType,
//     },

// });

cc.Align = module.export = Align;
//cc.LayoutDirection = module.export = LayoutDirection;

