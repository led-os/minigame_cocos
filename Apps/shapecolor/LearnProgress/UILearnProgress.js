var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var UILearnProgressCellItem = require("UILearnProgressCellItem");
var UIGameShapeColor = require("UIGameShapeColor");
var GameViewController = require("GameViewController");
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
        this.OnBtnClickShape();
    },

    start: function () {

    },

    UpdateList: function (type) {
        this.itemType = type;
        var game = GameViewController.main().gameBase;
        if (type == UILearnProgressCellItem.ITEM_TYPE_SHAPE) {
            this.listItem = game.listShape;
        }
        if (type == UILearnProgressCellItem.ITEM_TYPE_COLOR) {
            this.listItem = game.listColor;
        }
        // this.listItem = game.listShape;

        // totalItem = listItem.Count;
        // numRows = totalItem / oneCellNum;
        // if (totalItem % oneCellNum != 0) {
        //     numRows++;
        // }

        // tableView.ReloadData();
        this.oneCellNum = 2;
        if (!cc.Device.main.isLandscape) {
            this.oneCellNum = this.oneCellNum / 2;
        }

        cc.log("this.listShape=" + game.listGuanka.length);

        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 256;
        this.tableView.uiViewParent = this;
        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });

    },

    OnClickBtnBack: function () {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },

    OnBtnClickShape: function () {
        // {
        //     Transform tr = btnShape.transform.Find("Text");
        //     Text btnText = tr.GetComponent<Text>();
        //     btnText.color = colorSel;
        // }
        // {
        //     Transform tr = btnColor.transform.Find("Text");
        //     Text btnText = tr.GetComponent<Text>();
        //     btnText.color = colorUnSel;
        // }


        this.UpdateList(UILearnProgressCellItem.ITEM_TYPE_SHAPE);
    },



    OnBtnClickColor: function () {
        // {
        //     Transform tr = btnColor.transform.Find("Text");
        //     Text btnText = tr.GetComponent<Text>();
        //     btnText.color = colorSel;
        // }
        // {
        //     Transform tr = btnShape.transform.Find("Text");
        //     Text btnText = tr.GetComponent<Text>();
        //     btnText.color = colorUnSel;
        // }
        this.UpdateList(UILearnProgressCellItem.ITEM_TYPE_COLOR);
    }


});

