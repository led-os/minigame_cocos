var UIView = require("UIView");

cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.Sprite,
    },

    onLoad: function () {
        this.node.setContentSize(this.node.parent.getContentSize());
        cc.TextureCache.main.Load(cc.AppRes.PLACE_BG, function (err, tex) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
        }.bind(this));
    },


    OnClickBtnBack: function (event, customEventData) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },
});

