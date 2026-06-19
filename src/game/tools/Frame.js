// takes in image or video, text, next frame on click

import { BaseScene } from "../tools/BaseScene";
import { animateText } from "./Typewriter";

export class Frame extends BaseScene {
  constructor(key) {
    super(key);
    this.transition = false;
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
    this.createBase(this.media);

    // this.add.image(gameCenterX, gameCenterY, this.media);

    // this.frozenText(this.textContent);

    const textObj = this.add.text(130, 850, this.textContent, {
      fontFamily: "Walter Turncoat",
      fontSize: 48,
      color: "black",
    });
    let finished = false;
    let text_bg = "";
    if (this.textContent != "    ") {
      text_bg = this.addImage("text_bar");
    }

    if (this.media == "intro2") {
      text_bg.setScale(0.9);
      this.tweens.add({
        targets: text_bg,
        scale: 1,
        ease: "Power2",
        duration: 100,
      });
    }
    textObj.setDepth(10);

    animateText(textObj).then(() => {
      finished = true;
    });

    const clickHandler = () => {
      if (!finished) {
        textObj.skipText();
      } else {
        textObj.destroy();
        if (text_bg) {
          text_bg.destroy();
        }
        this.registry.set("frozen", false);
        this.unhideTexts();
        this.input.off("pointerdown", clickHandler);
        if (this.framesList[this.nextScene]) {
          // it is a frame in the list → pass data
          const nextData = this.framesList[this.nextScene];
          this.scene.start(nextData.key, {
            media: nextData.media,
            mediaType: nextData.mediaType,
            text: nextData.text,
            nextScene: nextData.next,
            framesList: this.framesList,
            transition: false,
          });
        } else {
          this.scene.start(this.nextScene, { transition: this.transition });
        }
      }
    };

    this.input.on("pointerdown", clickHandler);
    // this.makeButton(this.media, () => {
    //     console.log("a");
    //     if (this.framesList[this.nextScene]) {
    //             // it is a frame in the list → pass data
    //             const nextData = this.framesList[this.nextScene];
    //             this.scene.start(nextData.key, {
    //                 media: nextData.media,
    //                 mediaType: nextData.mediaType,
    //                 text: nextData.text,
    //                 nextScene: nextData.next,
    //                 framesList: this.framesList,
    //                 transition: this.transition,
    //             });
    //         } else {
    //             this.scene.start(this.nextScene, {transition: this.transition});
    //         }
    // });

    // this.input.on('pointerdown', () => {
    //     // if (!finished) {
    //     //     // skip typewriter animation
    //     //     textObj.skipText();
    //     //     finished = true;
    //     // } else if (this.nextScene) {
    //         // check if the next scene is in framesList
    //         if (this.framesList[this.nextScene]) {
    //             // it is a frame in the list → pass data
    //             const nextData = this.framesList[this.nextScene];
    //             this.scene.start(nextData.key, {
    //                 media: nextData.media,
    //                 mediaType: nextData.mediaType,
    //                 text: nextData.text,
    //                 nextScene: nextData.next,
    //                 framesList: this.framesList,
    //                 transition: this.transition,
    //             });
    //         } else {
    //             this.scene.start(this.nextScene, {transition: this.transition});
    //         }
    // });
  }
}
