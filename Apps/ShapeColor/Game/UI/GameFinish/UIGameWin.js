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
        this.textView.text = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH"); 
        this.LayOut();
    },

    LayOut() {
        this._super();
        {
            var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
            var ratio = 0.9;
            //显示异常
            //this.node.setContentSize(sizeCanvas * ratio);
            //显示异常
            var h_topbar = 160;
            var oft = Math.max(h_topbar,cc.AdKitCommon.main.heightAdCanvas);
            var size = cc.Common.appSceneMain.sizeCanvas;
            var w = size.width * ratio;
            var h = (size.height-oft*2) * ratio;
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

