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
//var Config = require("Config");
//var Common = require("Common");
//var Language = require("Language");
//var LoadItemInfo = require("LoadItemInfo");
var GameViewController = require("GameViewController");

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
        listProLoad: {
            default: [],
            type: cc.LoadItemInfo
        },
        isHasRunApp: false,
    },
    onLoad: function () {
        cc.Debug.Log("AppSceneBase onLoad");
        //AppSceneBase.main = this;
        // if(AppSceneBase.main==null){
        //     cc.Debug.Log(" AppSceneBase.main onLoad size is null");
        // }else{
        //     cc.Debug.Log(" AppSceneBase.main onLoad size is not null");
        // }

        cc.Common.appSceneMain = this;
        this.isHasRunApp = false;
        this.InitValue();
        // this.RunApp();

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
        cc.Debug.Log("AppSceneBase RunApp");

    },
    InitValue: function () {

        {
            //初始化分辨率相关参数
            // var size = this.canvasMain.designResolution;//参考设计分辨率
            // this.sizeCanvas = cc.size(0, 0);
            // this.sizeCanvas.height = size.height;
            // cc.Debug.Log("canvasMain size=" + size);
            // let screenSize = cc.view.getVisibleSize();//屏幕分辨率
            // cc.Debug.Log("screen size width=" + screenSize.width + ",height=" + screenSize.height);

            // this.sizeCanvas.width = screenSize.width * this.sizeCanvas.height / screenSize.height;
            // cc.Debug.Log("sizeCanvas size=" + this.sizeCanvas);
            // var framesize = cc.view.getFrameSize();
            // cc.Debug.Log("frame size=" + framesize);
            // // cc.view.setFrameSize(windowSize.width,windowSize.height);
            // // var framesize1 = cc.view.getFrameSize();
            // //  cc.Debug.Log("new frame size=" + framesize1);


            this.sizeCanvas = cc.Common.GetSizeCanvas(this.canvasMain.designResolution);
        }

        //config
        {
            var info = new cc.LoadItemInfo();
            info.id = cc.LoadItemInfo.CONFIG;
            info.isLoad = false;
            this.listProLoad.push(info);

            var cf = cc.Config.main();
            cf.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), info);
            //cf.ParseJson(false);
        }
        //language
        {
            var info = new cc.LoadItemInfo();
            info.id = cc.LoadItemInfo.LANGUAGE;
            info.isLoad = false;
            this.listProLoad.push(info);

            var lan = cc.Language.main();
            lan.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), info);
        }

        //UIViewAlert
        var vm = cc.ViewAlertManager.main();
    },
    CheckAllLoad: function () {
        var isLoadAll = true;
        for (let info of this.listProLoad) {
            if (info.isLoad == false) {
                isLoadAll = false;
            }
        }
        cc.Debug.Log("appscenebase isLoadAll=" + isLoadAll);
        if (isLoadAll == true) {
            //启动app
            this.isHasRunApp = true;

            var isFirstRun = cc.Common.GetBoolOfKey(cc.AppRes.KEY_FIRST_RUN, true);
            cc.Debug.Log("isFirstRun ddd=" + isFirstRun);
            if (isFirstRun) {
                cc.Common.gold = cc.AppRes.GOLD_INIT_VALUE;
                //第一次安装
                cc.Common.SetItemOfKey(cc.AppRes.KEY_FIRST_RUN, false);
                cc.Common.SetItemOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, true);
                var ret = cc.Common.GetBoolOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, false);
                cc.Debug.Log("KEY_BACKGROUND_MUSIC=" + ret);
            }

            var lan = cc.Language.main();
            var lanid = cc.Common.GetItemOfKey(cc.AppRes.KEY_LANGUAGE, cc.sys.LANGUAGE_CHINESE);
            lan.SetLanguage(lanid);

            this.RunApp();
        }
    },
    AppPreLoadDidFinish: function (p) {
        cc.Debug.Log("AppPreLoadDidFinish ");
        if (this.isHasRunApp == true) {
            return;
        }
        this.CheckAllLoad();

        // var lan = Language.main();
        // lan.SetLanguage(cc.sys.LANGUAGE_CHINESE);
        // cc.Debug.Log("AppPreLoadDidFinish APP_NAME:" + lan.GetString("APP_NAME"));

        // lan.SetLanguage(cc.sys.LANGUAGE_ENGLISH);
        // cc.Debug.Log("AppPreLoadDidFinish APP_NAME:" + lan.GetString("APP_NAME"));
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

//AppSceneBase.main = null; 
