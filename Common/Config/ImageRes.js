var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ImageRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量   

    },
    properties: {
        jsonRoot: null,
    },

    Load: function (obj) {
        var filepath = cc.CloudRes.main().rootPath + "/ImageRes.json";
        cc.Debug.Log("ImageRes:filepath =" + filepath);
        if (cc.Common.main().isWeiXin) {
            // 加载json文件
            cc.loader.load({ url: filepath, type: "json" }, function (err, rootJson) {
                this.ParseData(rootJson);
                this.GetImageInternal(obj);
            }.bind(this));
        } else {
            //cc.JsonAsset   cc.loader.load
            //去除后缀
            filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
            cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
                this.ParseData(rootJson.json);
                this.GetImageInternal(obj);
            }.bind(this));
        }
    },


    ParseData: function (json) {
        cc.Debug.Log("ImageRes:ParseData");
        if (json == null) {
            cc.Debug.Log("ImageRes:ParseData=null");
        }
        this.jsonRoot = json;

    },


    // 255,100,200,255 to color return cc.Vec4  47,47,47,255
    //cc.Vec4 (left,right,top,bottom)
    String2Vec4: function (str) {
        var x, y, z, w;
        var strsplit = ",";
        var list = str.split(strsplit);
        var index = 0;
        for (let value of list) {
            if (index == 0) {
                x = parseInt(value);
            }
            if (index == 1) {
                y = parseInt(value);
            }
            if (index == 2) {
                z = parseInt(value);
            }
            if (index == 3) {
                w = parseInt(value);
            }
            index++;
        }
        var ret = new cc.Vec4(x, y, z, w);
        return ret;
    },

    //同步 synchronization
    GetImageSync(key) {
        return cc.JsonUtil.GetItem(this.jsonRoot, key, "");
    },

    GetBoardKey(key) {
        return key + "_BOARD";
    },

    //9宫格图片边框参数 (left,right,top,bottom)
    //cc.Vec4 (left,right,top,bottom)
    GetImageBoardSync(key) {
        var str = cc.JsonUtil.GetItem(this.jsonRoot, this.GetBoardKey(key), "");
        return this.String2Vec4(str);
    },

    //bool
    ContainsBoard(key) {
        return cc.JsonUtil.ContainsKey(this.jsonRoot, this.GetBoardKey(key));
    },


    //异步
    /*
    {
        key: "", F
        success: function (color) {
        },
        fail: function () {
        }, 
    }
*/
    GetImage(obj) {
        if (this.jsonRoot != null) {
            return this.GetImageInternal(obj);
        } else {
            this.Load(obj);
        }
    },

    GetImageInternal(obj) {
        var key = "key";
        var ret = "";
        if (obj != null) {
            key = obj.key;
        }
        ret = this.GetImageSync(key);
        if (obj != null) {
            if (obj.success != null) {
                obj.success(ret);
            }
        }
    },


});

//单例对象 方法二
ImageRes._main = null;
ImageRes.main = function () {
    if (!ImageRes._main) {
        ImageRes._main = new ImageRes();
    } else {
    }
    return ImageRes._main;
}

cc.ImageRes = module.export = ImageRes;

