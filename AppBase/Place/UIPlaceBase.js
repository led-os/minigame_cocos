var UIView = require("UIView");

cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.UIImage,
    },

    onLoad: function () {
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

