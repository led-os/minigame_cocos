var UIView = require("UIView");
// var Common = require("Common");
cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.UIImage,
    },

    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
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

