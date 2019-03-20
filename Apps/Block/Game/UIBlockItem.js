
var UIView = require("UIView");
var UIBlockItem = cc.Class({
    extends: UIView,// cc.ItemInfo,
    properties: {
        imageBg: cc.Sprite,
    },

    LayOut: function () {
        this.imageBg.node.setPosition(0, 0);
    },

}); 