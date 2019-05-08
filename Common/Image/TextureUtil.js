var TextureUtil = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        UpdateButtonTexture: function (btn, filepath, isUpdateSize) {
            var sp = btn.node.getComponent(cc.Sprite);

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

    },
});

cc.TextureUtil = module.export = TextureUtil; 
