var UIView = require("UIView");
var UIGameItem = cc.Class({
    extends: UIView,// cc.ItemInfo, 
    properties: {
        imageItem: cc.UIImage,
        isBomb: false,
        isMathShape: true,
    },

    onLoad: function () {
        this._super();
    },
    update: function () {

    },

    LayOut() {
        this._super();

    },

    GetBoundingBox: function () {
        return this.imageItem.image.node.getBoundingBox();
    },
    GetRigidBody: function () {
        return this.node.getComponent(cc.RigidBody);
    },
    UpdatePosition: function (pos) {

        var body = this.GetRigidBody();
        if (body != null) {
            // body.MovePosition(posword);
            // body.syncPosition(false);
            //MouseJoint
            //刚体的移动需要用鼠标关节,不能用node.setPosition
            var mj = this.node.getComponent(cc.MouseJoint);
            if (mj != null) {
                cc.Debug.Log("OnTouchMove positemNew=" + pos);
                mj.target = pos;
            }
            // uiGameItemSel.node.setPosition(positemNew);

        } else {
            //cc.Debug.Log("body is null");
            this.node.setPosition(pos);
        }



    },

    UpdateItemColor: function (sprite, color) {
        var mat = sprite.getMaterial(0);
        mat.setProperty('enableColor', 1.0);
        mat.setProperty('showColor', color);//cc.Color.WHITE 
    },

    UpdateItem: function (info, cbFinish) {
        if (!this.isBomb) {
            this.isMathShape = info.isMathShape;
        }
        var sprite = this.imageItem.image;
        sprite.name = info.id;

        //加载图片 
        var strImage = info.pic;
        cc.Debug.Log("UpdateItem strImage=" + strImage);
        var funcLoad = function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.Debug.Log("item_pic err");
                cc.Debug.Log(err.message || err);
                return;
            }
            sprite.spriteFrame = new cc.SpriteFrame(tex);
            sprite.node.setContentSize(new cc.size(tex.width, tex.height));
            this.node.setContentSize(new cc.size(tex.width, tex.height));
            cc.Debug.Log("setContentSize =" + this.node.getContentSize());

            //添加物理特性
            // if ((isInner == true) || (this.isBomb)) {
            //     var body = this.node.addComponent(cc.RigidBody);
            //     body.gravityScale = 0;//关闭重力
            //     // // bd.useGravity = false;
            //     body.fixedRotation = true;

            //     //防止刚体穿越
            //     body.bullet = true;

            //     // bd.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
            //     var collider = this.node.addComponent(cc.PhysicsBoxCollider);
            //     if (collider != null) {
            //         collider.size = new cc.size(tex.width, tex.height);
            //         //修改之后需要apply
            //         collider.apply();
            //         //  cc.Debug.Log("collider=" + collider.size);
            //     }
            //     var mj = this.node.addComponent(cc.MouseJoint);
            // }




            // sprite.node.zIndex = 10;


            if (cbFinish != null) {
                cbFinish(this);
            }


            this.LayOut();

        }.bind(this);

        cc.TextureCache.main.Load(strImage, funcLoad);
        if (info.isColor) {
            this.UpdateItemColor(sprite, cc.Color.RED);
        }


    },

});

