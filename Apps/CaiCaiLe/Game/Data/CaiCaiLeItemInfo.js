var CaiCaiLeItemInfo = cc.Class({
    extends: cc.ItemInfo,// cc.ItemInfo,
    properties: {
        author: "",
        year: "",
        style: "",
        album: "",
        intro: "",
        translation: "",
        appreciation: "",
        pinyin: "",
        head: "",
        end: "",
        tips: "",

        listPoemContent: {
            default: [],
            type: cc.Object//PoemContentInfo
        },

        //idiomconnet

        listWord: {
            default: [],
            type: cc.Object//string
        },

        listIdiom: {
            default: [],
            type: cc.Object//string
        },

        listPosX: {
            default: [],
            type: cc.Object//int
        },

        listPosY: {
            default: [],
            type: cc.Object//int
        },
        listWordAnswer: {
            default: [],
            type: cc.Object//int
        },
        date: "",
        addtime: "",

    },
});
cc.CaiCaiLeItemInfo = module.export = CaiCaiLeItemInfo; 