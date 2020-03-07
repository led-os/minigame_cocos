var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var UISetting = require("UISetting");
var LanguageViewController = require("LanguageViewController");

cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageBg: cc.UIImage,
        textTitle: cc.UIText,
        btnSwitch: cc.UIButton,
    },

    onLoad: function () {
        this._super();
        //this.UnifyButtonSprite(this.btnSwitch);
        //this.btnSwitch.pressedSprite = null;
        // this.btnSwitch.hoverSprite = null;
    },

    init: function init(index, data, reload, group) {
        this.node.active = true;
        this.index = index;
        if (index >= data.array.length) {
            // this.index.string = '越界';
            // this.group.string = group.toString();
            this.node.active = false;
            return;
        }
        this.target = data.target;
        this.info = data.array[index];
        this.UpdateItem(this.info);
        //KEY_BACKGROUND_MUSIC
    },
    OnClickItem: function () {
        var uiViewParent = this.GetUIViewParent();//  
        cc.Debug.Log("tag = " + this.info.tag);
        switch (this.info.tag) {
            case UISetting.TAG_SETTING_COMMENT:
                {

                }
                break;
            case UISetting.TAG_SETTING_VERSION:
                {

                }
                break;
            case UISetting.TAG_SETTING_LANGUAGE:
                {
                    this.GotoController(LanguageViewController.main());
                }
                break;
            case UISetting.TAG_SETTING_BACKGROUND_MUSIC:
                {

                }
                break;
            case UISetting.TAG_SETTING_NOAD:
                {

                }
                break;
            case UISetting.TAG_SETTING_RESTORE_IAP:
                {

                }
                break;

        }
    },


    UpdateItem: function (info) {
        this.textTitle.text = info.title;
        this.btnSwitch.node.active = false;
        if ((info.tag == UISetting.TAG_SETTING_BACKGROUND_MUSIC) || (info.tag == UISetting.TAG_SETTING_BTN_SOUND)) {
            this.btnSwitch.node.active = true;
            var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
            this.UpdateBtnSwitch(ret);
        }
        this.UpdateImageBg(UISetting.listImage[this.index % 3]);
    },
    UpdateBtnSwitch: function (isSel) {
        var key = "IMAGE_BTN_SWITCH_UNSEL";
        if (isSel) {
            key = "IMAGE_BTN_SWITCH_SEL"
        }
        this.btnSwitch.imageBg.UpdateImageKey(key); 

    },

    UpdateImageBg: function (pic) {
        //不会保留图片的sliced参数
        // cc.TextureCache.main.Load(pic, function (err, tex) {
        //     if (err) {
        //         cc.Debug.Log("UpdateImageBg err=" + err + " pic=" + pic);
        //         cc.Debug.Log(err.message || err);
        //         return;
        //     }
        //    /// this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
        //    this.imageBg.spriteFrame.setTexture(tex);

        //     // this.imageBg.type = cc.Sprite.Type.SLICED;
        // }.bind(this));

        //ok  会保留图片的sliced参数
        // cc.loader.loadRes(pic, cc.SpriteFrame, function (err, frame) {
        //     if (err) {
        //         cc.Debug.Log(err.message || err);
        //     } else {
        //         this.imageBg.spriteFrame = frame;
        //     }
        // }.bind(this));

        // var oft = 20;
        // cc.TextureUtil.UpdateSpriteImage({
        //     sprite: this.imageBg,
        //     pic: cc.CloudRes.main().uiRootPath + "/" + pic,
        //     type: cc.Sprite.Type.SLICED,//SLICED
        //     left: oft,
        //     right: oft,
        //     top: oft,
        //     bottom: oft,
        //     success: function () {
        //     }.bind(this),
        // });

        this.imageBg.UpdateImageKey(pic);
    },

    OnClickBtnSwitch: function (event, customEventData) {
        if (this.info.tag == UISetting.TAG_SETTING_BACKGROUND_MUSIC) {
            var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
            cc.Debug.Log("UpdateBtnSwitch read ret=" + ret);
            var v = !ret;
            // var v = true;
            // if (ret == false) {
            //     v = true;
            // } else {
            //     v = false;
            // }

            cc.Debug.Log("UpdateBtnSwitch value=" + v);

            cc.Common.SetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, v);

            this.UpdateBtnSwitch(v);
            if (v) {
                cc.AudioPlay.main().PlayBgMusic();
            }
            else {
                cc.AudioPlay.main().PlayStopBgMusic();
            }
        }

        if (this.info.tag == UISetting.TAG_SETTING_BTN_SOUND) {
            var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BTN_SOUND, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
            var v = !ret;
            cc.Common.SetBoolOfKey(cc.CommonRes.KEY_BTN_SOUND, v);
            this.UpdateBtnSwitch(v);
        }

    },
});

