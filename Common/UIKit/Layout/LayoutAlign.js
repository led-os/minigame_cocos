var Common = require("Common");


// var AlignType = cc.Enum({
//     Up: 0,
//     Down: 1,
//     Left: 2,
//     Right: 3
// });

// //其他脚本访问
// module.exports = {
//     AlignType:AlignType, 
// };

//对齐
var LayoutAlign = cc.Class({
    extends: cc.Component,
    properties: {
        // _alignType: {
        //     default: AlignType.Up,
        //     type: AlignType,
        // },
        _alignType:0,
        alignType: {
            get: function () {
                return this._alignType;
            },
            set: function (value) {
                this.UpdateType(value);
            },
        },
    },

    statics: {
        ALIGN_UP:0,
        ALIGN_DOWN:1,
        ALIGN_LEFT:2,
        ALIGN_RIGHT:3,

    },


    onLoad: function () {
        cc.log("onLoad this.alignType=" + this._alignType);

    },

    UpdateType: function (type) {
        this._alignType = type;
        cc.log("UpdateType this.alignType=" + this._alignType);
        var x, y, w, h;
        w = Common.appSceneMain.sizeCanvas.width;
        var size = this.node.getContentSize();
        h = size.height;
 
        switch (this._alignType) {
            case LayoutAlign.ALIGN_UP:
                {
                    y = Common.appSceneMain.sizeCanvas.height / 2 - h / 2;
                    this.node.setPosition(0, y, 0);
                }
                break;
            case LayoutAlign.ALIGN_DOWN:
                {
                    y = -Common.appSceneMain.sizeCanvas.height / 2 + h / 2;
                    this.node.setPosition(0, y, 0);
                }
                break;
        }
    },

}); 
