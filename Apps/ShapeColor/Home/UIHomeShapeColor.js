var UIHomeBase = require("UIHomeBase");
var AppRes = require("AppRes");
//var LayoutScale = require("LayoutScale");
// var Common = require("Common");
var GameViewController = require("GameViewController");
var AlertLockViewController = require("AlertLockViewController");
var UIHomeCenterBar = require("UIHomeCenterBar");

cc.Class({
    extends: UIHomeBase,
    properties: {

        btnBoard: {
            default: null,
            type: cc.Button
        },
  
        indexAction: 0,
        listBtns: {
            default: [],
            type: cc.Button
        },
        timeAction: 0.3,
        isActionFinish: false,
        uiCenterBar: UIHomeCenterBar,
    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        //物理系统默认是关闭的，手动开启物理系统 
          cc.Common.EnablePhysic(true, false);
        // cc.Common.EnablePhysic(true, true);
         
        // var game = GameViewController.main().gameBase;
        // if (game != null) {
        //     game.LoadLanguageColor(function (p) { });
        // }

  
        this.imageNameBg.node.active = false;
        this.listBtns.length = 0; 

        this.isActionFinish = true;


        this.LayOut(); 
        this.indexAction = 0;
     

  
    },

    start: function () {


        // wx.shareAppMessage({
        //     title: "aaaaa一起回味经典的乐趣。",
        //     imageUrl: "https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/GameRes/image/banyuan/banyuan.png",

        // })
    },

    LayOut: function () {
        this._super();
        var size = this.node.getContentSize();
        var x, y, w, h;

        var pt = this.imageNameBg.node.getPosition();
        var y_top = pt.y - this.imageNameBg.node.getContentSize().height / 2;
        var y_bottom = -size.height / 2;


    },

    GetPosOfBtn: function (btn, idx) {
        var x, y, w, h;
        var size = this.node.getContentSize();
        var pt = this.imageNameBg.node.getPosition();
        var y_top = pt.y - this.imageNameBg.node.getContentSize().height / 2;
        var y_bottom = -size.height / 2;
        var x_center = 0;
        var y_center = (y_top + y_bottom) / 2;

        w = btn.node.getBoundingBox().width;

        var x_space = 16;
        var w_rect = w * this.listBtns.length + (this.listBtns.length - 1) * x_space;
        var x_left = x_center - w_rect / 2;
        x = (x_left + w / 2) + (w + x_space) * idx;
        y = y_center;
        return new cc.Vec2(x, y);
    },

    InitBtnPos() {
        var x, y, w, h;
        var size = this.node.getContentSize();
        for (var i = 0; i < this.listBtns.length; i++) {
            var btn = this.listBtns[i];
            h = btn.node.getBoundingBox().height;
            var pt = this.GetPosOfBtn(btn, i);
            x = pt.x;
            y = -size.height / 2 - h;
            //y = 0;
            btn.node.setPosition(x, y);
        }

    },
    RunActionBtn() {
        //动画：https://blog.csdn.net/agsgh/article/details/79447090
        //iTween.ScaleTo(info.obj, new Vector3(0f, 0f, 0f), 1.5f);
        var duration = this.timeAction;
        var size = this.node.getContentSize();
        var x_start, y_start, x_end, y_end, w, h;
        var btn = this.listBtns[this.indexAction];

        var pt = this.GetPosOfBtn(btn, this.indexAction);
        x_end = pt.x;
        y_end = pt.y;


        cc.Debug.Log("RunActionBtn:pt=" + pt + " idx=" + this.indexAction);

        var action = cc.moveTo(duration, x_end, y_end).easing(cc.easeOut(3.0));

        var fun = cc.callFunc(function () {
            if (this.indexAction < this.listBtns.length) {
                this.RunActionBtn();
                this.indexAction++;
            } else {
                this.isActionFinish = true;
                this.RunActionUpDown();
            }
        }.bind(this));
        var seq = cc.sequence([action, fun]);
        btn.node.runAction(seq);
    },

    //上下晃动动画
    RunActionUpDown() {
        //动画：https://blog.csdn.net/agsgh/article/details/79447090
        //iTween.ScaleTo(info.obj, new Vector3(0f, 0f, 0f), 1.5f);
        var duration = this.timeAction * 4;
        var size = this.node.getContentSize();
        var w, h;
        // var btn = this.listBtns[this.indexAction];

        // var pt = this.GetPosOfBtn(btn, this.indexAction);
        // x_end = pt.x;
        // y_end = pt.y;

        for (var i = 0; i < this.listBtns.length; i++) {
            var btn = this.listBtns[i];
            h = btn.node.getBoundingBox().height;
            var y_step = h / 10;
            var actionUp = cc.moveBy(duration, 0, y_step);
            var actionDown = cc.moveBy(duration, 0, -y_step);
            var time = cc.delayTime(0.5 * i);
            var seq = cc.sequence([time, actionUp, actionUp.reverse(), actionDown, actionDown.reverse()]);
            btn.node.runAction(seq.repeatForever());
        }
    },

});

