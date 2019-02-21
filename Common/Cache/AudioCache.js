var Dictionary = require("Dictionary");
//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var AudioCache = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    properties: {
        dicItem: {
            default: null,
            type: Dictionary
        },
    },
    Init: function () {
        if (this.dicItem != null) {
            return;
        }
        this.dicItem = new Dictionary();
    },

    Load: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        var key = filepath;

        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.log("AudioCache  load  from cache");
            if (completeCallback) {
                completeCallback(null, ret);
            }
        } else {
            //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
            cc.loader.loadRes(filepath, function (err, audio)//cc.Texture2D,
            {
                if (err) {
                    cc.log("AudioCache loadRes fail");
                    cc.log(err.message || err);
                    if (completeCallback) {
                        completeCallback(err, audio);
                    }
                    return ret;
                }
                cc.log("AudioCache loadRes ok");
                if (audio != null) {
                    this.dicItem.Add(key, audio);
                }
                if (completeCallback) {
                    completeCallback(err, audio);
                }
            }.bind(this));
        }
        return ret;

    },


});

AudioCache.main = new AudioCache();

cc.AudioCache = module.export = AudioCache; 
