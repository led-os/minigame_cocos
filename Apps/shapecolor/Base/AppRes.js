//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var AppRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {

        //image
        IMAGE_HOME_BG: "App/UI/Home/LearnProgressBg",

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

