var UIView = require("UIView");
var PopViewController = require("PopViewController");
var AppRes = require("AppRes");
// var Common = require("Common");
//var LayoutScale = require("LayoutScale");
//var LayoutAlign = require("LayoutAlign");

cc.Class({
    extends: UIView,
    properties: {
        btnBack: {
            default: null,
            type: cc.Button
        },
        tableView: cc.TableView,

        imageBg: cc.Sprite,
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

        this.UnifyButtonSprite(this.btnBack);
        this.UpdateItem();


        this.InitList();

    },

    UpdateItem: function () {
        this.listItem.length = 0;
        // if (AppVersion.appCheckHasFinished) {
        //     ItemInfo info = new ItemInfo();
        //     info.title = Language.main.GetString(AppString.STR_SETTING_COMMENT);
        //     info.tag = (int)SettingItemTag.TAG_SETTING_COMMENT;
        //     listItem.Add(info);
        // }
        // if (AppVersion.appCheckHasFinished)
        //  {
        //     ItemInfo info = new ItemInfo();
        //     string strversin = Common.GetAppVersion();
        //     string str = Language.main.GetString(AppString.STR_SETTING_VERSION) + "(" + strversin + ")";
        //     info.title = str;
        //     info.tag = (int)SettingItemTag.TAG_SETTING_VERSION;
        //     listItem.Add(info);
        // }

        // {
        //     ItemInfo info = new ItemInfo();
        //     info.title = Language.main.GetString(AppString.STR_SETTING_LANGUAGE);
        //     info.tag = (int)SettingItemTag.TAG_SETTING_LANGUAGE;
        //     listItem.Add(info);
        // }

        // {
        //     ItemInfo info = new ItemInfo();
        //     info.title = Language.main.GetString(AppString.STR_SETTING_BACKGROUND_MUSIC);
        //     info.tag = (int)SettingItemTag.TAG_SETTING_BACKGROUND_MUSIC;
        //     listItem.Add(info);
        // }
        // if (Config.main.isHaveRemoveAd) {
        //     ItemInfo info = new ItemInfo();
        //     info.title = Language.main.GetString("STR_BTN_NOAD");
        //     info.tag = (int)SettingItemTag.TAG_SETTING_NOAD;
        //     listItem.Add(info);
        // }
        // if (Common.isiOS && Config.main.isHaveRemoveAd) {
        //     ItemInfo info = new ItemInfo();
        //     info.title = Language.main.GetString("STR_BTN_RESTORE_NOAD");
        //     info.tag = (int)SettingItemTag.TAG_SETTING_RESTORE_IAP;
        //     listItem.Add(info);
        // }

    },

    OnClickBtnBack: function (event, customEventData) {
        cc.log("UISetting OnClickBtnBack");
        this.controller.Close();
    },


    LayOut: function () {
        //LayoutScale.ScaleImage(this.imageBg, true);
    },

    _getdata: function (num) {
        var array = [];
        for (var i = 0; i < num; ++i) {
            var obj = {};
            obj.name = 'a' + i;
            array.push(obj);
        }
        return array;
    },
    InitList: function () {
        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 256;
        this.tableView.uiViewParent = this;
        var data = this._getdata(100);
        this.tableView.initTableView(data.length, { array: data, target: this });
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



