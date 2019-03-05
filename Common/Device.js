//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var Device = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量 


    },
    properties: {
        //get 和 set 函数不能放在statics里
        isLandscape: {
            get: function () {
                var sz = cc.view.getVisibleSize();//屏幕分辨率
                cc.Debug.Log("sz=" + sz);
                if (sz.width > sz.height) {
                    return true;
                }
                return false;
            },
        },

    },


});

Device.main = new Device();

cc.Device = module.export = Device;

