var UIViewController = require("UIViewController");
// var Common = require("Common");
var UIBoard = require("UIBoard"); 
var UIView = require("UIView");


//weixin小程序appid: wxc6734d6401f5a3db
//cocos: wx6ac3f5090a6b99c5
var GameBlock = cc.Class({
    extends: UIView,
    statics: {
        GUANKA_NUM_PER_ITEM: 5,
        GAME_MODE_NORMAL: 0,

        STR_KEY_GAME_STATUS_SHAPE: "KEY_GAME_STATUS_SHAPE_",
        STR_KEY_GAME_STATUS_COLOR: "KEY_GAME_STATUS_COLOR_",
        GAME_STATUS_UN_START: 0,//没有开始
        GAME_STATUS_PLAY: 1,//进行中
        GAME_STATUS_FINISH: 2,//完成

        TAG_ITEM_LOCK: -1,
        TAG_ITEM_UNLOCK: 0,

        isShaderInited: false,
    },

    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,  

        listItem: {
            default: [],
            type: cc.BlockItemInfo
        },

        totalRow: 0,
        totalCol: 0,
        itemPosZ: -20.0,
        height_topbar_canvas: 160.0,
        height_adbanner_canvas: 160.0,
        isItemHasSel: false,
        ptDown: new cc.Vec2(0, 0),
        posItemDown: new cc.Vec2(0, 0), 

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
        var idx = Math.floor(level / GameBlock.GUANKA_NUM_PER_ITEM);
        var idx_sub = level % GameBlock.GUANKA_NUM_PER_ITEM;
        cc.Debug.Log("game finish idx_sub=" + idx_sub + " GUANKA_NUM_PER_ITEM=" + GameBlock.GUANKA_NUM_PER_ITEM);
        if ((idx_sub + 1) == GameBlock.GUANKA_NUM_PER_ITEM) {
            var infoitem = null;
            var key = null;
            if (cc.GameManager.gameMode == GameBlock.GAME_MODE_SHAPE) {
                infoitem = this.GetItemInfoShapeColor(idx, this.listShape);
                key = GameBlock.STR_KEY_GAME_STATUS_SHAPE + infoitem.id;
            }
            if (cc.GameManager.gameMode == GameBlock.GAME_MODE_COLOR) {
                infoitem = this.GetItemInfoShapeColor(idx, this.listColor);
                key = GameBlock.STR_KEY_GAME_STATUS_COLOR + infoitem.id;
            }
            cc.Debug.Log("game finish key=" + key + " this.gameMode=" + cc.GameManager.gameMode);
            if (key != null) {
                cc.Common.SetItemOfKey(key, GameBlock.GAME_STATUS_FINISH);
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
                if (this.itemInfoSel.id == GameBlock.ID_BOMB) {
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
                var idx = Math.floor(level / GameBlock.GUANKA_NUM_PER_ITEM);
                var idx_sub = level % GameBlock.GUANKA_NUM_PER_ITEM;
                if (idx_sub == 0) {
                    var infoitem = null;
                    var key = null;
                    if (cc.GameManager.gameMode == GameBlock.GAME_MODE_SHAPE) {
                        infoitem = this.GetItemInfoShapeColor(idx, this.listShape);
                        key = GameBlock.STR_KEY_GAME_STATUS_SHAPE + infoitem.id;
                    }
                    if (cc.GameManager.gameMode == GameBlock.GAME_MODE_COLOR) {
                        infoitem = this.GetItemInfoShapeColor(idx, this.listColor);
                        key = GameBlock.STR_KEY_GAME_STATUS_COLOR + infoitem.id;

                    }
                    cc.Debug.Log("game play key=" + key + " this.gameMode=" + cc.GameManager.gameMode);
                    if (key != null) {
                        cc.Common.SetItemOfKey(key, GameBlock.GAME_STATUS_PLAY);
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
        if (info.id == GameBlock.ID_BOMB) {
            return;
        }
        //speak
        var str = this.StringOfItem(info);
        cc.Tts.Speak(str);
        if (this.textTitle != null) {
            this.textTitle.node.active = true;
            this.textTitle.string = str;
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

        if (this.nodeBomb != null) {
            this.nodeBomb.removeFromParent(true);
            this.nodeBomb = null;
        }
    },

    LoadGame: function (mode) {

        cc.Debug.Log("LoadGame:mode=" + mode);
        this.ClearGame();
        switch (mode) {
            case GameBlock.GAME_MODE_SHAPE:

                break;

        }

        this.LayOut();
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
        var strImage = cc.AppRes.main().URL_HTTP_HEAD + pic;
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




});
