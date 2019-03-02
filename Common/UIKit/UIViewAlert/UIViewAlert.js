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
    },

    SetText: function (title, msg, yes, no) {
        this.textTitle.string = title;
        this.textMsg.string = msg;

        {
            var strYes = yes;
            var strNo = no;

           // var btnText = this.btnYes.getComponent(cc.Label);//Common.GetButtonText(btnYes);
            //btnText.string = yes;

           // btnText = this.btnNo.getComponent(cc.Label);//Common.GetButtonText(btnYes);
            //btnText.string = no;

            // var strWYes = Common.GetButtonTextWidth(btnYes, strYes);
            // var strWNo = Common.GetButtonTextWidth(btnNo, strNo);
            // var oft = btnText.fontSize;
            //var strW = Mathf.Max(strWYes, strWNo) + oft;
            //Common.SetButtonTextWidth(btnYes, strYes, strW);
            //Common.SetButtonTextWidth(btnNo, strNo, strW);
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

