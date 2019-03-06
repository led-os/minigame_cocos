//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var Debug = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量 
        Log: function (str) {
            console.log(str);
            // if (cc.Common.main().isWeiXin) {
            //     console.log(str);
            // } else {
            //     //cc.log(str);
            //      console.log(str);
            // }

        },


    },
    properties: {
        //get 和 set 函数不能放在statics里


    },


});

Debug.main = new Debug();

cc.Debug = module.export = Debug;

