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

        KEY_GAME_LOCK: "KEY_GAME_LOCK",

        //audio 
        AUDIO_BG: "Bg",
        GUANKA_BG: "UI/Bg/GuankaBg.jpg",
        Game_BG: "UI/Bg/GameBg.jpg",
        PLACE_BG: "UI/Bg/PlaceBg.jpg",
        LearnProgress_Bg: "UI/Bg/LearnBg.jpg",
        HOME_BG: "UI/Bg/startup.jpg",
        SETTING_BG: "UI/Bg/SettingBg.png",
        AUDIO_GAME_DragOk: "audio/DragOk.mp3",
        AUDIO_GAME_DragFail: "audio/DragFail.mp3",
        AUDIO_GAME_GuankaOk: "audio/GuankaOk.mp3",
        AUDIO_BtnClick: "audio/BtnClick.mp3",
        //image
        IMAGE_BtnMusicOn: "App/UI/Common/Button/BtnIconMusic",
        IMAGE_BtnMusicOff: "App/UI/Common/Button/BtnIconMusic",
        IMAGE_BtnSoundOn: "App/UI/Common/Button/BtnIconMusic",
        IMAGE_BtnSoundOff: "App/UI/Common/Button/BtnIconMusic",

        IMAGE_BTN_SWITCH_UNSEL: "UI/Common/BtnSwitchUnSel",
        IMAGE_BTN_SWITCH_SEL: "UI/Common/BtnSwitchSel",


        IMAGE_BTN_COMMON: "UI/Common/BtnCommon",
        IMAGE_ALERT_BG: "UI/Common/AlertBg",
        IMAGE_HOME_NAME_BG: "UI/Home/NameBg.png",

        IMAGE_CELL_BG_BLUE: "UI/Setting/SettingCellBgBlue",
        IMAGE_CELL_BG_ORINGE: "UI/Setting/SettingCellBgOringe",
        IMAGE_CELL_BG_YELLOW: "UI/Setting/SettingCellBgYellow",
        IMAGE_Language_Bg: "UI/Setting/Language/LanguageBoxBg",




        // CloundRes btn
        IMAGE_BTN_BG: "UI/Common/Button/BtnBg.png",
        IMAGE_BTN_BG_GREY: "UI/Common/Button/BtnBgGrey.png",
        IMAGE_BTN_ICON_PLAY: "UI/Common/Button/BtnIconPlay.png",
        IMAGE_BTN_ICON_LOVE: "UI/Common/Button/BtnIconLove.png",
        IMAGE_BTN_ICON_TIPS: "UI/Common/Button/BtnIconTips.png",
        IMAGE_BTN_ICON_MUSIC: "UI/Common/Button/BtnIconMusic.png",
        IMAGE_BTN_ICON_HOME: "UI/Common/Button/BtnIconHome.png",
        IMAGE_BTN_ICON_HELP: "UI/Common/Button/BtnIconHelp.png",
        IMAGE_BTN_ICON_NOAD: "UI/Common/Button/BtnIconNoAd.png",
        IMAGE_BTN_ICON_CLOSE: "UI/Common/Button/BtnIconClose.png",
        IMAGE_BTN_ICON_BACK: "UI/Common/Button/BtnIconBack.png",
        IMAGE_BTN_ICON_LEARN: "UI/Common/Button/BtnIconLearn.png",
        IMAGE_BTN_ICON_MORE: "UI/Common/Button/BtnIconMore.png",
        IMAGE_BTN_ICON_SETTING: "UI/Common/Button/BtnIconSetting.png",
        IMAGE_BTN_ICON_RETRY: "UI/Common/Button/BtnIconRetry.png",
        IMAGE_BTN_ICON_SHARE: "UI/Common/Button/BtnIconShare.png",
        IMAGE_BTN_ICON_SOUND: "UI/Common/Button/BtnIconSound.png",
        IMAGE_BTN_ICON_VIDEO: "UI/Common/Button/BtnIconVideo.png",

        //guanka
        IMAGE_GUANKA_CELL_ITEM_BG_UNLOCK: "UI/Guanka/guanka_item_unlock",
        IMAGE_GUANKA_CELL_ITEM_BG_LOCK: "UI/Guanka/guanka_item_lock",
        IMAGE_GUANKA_CELL_ITEM_BG_PLAY: "UI/Guanka/guanka_item_playing",

        //game
        IMAGE_WORD_BG: "UI/Common/word.png",
        IMAGE_BoardPic: "UI/Game/BoardPic.png",
        IMAGE_BTN_GameWinBtn: "UI/Game/GameWinBtn.png",
        IMAGE_BTN_GameWinHead: "UI/Game/GameWinHead.png",
        IMAGE_BTN_GameWinBg: "UI/Game/GameWinBg.png",
        
        
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

