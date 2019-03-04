var UIView = require("UIView");

var UIViewAlert = cc.Class({
    extends: UIView,
    properties: {
        content: cc.Node,
        imageBg: cc.Sprite,
        imageBoard: cc.Sprite,
        textTitle: cc.Label,
        textMsg: cc.Label,
        btnYes: cc.Button,
        btnNo: cc.Button,
        keyName: "",

        //callback(UIViewAlert alert, bool isYes);
        callback: null,
    },
    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnYes);
        this.UnifyButtonSprite(this.btnNo);
        //this.imageBg.node.addComponent(cc.UITouchEvent);
    },

    SetText: function (title, msg, yes, no) {
        this.textTitle.string = title;
        this.textMsg.string = msg;
        var w = 0, h = 0, fontsize = 0;
        {
            var strYes = yes;
            var strNo = no;

            var textBtn = cc.Common.GetButtonText(this.btnYes);

            fontsize = textBtn.fontSize;
            var w_yes = cc.Common.GetTextWidth(yes, fontsize) + fontsize/2;
            var w_no = cc.Common.GetTextWidth(no, fontsize) + fontsize/2;

            w = Math.max(w_yes, w_no);

            textBtn.string = yes;
            h = this.btnYes.node.getContentSize().height;
            this.btnYes.node.setContentSize(w, h);

            textBtn = cc.Common.GetButtonText(this.btnNo);
            textBtn.string = no; 
            h = this.btnNo.node.getContentSize().height;
            this.btnNo.node.setContentSize(w, h);

        }

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
        if (this.node != null) {
            this.node.destroy();
            //this.node = null;
        }
    },

    Hide: function () {
        this.Remove();
    },

});

