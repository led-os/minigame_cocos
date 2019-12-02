var TextureUtil = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        UpdateButtonTexture: function (btn, filepath, isUpdateSize) {
            var sp = btn.node.getComponent(cc.Sprite);
            this.UpdateImage(sp, filepath, isUpdateSize);
        },
        UpdateImage: function (image, filepath, isUpdateSize) {
            // var sp = btn.node.getComponent(cc.Sprite);
            var sp = image;
            cc.TextureCache.main.Load2(filepath, false, function (err, tex) {
                if (err) {
                    cc.Debug.Log("UpdateBtnSwitch err");
                    cc.Debug.Log(err.message || err);
                    return;
                }
                //cc.Debug.Log("UpdateBtnSwitch spriteFrame");
                if (tex == null) {
                    cc.Debug.Log("UpdateButtonTexture spriteFrame=null");
                    return;
                }
                sp.spriteFrame = new cc.SpriteFrame(tex);
            }.bind(this));

        },
        /*
         {
             sprite:cc.Sprite,
             pic: "",
             def: "",
             success: function () {
             },
             fail: function () {
             }, 
         }
     */
        UpdateSpriteImage: function (obj) {
            var pic = obj.pic;
            cc.Debug.Log("UpdateSpriteImage pic=" + pic);
            cc.TextureCache.main.Load(pic, function (err, tex) {
                if (err) {
                    if (obj.fail != null) {
                        obj.fail();
                    }
                    return;
                }
                obj.sprite.spriteFrame = new cc.SpriteFrame(tex);
                var lyscale = obj.sprite.node.getComponent(cc.LayoutScale);
                if (lyscale) {
                    lyscale.LayOut();
                }
                if (obj.success != null) {
                    obj.success();
                }
            }.bind(this));
        },

    },
});

cc.TextureUtil = module.export = TextureUtil; 
