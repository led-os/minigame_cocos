
//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var GameRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        GAME_XIEHOUYU: "xiehouyu",
        GAME_IDIOM: "Idiom",
        GAME_POEM: "poem",
        GAME_Image: "Image",
        GAME_Guess: "Guess",
        GAME_RIDDLE: "Riddle",
        GAME_IdiomConnect: "IdiomConnect",
        GAME_ANIMAL: "animal",
        //type 
        GAME_TYPE_IMAGE: "Image",
        GAME_TYPE_TEXT: "Text",
        GAME_TYPE_IMAGE_TEXT: "ImageText",
        GAME_TYPE_CONNECT: "Connect",//接龙

        //image  
        IMAGE_LetterBgNormal: "App/UI/Game/UILetter/LetterBgNormal",
        IMAGE_LetterBgLock: "App/UI/Game/UILetter/LetterBgLock",
        IMAGE_LetterBgRightAnswer: "App/UI/Game/UILetter/LetterBgRightAnswer",
        IMAGE_LetterBgAddWord: "App/UI/Game/UILetter/LetterBgAddWord",


        //color
        //f88816 248,136,22
        KEY_COLOR_TITLE: "title",
        KEY_COLOR_PlaceItemTitle: "PlaceItemTitle",
        KEY_COLOR_BoardTitle: "BoardTitle",
        KEY_COLOR_GameText: "GameText",
        KEY_COLOR_GameWinTitle: "GameWinTitle",
        KEY_COLOR_GameWinTextView: "GameWinTextView",

    },

});

// AppRes._main = null;
// AppRes.main = function () {
//     if (!AppRes._main) {
//         AppRes._main = new AppRes();
//     }
//     return AppRes._main;
// }

cc.GameRes = module.export = GameRes;


