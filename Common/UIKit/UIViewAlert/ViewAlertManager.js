var UIViewAlert = require("UIViewAlert");
var ViewAlertManager = cc.Class({
    extends: cc.Object,
    properties: {
        uiPrefab: cc.Prefab,
        ui: UIViewAlert,
        keyName: "",
        isNeedShow: false,
        strTitle: "",
        strMsg: "",
        strYes: "",
        strNo: "",

        //callback(UIViewAlert alert, bool isYes);
        callback: null,
    },

    Init: function () {
        this.isNeedShow = false;
        this.LoadUI();
    },

    LoadUI: function () {
        var strPrefab = "Common/Prefab/UIKit/UIViewAlert/UIViewAlert";
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.uiPrefab = prefab;
            if (this.isNeedShow) {
                this.ShowInternal(this.strTitle, this.strMsg, this.strYes, this.strNo);
            }
        }.bind(this)
        );
    },

    ShowInternal: function (title, msg, yes, no) {
        //cc.Debug.Log("ShowInternal SetText title ="+title+" msg="+msg);
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIViewAlert);
        // this.ui.callback = this.OnUIViewAlertFinished.bind(this);

        this.ui.keyName = this.keyName;
        this.ui.SetText(title, msg, yes, no);
        this.ui.SetViewParent(cc.Common.appSceneMain.canvasMain.node);
    },
    //string
    Show: function (title, msg, yes, no) {
        this.isNeedShow = true;
        this.strTitle = title;
        this.strMsg = msg;
        this.strYes = yes;
        this.strNo = no;

        if (this.uiPrefab == null) {
            this.LoadUI();
        } else {
            this.ShowInternal(this.strTitle, this.strMsg, this.strYes, this.strNo);
        }


    },

    /*
 {
     title: "",
     msg: "",
     yes: "",
     no: "",
     isShowBtnNo:false,
     name: "",
     finish: function (ui,isYes) {
     }, 
 }
*/

    ShowFull: function (obj) {
        // this.keyName = obj.name;
        // this.callback = obj.finish;
        // this.Show(obj.title, obj.msg, obj.yes, obj.no);
        // //必须在show之后设置
        // this.ShowBtnNo(obj.isShowBtnNo);

        var strPrefab = "Common/Prefab/UIKit/UIViewAlert/UIViewAlert";
        cc.PopUpManager.main().Show({
            prefab: strPrefab,
            open: function (ui) {
                //ui.UpdateItem(info);
                ui.keyName = obj.name;
                ui.SetText(obj.title, obj.msg, obj.yes, obj.no);
                ui.ShowBtnNo(obj.isShowBtnNo);
                ui.callback = obj.finish;
            }.bind(this),
            close: function (ui) {
            }.bind(this),
        });
    },
    Hide: function () {
        if (this.ui != null) {
            // GameObject.DestroyImmediate(ui);
            // ui = null;
        }
    },

    ShowBtnNo: function (isShow) {
        if (this.ui != null) {
            this.ui.ShowBtnNo(isShow);
        }
    },

    OnUIViewAlertFinished: function (alert, isYes) {
        if (this.callback != null) {
            this.callback(alert, isYes);
        }
    },

});


ViewAlertManager._main = null;
ViewAlertManager.main = function () {
    if (!ViewAlertManager._main) {
        cc.Debug.Log("_main is null");
        ViewAlertManager._main = new ViewAlertManager();
        ViewAlertManager._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ViewAlertManager._main;
}

cc.ViewAlertManager = module.export = ViewAlertManager;

