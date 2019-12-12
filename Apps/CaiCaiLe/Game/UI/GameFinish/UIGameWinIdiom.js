var UIGameWinBase = require("UIGameWinBase");
var UIViewPop = require("UIViewPop");
var UIView = require("UIView");
var UIGameWinIdiom = cc.Class({
    extends: UIGameWinBase,//cc.UIViewPop,
    //  extends: UIViewPop,
    statics: {
    },

    properties: {
        textPinyin: cc.UIText,
        infoItem: null,
    },

    onLoad: function () {

        cc.ColorConfig.main().GetColor({
            key: cc.GameRes.KEY_COLOR_GameWinTitle,
            def: cc.Color.BLACK,
            success: function (color) {
                this.textTitle.color = color;
            }.bind(this),
        });

        cc.ColorConfig.main().GetColor({
            key: cc.GameRes.KEY_COLOR_GameWinTextView,
            def: cc.Color.BLACK,
            success: function (color) {
                this.textView.color = color;
            }.bind(this),
        });


        this.indexSegment = 0;
        this.uiSegment.InitValue(64, cc.Color.RED, cc.Color.BLACK);
        this.UpdateSegment();

        var oft = 110;
        this.imageBg.UpdateImage({
            pic: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_GameWinBg,//IMAGE_HOME_NAME_BG
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
            }.bind(this),
        });

        oft = 20;
        this.imageHead.UpdateImage({
            pic: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_GameWinHead,//IMAGE_HOME_NAME_BG
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
            }.bind(this),
        });

        oft = 20;
        this.btnNext.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_GameWinBtn,
            type: cc.Sprite.Type.SLICED,//SLICED
            left: oft,
            right: oft,
            top: oft,
            bottom: oft,
            success: function () {
            }.bind(this),
        });
        
        this.btnClose.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_CLOSE,
            success: function () {
            }.bind(this),
        });

        this.btnNext.enableFitTextSize = true;
        this.btnNext.text = cc.Language.main().GetString("STR_GameWin_BtnNext");
    },

    LayOut() {
        this._super();
        
        var w1= cc.Common.GetTextSize(this.textTitle.text, this.textTitle.fontSize).width + this.textTitle.fontSize;
        var w2= cc.Common.GetTextSize(this.textPinyin.text, this.textPinyin.fontSize).width + this.textPinyin.fontSize;
        var w = Math.max(w1, w2);
        var h = this.imageHead.node.getContentSize().height;
        cc.Debug.Log("GetTextSize w = " + w + " h=" + h);
        this.imageHead.node.setContentSize(w, h);
        this.imageHead.LayOut();
    },
    UpdateItem(info) {
        this.infoItem = info;
        this.textTitle.text = info.title;
        this.textPinyin.text = info.pronunciation;
        this.uiSegment.UpdateList();
        this.LayOut();
    },

    UpdateText(info) {
        cc.Debug.Log("UpdateText id=" + info.id);
        if (this.infoItem == null) {
            return;
        }
        if (info.id == UIGameWinBase.KEY_GAMEWIN_INFO_TRANSLATION) {
            var str = this.infoItem.translation;
            if (cc.Common.isBlankString(str)) {
                str = cc.Language.main().GetString("STR_UNKNOWN_TRANSLATION");
            }
            this.textView.text = str;
        }
        if (info.id == UIGameWinBase.KEY_GAMEWIN_INFO_ALBUM) {
            var str = this.infoItem.album;
            if (cc.Common.isBlankString(str)) {
                str = cc.Language.main().GetString("STR_UNKNOWN_ALBUM");
            }
            this.textView.text = str;
        }

        //  this.textView.text = "textView";
    },

    UpdateSegment() {
        //简介
        {
            var info = new cc.ItemInfo();
            info.id = UIGameWinBase.KEY_GAMEWIN_INFO_TRANSLATION;
            info.title = cc.Language.main().GetString(info.id);
            this.uiSegment.AddItem(info);
        }

        {
            var info = new cc.ItemInfo();
            info.id = UIGameWinBase.KEY_GAMEWIN_INFO_ALBUM;
            info.title = cc.Language.main().GetString(info.id);
            this.uiSegment.AddItem(info);
        }
        this.uiSegment.objCallBack = {
            OnUISegmentDidClickItem: function (ui, item) {
                this.indexSegment = item.index;
                this.UpdateText(item.infoItem);
            }.bind(this),
        };

        this.uiSegment.Select(this.indexSegment, true);
    },
});

