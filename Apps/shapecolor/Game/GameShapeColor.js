var UIViewController = require("UIViewController");
// var Common = require("Common");
//var Config = require("Config"); 
//var Language = require("Language");
var UIView = require("UIView");

var GameShapeColor = cc.Class({
    extends: UIView,
    statics: {
        GUANKA_NUM_PER_ITEM: 5,
        GAME_MODE_SHAPE: 0,
        GAME_MODE_COLOR: 1,
        GAME_MODE_SHAPE_COLOR: 2,

        STR_KEY_GAME_STATUS_SHAPE: "KEY_GAME_STATUS_SHAPE_",
        STR_KEY_GAME_STATUS_COLOR: "KEY_GAME_STATUS_COLOR_",
        GAME_STATUS_UN_START: 0,//没有开始
        GAME_STATUS_PLAY: 1,//进行中
        GAME_STATUS_FINISH: 2,//完成

        TAG_ITEM_LOCK: -1,
        TAG_ITEM_UNLOCK: 0,
    },

    properties: {
        imageBg: cc.Sprite,

        listShape: null,
        listColor: null,
        listItem: {
            default: [],
            type: cc.Object
        },
        listColorShow: {
            default: [],
            type: cc.Object
        },

        totalRow: 0,
        totalCol: 0,


    },
    onLoad: function () {
        this._super();

    },

    Init: function () {
    },

    LayOut: function () {
    },

    //ShapeColorItemInfo
    GetItemInfoShapeColor: function(idx, list) {
        if (list == null) {
            return null;
        }
        if (idx >= list.length) {
            return null;
        }
        var info = list[idx];
        return info;
    },

     CalcRowCol( total)
    {
        var sqr = Math.sqrt(total);
        if (total > sqr * sqr)
        {
            sqr++;
        }
        return sqr;
    },

    //从数组里随机抽取newsize个元素
    RandomIndex: function( size,  newsize)
    {
       var listIndex = [];
        var total = size;
        for (var i = 0; i < total; i++)
        {
            listIndex.push(i);
        }

        var idxTmp = [] ;//new int[newsize];
        for (var i = 0; i < newsize; i++)
        {
            total = listIndex.length; 
            var rdm = Math.floor((Math.random() *total));
            var idx = listIndex[rdm];
            idxTmp.push(idx);
            //listIndex.RemoveAt(rdm);
            listIndex.splice(rdm,1);
        }

        return idxTmp;
    },

    LoadGame: function (mode) {

        Debug.Log("LoadGame:mode=" + mode);
        //清空
        this.listItem.length = 0;
        this.listColorShow.length = 0;

        switch (mode) {
            case GameShapeColor.GAME_MODE_SHAPE:
                this.LoadGameByShape(mode);
                break;

            case GameShapeColor.GAME_MODE_COLOR:
                this.LoadGameByColor(mode);
                break;
            case GameShapeColor.GAME_MODE_SHAPE_COLOR:
                this.LoadGameByShapeColor(mode);
                break;
        }

        if (this.listColorShow.length != 0) {
            //floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数
            var idx = Math.floor((Math.random() * listColorShow.Count));
            var infocolor = this.listColor[idx];
        }

        this.LayOut();
    },

    LoadGameByShape: function (mode) {

        var level = cc.GameManager.gameLevel;
        var idx = level / GameShapeColor.GUANKA_NUM_PER_ITEM;
        var infoshape = this.GetItemInfoShapeColor(idx, listShape);
        if (infoshape == null) {
            cc.log("LoadGameByShape null");
            return;
        }

        // //shape 数量（单位 inner和outer一对）
        var mainShapePair = [1, 2, 2, 2, 3];
        var otherShapeNum = [0, 0, 1, 2, 2];

        var idx_sub = level % GameShapeColor.GUANKA_NUM_PER_ITEM;
        var totalMainShape = mainShapePair[idx_sub] * 2;
        var totalOtherShape = otherShapeNum[idx_sub];

        var totalItem = totalMainShape + totalOtherShape;
        this.totalRow = CalcRowCol(totalItem);
        this.totalCol = totalRow;

        // Debug.Log("totalItem=" + totalItem + " row=" + totalRow + " col=" + totalCol);

        var indexRectList = this.RandomIndex(totalRow * totalCol, totalItem);

        // //mainshape


        var indexColor = this.RandomIndex(listColor.length, totalMainShape / 2);
        for (var k = 0; k < totalMainShape; k++)
        {
            var indexRect = indexRectList[k];
            var i = indexRect % totalCol;
            var j = indexRect / totalRow;

            var idx_color = indexColor[k / 2];
            var infocolor = this.listColor[idx_color];

            // GameObject obj = null;
            var isInner = (k % 2 == 0) ? true : false;
            this.listColorShow.push(infocolor);
            // obj = CreateItem(infoshape, isInner, infocolor.color);
            // Rect rc = GetRectItem(i, j, totalRow, totalCol);


            // var infoitem = AddItem(rc, infoshape, infocolor, obj, isInner, true);
            // infoitem.i = i;
            // infoitem.j = j;
        }

        // //othershape
        // indexColor = RandomIndex(listColor.Count, totalOtherShape);
        // List<object> listOther = GetOtherItemList(infoshape, listShape);
        // int[] indexOther = RandomIndex(listOther.Count, totalOtherShape);
        // for (int k = 0; k < totalOtherShape; k++)
        // {
        //     int indexRect = indexRectList[totalMainShape + k];
        //     int i = indexRect % totalCol;
        //     int j = indexRect / totalRow;

        //     int idxtmp = indexOther[k];
        //     ShapeColorItemInfo infoOther = listOther[idxtmp] as ShapeColorItemInfo;

        //     int idx_color = indexColor[k];
        //     if (mode == GAME_MODE_SHAPE)
        //     {
        //         // 统一颜色
        //         idx_color = indexColor[0];
        //     }
        //     ShapeColorItemInfo infocolor = listColor[idx_color] as ShapeColorItemInfo;
        //     Color color = infocolor.color;
        //     listColorShow.Add(infocolor);
        //     GameObject obj = CreateItem(infoOther, true, color);
        //     Rect rc = GetRectItem(i, j, totalRow, totalCol);

        //     ShapeColorItemInfo infoitem = AddItem(rc, infoOther, infocolor, obj, true, false);
        //     infoitem.i = i;
        //     infoitem.j = j;
        // }
    },
    LoadGameByColor: function (mode) {
    },
    LoadGameByShapeColor: function (mode) {
    },
});
