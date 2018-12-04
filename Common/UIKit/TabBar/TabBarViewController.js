var UIViewController = require("UIViewController");
var UITabBar = require("UITabBar");
var TabBarItemInfo = require("UITabBarItem");
var UITabBarItem = require("UITabBarItem");

var TabBarViewController = cc.Class({
    extends: UIViewController,

    properties: {
        objContent: cc.Node,

        uiTabBarPrefab: UITabBar,
        uiTabBar: UITabBar,
        selectIndex: -1,
        rootController: UIViewController,


        listItem: {
            default: [],
            type: TabBarItemInfo
        },
    },



    ViewDidLoad: function () {
        this.CreateTabBar();
    },

    CreateTabBar: function () {
        this.CreateContent();
        // string strPrefab = "Common/Prefab/TabBar/UITabBar";
        // GameObject obj = (GameObject)Resources.Load(strPrefab);
        // uiTabBarPrefab = obj.GetComponent<UITabBar>();

        // uiTabBar = (UITabBar)GameObject.Instantiate(uiTabBarPrefab);
        // uiTabBar.transform.parent = objController.transform;
        // uiTabBar.callbackClick = OnUITabBarClick;
        // ViewControllerManager.ClonePrefabRectTransform(uiTabBarPrefab.gameObject, uiTabBar.gameObject);
    },

    CreateContent: function () {
        var classname = "Content";
        this.objContent = new cc.Node();
        // RectTransform rctran = objContent.AddComponent<RectTransform>();
        this.objContent.parent = this.objController;
        // // rctran.sizeDelta = sizeCanvas;

        // rctran.anchorMin = new Vector2(0, 0);
        // rctran.anchorMax = new Vector2(1, 1);

        // rctran.offsetMin = new Vector2(0, 0);
        // rctran.offsetMax = new Vector2(0, 0);
    },

    //TabBarItemInfo
    AddItem: function (info) {
        // if (listItem == null) {
        //     listItem = new List<TabBarItemInfo>();
        // }
        // listItem.Add(info);
        // uiTabBar.AddItem(info, listItem.Count - 1);
    },

    GetItem: function (idx) {
        if (this.listItem == null) {
            return null;
        }
        if ((idx < 0) || (idx >= this.listItem.length)) {
            return null;
        }

        //    info = listItem[idx];
        //TabBarItemInfo
        var info = this.listItem[idx];
        return info;
    },



    DestroyController: function () {
        if (this.objController == null) {
            return;
        }

        var info = GetItem(selectIndex);
        if (info == null) {
            //   Debug.Log("DestroyController null,selectIndex=" + selectIndex);
            return;
        }

        info.controller.DestroyObjController();


    },

    SelectItem: function (idx) {
        if (selectIndex == idx) {
            //Debug.Log("tabbar click the same item selectIndex=" + idx);
            return;
        }
        var info = GetItem(idx);
        if (info == null) {
            // Debug.Log("SelectItem null,idx=" + idx);
            return;
        }

        this.DestroyController();

        this.selectIndex = idx;
        //info.controller.CreateView(sizeCanvas);
        info.controller.SetViewParent(this.objContent);
        this.rootController = info.controller;
    },
    //UITabBar,UITabBarItem
    OnUITabBarClick: function (bar, item) {
        this.SelectItem(item.index);
    },

});

//单例对象 方法一
TabBarViewController.main = new TabBarViewController();

//单例对象 方法二
// TabBarViewController._main = null;
// TabBarViewController.main = function () {
//     if (!TabBarViewController._main) {
//         cc.log("_main is null");
//         TabBarViewController._main = new TabBarViewController();
//     } else {
//         cc.log("_main is not null");
//     }
//     return TabBarViewController._main;
// }



//     public override void LayOutView()
// {
//     base.LayOutView();
//     if (objContent != null) {
//         // RectTransform rctranParent = objContent.transform.parent.GetComponent<RectTransform>();
//         // if (objContent != null)
//         // {
//         //     RectTransform rctran = objContent.GetComponent<RectTransform>();
//         //     rctran.sizeDelta = rctranParent.sizeDelta;
//         // }

//     }

//     if (rootController != null) {
//         rootController.LayOutView();
//     }
// } 



