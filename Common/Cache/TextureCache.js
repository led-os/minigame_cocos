var Dictionary = require("Dictionary");
//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var TextureCache = cc.Class({
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
    //Texture2D
    Load: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        var key = filepath;

        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.log("TextureCache  load  from cache");
            if (completeCallback) {
                completeCallback(null, ret);
            }
        } else {
            // //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
            // cc.loader.loadRes(filepath, cc.Texture2D, function (err, tex) {
            //     //cc.url.raw('res/textures/content.png')
            //     if (err) {
            //         cc.log("TextureCache loadRes fail");
            //         cc.log(err.message || err);
            //         if (completeCallback) {
            //             completeCallback(err, tex);
            //         }
            //         return ret;
            //     }
            //     // cc.log("TextureCache loadRes ok");
            //     if (tex != null) {
            //         this.dicItem.Add(key, tex);
            //     }
            //     if (completeCallback) {
            //         completeCallback(err, tex);
            //     }
            //     //this.sprite.spriteFrame = new cc.SpriteFrame(tex); 
            // }.bind(this));
            this.LoadNotCache(filepath, completeCallback);
        }
        return ret;

    },

    Load2: function (filepath, isCache, completeCallback) {
        if (isCache) {
            this.LoadCache(filepath, completeCallback);
        } else {
            this.LoadNotCache(filepath, completeCallback);
        }
    },


    LoadCache: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        var key = filepath;

        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.log("TextureCache  load  from cache");
            if (completeCallback) {
                completeCallback(null, ret);
            }
        } else {
            // //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
            // cc.loader.loadRes(filepath, cc.Texture2D, function (err, tex) {
            //     //cc.url.raw('res/textures/content.png')
            //     if (err) {
            //         cc.log("TextureCache loadRes fail");
            //         cc.log(err.message || err);
            //         if (completeCallback) {
            //             completeCallback(err, tex);
            //         }
            //         return ret;
            //     }
            //     // cc.log("TextureCache loadRes ok");
            //     if (tex != null) {
            //         this.dicItem.Add(key, tex);
            //     }
            //     if (completeCallback) {
            //         completeCallback(err, tex);
            //     }
            //     //this.sprite.spriteFrame = new cc.SpriteFrame(tex); 
            // }.bind(this));
            this.LoadNotCache(filepath, completeCallback);
        }
        return ret;

    },

    LoadNotCache: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        var key = filepath;

        {
            //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
            cc.loader.loadRes(filepath, cc.Texture2D, function (err, tex) {
                //cc.url.raw('res/textures/content.png')
                if (err) {
                    cc.log("TextureCache loadRes fail");
                    cc.log(err.message || err);
                    if (completeCallback) {
                        completeCallback(err, tex);
                    }
                    return ret;
                }
                // cc.log("TextureCache loadRes ok");
                if (tex != null) {
                    this.dicItem.Add(key, tex);
                }
                if (completeCallback) {
                    completeCallback(err, tex);
                }
                //this.sprite.spriteFrame = new cc.SpriteFrame(tex); 
            }.bind(this));
        }
        return ret;

    },

});

TextureCache.main = new TextureCache();


cc.TextureCache = module.export = TextureCache;

