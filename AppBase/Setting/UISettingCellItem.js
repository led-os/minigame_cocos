var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var UISetting = require("UISetting");
var LanguageViewController = require("LanguageViewController");

cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,
        btnSwitch: cc.Button,
    },

    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnSwitch);
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

    clicked: function () {
        var uiViewParent = this.GetUIViewParent();//  
        cc.log("tag = " + this.info.tag);
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
        this.textTitle.string = info.title;
        this.btnSwitch.node.active = false;
        if (info.tag == UISetting.TAG_SETTING_BACKGROUND_MUSIC) {
            this.btnSwitch.node.active = true;
            var ret = cc.Common.GetItemOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, false);
            this.UpdateBtnSwitch(ret);
        }
    },
    UpdateBtnSwitch: function (isSel) {
        var strImage = cc.AppRes.IMAGE_BTN_SWITCH_UNSEL;
        if (isSel) {
            strImage = cc.AppRes.IMAGE_BTN_SWITCH_SEL;
        }
        cc.log("UpdateBtnSwitch issel=" + isSel + " strImage=" + strImage);
        cc.TextureCache.main.Load2(strImage, false, function (err, tex) {
            if (err) {
                cc.log("UpdateBtnSwitch err");
                cc.log(err.message || err);
                return;
            }
            cc.log("UpdateBtnSwitch spriteFrame");
            if (tex == null) {
                cc.log("UpdateBtnSwitch spriteFrame=null");
            }
            this.btnSwitch.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        }.bind(this));

    },

    OnClickBtnSwitch: function (event, customEventData) {
        if (this.info.tag == UISetting.TAG_SETTING_BACKGROUND_MUSIC) {
            var ret = cc.Common.GetItemOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
            cc.log("UpdateBtnSwitch read ret=" + ret);
            var v = false;
            if (ret == "true") {
                v = false;
                cc.log("UpdateBtnSwitch 1 value=" + v);
            } else {
                v = true;
                cc.log("UpdateBtnSwitch 2 value=" + v);
            }
            cc.Common.SetItemOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, v);
            cc.log("UpdateBtnSwitch value=" + v);
            this.UpdateBtnSwitch(v);
            if (v) {
                //  AudioPlay.main.Play();
            }
            else {
                // AudioPlay.main.Stop();
            }


        }
    },
});

