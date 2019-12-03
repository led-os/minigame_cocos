var UIView = require("UIView");
var AppRes = require("AppRes");
cc.Class({
    extends: UIView,
    properties: {
        indexAction: 0,
        timeAction: 0.3,
        isActionFinish: false,
        btnLearn: cc.Button,
        btnAdVideo: cc.Button,
        btnAddLove: cc.Button,

    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        cc.TextureUtil.UpdateTypeButtonImage({
            btn: this.btnLearn,
            bg: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_LEARN,
            success: function () {
            }.bind(this),
        });

        cc.TextureUtil.UpdateTypeButtonImage({
            btn: this.btnAdVideo,
            bg: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_VIDEO,
            success: function () {
            }.bind(this),
        });


        cc.TextureUtil.UpdateTypeButtonImage({
            btn: this.btnAddLove,
            bg: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_LOVE,
            success: function () {
            }.bind(this),
        });

        this.LayOut();

    },

    start: function () {
        this.LayOut();
    },
    LayOut: function () {
        this._super();
        var size = this.node.getContentSize();
        var x, y, w, h;
        var ly = this.node.getComponent(cc.LayOutGrid);
        var rctran = this.node.getComponent(cc.RectTransform);
        cc.Debug.Log("UIHomeCenterBar  w=  " + rctran.width + " h=" + rctran.height);
        if (ly != null) {
            ly.col = cc.LayoutUtil.main().GetChildCount(this.node, false);
            cc.Debug.Log("GetItemPostion ly.col =" + ly.col);
            //有些按钮隐藏后重新布局
            ly.LayOut();
        }

    },

    OnClickBtnLearn: function (event, customEventData) {
    },
    OnClickBtnAddLove: function (event, customEventData) {
    },

    OnClickBtnAdVideo: function (event, customEventData) {
    },



});

