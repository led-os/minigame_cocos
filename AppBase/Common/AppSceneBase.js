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
cc.Class({
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

        // rootViewController: {
        //     default: null,
        //     type: UIViewController
        // },
        rootViewController: UIViewController,


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
    },
    onLoad: function () {
        cc.log("AppSceneBase onLoad");
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

    LoadResFinish: function (err, prefab) {
        cc.log("LoadResFinish ");

    },

    //UIViewController controller
    SetRootViewController: function (controller) {

        if (this.rootViewController != null) {
            this.rootViewController.DestroyObjController();
        }
        this.rootViewController = controller;
        this.rootViewController.SetViewParent(this.rootNode);


    },


    // update (dt) {},
});
