var Common = require("Common");

var RectSizeType = cc.Enum({
    //区分大小写
    MATCH_PARENT: 0,//和父节点一样大
    MATCH_CONTENT: 1,//按内容大小

});

var RectTransform = cc.Class({
    extends: cc.Component,
    statics: {
        //enum
        RectSizeType: RectSizeType,
    },

    properties: {
        _sizeType: RectSizeType.MATCH_CONTENT,
        sizeType: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: RectSizeType,
            get: function () {
                return this._sizeType;
            },
            set: function (value) {
                return this.UpdateType(value);
            },
        },

    },

    UpdateType: function (type) {
        this._sizeType = type;
        var sizeParent = Common.GetSizeOfParnet(this.node);

        switch (this._sizeType) {
            case RectSizeType.MATCH_CONTENT:
                {
                    
                }
                break;
            case RectSizeType.MATCH_PARENT:
                {
                    this.node.setContentSize(sizeParent);
                }
                break;

        }
    },

});
// cc.RectTransform = module.export = RectTransform;

