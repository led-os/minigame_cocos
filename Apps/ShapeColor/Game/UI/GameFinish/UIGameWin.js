var UIGameWinBase = require("UIGameWinBase");
var UIViewPop = require("UIViewPop");
var UIView = require("UIView");
var UIGameWin = cc.Class({
    extends: UIGameWinBase,//cc.UIViewPop,
    //  extends: UIViewPop,
    statics: {
    },

    properties: {
        infoItem: null,
    },

    onLoad: function () {
  
        this.textTitle.text = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        this.textView.text = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        this.btnNext.text = cc.Language.main().GetString("STR_GameWin_BtnNext");
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
        this.infoItem = info;
        this.LayOut();
    },



});

