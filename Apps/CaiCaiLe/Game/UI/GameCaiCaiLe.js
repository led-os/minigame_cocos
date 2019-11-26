var UIViewController = require("UIViewController");
// var UIGameItem = require("UIGameItem");
var UIView = require("UIView");
var GameBase = require("GameBase");

//shu： wx621ff1107207384c
//weixin小程序appid: heng: wx2c5d3abfad26e8b1
//cocos: wx6ac3f5090a6b99c5
//weixin test app：wx844d0aa648111acb
var GameCaiCaiLe = cc.Class({
    extends: GameBase,
    statics: {
        GUANKA_NUM_PER_ITEM: 5,
        TAG_ITEM_LOCK: -1,
        TAG_ITEM_UNLOCK: 0,
        KEY_GAME_STATUS: "KEY_GAME_STATUS_",
        GAME_STATUS_UN_START: 0,//没有开始
        GAME_STATUS_PLAY: 1,//进行中
        GAME_STATUS_FINISH: 2,//完成
    },

    properties: {  
        gameItemPrefab: {
            default: null,
            type: cc.Prefab
        },

        listItem: {
            default: [],
            type: cc.Object
        },
        totalRow: 0,
        totalCol: 0,
        loadItemCount: 0,

        isItemHasSel: false,
        ptDown: new cc.Vec2(0, 0),
        posItemDown: new cc.Vec2(0, 0),
        itemInfoSel: cc.LianLianLeItemInfo,
    },
    //百度tts:  http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=你要转换的文字 
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
        this.height_adbanner_canvas = 160;
        this.height_topbar_canvas = 160;

    },

    Init: function () {
    },


    LayOut() {
        var x, y, w, h;
        this.LayOutItems(false);
    },
    LayOutItems(isAnimate) {
        var x, y, w, h;
        // UpdateBoard();
        for (let info of this.listItem) {
            this.UpdateItemPosition(info, isAnimate);
        }

    },

    //ItemInfo
    SetItemLock: function (info, isLock) {
        if (isLock) {
            info.tag = GameLianLianLe.TAG_ITEM_LOCK;
        }
        else {
            info.tag = GameLianLianLe.TAG_ITEM_UNLOCK;
        }
    },
    //bool
    IsItemLock: function (info) {
        var ret = false;
        if (info.tag == GameLianLianLe.TAG_ITEM_LOCK) {
            ret = true;
        }
        return ret;
    },
    ClearGame: function () {
        for (let info of this.listItem) {
            if (info.node != null) {
                info.node.removeFromParent(true);
                info.node = null;
            }
        }
        //清空
        this.listItem.length = 0;
        //this.listColorShow.length = 0;
        this.loadItemCount = 0;
    },

    LoadGameItemPrefab: function (cbFinish) {
        var strPrefab = "AppCommon/Prefab/Game/UIGameItem";
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.gameItemPrefab = prefab;

            if (cbFinish != null) {
                cbFinish();
            }
        }.bind(this)
        );
    },

    LoadGame: function () {
        this.ClearGame();
        cc.Debug.Log("GameLianLianLe LoadGame=");
        this.LoadGameItemPrefab(function () {
            this.LoadGameInternal();
            //this.Layou();
        }.bind(this));
    },

    LoadGameInternal: function () {
        cc.Debug.Log("GameLianLianLe LoadGameInternal=");
        var level = cc.LevelManager.main().gameLevel;
        var info = cc.GameLevelParse.main().GetLevelItemInfo(level);
        if (info == null) {
            cc.Debug.Log("LoadGame null");
            return;
        }

        this.totalRow = 2;
        this.totalCol = info.listPic0.length;
        if (!cc.Device.main.isLandscape) {
            this.totalRow = info.listPic0.length;
            this.totalCol = 2;
        }
        var listPic = info.listPic0;
        for (let k = 0; k < listPic.length; k++) {
            var infopic = listPic[k];
            var i = k;
            var j = 0;
            if (!cc.Device.main.isLandscape) {
                i = 0;
                j = k;
            }
            this.CreateItem(infopic, i, j);

        }

        listPic = info.listPic1;
        for (var k = 0; k < listPic.length; k++) {
            var infopic = listPic[k];

            var i = k;
            var j = 1;
            if (!cc.Device.main.isLandscape) {
                i = 1;
                j = k;
            }
            this.CreateItem(infopic, i, j);
        }
    },

    CreateItem(info, i, j) {

        if (this.node == null) {
            return;
        }
        var infoRet = new cc.LianLianLeItemInfo();
        var node = cc.instantiate(this.gameItemPrefab);
        var x, y, w, h;
        var name = info.id;
        infoRet.i = i;
        infoRet.j = j;
        infoRet.node = node;
        infoRet.id = info.id;
        infoRet.pic = info.pic;
        infoRet.category = info.category;
        this.listItem.push(infoRet);
        node.parent = this.node;
        node.active = false;

        var uiGameItem = node.getComponent(UIGameItem);
        uiGameItem.UpdateItem(info, function (ui) {
            var rc = this.GetRectItem(i, j, this.totalRow, this.totalCol);
            var scale = 1;
            var size = ui.imageItem.node.getContentSize();
            scale = cc.Common.GetBestFitScale(size.width, size.height, rc.width, rc.height);
            //cc.Debug.Log("size="+size+" rc="+rc+" scale="+scale);
            node.setContentSize(cc.size(size.width * scale, size.height * scale));
            this.LoadItemImageFinish(infoRet);
            this.loadItemCount++;
        }.bind(this));

        return infoRet;
    },
    LoadItemImageFinish: function (info) {
        if (this.loadItemCount < this.listItem.length) {
            var info = this.listItem[this.loadItemCount];
            info.node.active = true;
            //播放动画前需要node.active = true;
            this.UpdateItemPosition(info, true);
        }
    },

    GetItemPositionNormal: function (info) {
        var rc = this.GetRectItem(info.i, info.j, this.totalRow, this.totalCol);
        return rc.center;
    },

    UpdateItemPosition: function (info, isAnimate) {
        var x, y, w, h;
        var node = info.node;
        var uiGameItem = node.getComponent(UIGameItem);
        if (uiGameItem == null) {
            return;
        }
        var rc = this.GetRectItem(info.i, info.j, this.totalRow, this.totalCol);
        var rctran = node.getComponent(cc.RectTransform);
        rctran.width = rc.width;
        rctran.height = rc.height;
        var pt = this.GetItemPositionNormal(info);
        //cc.Debug.Log("LayOut:i=" + info.i + " j=" + info.j + " rc=" + rc + " pt=" + pt + " bd=" + bd.size);
        var z = node.getPosition().z;
        node.setPosition(pt.x, pt.y, z);
        var rc = this.GetRectDisplay();
        //cc.Debug.Log("UpdateItemPosition:" + " pt=" + pt + " rc=" + rc);

        var pt_new = cc.Common.LimitNodePos(node, rc);
        if (isAnimate) {
            node.setPosition(0, 0, z);
            this.RunActionItemShow(node, pt_new);
        } else {
            //node.setPosition(pt_new.x, pt_new.y, z);
        }
    },

    //item 出现动画
    RunActionItemShow: function (node, toPos) {
        var duration = 0.5;
        var action = cc.moveTo(duration, toPos).easing(cc.easeOut(3.0));
        //delay延时
        var time = cc.delayTime(0.1);
        cc.Debug.Log("RunActionItemShow:" + " toPos=" + toPos);
        var fun = cc.callFunc(function () {
            //node.setPosition(toPos);
            //  cc.Debug.Log("RunActionItemShow end:"+" toPos="+toPos);
        }.bind(this));
        var seq = cc.sequence([action, fun]);
        node.runAction(seq);
    },

    //复位动画
    RunActionItemReset: function (info) {
        var duration = 0.5;
        var pt = this.GetItemPositionNormal(info);
        var action = cc.moveTo(duration, pt).easing(cc.easeOut(3.0));
        //delay延时
        var time = cc.delayTime(0.1);
        var fun = cc.callFunc(function () {
        }.bind(this));
        var seq = cc.sequence([action, fun]);
        info.node.runAction(seq);
    },


    GetRectDisplay: function () {
        var x, y, w, h;
        var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
        var ratio = 0.9;
        w = (sizeCanvas.width) * ratio;
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
        //cc.Debug.Log("GetRectItem:" + " j=" + j + " i=" + i + " col=" + col + " row=" + row);
        return rc;
    },


    IsAllItemLock() {
        for (let info of this.listItem) {
            var isLock = this.IsItemLock(info);
            if (!isLock) {
                return false;
            }
        }
        return true;

    },

    CheckGameWin() {
        if (this.IsAllItemLock()) {
            cc.AudioPlay.main().PlayCloudAudio(cc.AppRes.AUDIO_GAME_GuankaOk);
            this.OnGameWin();
        }

    },



    OnGameWin: function () {
        //记录游戏完成
        var level = cc.LevelManager.main().gameLevel;
        var info = cc.GameLevelParse.main().GetLevelItemInfo(level);
        var key = GameLianLianLe.KEY_GAME_STATUS + info.id;
        if (key != null) {
            cc.Common.SetItemOfKey(key, GameLianLianLe.GAME_STATUS_FINISH);
        }

        if (this.callbackGameWin != null) {
            this.callbackGameWin();
        }
    },


    OnTouchDown: function (pos) {
        this.isItemHasSel = false;
        //var posnew = new cc.Vec2(pos.x - this.node.getContentSize().width / 2, pos.y - this.node.getContentSize().height / 2);
        var posnew = pos;
        this.ptDown = posnew;
        cc.Debug.Log("onTouchDown: postouch=" + pos);
        var index = 0;
        for (let info of this.listItem) {
            var isLock = this.IsItemLock(info);
            if (isLock == true) {
                continue;
            }

            var uiGameItem = info.node.getComponent(UIGameItem);
            if (uiGameItem == null) {
                continue;
            }
            var bd = uiGameItem.GetBoundingBox();//rect
            //  cc.Debug.Log("onTouchDown: posnew=" + posnew + " bd=" + bd + " index=" + index);

            var positem = info.node.getPosition();
            // cc.Debug.Log("positem x=" + positem.x + " y=" + positem.y);
            var rc = new cc.Rect(positem.x - bd.width / 2, positem.y - bd.height / 2, bd.width, bd.height);

            cc.Debug.Log("onTouchDown: rc=" + rc + " posnew=" + posnew);
            //posword.z = bd.center.z;
            if (rc.contains(posnew)) {

                this.posItemDown = info.node.getPosition();
                this.itemInfoSel = info;
                this.isItemHasSel = true;
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
            cc.Debug.Log("onTouchMove isLock");
            return;
        }
        var x, y, w, h;

        var ptStep = new cc.Vec2(posnew.x - this.ptDown.x, posnew.y - this.ptDown.y);
        var positemNew = new cc.Vec2(this.posItemDown.x + ptStep.x, this.posItemDown.y + ptStep.y);
        //this.itemInfoSel.node.setPosition(positemNew);

        //将选中item暂时置顶
        this.itemInfoSel.node.zIndex = 1000;
        //posword.z = this.itemPosZ - 2; 
        //var body = this.itemInfoSel.node.getComponent(cc.RigidBody);
        var uiGameItemSel = this.itemInfoSel.node.getComponent(UIGameItem);
        uiGameItemSel.UpdatePosition(positemNew);

        for (let info of this.listItem) {
            isLock = this.IsItemLock(info);
            if (isLock) {
            }
            var uiGameItem = info.node.getComponent(UIGameItem);
            if (uiGameItem == null) {
                continue;
            }
            if (info == this.itemInfoSel) {
                continue;
            }

            var bd = uiGameItem.GetBoundingBox();
            //posword.z = bd.center.z;
            w = bd.width / 4;
            h = bd.height / 4;
            var rc = new cc.Rect(info.node.getPosition().x - w / 2, info.node.getPosition().y - h / 2, w, h);
            if ((rc.contains(positemNew)) && (this.itemInfoSel.id == info.id)) {
                cc.Debug.Log("合并正确" + " info.id=" + info.id + " this.itemInfoSel.id=" + this.itemInfoSel.id);
                //合并正确 
                this.SetItemLock(info, true);
                this.SetItemLock(this.itemInfoSel, true);
                this.itemInfoSel.node.setPosition(info.node.getPosition());
                //this.RunDisapperAnimation(this.itemInfoSel);

                if (!this.IsAllItemLock()) {
                    // PlayAudioItem(audioClipItemFinish);
                    //.PlayAudioItemFinish(this.itemInfoSel); 
                    cc.AudioPlay.main().PlayCloudAudio(cc.AppRes.AUDIO_GAME_DragOk);

                }

                //记录游戏开始进行中
                var level = cc.LevelManager.main().gameLevel;
                var key = GameLianLianLe.KEY_GAME_STATUS + info.id;
                if (key != null) {
                    cc.Common.SetItemOfKey(key, GameLianLianLe.GAME_STATUS_PLAY);
                }
                break;
            }
        }


        this.CheckGameWin();
    },
    OnTouchUp: function (pos) {
        cc.Debug.Log("OnTouchUp");
        if (!this.isItemHasSel) {
            return;
        }
        //将选中item清除置顶
        this.itemInfoSel.node.zIndex = 0;

        var isLock = this.IsItemLock(this.itemInfoSel);
        if (isLock) {
            return;
        }

        var rc = this.GetRectDisplay();
        cc.Common.LimitNodePos(this.itemInfoSel.node, rc);

        this.RunActionItemReset(this.itemInfoSel);
        cc.AudioPlay.main().PlayCloudAudio(cc.AppRes.AUDIO_GAME_DragFail);

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


});
