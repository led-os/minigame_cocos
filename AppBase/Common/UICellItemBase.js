var UIView = require("UIView");

var UICellItemBase = cc.Class({
    //extends: UIView,
    extends: require('viewCell'),
    properties: {
        index: 0,
        onClickCallBack: null, 
    },

    onLoad: function () {
        this._super();
    },
    GetUIViewParent: function () {
        return this.node.parent.uiViewParent;
    }
});

//cc.UICellItemBase = module.export = UICellItemBase;

