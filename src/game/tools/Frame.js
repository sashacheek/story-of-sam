// takes in image or video, text, next frame on click

import { Scene } from 'phaser';
import { animateText } from './Typewriter';

 export class Frame extends Scene
 {
    constructor (key) {
        super(key); // unique key per scene
    }

    init(data) {
        this.media = data.media;
        this.mediaType = data.mediaType;
        this.textContent = data.text;
        this.nextScene = data.nextScene;
        this.framesList = data.framesList;
        this.transition = data.transition ?? true;
    }

    create() {
        const gameCenterX = this.scale.width / 2;
        const gameCenterY = this.scale.height / 2;

        this.add.image(gameCenterX, gameCenterY, this.media);

        const textObj = this.add.text(130, 850, this.textContent, { fontFamily: "Walter Turncoat", fontSize: 48, color: "black" });

        let finished = false;
        animateText(textObj).then(() => { finished = true; });

        this.input.on('pointerdown', () => {
            if (!finished) {
                // skip typewriter animation
                textObj.skipText();
                finished = true;
            } else if (this.nextScene) {
                // check if the next scene is in framesList
                if (this.framesList[this.nextScene]) {
                    // it is a frame in the list → pass data
                    const nextData = this.framesList[this.nextScene];
                    this.scene.start(nextData.key, {
                        media: nextData.media,
                        mediaType: nextData.mediaType,
                        text: nextData.text,
                        nextScene: nextData.next,
                        framesList: this.framesList,
                        transition: this.transition,
                    });
                } else {
                    this.scene.start(this.nextScene, {transition: this.transition});
                }
            }
        });

    }

 }