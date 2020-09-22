export default class Levels extends Phaser.Scene{
    constructor(){
        super("Levels");
    }

    preload(){
        this.load.image("bg","assets/background.png");
        this.load.image("level1","assets/level1.png");
        this.load.image("level2","assets/level2.png");
        this.load.image('blueButton1','assets/blue_button02.png');

    }

    create(){
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.add.image(0,0,"bg").setDisplayOrigin(0,0).setDisplaySize(width,height).setDepth(0);
        let level1Button = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 100, "level1").setScale(0.1,0.1).setDepth(1);
        let level2Button = this.add.image(this.game.config.width /2, this.game.config.height/2,"level2").setScale(0.1,0.1).setDepth(1);
        

        level1Button.setInteractive();
        level2Button.setInteractive();
       

        level1Button.on("pointerdown", ()=>{
            this.add.text(20,20,"Level 1 loading...");
        setTimeout(() => {
            this.scene.start('BootGame');
          }, 2000);
    
        });

        level2Button.on("pointerdown", ()=>{
            this.add.text(20,20,"Level 2 loading...");
            setTimeout(()=>{
                this.scene.start('BootGame')}
            ,2000);
        });

        this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
        this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
        Phaser.Display.Align.In.Center(this.menuText, this.menuButton);
 
        this.menuButton.on('pointerdown', function (pointer) {
        this.scene.start('Menu');
        }.bind(this));



    }
}