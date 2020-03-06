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
        var oft = 32;
        this.imageBg.UpdateImage({
            pic: cc.CloudRes.main().uiRootPath + "/" + this.GetImageOfKey("IMAGE_ALERT_BG"),//IMAGE_HOME_NAME_BG
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
                this.LayOut();
            }.bind(this),
        });

        this.btnYes.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + this.GetImageOfKey("IMAGE_BTN_COMMON"),
            success: function () {
            }.bind(this),
        });
        this.btnNo.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + this.GetImageOfKey("IMAGE_BTN_COMMON"),
            success: function () {
            }.bind(this),
        });
        this.LayOut();
    },

    LayOut: function () {
        var ratio = 0.8;
        var x, y, w, h;
        this._super();
        {
            ratio = 0.8;
            var size = cc.Common.appSceneMain.sizeCanvas;
            w = Math.min(size.width, size.height) * ratio;
            h = w * 9 / 16;
            this.node.setContentSize(size * ratio);
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

