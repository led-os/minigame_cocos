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
        tag: 0,
        index: '',
        row: '',
        col: '',
        node: cc.Node,
        time: '',
    },
});

cc.ItemInfo = module.export = ItemInfo; 