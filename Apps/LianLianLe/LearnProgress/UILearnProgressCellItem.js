var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GameViewController = require("GameViewController");
var UISetting = require("UISetting");


var UILearnProgressCellItem = cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'), 
    statics: {
        indexSegment: 0,
        KEY_GAME_STATUS: "KEY_GAME_STATUS_",
        GAME_STATUS_UN_START: 0,//没有开始
        GAME_STATUS_PLAY: 1,//进行中
        GAME_STATUS_FINISH: 2,//完成
    },
    properties: {
        imageBg: cc.UIImage,
        imageIcon: cc.UIImage,
        textTitle: cc.UIText,
        textDetail: cc.UIText,
        itemWidth: 0,
        itemHeight: 0,
        itemType: 0,
        indexShape: 0,
        nodeIconContent: cc.Node,
        shaderColor: null,
        colorSel: cc.Color,
        colorUnSel: cc.Color,

    },

    onLoad: function () {
        this._super();
        this.colorSel = cc.Color.RED;
    },

    update() {
    },

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
        this.itemType = this.target.itemType;
        this.UpdateItem(this.info);


    },
    clicked: function () {
        var uiViewParent = this.GetUIViewParent();// 

    },

    UpdateIcon: function (pic, color) {
        cc.Debug.Log(" UpdateIcon pic=" + pic);
        this.imageIcon.UpdateImage({
            pic: pic,
            type: cc.Sprite.Type.SIMPLE,//SLICED 
            success: function () {
                this.imageIcon.LayOut();
            }.bind(this),
        });

        // var mat = this.imageIcon.image.getMaterial(0);
        // mat.setProperty('enableColor', 1.0);
        // mat.setProperty('showColor', color);//cc.Color.WHITE
    },



    UpdateItem: function (info) {
        this.UpdateIcon(info.pic, this.colorSel);
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(UILearnProgressCellItem.indexSegment);
        var filepath = cc.Common.GAME_RES_DIR + "/language/" + infoPlace.language + ".csv";



        cc.LanguageManager.main().GetStringGame({
            key: info.id,//cc.sys.LANGUAGE_CHINESE
            def: "",
            file: filepath,
            success: function (str) {
                this.textTitle.text = str;
                //     this.textDetail.text = game.GameStatusOfShape(info);
            }.bind(this),
            fail: function () {
            }.bind(this),
        });
        var key = "STR_GAME_STATUS_UN_START";
        var v = cc.Common.GetItemOfKey(UILearnProgressCellItem.KEY_GAME_STATUS + info.id);
        if (v == UILearnProgressCellItem.GAME_STATUS_UN_START) {
            key = "STR_GAME_STATUS_UN_START";
        }
        if (v == UILearnProgressCellItem.GAME_STATUS_PLAY) {
            key = "STR_GAME_STATUS_PLAY";
        }
        if (v == UILearnProgressCellItem.GAME_STATUS_FINISH) {
            key = "STR_GAME_STATUS_FINISH";
        }

        cc.Debug.Log(" UILearnProgressCellItem filepath=" + filepath + " info.id=" + info.id);
        this.textDetail.text = cc.Language.main().GetString(key);//cc.Language.main().GetString(key);
        // this.textDetail.text ="detail";
        this.UpdateImageBg(UISetting.listImage[this.index % 3]);

        this.LayOut();
    },

    UpdateImageBg: function (pic) {
        this.imageBg.UpdateImageKey(pic);
    },

    LayOut: function () {
    },

});

