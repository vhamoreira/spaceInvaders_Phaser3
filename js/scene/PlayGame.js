import Ship from "../models/Ship.js";
import EnemiesGroup from "../models/EnemyGroup.js";
import WinGame from "./WinGame.js";
import Enemy from "../models/Enemy.js";


export default class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){
        console.log("Starting Game");

        const width = this.game.config.width;
        const height = this.game.config.height;
        
        this.bg = this.add.image(0,0,"bg").setDisplayOrigin(0,0).setDisplaySize(width,height);
        
        this.ship = new Ship(this,100,100);
        this.score = 0;




        /**
         * cria texto para o score
         */
        this.labelScore = this.add.text(100,20,"Score: " + this.labelScore,{
            font: "30px Cambria",
            fill: "#ffffff"
        });

        /**
         * cria texto para vidas da nave
         */
        this.labelLives = this.add.text(290,20,"Lives: " + this.ship.lives,{
            font: "30px Cambria",
            fill:"#ffffff"
        });

        this.cursors = this.input.keyboard.createCursorKeys()

         /** 
         * create a new EnemiesGroup (new class to handle group of Enemy) that can hold 100 enemies
         */
        this.enemies = new EnemiesGroup(this.physics.world, this, 100);

        this.physics.add.overlap(this.ship, this.enemies, (ship, enemy) => {
            //console.log("crash!");
            if (ship.canBeKilled) {

                ship.dead();
                this.labelLives.setText("Lives: " + ship.lives);
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        ship.revive();
                    }
                });
            }
        });

        /**
         * deal with overlap/collision of ship bullets and enemies
         */
        this.physics.add.overlap(this.ship.bullets, this.enemies, (bullet, enemy) => {
            //bullet.destroy(); //destroy method removes object from the memory
            //enemy.destroy();

            this.enemies.killAndHide(enemy);
            this.ship.bullets.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.score +=10;
            //update the score text
            this.labelScore.setText("Score: " + this.score);

        });
    
        

        /**
         * config object for enemy spawn timer
         */
        this.enemyTimerDelay = 1000
        this.enemySpawnConfig = {
            delay: this.enemyTimerDelay,
            repeat: -1,
            callback: () => {
                let margin = 200;
                let x = this.sys.canvas.width;
                let y = Math.floor(Math.random() * (this.sys.canvas.height - margin))+50;
                //now it does not need to create a new Enemy object (false argument) because they are created with the scene creation
                let enemy = this.enemies.getFirstDead(false, x, y);
                if (enemy) {
                    enemy.spawn()
                }
            }
        };
        this.enemyTimer = this.time.addEvent(this.enemySpawnConfig);

        this.enemySpawnCounter = 0;

        this.themeSound = this.sound.add("theme", { volume: 0.1 });

        this.themeSound.play();

        let fireSound = this.sound.add("fire", {
            volume: 0.1
        });

        this.ship.fireSound = fireSound;


    }


    update(time, delta) {

        this.bg.tilePositionX -=0,5;

        //console.log(time + " " + delta);

        // game runs while the ship has more than 0 lives
        if (this.ship.lives >= 0) {
            //deal with enemies spawn rate
            this.spawnNewEnemies();

            this.ship.update(this.cursors, time);

            this.enemies.children.iterate(function (enemy) {
                if (enemy.isOutsideCanvas()) {
                    //bullet.active = false;
                    this.enemies.killAndHide(enemy);
                }
            }, this);

            this.enemySpawnCounter += delta;
        
        }
            else{
            //stops this scene
            this.scene.stop();

            this.themeSound.stop();

            //starts the game over scene and passes the actual score to render at that scene
            this.scene.start('GameOver', { score: this.score });
        }

        if(this.score == 400){
            this.scene.stop();
            this.themeSound.stop();
            this.scene.start('WinGame',{score: this.score});
        }

    
    

    }

    /**
     * example of how change the spawn rate 
     * spawnCounter accumulates delta (seconds between frames) 
     * when spawnCounter greaterOrEqual to seconds, removes the actual spawnTimer and replaces to a new one with a lesser delay
     * some limitations for ridiculous spawn rate could be set
    */
   spawnNewEnemies() {
    const seconds = 10;
    if (this.enemySpawnCounter >= seconds * 500) {
        console.log("remove timer");
        this.enemySpawnCounter = 0;
        this.enemyTimer.remove(false);
        this.enemySpawnConfig.delay -= 50;
        if (this.enemySpawnConfig.delay < 0) {
            this.enemySpawnConfig.delay = 0;
        }
        this.enemyTimer = this.time.addEvent(this.enemySpawnConfig);
        console.log("add new timer delay: " + this.enemySpawnConfig.delay);
    }
   }
}