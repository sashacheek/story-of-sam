import { Scene } from 'phaser';
import { animateText } from '../tools/Typewriter';

export class BaseScene extends Scene {
    constructor (sceneKey) {
        super(sceneKey);
    }

    init(data) {
        this.transition = data?.transition ?? true;
    }

    createBase(background, title = "") {
        if (this.transition) {
            const ui = this.scene.get('UI');
            ui.fadeIn();
        }
        this.gameCenterX = this.scale.width / 2;
        this.gameCenterY = this.scale.height / 2;
        this.add.image(this.gameCenterX, this.gameCenterY, background);
        this.add.text(1500, 10, title, {fontFamily: "Walter Turncoat", fontSize: 48, color: "black", padding: 
            {x : 10, y : 5}, strokeThickness: 10, align: 'right'
         })

    }

    disableUI() {
        this.hideTexts();
        this.input.enabled = false;
        this.scene.sleep('UI')
    }

    enableUI() {
        this.input.enabled = true;
        this.scene.wake('UI');
    }

    makeButton(img, action, alpha = 0.001,  flag = false, x = this.gameCenterX, y =this.gameCenterY,) {
        const button = this.add.image(x, y, img);
        button.setAlpha(alpha);
        button.setInteractive({ pixelPerfect: true });
        button.on('pointerdown', () => {
            if (this.registry.get('frozen') != true) {
                action();
            }
        });

        if (flag) {
            this.registry.set(flag, true);
        }
        return button;
    }

    addImage(img, alpha = 1) {
        const image = this.add.image(this.gameCenterX, this.gameCenterY, img);
        image.setAlpha(alpha);
        return image;
    }

    vidText(video, text) {
        const vid = this.add.video(this.gameCenterX, this.gameCenterY, video);
            if (!this.registry.set('noMusic')) {
                const music = this.sound.get('bgm');
                music.setVolume(0.1);
            }

            vid.play();
            vid.once('play', () => {
                this.disableUI();
            });
            vid.once('complete', () => {  
                vid.destroy();
                this.unhideTexts();
                this.enableUI();
                if (!this.registry.set('noMusic')) {
                    music.setVolume(0.2);
                }
                this.frozenText(text);
            })
    }

    makeHover(area, text, x, y) {
        const name = this.add.text(x, y, text, { fontFamily: "Walter Turncoat", fontSize: 48, color: "black", padding: 
            {x : 10, y : 5}, strokeThickness: 10, align: 'center'
         });
         name.elem_type = 'hoverText';
        name.setAlpha(0);
        area.on('pointerover', () => {
            name.setAlpha(1);
        })
        area.on('pointerout', () => {
            this.tweens.killTweensOf(name);
            this.tweens.add({
                targets: name,
                alpha: 0,
                duration: 150,
                ease: 'Quad.easeOut'
            });
        });
    }

    collectItem = (item = "", inv_item, flag, text = "") => {
        if (item != "") {
            item.destroy();
        }
        const ui = this.scene.get('UI');
        ui.addItem(inv_item);
        this.registry.set(flag, true);
        if (text != "") {
            this.frozenText(text)
        }
     }

    canDrop(dropped_on_item, action) {
        dropped_on_item.setInteractive({ dropZone: true }); // enable drop detection
        dropped_on_item._onDropAction = action;
    }




    frozenText(text) {
        this.hideTexts();
        this.registry.set('frozen', true);

        const textObj = this.add.text(130, 850, text, { fontFamily: "Walter Turncoat", fontSize: 48, color: "black" });
        let finished = false;

        animateText(textObj).then(() => {
            finished = true;
        });

        const clickHandler = () => {
            if (!finished) {
                textObj.skipText();
            } else {
                textObj.destroy();
                this.registry.set('frozen', false);
                this.unhideTexts();
                this.input.off('pointerdown', clickHandler);
            }
        };

        this.input.on('pointerdown', clickHandler);
    }

    frozenTexts(texts) {
        let index = 0;

        const showNext = () => {
            if (index >= texts.length) {
                // all texts done, unfreeze input
                this.registry.set('frozen', false);
                this.unhideTexts();
                return;
            }

            this.registry.set('frozen', true);
            this.hideTexts();
            const textObj = this.add.text(130, 850, texts[index], { fontFamily: "Walter Turncoat", fontSize: 48, color: "black" });
            let finished = false;
            let trueFinished = false;

            animateText(textObj).then(() => {
                finished = true;
            });

            const clickHandler = () => {
                if (!finished) {
                    // skip typewriter
                    textObj.skipText();
                    finished = true;
                } else if ( finished && index > 0 ) {
                    textObj.destroy();
                    this.input.off('pointerdown', clickHandler);
                    index++;
                    showNext();
                } else if (!trueFinished) {
                    textObj.skipText();
                    trueFinished = true;
                } else {
                    // remove current text and move to next
                    textObj.destroy();
                    this.input.off('pointerdown', clickHandler);
                    index++;
                    showNext();
                }
            };

            this.input.on('pointerdown', clickHandler);
        };

        showNext();
    }



moveLocation(location) {
    const ui = this.scene.get('UI');
    ui.fadeOut(150);

    ui.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(location, { transition: true });
        ui.fadeIn(150);
    });
}


    hideTexts() {
        this.children.list
            .filter(obj => obj.elem_type === 'hoverText')
            .forEach(obj => obj.setDepth(-1));
    }
    unhideTexts() {
        this.children.list
            .filter(obj => obj.elem_type === 'hoverText')
            .forEach(obj => obj.setDepth(1));
    }
}