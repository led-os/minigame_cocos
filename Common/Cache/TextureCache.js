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
            cc.log("TextureCache  load tex from cache");
            if (completeCallback) {
                completeCallback(null, tex);
            }
        } else {
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
                cc.log("TextureCache loadRes ok");
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

 /*
public class TextureCache
{
   

    public Texture2D Load(string filepath)
    {
        Texture2D tex = null;
        string key = filepath;
        if (dicItem.ContainsKey(key))
        {
            tex = dicItem[key];
        }
        else
        {
            if (FileUtil.FileIsExistAsset(key))
            {
                tex = LoadTexture.LoadFromAsset(key);
            }
            else
            {
                if (tex == null)
                {
                    tex = LoadTexture.LoadFromResource(key);
                }

                if (tex == null)
                {
                    tex = LoadTexture.LoadFromFile(key);
                }

            }

            if (tex != null)
            {
                dicItem.Add(key, tex);
            }

        }
        return tex;
    }

    public void DestoryAllItem()
    {
        foreach (KeyValuePair<string, Texture2D> item in dicItem)
        {
            string key = item.Key;
            Texture2D tex = item.Value;
            if (tex != null)
            {
                GameObject.DestroyImmediate(tex);
                tex = null;
            }
        }
        dicItem.Clear();
    }

    public void DeleteItem(string key)
    {
        if (!dicItem.ContainsKey(key))
        {
            return;
        }
        Texture2D tex = dicItem[key];
        if (tex != null)
        {
            GameObject.DestroyImmediate(tex);
            tex = null;
        }
        dicItem.Remove(key);
    }
}
*/

