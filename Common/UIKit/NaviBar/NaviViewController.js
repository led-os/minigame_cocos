var UIViewController = require("UIViewController");
var UINaviBar = require("UINaviBar");

cc.Class({
    extends: UIViewController,
    properties: {
        index: 0,
        objContent: cc.Node,

        uiNaviBarPrefab: {
            default: null,
            type: cc.Prefab,
        },
        uiNaviBar: {
            default: null,
            type: UINaviBar,
        },

        rootController: {
            default: null,
            type: UIViewController,
        },

        listController: {
            default: [],
            type: UIViewController
        },
    },

    LoadPrefab: function () {
        //   name = "UIHome" + Common.appType;
        var strPrefab = "Common/Prefab/NaviBar/UINaviBar";
        cc.loader.loadRes(strPrefab, function (err, prefab) {
            this.uiNaviBarPrefab = prefab;
            this.CreateBar();

        }.bind(this)
        );
    },

    ViewDidLoad: function () {
        this.CreateContent();
        this.LoadPrefab();
    },
    CreateBar: function () {

        //this.listItem = new Array();
        cc.log("NaviViewController CreateBar");
        var node = cc.instantiate(this.uiNaviBarPrefab);
        this.uiNaviBar = node.getComponent(UINaviBar);
        this.uiNaviBar.SetController(this);


    },

    CreateContent: function () {
        var classname = "Content";
        this.objContent = new cc.Node();
        this.objContent.parent = this.objController;

    },

    Push: function (controller) {

        if (controller == null) {
            return;
        }
        this.listController.push(controller);
        //  controller.type = UIViewController.Type.NAVIBAR;
        // controller.naviController = this;
        // UpdateController();

    },
    Pop: function () {
        if (this.listController.length == 0) {
            return;
        }

        this.DestroyController();
        // listController.RemoveAt(listController.Count - 1);

        this.UpdateController();
    },
    HideNavibar: function (isHide) {
        if (this.uiNaviBar != null) {
            this.uiNaviBar.node.active = !isHide;
        }
    },
    DestroyController: function () {
        if (this.rootController != null) {
            this.rootController.DestroyObjController();
            this.rootController = null;
        }
    },
    UpdateController: function () {

        if (this.listController.length == 0) {
            return;
        }
        this.DestroyController();

        var controller = listController[listController.length - 1];
        if (this.objContent != null) {
            controller.SetViewParent(this.objContent);
            this.rootController = controller;
            //controller.LayOutView();
        }
        if (this.uiNaviBar != null) {
            this.uiNaviBar.HideBtnBack((listController.length < 2) ? true : false);
            this.uiNaviBar.UpdateTitle(controller.title);
        }

    }

}); 
