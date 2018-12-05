var UIView = require("UIView");
cc.Class({
    extends: UIView,
    properties: {
        index: 0,
        spriteBg: cc.Sprite,
        textTitle: cc.Label,
        btnBack: cc.Button,
    },
    test: function () {
        cc.log("run test");

    },

    UpdateTitle: function (title) {
        this.textTitle.string = title;
    },
    HideBtnBack: function (isHide) {
        this.btnBack.node.active = !isHide;
    }
}); 
