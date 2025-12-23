import { Scene } from 'phaser';
import { Frame } from '../../tools/Frame';
import { introFrames } from './IntroFrames';

export class Intro extends Scene {
    constructor() {
        super("Intro");
    }

    createFrame(frameKey) {
        if (!this.scene.get(frameKey)) {
            this.scene.add(frameKey, new Frame(frameKey), false);
        }
    }

    create() {
        this.registry.set('introPlaying', true);
        Object.keys(introFrames).forEach(key => {
            this.createFrame(key);
        });

        // Start the first frame
        this.scene.start('Intro1', {
            media: 'intro1',
            mediaType: 'image',
            text: '    ',
            nextScene: 'Intro2',
            framesList: introFrames
        });
    }
}
