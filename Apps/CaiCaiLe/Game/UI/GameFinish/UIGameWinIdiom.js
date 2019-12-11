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


        this.textView.color = cc.Color.BLUE;

        this.indexSegment = 0;
        this.uiSegment.InitValue(64, cc.Color.RED, cc.Color.BLACK);
        this.UpdateSegment();

        var oft = 32;
        this.imageBg.UpdateImage({
            pic: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BoardPic,//IMAGE_HOME_NAME_BG
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
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_COMMON,
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
    },

    LayOut() {
        this._super();
    },
    UpdateItem(info) {
        this.infoItem = info;
        this.textTitle.text = info.title;
        this.textPinyin.text = info.pronunciation;
        this.uiSegment.UpdateList();
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

