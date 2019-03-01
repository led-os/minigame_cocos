var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
// var Common = require("Common");
//var RectTransform = require("RectTransform");
//var Language = require("Language");
//var GameManager = require("GameManager");

var UILearnProgress = cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.Sprite,
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.Button
        },
        btnShape: cc.Button,
        btnColor: cc.Button,

        textTitle: cc.Label,
        oneCellNum: 4,
        totalItem: 0,
        oneCellNum: 0,
        heightCell: 0,
        numRows: 0,
        numInstancesCreated: 0,
        itemType: 0,
        colorSel: cc.Color,
        colorUnSel: cc.Color,
        listItem: {
            default: [],
            type: cc.Object
        },

    },

    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
        this.textTitle.string = cc.Language.main().GetString("STR_TITLE_LEARN_PROGRESS");
        this.InitList();
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

        this.oneCellNum = 2;
        if (!cc.Device.main.isLandscape) {
            this.oneCellNum = this.oneCellNum / 2;
        }
        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 256;
        this.tableView.uiViewParent = this;
        var data = this._getdata(100);
        this.tableView.initTableView(data.length, { array: data, target: this });
        // this.tableView.getComponent(cc.tableView).initTableView(data.length, { array: data, target: this });


    },

    OnClickBtnBack: function () {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },

});

