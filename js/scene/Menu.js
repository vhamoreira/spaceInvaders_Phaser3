export default class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
        this.load.image("bg","assets/background.png");
        this.load.image("start","assets/Start_BTN.png");
        this.load.image("levels","assets/Menu_BTN.png");
        this.load.image("settings","assets/Settings_BTN.png");
        this.load.image("spaceship","assets/spaceship.png");


}
    create(){
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.add.image(0,0,"bg").setDisplayOrigin(0,0).setDisplaySize(width,height).setDepth(0);
        let playButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 50, "start").setScale(0.4,0.4).setDepth(1);
        let settingsButton = this.add.image(this.game.config.width / 2 - 50, this.game.config.height / 2 + 150,"settings").setScale(0.3,0.3).setDepth(1);
        let levelsButton = this.add.image(this.game.config.width / 2 + 50, this.game.config.height / 2 + 150,"levels").setScale(0.3,0.3).setDepth(1);

        let hoverImage = this.add.image(100,100,"spaceship");
        hoverImage.setScale(1);
        hoverImage.setVisible(false);


        playButton.setInteractive();
        settingsButton.setInteractive();
        levelsButton.setInteractive();

        playButton.on("pointerover",()=>{
            hoverImage.setVisible(true);
            hoverImage.x = playButton.x+270 - playButton.width;
            hoverImage.y = playButton.y;
        });
        playButton.on("pointerout",()=>{
            hoverImage.setVisible(false);

        });
        playButton.on("pointerdown",()=>{
            this.scene.start("BootGame");
        
        });

        settingsButton.on("pointerdown",()=>{
            this.scene.start("Settings");

        });

        levelsButton.on("pointerdown", ()=>{
            this.scene.start("Levels");
        });


    }
}