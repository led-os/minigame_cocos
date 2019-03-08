var UIViewController = require("UIViewController");
// var Common = require("Common");
var UIBoard = require("UIBoard");
//var ShapeColorItemInfo = require("ShapeColorItemInfo");
var UIView = require("UIView");


//weixin小程序appid: wxc6734d6401f5a3db
//cocos: wx6ac3f5090a6b99c5
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

        isShaderInited: false,
        ID_BOMB: "bomb",
        isSelectTheBomb: false,
    },

    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,

        nodeBomb: cc.Node,//炸弹

        listShape: null,
        listColor: null,
        // listColor: {
        //     default: [],
        //     type: ShapeColorItemInfo
        // },

        listItem: {
            default: [],
            type: cc.ShapeColorItemInfo
        },
        listColorShow: {
            default: [],
            type: cc.ShapeColorItemInfo
        },

        totalRow: 0,
        totalCol: 0,
        itemPosZ: -20.0,
        height_topbar_canvas: 160.0,
        height_adbanner_canvas: 160.0,
        isItemHasSel: false,
        ptDown: new cc.Vec2(0, 0),
        posItemDown: new cc.Vec2(0, 0),
        itemInfoSel: cc.ShapeColorItemInfo,

    },
    //百度tts:  http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=你要转换的文字 
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());

        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

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


            var bd = node.getBoundingBox();//rect
            var offsetx = bd.width / 2;
            offsetx = 0;
            var offsety = bd.height / 2;
            offsety = 0;
            var pt = this.RandomPointOfRect(rc, offsetx, offsety);
            //cc.Debug.Log("LayOut:i=" + info.i + " j=" + info.j + " rc=" + rc + " pt=" + pt + " bd=" + bd.size);
            var z = node.getPosition().z;
            node.setPosition(pt.x, pt.y, z);

            var rc = this.GetRectDisplay();
            cc.Common.LimitNodePos(node, rc);
        }

    },


    CheckGameWin: function () {
        var isAllItemLock = true;

        if (this.isSelectTheBomb) {
            //显示踩到炸弹了 游戏结束
            this.OnGameBomb();
            return;
        }
        for (let info of this.listItem) {
            if (info.isMain == true) {
                var isLock = this.IsItemLock(info);
                if (!isLock) {
                    isAllItemLock = false;
                }
            }

        }

        if (isAllItemLock) {
            //show game win  
            this.OnGameWin();

        }
    },

    OnGameBomb: function () {
        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_BOMB");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_BOMB");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_GAME_BOMB");
        var no = cc.Language.main().GetString("STR_UIVIEWALERT_NO_GAME_BOMB");

        cc.ViewAlertManager.main().ShowFull(title, msg, yes, no, false, "STR_KEYNAME_VIEWALERT_GAME_BOMB",
            function (alert, isYes) {
                if (isYes) {
                    //replay
                    cc.GameManager.main().GotoPlayAgain();
                } else {

                }
            }.bind(this)
        );


    },

    OnGameWin: function () {
        //show game win
        cc.GameManager.main().gameLevelFinish = cc.GameManager.main().gameLevel;
        //gameEndParticle.Play();

        //记录游戏完成
        var level = cc.GameManager.main().gameLevel;
        var idx = Math.floor(level / GameShapeColor.GUANKA_NUM_PER_ITEM);
        var idx_sub = level % GameShapeColor.GUANKA_NUM_PER_ITEM;
        cc.Debug.Log("game finish idx_sub=" + idx_sub + " GUANKA_NUM_PER_ITEM=" + GameShapeColor.GUANKA_NUM_PER_ITEM);
        if ((idx_sub + 1) == GameShapeColor.GUANKA_NUM_PER_ITEM) {
            var infoitem = null;
            var key = null;
            if (cc.GameManager.gameMode == GameShapeColor.GAME_MODE_SHAPE) {
                infoitem = this.GetItemInfoShapeColor(idx, this.listShape);
                key = GameShapeColor.STR_KEY_GAME_STATUS_SHAPE + infoitem.id;
            }
            if (cc.GameManager.gameMode == GameShapeColor.GAME_MODE_COLOR) {
                infoitem = this.GetItemInfoShapeColor(idx, this.listColor);
                key = GameShapeColor.STR_KEY_GAME_STATUS_COLOR + infoitem.id;
            }
            cc.Debug.Log("game finish key=" + key + " this.gameMode=" + cc.GameManager.gameMode);
            if (key != null) {
                cc.Common.SetItemOfKey(key, GameShapeColor.GAME_STATUS_FINISH);
            }
        }

        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = cc.Language.main().GetString("STR_UIVIEWALERT_NO_GAME_FINISH");

        cc.ViewAlertManager.main().ShowFull(title, msg, yes, no, true, "STR_KEYNAME_VIEWALERT_GAME_FINISH",
            function (alert, isYes) {
                if (isYes) {
                    cc.GameManager.main().GotoNextLevelWithoutPlace();
                } else {
                    //replay
                    cc.GameManager.main().GotoPlayAgain();
                }
            }.bind(this)
        );


    },

    OnTouchDown: function (pos) {
        this.isItemHasSel = false;
        //var posnew = new cc.Vec2(pos.x - this.node.getContentSize().width / 2, pos.y - this.node.getContentSize().height / 2);
        var posnew = pos;
        this.ptDown = posnew;

        //Vector3 posword = mainCam.ScreenToWorldPoint(pos);
        cc.Debug.Log("onTouchDown: postouch=" + pos);
        var index = 0;
        for (let info of this.listItem) {
            var isLock = this.IsItemLock(info);
            if (isLock == true) {
                continue;
            }

            var bd = info.node.getBoundingBox();//rect
            cc.Debug.Log("onTouchDown: posnew=" + posnew + " bd=" + bd + " index=" + index);

            // var positem = info.node.getPosition();
            // cc.Debug.Log("positem x=" + positem.x + " y=" + positem.y);
            // var rc = new cc.Rect(positem.x - bd.width / 2, positem.y - bd.height / 2, bd.width, bd.height);

            //cc.Debug.Log("onTouchDown: rc=" + rc);
            //posword.z = bd.center.z;
            if (bd.contains(posnew)) {

                this.posItemDown = info.node.getPosition();
                this.itemInfoSel = info;
                this.isItemHasSel = true;


                // if (info.objTrail != null) {
                //     ShapeTrail trail = info.objTrail.GetComponent<ShapeTrail>();
                //     if (trail != null) {
                //         trail.setColor(Color.red);
                //         trail.ClearDraw();
                //     }
                // }

                cc.Debug.Log("itemInfoSel:id:" + this.itemInfoSel.id + " color:" + this.itemInfoSel.color);
                break;
            }

            index++;
        }
    },
    OnTouchMove: function (pos) {

        if (!this.isItemHasSel) {
            cc.Debug.Log("onTouchMove ng 1");
            return;
        }
        //var posnew = new cc.Vec2(pos.x - this.node.getContentSize().width / 2, pos.y - this.node.getContentSize().height / 2);
        var posnew = pos;
        var isLock = this.IsItemLock(this.itemInfoSel);
        if (isLock) {
            // cc.Debug.Log("onTouchMove ng 2");
            return;
        }
        var x, y, w, h;

        var ptStep = new cc.Vec2(posnew.x - this.ptDown.x, posnew.y - this.ptDown.y);
        var positemNew = new cc.Vec2(this.posItemDown.x + ptStep.x, this.posItemDown.y + ptStep.y);
        //this.itemInfoSel.node.setPosition(positemNew);
        // cc.Debug.Log("OnTouchMove positemNew=" + positemNew + " ptStep=" + ptStep);
        //将选中item暂时置顶
        //posword.z = this.itemPosZ - 2; 
        var body = this.itemInfoSel.node.getComponent(cc.RigidBody);
        if (body != null) {
            // body.MovePosition(posword);
            // body.syncPosition(false);
            //MouseJoint
            //刚体的移动需要用鼠标关节,不能用node.setPosition
            var mj = this.itemInfoSel.node.getComponent(cc.MouseJoint);
            if (mj != null) {
                mj.target = positemNew;
            }
        }

        //尾巴添加节点
        // if (itemInfoSel.objTrail != null)
        // {
        //     Debug.Log("itemInfoSel.objTrail");
        //     ShapeTrail trail = itemInfoSel.objTrail.GetComponent<ShapeTrail>();
        //     if (trail != null)
        //     {
        //         // trail.AddPoint(posword);
        //         trail.OnDraw();
        //     }
        // }


        for (let info of this.listItem) {
            isLock = this.IsItemLock(info);
            if (isLock) {
            }
            var bd = info.node.getBoundingBox();
            //posword.z = bd.center.z;
            w = bd.width / 4;
            h = bd.height / 4;
            var rc = new cc.Rect(info.node.getPosition().x - w / 2, info.node.getPosition().y - h / 2, w, h);
            if (info == this.itemInfoSel) {
                continue;
            }

            if (rc.contains(positemNew)) {
                if (!this.isTheSamePairItems(this.itemInfoSel, info)) {
                    continue;
                }
                cc.Debug.Log("合并正确");

                this.isSelectTheBomb = false;
                if (this.itemInfoSel.id == GameShapeColor.ID_BOMB) {
                    this.isSelectTheBomb = true;
                }

                //合并正确
                this.SetItemLock(info, true);
                this.SetItemLock(this.itemInfoSel, true);

                this.itemInfoSel.node.setPosition(info.node.getPosition());
                this.RunDisapperAnimation(this.itemInfoSel);
                this.PlayAudioItemFinish(this.itemInfoSel);



                //记录游戏开始进行中
                var level = cc.GameManager.main().gameLevel;
                var idx = Math.floor(level / GameShapeColor.GUANKA_NUM_PER_ITEM);
                var idx_sub = level % GameShapeColor.GUANKA_NUM_PER_ITEM;
                if (idx_sub == 0) {
                    var infoitem = null;
                    var key = null;
                    if (cc.GameManager.gameMode == GameShapeColor.GAME_MODE_SHAPE) {
                        infoitem = this.GetItemInfoShapeColor(idx, this.listShape);
                        key = GameShapeColor.STR_KEY_GAME_STATUS_SHAPE + infoitem.id;
                    }
                    if (cc.GameManager.gameMode == GameShapeColor.GAME_MODE_COLOR) {
                        infoitem = this.GetItemInfoShapeColor(idx, this.listColor);
                        key = GameShapeColor.STR_KEY_GAME_STATUS_COLOR + infoitem.id;

                    }
                    cc.Debug.Log("game play key=" + key + " this.gameMode=" + cc.GameManager.gameMode);
                    if (key != null) {
                        cc.Common.SetItemOfKey(key, GameShapeColor.GAME_STATUS_PLAY);
                    }

                }

                break;
            }
        }

        //this.CheckGameWin();
    },
    OnTouchUp: function (pos) {
        cc.Debug.Log("OnTouchUp");
        if (!this.isItemHasSel) {
            return;
        }
        var isLock = this.IsItemLock(this.itemInfoSel);
        if (isLock) {
            return;
        }

        var rc = this.GetRectDisplay();
        cc.Common.LimitNodePos(this.itemInfoSel.node, rc);

        //将选中item清除置顶
        // var pos = itemInfoSel.node.getPosition();
        // itemInfoSel.node.transform.position = pos;
    },

    OnUITouchEvent: function (ev, status, event) {

        var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点

        switch (status) {
            case cc.UITouchEvent.TOUCH_DOWN:
                this.OnTouchDown(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_MOVE:
                this.OnTouchMove(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_UP:
                this.OnTouchUp(posnodeAR);
                break;
        }
    },

    //是否同一对
    isTheSamePairItems: function (infoSel, info) {
        var ret = false;
        cc.Debug.Log("isTheSamePairItems:infoSel.id=" + infoSel.id + " info.isInner=" + info.isInner);

        if (infoSel.id == GameShapeColor.ID_BOMB) {
            if ((!info.isInner) && (info.isMain)) {
                ret = true;
            }
        } else {
            if ((infoSel.id == info.id) && (infoSel.color == info.color)) {
                ret = true;
            }
        }
        return ret;
    },

    RunDisapperAnimation(info) {
        //动画：https://blog.csdn.net/agsgh/article/details/79447090
        //iTween.ScaleTo(info.obj, new Vector3(0f, 0f, 0f), 1.5f);
        var duration = 1.0;
        var action = cc.scaleTo(duration, 0, 0);
        //delay延时
        // var time = cc.delayTime(2);
        var fun = cc.callFunc(function () {
            this.CheckGameWin();
        }.bind(this));
        var seq = cc.sequence([action, fun]);
        info.node.runAction(seq);
    },
    //ShapeColorItemInfo
    PlayAudioItemFinish: function (info) {
        // GameObject audioPlayer = GameObject.Find("AudioPlayer");
        // if (audioPlayer != null) {
        //     AudioSource audioSource = audioPlayer.GetComponent<AudioSource>();
        //     audioSource.PlayOneShot(audioClipItemFinish);
        // }

        //speak
        var str = this.StringOfItem(info);
        cc.Tts.Speak(str);
        if (this.textTitle != null) {
            this.textTitle.node.active = true;
            this.textTitle.string = str;
        }

    },

    LanguageKeyOfShape: function (info) {
        var key = info.id;
        if (cc.Config.main().appKeyName == cc.AppType.SHAPECOLOR) {
            key = "SHAPE_TITLE_" + info.id;
        }
        return key;
    },

    StringOfItem: function (info) {
        var str = "";
        var strColor = cc.Language.game().GetString("COLOR_TITLE_" + info.colorid);
        var strShape = cc.Language.game().GetString(this.LanguageKeyOfShape(info));
        var str = strColor + strShape;
        return str;
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
        //var size =cc.size(sprite.spriteFrame.getRect().width,sprite.spriteFrame.getRect().height) ;//node.getContentSize();
        var ratio = 0.7;
        if ((size.width != 0) && (size.height != 0)) {
            var scalex = rc.width * ratio / size.width;
            var scaley = rc.height * ratio / size.height;
            scale = Math.min(scalex, scaley);
        }
        cc.Debug.Log("node scale = " + scale + " size=" + size + " rc=" + rc);
        return scale;
    },
    GetRectDisplay: function () {
        var x, y, w, h;
        var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
        var ratio = 0.9;
        w = (sizeCanvas.width - UIBoard.LINE_WIDTH * 2) * ratio;
        h = (sizeCanvas.height - this.height_topbar_canvas - this.height_adbanner_canvas);
        var rc = new cc.Rect(-w / 2, -sizeCanvas.height / 2 + this.height_adbanner_canvas, w, h);
        return rc;
    },
    //c.Rect
    GetRectItem: function (i, j, row, col) {
        var x, y, w, h;
        var rcDisplay = this.GetRectDisplay();
        w = rcDisplay.width / col;
        h = rcDisplay.height / row;
        x = rcDisplay.x + w * i;
        y = rcDisplay.y + h * j;
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

    ClearGame: function () {
        for (let info of this.listItem) {
            info.node.removeFromParent();
        }
        //清空
        this.listItem.length = 0;
        this.listColorShow.length = 0;

        if (this.nodeBomb != null) {
            this.nodeBomb.removeFromParent(true);
            this.nodeBomb = null;
        }
    },

    LoadGame: function (mode) {

        cc.Debug.Log("LoadGame:mode=" + mode);
        this.ClearGame();
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
            this.CreateBomb(infocolor.color);
        }
        this.LayOut();
    },

    LoadGameByShape: function (mode) {

        var level = cc.GameManager.main().gameLevel;
        var idx = Math.floor(level / GameShapeColor.GUANKA_NUM_PER_ITEM);
        var infoshape = this.GetItemInfoShapeColor(idx, this.listShape);
        if (infoshape == null) {
            cc.Debug.Log("LoadGameByShape null");
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
            //cc.Debug.Log("LoadGameByShape length="+this.listColor.length+" idx_color="+idx_color+" k="+k+" idx_new="+idx_new+" indexColor.len="+indexColor.length);
            var infocolor = this.listColor[idx_color];

            // GameObject obj = null;
            var isInner = (k % 2 == 0) ? true : false;
            this.listColorShow.push(infocolor);
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
            var infocolor = this.listColor[idx_color];
            var color = infocolor.color;
            this.listColorShow.push(infocolor);
            var node = this.CreateItem(infoOther, true, color);
            var rc = this.GetRectItem(i, j, this.totalRow, this.totalCol);

            var infoitem = this.AddItem(rc, infoOther, infocolor, node, true, false);
            infoitem.i = i;
            infoitem.j = j;
        }
    },
    LoadGameByColor: function (mode) {
        var level = cc.GameManager.main().gameLevel;
        var idx = Math.floor(level / GameShapeColor.GUANKA_NUM_PER_ITEM);
        var infocolor = this.GetItemInfoShapeColor(idx, this.listColor);
        if (infocolor == null) {
            return;
        }

        this.listColorShow.push(infocolor);

        //color 数量（单位 inner和outer一对）
        var mainColorPair = [1, 2, 2, 2, 3];
        var otherColorNum = [0, 0, 1, 2, 2];

        var idx_sub = level % GameShapeColor.GUANKA_NUM_PER_ITEM;
        var totalMainColor = mainColorPair[idx_sub] * 2;
        var totalOtherColor = otherColorNum[idx_sub];

        var totalItem = totalMainColor + totalOtherColor;
        this.totalRow = this.CalcRowCol(totalItem);
        this.totalCol = this.totalRow;


        var indexRectList = this.RandomIndex(this.totalRow * this.totalCol, totalItem);

        //maincolor


        var indexShape = this.RandomIndex(this.listShape.length, Math.floor(totalMainColor / 2));
        for (var k = 0; k < totalMainColor; k++) {
            var indexRect = indexRectList[k];
            var i = indexRect % this.totalCol;
            var j = Math.floor(indexRect / this.totalRow);

            var idx_shape = indexShape[Math.floor(k / 2)];

            var infoshape = this.listShape[idx_shape];

            var node = null;
            var isInner = (k % 2 == 0) ? true : false;
            node = this.CreateItem(infoshape, isInner, infocolor.color);
            var rc = this.GetRectItem(i, j, this.totalRow, this.totalCol);

            var infoitem = this.AddItem(rc, infoshape, infocolor, node, isInner, true);
            infoitem.i = i;
            infoitem.j = j;
        }

        //othershape
        indexShape = this.RandomIndex(this.listShape.length, totalOtherColor);
        var listOther = this.GetOtherItemList(infocolor, this.listColor);
        var indexOther = this.RandomIndex(listOther.length, totalOtherColor);
        for (var k = 0; k < totalOtherColor; k++) {
            var indexRect = indexRectList[totalMainColor + k];
            var i = indexRect % this.totalCol;
            var j = Math.floor(indexRect / this.totalRow);

            var idxtmp = indexOther[k];
            var infoOther = listOther[idxtmp];

            var idx_shape = indexShape[k];

            var infoshape = this.listShape[idx_shape];
            var color = infoOther.color;

            var node = this.CreateItem(infoshape, true, color);
            var rc = this.GetRectItem(i, j, this.totalRow, this.totalCol);

            var infoItem = this.AddItem(rc, infoshape, infoOther, node, true, false);
            infoItem.i = i;
            infoItem.j = j;
        }

    },
    LoadGameByShapeColor: function (mode) {
        var level = cc.GameManager.main().gameLevel;
        var idx = Math.floor(level / GameShapeColor.GUANKA_NUM_PER_ITEM);
        var infoshape = this.GetItemInfoShapeColor(idx, this.listShape);
        if (infoshape == null) {

            return;
        }

        //shape 数量（单位 inner和outer一对）
        var mainShapePair = [2, 3, 3, 3, 4];
        var otherShapeNum = [0, 1, 2, 3, 3];

        var idx_sub = level % GameShapeColor.GUANKA_NUM_PER_ITEM;
        var totalMainShape = mainShapePair[idx_sub] * 2;
        var totalOtherShape = otherShapeNum[idx_sub];


        var totalItem = totalMainShape + totalOtherShape;
        this.totalRow = this.CalcRowCol(totalItem);
        this.totalCol = this.totalRow;
        //cc.Debug.Log("totalItem=" + totalItem + " row=" + totalRow + " col=" + totalCol);

        var listShapeOther = this.GetOtherItemList(infoshape, this.listShape);
        var indexShapeOther = this.RandomIndex(listShapeOther.length, (Math.floor(totalMainShape / 2) - 1));

        var indexRectList = this.RandomIndex(this.totalRow * this.totalCol, totalItem);

        //mainshape 
        var indexColor = this.RandomIndex(this.listColor.length, Math.floor(totalMainShape / 2));
        for (var k = 0; k < totalMainShape; k++) {
            var indexRect = indexRectList[k];
            var i = indexRect % this.totalCol;
            var j = Math.floor(indexRect / this.totalRow);

            var idx_color = indexColor[Math.floor(k / 2)];
            var infocolor = this.listColor[idx_color];

            var node = null;
            //mainshape
            var isInner = (k % 2 == 0) ? true : false;
            this.listColorShow.push(infocolor);
            if (k < 2) {
                node = this.CreateItem(infoshape, isInner, infocolor.color);
            }
            else {
                //other
                var idx_ohter = Math.floor((k - 2) / 2);
                var infoshape_other = listShapeOther[indexShapeOther[idx_ohter]];
                node = this.CreateItem(infoshape_other, isInner, infocolor.color);
            }

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
            var infocolor = this.listColor[idx_color];
            var color = infocolor.color;
            this.listColorShow.push(infocolor);
            var node = this.CreateItem(infoOther, true, color);
            var rc = this.GetRectItem(i, j, this.totalRow, this.totalCol);


            var infoitem = this.AddItem(rc, infoOther, infocolor, node, true, false);
            infoitem.i = i;
            infoitem.j = j;
        }

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

        //加载图片
       // var strImage = cc.FileUtil.GetFileBeforeExtWithOutDot(cc.AppRes.URL_HTTP_HEAD+pic);
       var strImage = cc.AppRes.URL_HTTP_HEAD+pic;
        cc.Debug.Log("strImage=" + strImage);
        cc.TextureCache.main.Load(strImage, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.Debug.Log("item_pic err");
                cc.Debug.Log(err.message || err);
                return;
            }
            sprite.spriteFrame = new cc.SpriteFrame(tex);


            //添加物理特性
            if (isInner == true) {
                var body = sprite.node.addComponent(cc.RigidBody);
                body.gravityScale = 0;//关闭重力
                // // bd.useGravity = false;
                body.fixedRotation = true;

                //防止刚体穿越
                body.bullet = true;

                // bd.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
                //var collider = node.addComponent(cc.PolygonCollider);
                var collider = sprite.node.addComponent(cc.PhysicsBoxCollider);
                var mj = sprite.node.addComponent(cc.MouseJoint);
            }


            var collider = sprite.node.getComponent(cc.PhysicsBoxCollider);
            if (collider != null) {

                collider.size = cc.size(tex.width, tex.height);
                cc.Debug.Log("collider=" + collider.size);
            }

            // sprite.node.zIndex = 10;

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
            {
                const renderEngine = cc.renderer.renderEngine;
                const renderer = renderEngine.renderer;
                const name = 'ShaderShapeColor';
                let mat = sprite.getMaterial(name);
                if (!mat) {
                    const CustomMaterial = require("CustomMaterial");
                    mat = new CustomMaterial(name, [
                        { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
                        { name: 'colorShow', type: renderer.PARAM_FLOAT3 },
                    ]);
                    sprite.setMaterial(name, mat);
                }
                sprite.activateMaterial(name);
                var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
                mat.setParamValue("iResolution", iResolution);
                var colorShow = new cc.Vec3(color.r / 255, color.g / 255, color.b / 255);
                cc.Debug.Log("colorShow=" + colorShow);
                mat.setParamValue("colorShow", colorShow);
            }
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

    //创建炸弹
    CreateBomb: function (color) {
        if (this.nodeBomb != null) {
            return;
        }
        var node = new cc.Node("bumb");
        this.nodeBomb = node
        node.parent = this.node;

        var z = this.itemPosZ - 5;
        node.setPosition(0, 0, z);

        var sprite = node.addComponent(cc.Sprite);
        //加载图片
        var strImage = cc.AppRes.IMAGE_Game_Bomb;
        //cc.Debug.Log("item_pic=" + pic);
        cc.TextureCache.main.Load(strImage, function (err, tex) {
            if (err) {
                cc.Debug.Log("item_pic err");
                cc.Debug.Log(err.message || err);
                return;
            }
            sprite.spriteFrame = new cc.SpriteFrame(tex);

            //添加物理特性
            {
                var body = sprite.node.addComponent(cc.RigidBody);
                body.gravityScale = 0;//关闭重力
                // // bd.useGravity = false;
                body.fixedRotation = true;

                //防止刚体穿越
                body.bullet = true;

                // bd.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
                //var collider = node.addComponent(cc.PolygonCollider);
                var collider = sprite.node.addComponent(cc.PhysicsBoxCollider);
                var mj = sprite.node.addComponent(cc.MouseJoint);
                if (collider != null) {
                    collider.size = cc.size(tex.width, tex.height);
                    cc.Debug.Log("collider=" + collider.size);
                }
            }
            this.LayOut();
        }.bind(this));

        //高亮颜色
        {
            // ShapeHighlighterController hlc = AddHighLight(objBomb);
            // hlc.UpdateColor(color);
        }



        var infoItem = new cc.ShapeColorItemInfo();
        infoItem.node = this.nodeBomb;
        // infoItem.objTrail = infoshape.objTrail;
        infoItem.id = GameShapeColor.ID_BOMB;
        //   infoItem.color = infocolor.color;
        infoItem.isMain = false;
        infoItem.isInner = false;
        this.SetItemLock(infoItem, false);

        this.listItem.push(infoItem);
    },

    //return ShapeColorItemInfo
    AddItem: function (rc, infoshape, infocolor, node, isInner, isMain) {
        var infoItem = new cc.ShapeColorItemInfo();
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
