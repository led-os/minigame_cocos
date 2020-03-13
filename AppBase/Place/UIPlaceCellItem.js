var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GuankaViewController = require("GuankaViewController");
//var GameManager = require("GameManager");
cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.UIText,
    },

    onLoad: function () {
        this._super();

    },

    //init: function init(index, data, reload, group) 
    init: function (index, data, reload, group) {
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
        this.textTitle.node.active = false;
        this.UpdateImage(this.info.pic);

        // this.textTitle.node.active = true;
        this.textTitle.fontSize = 128;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(index);

        cc.LanguageManager.main().GetStringPlace({
            key: cc.LanguageManager.main().LanguageKeyOfPlaceItem(infoPlace),//cc.sys.LANGUAGE_CHINESE
            def: "",
            file: "",
            success: function (str) {
                this.textTitle.text = str;
            }.bind(this),
            fail: function () {
            }.bind(this),
        });
    },

    UpdateImage: function (pic) {
        cc.TextureCache.main.Load(pic, function (err, tex) {
            if (err) {
                cc.Debug.Log("UpdateImage:" + err.message || err);
                var dirRoot = cc.CloudRes.main().rootPath;
                this.info.pic = dirRoot + "/place/image/PlaceItemBg.png";
                this.UpdateImage(this.info.pic);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            if (lyscale) {
                lyscale.LayOut();
            }
        }.bind(this));
    },

    clicked: function () {

    },
    OnClickItem: function () {
        cc.Debug.Log('下标:' + this.textTitle.string);
        // if(this.onClickCallBack!=null)
        // {
        //     this.onClickCallBack(this);
        // }
        cc.LevelManager.main().placeLevel = this.index;

        if (this.target.controller != null) {
            var navi = this.target.controller.naviController;
            cc.Debug.Log('goto GuankaViewController');
            navi.Push(GuankaViewController.main());
        }
    },

});

