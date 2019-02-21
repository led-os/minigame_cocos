//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var Source = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量
        WEIXIN: "weixin",
        WEIXINFRIEND: "weixinfriend",
        QQ: "qq",
        QQZONE: "qqzone",
        WEIBO: "weibo",
        EMAIL: "email",
        SMS: "sms",
        UMENG: "umeng",

        IOS: "ios",
        ANDROID: "android",
        WIN: "win",

        //channel
        APPSTORE: "appstore",
        XIAOMI: "xiaomi",
        TAPTAP: "taptap",
        HUAWEI: "huawei",
        GP: "gp",//google play
        FACEBOOK: "fb",
        //ad
        INMOB: "inmobi",
        ADMOB: "admob",
        GDT: "gdt",
        UNITY: "unity",
        WAPS: "waps",
        ADVIEW: "adview",
        MICROSOFT: "microsoft",
        MOBVISTA: "mobvista",
    },



});
cc.Source = module.export = Source; 

