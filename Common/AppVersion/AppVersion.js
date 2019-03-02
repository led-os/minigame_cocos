var UIView = require("UIView");

var AppVersion = cc.Class({
    extends: cc.Object,
    statics: {
        STRING_KEY_APP_CHECK_FINISHED: "app_check_finished",
    },
    properties: {
        btnBack: {
            default: null,
            type: cc.Button
        },
        tableView: cc.TableView,

        appCheckHasFinished: {
            get: function () {
                if (cc.Common.main().isAndroid) {
                    if (cc.Config.main().channel == Source.TAPTAP) {
                        return true;
                    }
                    // if (!IPInfo.isInChina)
                    // {
                    //     //android 国外 直接当作 审核通过
                    //   //  return true;
                    // }
                }
                var ret = cc.Common.GetItemOfKey(AppVersion.STRING_KEY_APP_CHECK_FINISHED, false);
                return ret;
            },

        },



    },

    onLoad: function () {

    },

});

AppVersion._main = null;
AppVersion.main = function () {
    if (!AppVersion._main) {
        AppVersion._main = new AppVersion();
    } else {

    }

    return AppVersion._main;
}
cc.AppVersion = module.export = AppVersion;



