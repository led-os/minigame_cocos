var UIView = require("UIView");
cc.Class({
    extends: UIView,
    properties: {
        index: 0,
        imageBg: cc.Sprite,
        imageFt: cc.Sprite,
        progress: 0,
    },
    onLoad: function () { 
    },
    LayOutDidFinish: function () {
        this.UpdateProgressInternal(this.progress);
    },
    UpdateProgress: function (value) {
        this.progress = value;
        this.UpdateProgressInternal(this.progress);
    },
    //0-1f
    UpdateProgressInternal: function (value) {
        var x, y, w, h;
        var size = this.node.getContentSize();
        w = size.width * value;
        h = size.height;
        // cc.Debug.Log("UpdateProgress w=" + w + " h=" + h + " size.width=" + size.width);

        var sizeFt = cc.size(w, h);
        this.imageFt.node.setContentSize(sizeFt);
        x = -size.width / 2 + sizeFt.width / 2;
        y = 0;
        this.imageFt.node.setPosition(x, y);
    },

}); 
