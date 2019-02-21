var ItemInfo = cc.Class({
    extends: cc.Object,
    properties: {
        source: '',
        id: '',
        pic: '',
        title: '',
        description: '',
        artist: '',
        url: '',
        icon: '',
        appid: '',
        category: '',
        sound: '',
        tag: '',
        index: '',
        row: '',
        col: '',
        obj: cc.Node,
        time: '',
    },
});

cc.ItemInfo = module.export = ItemInfo; 