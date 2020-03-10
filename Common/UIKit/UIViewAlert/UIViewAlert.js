var UIView = require("UIView");
var UIViewPop = require("UIViewPop");
var UIViewAlert = cc.Class({
    extends: UIViewPop,
    properties: {
        imageBg: cc.UIImage,
        textTitle: cc.UIText,
        textMsg: cc.UIText,
        btnYes: cc.UIButton,
        btnNo: cc.UIButton,
        keyName: "",

        //callback(UIViewAlert alert, bool isYes);
        callback: null,
    },
    onLoad: function () {
        this._super();

        this.LayOut();
    },

    LayOut: function () {
        var ratio = 0.8;
        var x, y, w, h;
        this._super();
        {
            ratio = 0.8;
            var size = cc.Common.appSceneMain.sizeCanvas; 
            var ratio = 0.8;
            //显示异常
            //this.node.setContentSize(size * ratio);
            //显示异常

            w = Math.min(size.width, size.height) * ratio;
            h = w * 9 / 16;
            // h = w / 2;
            cc.Debug.Log("UIViewAlert setContentSize = w=" + w + " h=" + h);
            this.node.setContentSize(new cc.Size(w, h));

            this._super();
        }
    },
    SetText: function (title, msg, yes, no) {
        //cc.Debug.Log("SetText title ="+title+" msg="+msg);
        this.textTitle.text = title;
        this.textMsg.text = msg;

        this.btnYes.enableFitTextSize = true;
        this.btnYes.text = yes;

        this.btnNo.enableFitTextSize = true;
        this.btnNo.text = no;


    },

    ShowBtnNo: function (isShow) {
        this.btnNo.node.active = isShow;
    },
    OnClickBtnYes: function () {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, true);
        }

    },


    OnClickBtnNo: function () {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, false);
        }
    },

    Remove: function () {
        // if (this.node != null) {
        //     this.node.destroy();
        //     //this.node = null;
        // }
        this.Close();
    },

    Hide: function () {
        this.Remove();
    },

});

