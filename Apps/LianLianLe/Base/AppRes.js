//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var AppRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {

        //int
        GOLD_SHARE: 5,
        GOLD_GUANKA: 3,
        GOLD_COMMENT: 3,
        GOLD_INIT_VALUE: 10,
        GOLD_GUANKA_STEP: 4,

        //key
        KEY_LANGUAGE: "KEY_LANGUAGE",
        KEY_FIRST_RUN: "KEY_FIRST_RUN",
        KEY_BACKGROUND_MUSIC: "KEY_BACKGROUND_MUSIC",
        KEY_LANGUAGE: "STR_KEY_LANGUAGE",
        KEY_COMMENT_VERSION: "key_comment_",
        KEY_COMMENT_LAST_TIME: "key_comment_last_time",
        KEY_USER_GUIDE: "key_comment_user_guide_",
        KEY_DOWNLOAD_CLOUNDRES: "KEY_DOWNLOAD_CLOUNDRES",
        KEY_GAME_LOCK: "KEY_GAME_LOCK",

        //audio 
        AUDIO_BG: "Bg.mp3",
        AUDIO_GAME_DragOk: " DragOk.mp3",
        AUDIO_GAME_DragFail: "DragFail.mp3",
        AUDIO_GAME_GuankaOk: "GuankaOk.mp3",
        AUDIO_BtnClick: "BtnClick.mp3",

        //image   

        //share
        SHARE_TITLE: "通过物品的连线快速学习事物",
        SHARE_IMAGE_URL: "https://6c69-lianlianle-shkb3-1259451541.tcb.qcloud.la/Share/2.jpg?sign=a21483ceeee8c806804803ce2de6ff65&t=1560564896",

        //clound
        URL_CLOUND_RES: "https://6c69-lianlianle-shkb3-1259451541.tcb.qcloud.la/CloudRes.zip?sign=0763ef1a87ef54872f92151f308881d9&t=1560564859",
        URL_CLOUND_RES_HD: "https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/CloudRes.zip?sign=eab5b69e0643867ebccdb86b85b47759&t=1555923509",
    },

    properties:
    {
        URL_HTTP_HEAD:
        {
            get: function () {
                var str = "";
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    str = "https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/";
                }
                return str;
            },
        }


    },

});

AppRes._main = null;
AppRes.main = function () {
    if (!AppRes._main) {
        AppRes._main = new AppRes();
    }
    return AppRes._main;
}

cc.AppRes = module.export = AppRes;
