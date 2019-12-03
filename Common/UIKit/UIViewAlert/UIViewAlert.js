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
      
        cc.TextureUtil.UpdateSpriteImage({
            sprite: this.imageBoard,
            pic: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_ALERT_BG,
            success: function () {
            }.bind(this),
        });

        cc.TextureUtil.UpdateTypeButtonImage({
            btn: this.btnYes,
            bg: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_COMMON, 
            success: function () {
            }.bind(this),
        });

        cc.TextureUtil.UpdateTypeButtonImage({
            btn: this.btnNo,
            bg: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_COMMON, 
            success: function () {
            }.bind(this),
        });
        //this.imageBg.node.addComponent(cc.UITouchEvent);
        this.LayOut();
    },

    LayOut: function () {
        var size = this.node.getContentSize();
        var ratio = 0.8;
        var x, y, w, h;
        w = Math.min(size.width, size.height) * ratio;
        h = w * 9 / 16;
        this.content.setContentSize(w, h);
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
            var w_yes = cc.Common.GetTextWidth(yes, fontsize) + fontsize / 2;
            var w_no = cc.Common.GetTextWidth(no, fontsize) + fontsize / 2;

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

