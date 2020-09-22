export default class Settings extends Phaser.Scene{
    constructor(){
        super("Settings");
        

    }
    
    preload(){
     
        this.load.image('box', 'assets/grey_box.png');
        this.load.image('checkedBox', 'assets/blue_boxCheckmark.png');
        this.load.image('blueButton1','assets/blue_button02.png');
        this.load.audio('theme','assets/theme.mp3');
        

    }
    create(){
        
        this.musicOn = true;
        this.soundOn = true;

 
        this.text = this.add.text(300, 100, 'Settings', { fontSize: 40 });
        this.musicButton = this.add.image(200, 200, 'checkedBox');
        this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });
 
        this.soundButton = this.add.image(200, 300, 'checkedBox');
        this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });
 
        this.musicButton.setInteractive();
        this.soundButton.setInteractive();
 
        this.musicButton.on('pointerdown', function () {
        this.musicOn = !this.musicOn;
        this.updateAudio();
        }.bind(this));
 
        this.soundButton.on('pointerdown', function () {
        this.soundOn = !this.soundOn;
        this.updateAudio();
        }.bind(this));
 
        this.updateAudio();

        this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
        this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
        Phaser.Display.Align.In.Center(this.menuText, this.menuButton);
 
        this.menuButton.on('pointerdown', function (pointer) {
        this.scene.start('Menu');
        }.bind(this));
    }
    updateAudio() {
        if (this.musicOn === false) {
          this.musicButton.setTexture('box');
        } else {
          this.musicButton.setTexture('checkedBox');
        }
       
        if (this.soundOn === false) {
          this.soundButton.setTexture('box');
        } else {
          this.soundButton.setTexture('checkedBox');
        }
      }

    
}