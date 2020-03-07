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
 
     
 
        this.btnRetry.text = cc.Language.main().GetString("STR_GameFail_btnRestart");
        this.btnVideo.text = cc.Language.main().GetString("STR_GameFail_btnRevive");

        
    },
    LayOut() {
        this._super();
        {
            var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
            var ratio = 0.8;
            this.node.setContentSize(sizeCanvas * ratio);
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
        cc.GameManager.main().GotoPlayAgain();
    },
    OnClickBtnAdVideo() {
         
    },
});

