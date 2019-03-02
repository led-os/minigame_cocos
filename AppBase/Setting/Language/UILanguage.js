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

        this.UnifyButtonSprite(this.btnBack);

        //var layoutAlign = this.topBar.addComponent(LayoutAlign)
        var layoutAlign = this.topBar.getComponent(cc.LayoutAlign);
        if (layoutAlign != null) {
            // layoutAlign.alignType = LayoutAlign.AlignType.UP;
        }

        this.InitList();

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



