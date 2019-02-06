var UIView = require("UIView");
cc.Class({
    extends: UIView,
    properties: {
        index: 0,
        spriteBg: cc.Sprite,
        textTitle: cc.Label,
        btnBack: cc.Button,
    },
    onLoad: function () {
        this.btnBack.node.active = false;
    },

    UpdateTitle: function (title) {
        this.textTitle.string = title;
    },
    HideBtnBack: function (isHide) {
       // this.btnBack.node.active = !isHide;
    }
}); 
