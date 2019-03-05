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

    // * loadRes(url: string, completeCallback: (error: Error, resource: any) => void): void
    Load: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        var key = filepath;

        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.Debug.Log("AudioCache  load  from cache");
            if (completeCallback) {
                completeCallback(null, ret);
            }
        } else {

            cc.loader.loadRes(filepath, cc.AudioClip, function (err, audioClip) {
                if (err) {
                    cc.Debug.Log("AudioCache loadRes fail");
                    cc.Debug.Log(err.message || err);
                    if (completeCallback) {
                        completeCallback(err, audioClip);
                    }
                    return ret;
                }

                cc.Debug.Log("AudioCache loadRes ok");
                if (audioClip != null) {
                    this.dicItem.Add(key, audioClip);
                }
                if (completeCallback) {
                    completeCallback(err, audioClip);
                }

            }.bind(this));

        }
        return ret;

    },


});

AudioCache.main = new AudioCache();

cc.AudioCache = module.export = AudioCache; 
