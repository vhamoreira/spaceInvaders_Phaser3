import Bullet from "../models/Bullet.js";
import Explosion from "../models/Explosion.js";


export default class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,"spaceship");

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.lives = 3;

        //criar invencibilidade apos perda de 1 vida
        this.canBeKilled = true;

        this.velocity = 350;

        this.timeToShoot = 0;
        this.fireRate = 350;

        this.bulletsMaxsize = 10;
       


        this.bullets = this.scene.physics.add.group({
            maxSize: this.bulletsMaxsize,
            classType: Bullet
        });

    }

    update(cursors,time){
            if (cursors.space.isDown && this.timeToShoot < time) {
                //let bullet = this.scene.physics.add.image(this.x, this.y, "bullet");
                let bullet = this.bullets.getFirstDead(true, this.x, this.y, "bullet");
    
                if (bullet) {
                    bullet.setVelocityX(450);
    
                    bullet.active = true;
                    bullet.visible = true;
                }
                //this.bullets.push(bullet);
    
                this.timeToShoot = time + this.fireRate;
    
                if (this.bullets.children.size > this.bulletsMaxsize) {
                    console.log("Group size failed")
                }
                if(this.fireSound){
                    this.fireSound.play();
                }
    
            }
    
    
            this.setVelocity(0);
            const width = this.scene.game.config.width;
            const height = this.scene.game.config.height;

            if (cursors.down.isDown && this.y < height - this.frame.height) {
                this.setVelocityY(this.velocity);
            } else if (cursors.up.isDown && this.y > 0 + this.frame.height) {
                this.setVelocityY(-this.velocity);
            }
            if (cursors.right.isDown && this.x < width - this.frame.width) {
                this.setVelocityX(this.velocity);
            } else if (cursors.left.isDown && this.x > 0 + this.frame.width) {
                this.setVelocityX(-this.velocity);
            }
    
            this.bullets.children.iterate(function (bullet) {
                if (bullet.isOutsideCanvas()) {
                    //bullet.active = false;
                    this.bullets.killAndHide(bullet);
                }
            }, this);
    
  }

  /**
   * cria uma explosao decrementa uma vida
   */
  dead(){
    let x = this.x;
    let y = this.y;
    new Explosion(this.scene, x, y);
    this.lives -= 1;

    //prevents new collision
    this.canBeKilled = false;
    this.x = -100;
    this.y = -100;

  }

  /**
   * substitui nave no ecra, muda de cor temporariamente
   */
  revive(){
    this.x = 100;
    this.y = 100;

    let i = 0;
    let repetition = 200
    let changeTint = true;

    /**
     * temporizador para reviver
     */
    this.scene.time.addEvent({
        repeat: repetition,
        loop: false,
        callback: () => {

            //na ultima repetiçao muda a cor normal e reabilita colisao
            if(i=> repetition){
                this.tint = 0xFFFFFF
                this.canBeKilled = true;
            } else{
                if(changeTint){
                    this.tint = 0xFF0000
                } else{
                    this.tint = 0xFFFFFF
                }
                if(i%20 == 0){
                    changeTint = !changeTint;
                }
            }
            i++

        }
    });

  }

}




