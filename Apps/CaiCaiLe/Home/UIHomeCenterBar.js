var UIView = require("UIView");
var AppRes = require("AppRes");
cc.Class({
    extends: UIView,
    properties: {
        indexAction: 0,
        timeAction: 0.3,
        isActionFinish: false,
        btnLearn: cc.UIButton,
        btnAdVideo: cc.UIButton,
        btnAddLove: cc.UIButton,

    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        this.btnLearn.UpdateImage({ 
            bg: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_ICON_LEARN,
            success: function () {
            }.bind(this),
        });

        this.btnAdVideo.UpdateImage({ 
            bg: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_ICON_VIDEO,
            success: function () {
            }.bind(this),
        });


        this.btnAddLove.UpdateImage({ 
            bg: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_ICON_LOVE,
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

