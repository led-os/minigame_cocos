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
    },

    onLoad: function () {
        this._super();

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
    },

});

