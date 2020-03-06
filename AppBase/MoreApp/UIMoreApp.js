var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var GameViewController = require("GameViewController");

cc.Class({
    extends: UIView,
    properties: {
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.Button
        },
        textTitle: cc.Label,
        oneCellNum: 4,
        listItem: null,
    },

    onLoad: function () {
        this._super();
        
        cc.TextureUtil.UpdateTypeButtonImage({
            btn: this.btnBack,
            bg: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath+ "/" + cc.AppRes.IMAGE_BTN_ICON_BACK,
            success: function () {
            }.bind(this),
        });
        
        this.textTitle.string = cc.Language.main().GetString("STR_PLACE");
        cc.LevelManager.main().StartParsePlace(function () {
            this.UpdateItem();
        }.bind(this)
        );
        
    },

    start: function () {

    },

    InitList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.cellHeight = 512;
        var size = this.node.getContentSize();
        this.oneCellNum = Math.floor(size.width / this.tableView.cellHeight);
        this.tableView.oneCellNum = this.oneCellNum;

        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },

    UpdateItem: function () {
        var game = GameViewController.main().gameBase;
        this.listItem = cc.LevelManager.main().listPlace;
        cc.Debug.Log("UIPlace UpdateItem this.listItem=" + this.listItem.length);
        this.InitList();
    },
});

