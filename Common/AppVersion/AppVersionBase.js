
var AppVersionBase = cc.Class({
    extends: cc.Object,
    statics: {

    },
    properties: {
        appNeedUpdate: false,
        isNetWorkOk: false,
        appCheckForAppstore: false,
        strUrlComment: false,
        appNeedUpdstrUrlAppstoreate: false,
        strUpdateNote: false,
        strVersionStore: false,
        isFirstCreat: false, 
    },



    Init: function () {
        this.appNeedUpdate = false;
        this.isFirstCreat = false;
        this.appCheckForAppstore = false;
        this.strVersionStore = "";

    },

    StartParseVersion: function () {
        this.isNetWorkOk = true;
        //         if(this.callbackFinished != null) {
        //             Debug.Log("Appversion ParseFinished callbackFinished");
        // this.callbackFinished(this);
        //     }
    },

    ParseData: function (data) {
    },


    ParseFinished: function (app) {
        cc.Debug.Log("Appversion ParseFinished strVersionStore=" + strVersionStore);
        // var appver = Application.version;
        // if (Common.BlankString(strVersionStore)) {

        //     if (Common.isiOS) {
        //         if (isFirstCreat) {
        //             appCheckForAppstore = true;
        //         }
        //     }
        //     else {
        //         appCheckForAppstore = true;
        //     }
        // }
        // else {


        //     int ret = string.Compare(appver, strVersionStore);
        //     Debug.Log("Appversion stroe:version:" + strVersionStore + " ret=" + ret);
        //     if (ret >= 0) {
        //         appNeedUpdate = false;
        //         if (ret > 0) {
        //             appCheckForAppstore = true;
        //         }
        //     }
        //     else {
        //         //版本更新
        //         appNeedUpdate = true;
        //         //appCheckVersionDidUpdate 

        //     }
        // }

        // if (Config.main.channel == Source.XIAOMI) {
        //     AppVersion.appCheckForXiaomi = appCheckForAppstore;
        //     if (Common.GetDayIndexOfUse() > Config.main.NO_AD_DAY) {
        //         //超过NO_AD_DAY 天数 认为审核完成
        //         appCheckForAppstore = false;
        //     }
        // }


        // Debug.Log("Appversion:appCheckForAppstore=" + appCheckForAppstore + " isNetWorkOk=" + isNetWorkOk);

        // if ((!appCheckForAppstore) && isNetWorkOk) {
        //     int v = Common.Bool2Int(true);
        //     PlayerPrefs.SetInt(AppVersion.STRING_KEY_APP_CHECK_FINISHED, v);
        // }

        // //appCheckHasFinished = Common.Int2Bool(PlayerPrefs.GetInt(STRING_KEY_APP_CHECK_FINISHED));

        // // Debug.Log("Appversion ParseFinished 1");
        // if (this.callbackFinished != null) {
        //     Debug.Log("Appversion ParseFinished callbackFinished");
        //     this.callbackFinished(this);
        // }
    },

    OnHttpRequestFinished: function (req, isSuccess, data) {
        cc.Debug.Log("Appversion OnHttpRequestFinished:isSuccess=" + isSuccess);
        // if (isSuccess) {
        //     isNetWorkOk = true;
        //     ParseData(data);

        // }
        // else {
        //     isNetWorkOk = false;
        //     ParseFinished(this);
        // }
    },

}); 
