// MusicScene.js
import { Scene } from 'phaser';

export class Music extends Scene {
    constructor() {
        super({ key: 'MusicScene' });
    }

    preload() {
        this.load.audio('bgm', 'assets/audio/music.mp3');
    }

    create() {
        // Prevent double-playing if scene restarts
        if (!this.sound.get('bgm')) {
            this.music = this.sound.add('bgm', {
                loop: true,
                volume: 0.2
            });
            this.music.play();
        }
    }
}
