var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var GameViewController = require("GameViewController");

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
        listItem: null,
    },

    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
        this.UpdateItem();
        this.textTitle.string = cc.Language.main().GetString("STR_PLACE");
       // cc.GameManager.main().ParseGuanka();
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
        this.tableView.uiViewParent = this;
        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 512;
        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },

    UpdateItem: function () {
        var game = GameViewController.main().gameBase;
        this.listItem = game.listGuanka;
        this.InitList();
    },
});

