// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var UIViewController = require("UIViewController");
var HomeViewController = require("HomeViewController");
var Config = require("Config");
var Common = require("Common");

var AppSceneBase = cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        rootViewController: {
            default: null,
            type: UIViewController
        },

        canvasMain: {
            default: null,
            type: cc.Canvas
        },
        rootNode: {
            default: null,
            type: cc.Node
        },
        node1: {
            default: null,
            type: cc.Node
        },
        //按屏幕分辨率等比例适配后的canvas大小
        sizeCanvas: {
            default: null,
            type: cc.size
        },
    },
    onLoad: function () {
        cc.log("AppSceneBase onLoad");
        AppSceneBase.main = this;
        this.InitValue();
        this.RunApp();

        // var node = new cc.Node('nodeest');

        // node.parent = cc.director.getScene();
        // cc.loader.loadRes("App/UIHome", function (err, prefab) {
        //     var newNode = cc.instantiate(prefab);
        //     // cc.director.getScene().addChild(newNode);
        //     newNode.parent = this.rootNode;

        // }.bind(this)
        // );



        //node.parent = this.rootNode;
        // this.node1.parent = this.rootNode;
        // this.rootNode.addChild(this.node1);
        //this.node1.removeFromParent(false);
    },

    RunApp: function () {
        cc.log("AppSceneBase RunApp");

    },
    InitValue: function () {

        {
            //初始化分辨率相关参数
            var size = this.canvasMain.designResolution;//参考设计分辨率
            this.sizeCanvas = cc.size(0, 0);
            this.sizeCanvas.height = size.height;
            cc.log("canvasMain size=" + size);
            let screenSize = cc.view.getVisibleSize();//屏幕分辨率
            cc.log("screen size width=" + screenSize.width + ",height=" + screenSize.height);

            this.sizeCanvas.width = screenSize.width * this.sizeCanvas.height / screenSize.height;
            cc.log("sizeCanvas size=" + this.sizeCanvas);
            var framesize = cc.view.getFrameSize();
            cc.log("frame size=" + framesize);
            // cc.view.setFrameSize(windowSize.width,windowSize.height);
            // var framesize1 = cc.view.getFrameSize();
            //  cc.log("new frame size=" + framesize1);
        }

        //config
        var cf = Config.main();
        cf.ParseJson(false);

        //language
        var lan = Language.main();
    },

    LoadResFinish: function (err, prefab) {
        cc.log("LoadResFinish ");

    },

    //UIViewController controller
    SetRootViewController: function (controller) {

        if (this.rootViewController != null) {
            this.rootViewController.DestroyObjController();
        }
        this.rootViewController = controller;
        this.rootViewController.SetViewParent(this.canvasMain.node);//this.rootNode  this.canvasMain.node


    },


    // update (dt) {},
});

AppSceneBase.main = null; 
