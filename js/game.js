import loadingGame from './scene/LoadingGame.js';
import menu from './scene/Menu.js';
import settings from './scene/Settings.js';
import levels from './scene/Levels.js';
import bootGame from './scene/BootGame.js';
import playGame from './scene/PlayGame.js';
import gameOver from './scene/GameOverScene.js';
import winGame from './scene/WinGame.js';
import level2 from './scene/Level2.js';
import winGameLevel2 from './scene/WinGameLevel2.js';




var game;
window.onload = function () {
    var gameConfig = {
        width: 640,
        height: 640,
        backgroundColor: 0x000000,
        scene: [loadingGame,menu,settings,levels,bootGame,playGame,level2,gameOver,winGame,winGameLevel2],
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

function resizeGame() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
