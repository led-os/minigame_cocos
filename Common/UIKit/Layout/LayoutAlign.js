var Common = require("Common");

var AlignType = cc.Enum({
    //区分大小写
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

//对齐
var LayoutAlign = cc.Class({
    extends: cc.Component,

    statics: {
        //enum
        AlignType: AlignType,

    },

    properties: {
        _alignType: AlignType.UP,
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
    },




    onLoad: function () {
        cc.log("onLoad this.alignType=" + this.alignType);
        this.UpdateType(this.alignType);

    },

    UpdateType: function (type) {
        this._alignType = type;
        cc.log("UpdateType this.alignType=" + this._alignType);
        var x, y, w, h;
        var size = this.node.getContentSize();
        w = size.width;
        h = size.height;

        switch (this._alignType) {
            case AlignType.UP:
                {
                    x = 0;
                    y = Common.appSceneMain.sizeCanvas.height / 2 - h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.DOWN:
                {
                    x = 0;
                    y = -Common.appSceneMain.sizeCanvas.height / 2 + h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.LEFT:
                {
                    x = -Common.appSceneMain.sizeCanvas.width / 2 + w / 2;
                    y = 0;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.RIGHT:
                {
                    x = Common.appSceneMain.sizeCanvas.width / 2 - w / 2;
                    y = 0;
                    this.node.setPosition(x, y, 0);
                }
                break;
        }
    },

}); 
