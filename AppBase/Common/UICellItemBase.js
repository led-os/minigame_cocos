var UIView = require("UIView");

var UICellItemBase = cc.Class({
    extends: UIView,
    properties: {
        index:0,
    },

    onLoad: function () {
        this._super();
    },
});

//cc.UICellItemBase = module.export = UICellItemBase;

