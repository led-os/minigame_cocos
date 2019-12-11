var UIView = require("UIView");
var UIViewPop = require("UIViewPop");
var UIGameFail = cc.Class({
    extends: UIViewPop,

    editor: CC_EDITOR && {
        menu: "GameFinish/UIGameFail",
        help: " ",
        // inspector: ' ',
    },
    properties: {
        textTitle: cc.UIText,
        imageBg: cc.UIImage,
        btnRetry: cc.UIButton,
    },
    onLoad: function () {
        var oft = 32;
        this.imageBg.UpdateImage({
            pic: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BoardPic,//IMAGE_HOME_NAME_BG
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
            }.bind(this),
        });

        oft = 20;
        this.btnRetry.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_COMMON,
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
            }.bind(this),
        });
    },
    LayOut() {
        this._super();
    },

    UpdateItem(info) {
        this.textTitle.text = info.title;
    },
    OnClickBtnClose() {
        this.Close();
    },
    OnClickBtnRetry() {
        this.Close();
        cc.GameManager.main().GotoPlayAgain();
    },

});

