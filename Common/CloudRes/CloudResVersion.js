var Dictionary = require("Dictionary");

var CloudResVersion = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量

    },
    properties: {
        rootJson: null,
        version:
        {
            get: function () {
                if (this.rootJson != null) {
                    return this.rootJson.version;
                }
                return "0.0.0";
            },
        },


    },

    LoadFinish(err, rootJson) {
        if (err) {
            cc.Debug.Log("CloudResVersion:err=" + err);
            // return;
        }
        if (err == null) {
            if (rootJson.json == null) {
                cc.Debug.Log("LoadFinish weixin CloudResVersion:ParseData");
                this.ParseData(rootJson);
            } else {
                //resource里的json文件
                cc.Debug.Log("LoadFinish resource CloudResVersion:ParseData");
                this.ParseData(rootJson.json);
            }
        }
        if (this.callbackFinish != null) {
            this.callbackFinish();
        }
    },


    Load(cbFinish) {
        this.callbackFinish = cbFinish;
        if (this.rootJson != null) {
            if (this.callbackFinish != null) {
                this.callbackFinish();
            }
            return;
        }
        var dirRoot = cc.Common.CLOUD_RES_DIR;
        if (cc.Common.main().isWeiXin) {
            dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
        }
        var filepath = dirRoot + "/version.json";

        if (cc.Common.main().isWeiXin) {
            // 加载json文件
            cc.loader.load({ url: filepath, type: "json" }, function (err, rootJson) {
                this.LoadFinish(err, rootJson);
            }.bind(this));
        } else {
            //cc.JsonAsset   cc.loader.load
            //去除后缀
            filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
            cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
                this.LoadFinish(err, rootJson);
            }.bind(this));
        }



    },

    ParseData: function (json) {
        cc.Debug.Log("CloudResVersion:ParseData start");
        this.rootJson = json;
        if (this.rootJson == null) {
            cc.Debug.Log("CloudResVersion:ParseData  is null");
        }
    },



});

// Config.main = new Config();


//单例对象 方法二
CloudResVersion._main = null;
CloudResVersion.main = function () {
    if (!CloudResVersion._main) {
        CloudResVersion._main = new CloudResVersion();
        //CloudResVersion._main.Load();
    }
    return CloudResVersion._main;
}

cc.CloudResVersion = module.export = CloudResVersion;

