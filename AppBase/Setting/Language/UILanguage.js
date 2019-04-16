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
        imageBoard: cc.Sprite,
        nodeContent: cc.Node,
        textTitle: cc.Label,
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
        this.oneCellNum =1;
        this.UnifyButtonSprite(this.btnBack);
        this.textTitle.string = cc.Language.main().GetString("STR_LANGUAGE");
        this.UpdateItem();
        this.LayOut();
    },

    OnClickBtnBack: function (event, customEventData) {
        cc.Debug.Log("UISetting OnClickBtnBack");
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },


    LayOut: function () { 
        var size = this.node.getContentSize();
        var ratio = 0.8;
        var x, y, w, h;
        w = size.width * ratio;
        h = size.height * ratio;
        this.nodeContent.setContentSize(w,h);

    },

    UpdateItem: function () {
        this.listItem.length = 0;

        {
            var info = new cc.ItemInfo();
            info.title = "中文";
            info.id = cc.sys.LANGUAGE_CHINESE;
            this.listItem.push(info);
        }
        {
            var info = new cc.ItemInfo();
            info.title = "English";
            info.id = cc.sys.LANGUAGE_ENGLISH;
            this.listItem.push(info);
        }

      this.InitList();
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



