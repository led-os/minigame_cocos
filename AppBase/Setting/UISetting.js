var UIView = require("UIView");
var PopViewController = require("PopViewController");
var AppRes = require("AppRes");
var TextureCache = require("TextureCache");
var Common = require("Common");
var LayoutScale = require("LayoutScale");
var LayoutAlign = require("LayoutAlign");

cc.Class({
    extends: UIView,
    properties: {
        btnBack: {
            default: null,
            type: cc.Button
        },
        tableView: cc.tableView,
        
        imageBg: cc.Sprite,
        topBar: cc.Node,
    },

    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());

        this.UnifyButtonSprite(this.btnBack);

        var strImage = AppRes.IMAGE_HOME_BG;
        TextureCache.main.Load(strImage, function (err, tex) {
            if (err) {
                cc.log(err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();
        }.bind(this));

        //var layoutAlign = this.topBar.addComponent(LayoutAlign)
        var layoutAlign = this.topBar.getComponent(LayoutAlign);
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
        var data = this._getdata(100);
        this.tableView.initTableView(data.length, { array: data, target: this });
       // this.tableView.getComponent(cc.tableView).initTableView(data.length, { array: data, target: this });
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



