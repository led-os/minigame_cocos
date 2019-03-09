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

        //https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/GameRes/image/banyuan/banyuan.png?sign=6f70fe6cbbb02943d6b433348ce66ba8&t=1552029703

        //image
        IMAGE_HOME_BG: "App/UI/Home/LearnProgressBg",
        IMAGE_BTN_SWITCH_UNSEL: "App/UI/Common/BtnSwitchUnSel",
        IMAGE_BTN_SWITCH_SEL: "App/UI/Common/BtnSwitchSel",


        IMAGE_GUANKA_CELL_ITEM_BG_UNLOCK: "App/UI/Guanka/guanka_item_unlock",
        IMAGE_GUANKA_CELL_ITEM_BG_LOCK: "App/UI/Guanka/guanka_item_lock",
        IMAGE_GUANKA_CELL_ITEM_BG_PLAY: "App/UI/Guanka/guanka_item_playing",


        IMAGE_CELL_BG_BLUE: "App/UI/Setting/SettingCellBgBlue",
        IMAGE_CELL_BG_ORINGE: "App/UI/Setting/SettingCellBgOringe",
        IMAGE_CELL_BG_YELLOW: "App/UI/Setting/SettingCellBgYellow",

        //game
        IMAGE_Game_Bomb: "App/UI/Game/Bomb",

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

