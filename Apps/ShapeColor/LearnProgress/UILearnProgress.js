var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var UILearnProgressCellItem = require("UILearnProgressCellItem");
var UIGameShapeColor = require("UIGameShapeColor");
var GameViewController = require("GameViewController");
//var GameManager = require("GameManager");
  
var UILearnProgress = cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.UIImage,
        tableView: cc.TableView,
        btnBack: cc.UIButton,
        btnShape: cc.UIButton,
        btnColor: cc.UIButton,

        textTitle: cc.UIText,
        oneCellNum: 4,
        totalItem: 0,
        oneCellNum: 0,
        heightCell: 0,
        numRows: 0,
        numInstancesCreated: 0,
        itemType: 0,
        colorUnSel: cc.Color,
        colorUnSel: cc.Color,
        listItem: {
            default: [],
            type: cc.Object
        },

    },

    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());

        this.colorSel = cc.Color.WHITE;
        this.colorUnSel = cc.Color.GRAY;

        // var w, h, fontsize;

        // var textBtn = null;
        // {

        //     textBtn = cc.Common.GetButtonText(this.btnShape);
        //     textBtn.string = cc.Language.main().GetString("STR_TITLE_SHAPE");
        //     fontsize = textBtn.fontSize;
        //     w = cc.Common.GetTextWidth(textBtn.string, fontsize) + fontsize / 2;
        //     h = this.btnShape.node.getContentSize().height;
        //     this.btnShape.node.setContentSize(w, h);
        // }
        // {
        //     textBtn = cc.Common.GetButtonText(this.btnColor);
        //     textBtn.string = cc.Language.main().GetString("STR_TITLE_COLOR");

        //     fontsize = textBtn.fontSize;
        //     w = cc.Common.GetTextWidth(textBtn.string, fontsize) + fontsize / 2;
        //     h = this.btnColor.node.getContentSize().height;
        //     this.btnColor.node.setContentSize(w, h);
        // }

        this.OnBtnClickShape();


    },

    start: function () {

    },

    UpdateList: function (type) {
        this.itemType = type; 
        if (type == UILearnProgressCellItem.ITEM_TYPE_SHAPE) {
            this.listItem = cc.GameLevelParse.main().listShape;
        }
        if (type == UILearnProgressCellItem.ITEM_TYPE_COLOR) {
            this.listItem = cc.GameLevelParse.main().listColor;
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

        // var textBtn = cc.Common.GetButtonText(this.btnShape);

        // textBtn.node.color = this.colorSel;
        // textBtn = cc.Common.GetButtonText(this.btnColor);
        // textBtn.node.color = this.colorUnSel;

        this.UpdateList(UILearnProgressCellItem.ITEM_TYPE_SHAPE);
    },



    OnBtnClickColor: function () {
        // var textBtn = cc.Common.GetButtonText(this.btnShape);
        // textBtn.node.color = this.colorUnSel;
        // textBtn = cc.Common.GetButtonText(this.btnColor);
        // textBtn.node.color = this.colorSel;

        this.UpdateList(UILearnProgressCellItem.ITEM_TYPE_COLOR);
    }


});

