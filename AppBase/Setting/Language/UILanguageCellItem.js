var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var UISetting = require("UISetting");

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
    },
    clicked: function () {
        var uiViewParent = this.GetUIViewParent();// 
        var lan = cc.Language.main();
        cc.Debug.Log("language id= " + this.info.id);
        lan.SetLanguage(this.info.id);
        cc.Common.SetItemOfKey(cc.AppRes.KEY_LANGUAGE, this.info.id);
        this.target.OnClickBtnBack();
    },
    UpdateItem: function (info) {
        this.textTitle.string = info.title;
        this.UpdateImageBg(UISetting.listImage[this.index % 3]);
    },
    UpdateImageBg: function (pic) {
        cc.TextureCache.main.Load(pic, function (err, tex) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);

        }.bind(this));
    },
});

