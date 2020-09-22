export default class LoadingGame extends Phaser.Scene{
    constructor(){
        super("loadingMenu");
    }

    create(){
        this.add.text(20,20,"Loading Game...");
        setTimeout(() => {
            this.scene.start('Menu');
          }, 2000);
       
    
    }

}