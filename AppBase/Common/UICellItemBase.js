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
    },
    GotoController: function (controller) {
        if (this.target.controller != null) {
            var navi = this.target.controller.naviController;
            if (navi != null) {
                navi.Push(controller);
            }else{
                cc.Debug.Log("GotoController：navi is null");
            }
        }else{
            cc.Debug.Log("GotoController：this.target.controller is null");
        }
    },
});

//cc.UICellItemBase = module.export = UICellItemBase;

