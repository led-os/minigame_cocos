var UIGameWinBase = require("UIGameWinBase");
var UIViewPop = require("UIViewPop");
var UIView = require("UIView");
var UIGameWin = cc.Class({ 
    extends: UIGameWinBase,
    statics: {
    },

    properties: {
        infoItem: null,
    },

    onLoad: function () {
        this._super();
        this.textTitle.text = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        this.textView.text = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        this.btnNext.text = cc.Language.main().GetString("STR_GameWin_BtnNext");
        this.LayOut();
    },

    LayOut() {
        this._super();
        {
            var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
            var ratio = 0.8;
            //显示异常
            //this.node.setContentSize(sizeCanvas * ratio);
            //显示异常
            
            var size = cc.Common.appSceneMain.sizeCanvas;
            w = size.width * ratio;
            h = size.height * ratio;
            cc.Debug.Log(" UIGameWin setContentSize = w=" + w + " h=" + h);
            this.node.setContentSize(new cc.Size(w, h));

            this._super();
        }

    },
    UpdateItem(info) {
        this.infoItem = info;
        this.LayOut();
    },



});

