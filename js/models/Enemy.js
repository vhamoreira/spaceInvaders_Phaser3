import Explosion from './Explosion.js';
import Bullet from './Bullet.js';



export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y){
        super (scene, x, y, "enemy",1);
        
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(0.5);
        this.timeToShoot = 0;
        this.fireRate = 350;

        this.bulletsMaxsize = 10;
       


        this.bullets = this.scene.physics.add.group({
            maxSize: this.bulletsMaxsize,
            classType: Bullet
        });

      

}
update(){
    let bullet = this.bullets.getFirstDead(true,this.x,this,y,"bullet");

    if(bullet){
        bullet.active = true;
        bullet.visible = true;

        bullet.fire(this.scene.ship);
    }
    this.timeToShoot = time + 3500;

    if(this.bullets.children.size > this.bulletsMaxsize){
        console.log("Group size failed");
    }
    this.bullets.children.iterate(function (bullet){
        if(bullet.isOutsideCanvas()){
            this.bullets.killAndHide(bullet);
        }
    },this);
}


    removeFromScreen(){
        new Explosion(this.scene,this.x,this.y);
        this.x = -200;
        this.setVelocity(0,0);
    }

    spawn(){
        this.visible = true;
        this.active = true;
        this.setVelocityX(-100);
    }

    isOutsideCanvas(){
        const width = this.scene.game.config.width;
        const height = this.scene.game.config.height;

        return this.x > width || this.y > height || this.x < 0 || this.y < 0;
    }

    spawnLevel2(){
        this.visible = true;
        this.active = true;
        this.setVelocityX(-350);

    }
    

}

        


    

