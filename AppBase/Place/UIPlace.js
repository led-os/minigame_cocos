var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
// var Common = require("Common");
//var RectTransform = require("RectTransform");
//var Language = require("Language");
var GameManager = require("GameManager");

cc.Class({
    extends: UIPlaceBase,
    properties: {
        imageBg: cc.Sprite,
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.Button
        },
        textTitle:cc.Label,
        oneCellNum: 4,

    },

    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
        this.InitList();
        this.textTitle.string = cc.Language.main().GetString("STR_PLACE");
        GameManager.main().ParseGuanka();
    },

    start: function () {
     
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
        //     var rctran = this.tableView.node.getComponent(RectTransform);
        //     var sizeParent = cc.size(rctran.width,rctran.height);
        //     this.tableView.node.setContentSize(sizeParent);
        //    // this.tableView.content.node.setContentSize(sizeParent);


        //    this.tableView.UpdateSize(sizeParent);
        cc.log('UIPlace:InitList');

        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 512;
        this.tableView.uiViewParent = this;
        var data = this._getdata(100);
        this.tableView.initTableView(data.length, { array: data, target: this });
        // this.tableView.getComponent(cc.tableView).initTableView(data.length, { array: data, target: this });


    },
});

