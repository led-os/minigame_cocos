//关于js模拟c#的Delegate(委托)实现:https://www.cnblogs.com/kazetotori/p/5842379.html
var UIViewController = require("UIViewController");
// var Common = require("Common");

var IPopViewControllerDelegate = cc.Class({
    extends: cc.Object,
    properties: {



    },
    /**
       * @param {UIViewController} controller 
       * @returns {*}
       */
    OnPopViewControllerDidClose: function (controller) {

    },


});


var PopViewController = cc.Class({
    extends: UIViewController,
    properties: {

        // uiTabBarPrefab: {
        //     default: null,
        //     type: cc.Prefab,
        // },
        iDelegate: IPopViewControllerDelegate,
        _closeCallback: null,
    },
    /**
     * @param {UIViewController} controller
     * @param  IPopViewControllerDelegate dele
     * @param closeCallback: (controller: UIViewController) => void
     * @returns {*}
     */
    Show: function (controller, closeCallback) {
        this._closeCallback = closeCallback;
        //this.iDelegate = dele;
        var root = controller;
        if (root == null) {
            root = cc.Common.appSceneMain.rootViewController;
        }
        this.SetViewParent(root.objController);
    },

    Close: function () {
        // if (iDelegate != null) {
        //     iDelegate.OnPopViewControllerDidClose(this);
        // }

        cc.Debug.Log("PopViewController Close");

        if (this._closeCallback) {
            this._closeCallback(this);
        }
        this.DestroyObjController();
    },


});



