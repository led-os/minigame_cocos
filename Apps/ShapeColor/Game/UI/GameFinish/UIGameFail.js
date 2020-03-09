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
        btnVideo: cc.UIButton,
    },
    onLoad: function () {

        if (cc.Common.main().isWeiXin) {
            this.btnVideo.node.active = false;
        }

        this.btnRetry.text = cc.Language.main().GetString("STR_GameFail_btnRestart");
        this.btnVideo.text = cc.Language.main().GetString("STR_GameFail_btnRevive");


    },
    LayOut() {
        this._super();
        {
            var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
            var ratio = 0.8;
            //this.node.setContentSize(sizeCanvas * ratio);

            var size = cc.Common.appSceneMain.sizeCanvas;
            w = size.width * ratio;
            h = size.height * ratio;
            cc.Debug.Log(" UIGameFail setContentSize = w=" + w + " h=" + h);
            this.node.setContentSize(new cc.Size(w, h));

            this._super();
        }


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
        cc.LevelManager.main().gameLevel = 0;
        cc.GameManager.main().GotoPlayAgain();
    },
    OnClickBtnAdVideo() {

    },
});

