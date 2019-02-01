var Common = require("Common");
cc.Class({
    extends: cc.Object,
    properties: {
    },

    statics: {
        ScaleImage: function (image, isMaxFit) {
            var size = image.node.getContentSize();
            var x = size.width;
            var y = size.height;
            var w_rect = Common.appSceneMain.sizeCanvas.width;
            var h_rect = Common.appSceneMain.sizeCanvas.height;
            var scale = 0;
            if (isMaxFit == true) {
                scale = Common.GetMaxFitScale(x, y, w_rect, h_rect);
            } else {
                scale = Common.GetBestFitScale(x, y, w_rect, h_rect);
            }

            image.node.scaleX = scale;
            image.node.scaleY = scale;
        },
    },

}); 
