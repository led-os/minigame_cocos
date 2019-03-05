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

//对齐
var LayoutAlign = cc.Class({
    extends: cc.Component,

    statics: {
        //enum
        AlignType: AlignType,

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
    },




    onLoad: function () {
        cc.Debug.Log("onLoad this.alignType=" + this.alignType);
        this.UpdateType(this.alignType);

    },

    UpdateType: function (type) {
        this._alignType = type;
        if (type == AlignType.NONE) {
            return;
        }
        var x, y, w, h;
        var rectParent = this.node.parent.getBoundingBox();
        var sizeParent = this.node.parent.getContentSize();
        var w_parent = rectParent.width;
        var h_parent = rectParent.height;
        w_parent = sizeParent.width;
        h_parent = sizeParent.height;
        var sizeCanvas = cc.Common.GetSizeCanvas(null);//屏幕分辨率
        if (w_parent == 0) {
            w_parent = sizeCanvas.width;
        }
        if (h_parent == 0) {
            h_parent = sizeCanvas.height;
        }


        var size = this.node.getContentSize();
        w = size.width;
        h = size.height;
        x = this.node.getPosition().x;
        y = this.node.getPosition().y;
        cc.Debug.Log("UpdateType this.alignType=" + this._alignType + " w=" + w + " h=" + h + " x=" + x + " y=" + y + " w_parent=" + w_parent + " h_parent=" + h_parent);
        //Common.appSceneMain.sizeCanvas.height 
        switch (this._alignType) {
            case AlignType.UP:
                {
                    x = this.node.getPosition().x;
                    y = h_parent / 2 - h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.DOWN:
                {
                    x = this.node.getPosition().x;
                    y = -h_parent / 2 + h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.LEFT:
                {
                    x = -w_parent / 2 + w / 2;
                    y = this.node.getPosition().y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.RIGHT:
                {
                    x = w_parent / 2 - w / 2;
                    y = this.node.getPosition().y;
                    this.node.setPosition(x, y, 0);
                }
                break;

            case AlignType.UP_LEFT:
                {
                    //x = this.node.getPosition().x;
                    x = -w_parent / 2 + w / 2;
                    y = h_parent / 2 - h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.UP_RIGHT:
                {
                    x = w_parent / 2 - w / 2;
                    y = h_parent / 2 - h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.DOWN_LEFT:
                {
                    x = -w_parent / 2 + w / 2;
                    y = -h_parent / 2 + h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case AlignType.DOWN_RIGHT:
                {
                    x = w_parent / 2 - w / 2;
                    y = -h_parent / 2 + h / 2;
                    this.node.setPosition(x, y, 0);
                }
                break;

        }
    },

}); 

cc.LayoutAlign = module.export = LayoutAlign; 
