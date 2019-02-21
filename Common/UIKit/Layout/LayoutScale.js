// var Common = require("Common");

var LayoutScaleType = cc.Enum({
    //区分大小写
    MIN: 0,
    MAX: 1,

});

var LayoutScale = cc.Class({
    extends: cc.Component,


    statics: {
        //enum
        LayoutScaleType: LayoutScaleType,

        ScaleImage: function (image, isMaxFit) {
           // LayoutScale.ScaleNode(image.node, isMaxFit);
        },


      
    },

    properties: {

        _scaleType: LayoutScaleType.MIN,
        scaleType: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: LayoutScaleType,
            get: function () {
                return this._scaleType;
            },
            set: function (value) {
                return this.UpdateType(value);
            },
        },

    },

    onLoad: function () { 
        this.UpdateType(this.scaleType);
    },
    UpdateType: function (type) {
        this._scaleType = type;
        switch (this._scaleType) {
            case LayoutScaleType.MIN:
                {
                    this.ScaleNode(this.node, false);
                }
                break;
            case LayoutScaleType.MAX:
                {
                    this.ScaleNode(this.node, true);
                }
                break;

        }
    },

    ScaleNode: function (node, isMaxFit) {
        var size = node.getContentSize();

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

        w = size.width;
        h = size.height;

        var scale = 0;
        if (isMaxFit == true) {
            scale = cc.Common.GetMaxFitScale(w, h, w_parent, h_parent);
        } else {
            scale = cc.Common.GetBestFitScale(w, h, w_parent, h_parent);
        }

        node.scaleX = scale;
        node.scaleY = scale;
    },

}); 

cc.LayoutScale = module.export = LayoutScale; 