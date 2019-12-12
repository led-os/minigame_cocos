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
        textDetail: cc.UIText,
        imageBg: cc.UIImage,
        imageHead: cc.UIImage,
        btnRetry: cc.UIButton,
    },
    onLoad: function () {

        cc.ColorConfig.main().GetColor({
            key: cc.GameRes.KEY_COLOR_GameWinTitle,
            def: cc.Color.BLACK,
            success: function (color) {
                this.textTitle.color = color;
                this.btnRetry.color = color;
            }.bind(this),
        });

        cc.ColorConfig.main().GetColor({
            key: cc.GameRes.KEY_COLOR_GameWinTextView,
            def: cc.Color.BLACK,
            success: function (color) {
                this.textDetail.color = color;
            }.bind(this),
        });


        var oft = 110;
        this.imageBg.UpdateImage({
            pic: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_GameWinBg,//IMAGE_HOME_NAME_BG
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
            }.bind(this),
        });


        oft = 20;
        this.imageHead.UpdateImage({
            pic: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_GameWinHead,//IMAGE_HOME_NAME_BG
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
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_GameWinBtn,
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
            }.bind(this),
        });

        this.btnRetry.enableFitTextSize = true;
        this.btnRetry.text = cc.Language.main().GetString("STR_GameFail_btnRestart");


    },
    LayOut() {
        this._super();
        {
            var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
            var ratio = 0.8;
            this.node.setContentSize(sizeCanvas * ratio);
            this._super();
        }

        var w = cc.Common.GetTextSize(this.textTitle.text, this.textTitle.fontSize).width + this.textTitle.fontSize;
        var h = this.imageHead.node.getContentSize().height;
        cc.Debug.Log("GetTextSize w = " + w + " h=" + h);
        this.imageHead.node.setContentSize(w, h);
        this.imageHead.LayOut();
    },

    UpdateItem(info) {
        this.textTitle.text = cc.Language.main().GetString("STR_GameFail_TITLE");
        this.textDetail.text = cc.Language.main().GetString("STR_GameFail_Detail");
        this.LayOut();
    },
    OnClickBtnClose() {
        this.Close();
    },
    OnClickBtnRetry() {
        this.Close();
        cc.GameManager.main().GotoPlayAgain();
    },

});

