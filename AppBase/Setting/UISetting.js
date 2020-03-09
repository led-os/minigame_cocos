var UIView = require("UIView");
var PopViewController = require("PopViewController");
var AppRes = require("AppRes");
// var Common = require("Common");
//var LayoutScale = require("LayoutScale");
//var LayoutAlign = require("LayoutAlign");

var UISetting = cc.Class({
    extends: UIView,
    statics: {

        TAG_SETTING_COMMENT: 0,
        TAG_SETTING_VERSION: 1,
        TAG_SETTING_LANGUAGE: 2,
        TAG_SETTING_BACKGROUND_MUSIC: 3,
        TAG_SETTING_BTN_SOUND: 4,
        TAG_SETTING_NOAD: 5,
        TAG_SETTING_RESTORE_IAP: 6,
        TAG_SETTING_LAST: 7,

        listImage: ["IMAGE_CELL_BG_BLUE", "IMAGE_CELL_BG_ORINGE", "IMAGE_CELL_BG_YELLOW"],
    },
    properties: {
        btnBack: {
            default: null,
            type: cc.UIButton
        },
        tableView: cc.TableView,
        textTitle: cc.UIText,
        imageBg: cc.UIImage,
        topBar: cc.Node,
        oneCellNum: 1,
        heightCell: 160,
        listItem: {
            default: [],
            type: cc.Object
        },

    },

    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());


        this.UpdateItem();

        this.textTitle.text = cc.Language.main().GetString("STR_SETTING");



    },

    UpdateItem: function () {
        this.listItem.length = 0;
        //if (cc.AppVersion.main().appCheckHasFinished)
        if (cc.sys.isNative) {
            var info = new cc.ItemInfo();
            info.title = cc.Language.main().GetString("STR_SETTING_COMMENT");
            info.tag = UISetting.TAG_SETTING_COMMENT;
            this.listItem.push(info);
        }
        //if (cc.AppVersion.main().appCheckHasFinished)
        if (cc.sys.isNative) {
            var info = new cc.ItemInfo();
            var strversin = cc.Common.main().GetAppVersion();
            var str = cc.Language.main().GetString("STR_SETTING_VERSION") + "(" + strversin + ")";
            info.title = str;
            info.tag = UISetting.TAG_SETTING_VERSION;
            this.listItem.push(info);
        }

        {
            var info = new cc.ItemInfo();
            info.title = cc.Language.main().GetString("STR_SETTING_LANGUAGE");
            info.tag = UISetting.TAG_SETTING_LANGUAGE;
            this.listItem.push(info);
        }

        var isHasBgMusic = true;
        // if (cc.Config.main().appType == cc.AppType.SHAPECOLOR) {
        //     isHasBgMusic = false;
        // }
        if (isHasBgMusic) {
            var info = new cc.ItemInfo();
            info.title = cc.Language.main().GetString("STR_SETTING_BACKGROUND_MUSIC");
            info.tag = UISetting.TAG_SETTING_BACKGROUND_MUSIC;
            this.listItem.push(info);
        }

        {
            var info = new cc.ItemInfo();
            info.title = cc.Language.main().GetString("STR_SETTING_BTN_SOUND");
            info.tag = UISetting.TAG_SETTING_BTN_SOUND;
            this.listItem.push(info);
        }

        if (cc.sys.isNative) {


            if (cc.Config.main().isHaveRemoveAd) {
                var info = new cc.ItemInfo();
                info.title = cc.Language.main().GetString("STR_BTN_NOAD");
                info.tag = UISetting.TAG_SETTING_NOAD;
                this.listItem.push(info);
            }
            if (cc.Common.main().isiOS && cc.Config.main().isHaveRemoveAd) {
                var info = new cc.ItemInfo();
                info.title = cc.Language.main().GetString("STR_BTN_RESTORE_NOAD");
                info.tag = UISetting.TAG_SETTING_RESTORE_IAP;
                this.listItem.push(info);
            }
        }
        this.InitList();
    },

    OnClickBtnBack: function (event, customEventData) {
        cc.Debug.Log("UISetting OnClickBtnBack");
        // this.controller.Close();

        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }

    },


    LayOut: function () {
        //LayoutScale.ScaleImage(this.imageBg, true);
    },


    InitList: function () {
        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 256;
        this.tableView.uiViewParent = this;
        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },
    //下一页(pageview下有效)
    nextPage: function () {
        //this.tableView.getComponent(cc.tableView).scrollToNextPage();
    },
    //上一页(pageview下有效)
    lastPage: function () {
        // this.tableView.getComponent(cc.tableView).scrollToLastPage();
    },

});



