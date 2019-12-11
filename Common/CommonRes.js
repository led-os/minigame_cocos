//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var CommonRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        //key
        KEY_BACKGROUND_MUSIC: "KEY_BACKGROUND_MUSIC",
        KEY_BTN_SOUND: "KEY_BTN_SOUND",
        KEY_LANGUAGE: "KEY_LANGUAGE",
        KEY_FIRST_RUN: "KEY_FIRST_RUN",
 
        KEY_COMMENT_VERSION: "key_comment_",
        KEY_COMMENT_LAST_TIME: "key_comment_last_time",
        KEY_USER_GUIDE: "key_comment_user_guide_",
        KEY_DOWNLOAD_CLOUNDRES: "KEY_DOWNLOAD_CLOUNDRES",
        //image
        IMAGE_BLANK: "Common/UI/Blank",

    },

    properties:
    {



    },

});

cc.CommonRes = module.export = CommonRes;
