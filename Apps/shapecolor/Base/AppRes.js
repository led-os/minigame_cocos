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

        //image
        IMAGE_HOME_BG: "App/UI/Home/LearnProgressBg",
        IMAGE_BTN_SWITCH_UNSEL: "App/UI/Common/BtnSwitchUnSel",
        IMAGE_BTN_SWITCH_SEL: "App/UI/Common/BtnSwitchSel",
        //key
        KEY_LANGUAGE: "KEY_LANGUAGE",
        KEY_NOT_FIRST_RUN: "STR_KEY_NOT_FIRST_RUN",
        KEY_BACKGROUND_MUSIC: "KEY_BACKGROUND_MUSIC",
        KEY_LANGUAGE: "STR_KEY_LANGUAGE",
        KEY_COMMENT_VERSION: "key_comment_",
        KEY_COMMENT_LAST_TIME: "key_comment_last_time",
        KEY_USER_GUIDE: "key_comment_user_guide_",
    },



});

cc.AppRes = module.export = AppRes;

