var UIViewController = require("UIViewController");
// var Common = require("Common");
//var Config = require("Config"); 
var ShapeColorItemInfo = require("ShapeColorItemInfo");
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
        // listColor: {
        //     default: [],
        //     type: ShapeColorItemInfo
        // },

        listItem: {
            default: [],
            type: ShapeColorItemInfo
        },
        listColorShow: {
            default: [],
            type: ShapeColorItemInfo
        },

        totalRow: 0,
        totalCol: 0,
        itemPosZ: -20.0,


    },
    onLoad: function () {
        this._super();

    },

    Init: function () {
    },

    LayOut: function () {

        var x, y, w, h;
        // UpdateBoard();

        for (let info of this.listItem) {
            var node = info.node;
            var sprite = node.getComponent(cc.Sprite);
            if (sprite == null) {
                continue;
            }
            var rc = this.GetRectItem(info.i, info.j, this.totalRow, this.totalCol);
            var scale = this.GetItmeScaleInRect(rc, node);
            node.scaleX = scale;
            node.scaleY = scale;


            var bd = node.getBoundingBox();
            var offsetx = bd.width / 2;
            //offsetx =0;
            var offsety = bd.height / 2;
            //offsety=0;
            var pt = this.RandomPointOfRect(rc, offsetx, offsety);
            //cc.log("LayOut:i=" + info.i + " j=" + info.j + " rc=" + rc + " pt=" + pt + " bd=" + bd.size);
            var z = node.getPosition().z; 
            node.setPosition(pt.x, pt.y, z);
        }

    },

    //ShapeColorItemInfo
    GetItemInfoShapeColor: function (idx, list) {
        if (list == null) {
            return null;
        }
        if (idx >= list.length) {
            return null;
        }
        var info = list[idx];
        return info;
    },

    CalcRowCol: function (total) {
        var sqr = Math.sqrt(total);
        if (total > sqr * sqr) {
            sqr++;
        }
        return sqr;
    },

    GetItmeScaleInRect: function (rc, node) {
        var scale = 1.0;
        var sprite = node.getComponent(cc.Sprite);
        var size = node.getContentSize();
        var ratio = 0.7;
        var scalex = rc.width * ratio / size.width;
        var scaley = rc.height * ratio / size.height;
        scale = Math.min(scalex, scaley);
        return scale;
    },

    //c.Rect
    GetRectItem: function (i, j, totalRow, totalCol) {
        var x, y, w, h;
        var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
        //var w_world = Common.GetCameraWorldSizeWidth(mainCam) * 2;
        var height_topbar_canvas = 160.0;
        var height_adbanner_canvas = 160.0;
        //var height_topbar_world = Common.CanvasToWorldHeight(mainCam, sizeCanvas, height_topbar_canvas);
        // if (!Device.isLandscape)
        // {
        //     height_topbar_world += Common.ScreenToWorldHeight(mainCam, Device.heightSystemTopBar);
        // }
        //var h_world = mainCam.orthographicSize * 2;
        w = sizeCanvas.width / totalCol;
        h = (sizeCanvas.height - height_topbar_canvas - height_adbanner_canvas) / totalRow;
        var oftx = -sizeCanvas.width / 2;
        var ofty = -sizeCanvas.height / 2 + height_adbanner_canvas;
        x = oftx + w * i;
        y = ofty + h * j;
        var rc = new cc.Rect(x, y, w, h);
        return rc;
    },
    //return Vector2
    RandomPointOfRect: function (rc, offsetx, offsety) {
        var x, y, w, h;
        w = rc.width - offsetx * 2;
        h = rc.height - offsety * 2;
        var rdx = cc.Common.RandomRange(0, 100);
        //rdx = 50;
        x = rc.x + (offsetx + w * rdx / 100);

        rdx = cc.Common.RandomRange(0, 100);

        //rdx = 50;
        y = rc.y + (offsety + h * rdx / 100);

        return new cc.Vec2(x, y);
    },

    //从数组里随机抽取newsize个元素
    RandomIndex: function (size, newsize) {
        var listIndex = [];
        var total = size;
        for (var i = 0; i < total; i++) {
            listIndex.push(i);
        }

        var idxTmp = [];//new int[newsize];
        for (var i = 0; i < newsize; i++) {
            total = listIndex.length;
            var rdm = Math.floor((Math.random() * total));
            var idx = listIndex[rdm];
            idxTmp.push(idx);
            //listIndex.RemoveAt(rdm);
            listIndex.splice(rdm, 1);
        }

        return idxTmp;
    },

    LoadGame: function (mode) {

        cc.log("LoadGame:mode=" + mode);
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
            var idx = cc.Common.RandomRange(0, this.listColorShow.length)
            var infocolor = this.listColor[idx];
        }

        this.LayOut();
    },

    LoadGameByShape: function (mode) {

        var level = cc.GameManager.gameLevel;
        var idx = level / GameShapeColor.GUANKA_NUM_PER_ITEM;
        var infoshape = this.GetItemInfoShapeColor(idx, this.listShape);
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
        this.totalRow = this.CalcRowCol(totalItem);
        this.totalCol = this.totalRow;

        // Debug.Log("totalItem=" + totalItem + " row=" + totalRow + " col=" + totalCol);

        var indexRectList = this.RandomIndex(this.totalRow * this.totalCol, totalItem);

        // //mainshape 
        var indexColor = this.RandomIndex(this.listColor.length, Math.floor(totalMainShape / 2));
        for (var k = 0; k < totalMainShape; k++) {
            var indexRect = indexRectList[k];
            var i = indexRect % this.totalCol;
            var j = Math.floor(indexRect / this.totalRow);
            //向下取整
            var idx_color = indexColor[Math.floor(k / 2)];
            //cc.log("LoadGameByShape length="+this.listColor.length+" idx_color="+idx_color+" k="+k+" idx_new="+idx_new+" indexColor.len="+indexColor.length);
            var infocolor = this.listColor[idx_color];

            // GameObject obj = null;
            var isInner = (k % 2 == 0) ? true : false;

            this.listColorShow.push(infocolor);
            var infocolor1 = this.listColor[idx_color];
            var node = this.CreateItem(infoshape, isInner, infocolor.color);
            var rc = this.GetRectItem(i, j, this.totalRow, this.totalCol);


            var infoitem = this.AddItem(rc, infoshape, infocolor, node, isInner, true);
            infoitem.i = i;
            infoitem.j = j;
        }

        //othershape
        indexColor = this.RandomIndex(this.listColor.length, totalOtherShape);
        var listOther = this.GetOtherItemList(infoshape, this.listShape);
        var indexOther = this.RandomIndex(listOther.length, totalOtherShape);
        for (var k = 0; k < totalOtherShape; k++) {
            var indexRect = indexRectList[totalMainShape + k];
            var i = indexRect % this.totalCol;
            var j = Math.floor(indexRect / this.totalRow);

            var idxtmp = indexOther[k];
            var infoOther = listOther[idxtmp];

            var idx_color = indexColor[k];
            if (mode == GameShapeColor.GAME_MODE_SHAPE) {
                // 统一颜色
                idx_color = indexColor[0];
            }
            var infocolor = listColor[idx_color];
            var color = infocolor.color;
            this.listColorShow.push(infocolor);
            var node = CreateItem(infoOther, true, color);
            var rc = this.GetRectItem(i, j, this.totalRow, this.totalCol);

            var infoitem = this.AddItem(rc, infoOther, infocolor, node, true, false);
            infoitem.i = i;
            infoitem.j = j;
        }
    },
    LoadGameByColor: function (mode) {
    },
    LoadGameByShapeColor: function (mode) {
    },

    //node:
    CreateItem: function (info, isInner, color) {
        var x, y, w, h;
        var name = info.id + "_outer";
        if (isInner == true) {
            name = info.id + "_inner";
        }

        var node = new cc.Node(name);
        node.parent = this.node;
        var sprite = node.addComponent(cc.Sprite)
        sprite.name = info.id;

        // RectTransform rcTran = obj.AddComponent<RectTransform>();
        // SpriteRenderer objSR = obj.AddComponent<SpriteRenderer>();
        var pic = info.picOuter;
        if (isInner == true) {
            pic = info.picInner;
        }
        // {
        //     TextureUtil.UpdateSpriteTexture(obj, pic);
        //     info.textureHasLoad = true;
        //     objSR.sprite.name = info.id;
        // }

        //加载图片
        var strImage = cc.FileUtil.GetFileBeforeExtWithOutDot(info.pic);
        cc.log("item_pic=" + info.pic);
        cc.TextureCache.main.Load(strImage, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.log(err.message || err);
                return;
            }
            sprite.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();
            // }.bind(this).bind(sprite));
        }.bind(this));

        var z = this.itemPosZ;
        if (isInner == true) {
            z = this.itemPosZ - 1;
        }
        //obj.transform.position = new Vector3(0, 0, z);
        node.setPosition(0, 0, z);

        var is_add_shader = true;
        //color
        if (cc.Config.main().appKeyName != cc.AppType.SHAPECOLOR) {
            if (isInner == true) {
                is_add_shader = false;
                //ShapeHighlighterController hlc = AddHighLight(obj);
                //hlc.UpdateColor(color);
            }
        }
        if (is_add_shader == true) {
            //objSR.material = new Material(shaderColor);
            //Material mat = objSR.material;
            // mat.SetColor("_ColorShape", color);
        }


        //添加物理特性
        if (isInner == true) {
            // Rigidbody2D bd = obj.AddComponent<Rigidbody2D>();
            // bd.gravityScale = 0;
            // // bd.useGravity = false;
            // bd.freezeRotation = true;
            // bd.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
            // PolygonCollider2D collider = obj.AddComponent<PolygonCollider2D>();
        }

        //添加尾巴 ShapeTrail
        // if (isInner)
        // {
        //     info.objTrail = new GameObject("trail");
        //     info.objTrail.transform.parent = obj.transform;
        //     info.objTrail.transform.localPosition = Vector3.zero;
        //     ShapeTrail trail = info.objTrail.AddComponent<ShapeTrail>();

        // }

        return node;
    },
    //return ShapeColorItemInfo
    AddItem: function (rc, infoshape, infocolor, node, isInner, isMain) {
        var infoItem = new ShapeColorItemInfo();
        infoItem.node = node;
        infoItem.nodeTrail = infoshape.nodeTrail;
        infoItem.id = infoshape.id;
        infoItem.color = infocolor.color;
        infoItem.isMain = isMain;
        infoItem.isInner = isInner;
        infoItem.colorid = infocolor.id;
        infoItem.textureHasLoad = infoshape.textureHasLoad;

        if (isInner == true) {
            this.SetItemLock(infoItem, false);
        }
        else {
            this.SetItemLock(infoItem, true);
        }
        this.listItem.push(infoItem);


        return infoItem;
    },
    //ItemInfo
    SetItemLock: function (info, isLock) {
        if (isLock) {
            info.tag = GameShapeColor.TAG_ITEM_LOCK;
        }
        else {
            info.tag = GameShapeColor.TAG_ITEM_UNLOCK;
        }
    },
    //bool
    IsItemLock: function (info) {
        var ret = false;
        if (info.tag == GameShapeColor.TAG_ITEM_LOCK) {
            ret = true;
        }
        return ret;
    },

    GetOtherItemList: function (info, list) {
        if (list == null) {
            return null;
        }
        var listother = [];
        for (var i = 0; i < list.length; i++) {
            var infotmp = list[i];
            if (infotmp != info) {
                listother.push(infotmp);
            }
        }
        return listother;

    },

});
