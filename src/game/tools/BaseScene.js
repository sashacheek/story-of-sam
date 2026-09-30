import { Scene } from "phaser";
import * as SceneState from "./SceneState.js";

import * as UITool from "./UITool.js";
import * as TextTool from "./TextTool.js";
import * as ButtonTool from "./ButtonTool.js";

export class BaseScene extends Scene {
  constructor(sceneKey) {
    super(sceneKey);

    this.uitool = UITool;
    this.texttool = TextTool;
    this.buttontool = ButtonTool;
  }

  init(data) {
    this.transition = data?.transition ?? true;
    if (data?.showUI !== undefined) {
      this.showUI = data.showUI;
    }
    SceneState.setScene(this);
  }

  createBase(background, title = "") {
    if (this.scene.key !== "UI") {
      if (!this.scene.isActive("UI")) {
        this.scene.launch("UI");
      }

      const ui = this.scene.get("UI");
      ui.setGameplayVisible(this.showUI);
      this.scene.bringToTop("UI");

      if (this.transition) {
        ui.fadeIn();
      }
    }

    this.gameCenterX = this.scale.width / 2;
    this.gameCenterY = this.scale.height / 2;

    if (background) {
      this.add.image(this.gameCenterX, this.gameCenterY, background);
    }

    this.add.text(1500, 10, title, {
      fontFamily: "Walter Turncoat",
      fontSize: 48,
      color: "black",
      padding: { x: 10, y: 5 },
      strokeThickness: 10,
      align: "right",
    });
  }

  addImage(img, alpha = 1) {
    const image = this.add.image(this.gameCenterX, this.gameCenterY, img);
    image.setAlpha(alpha);
    return image;
  }

  vidText(video, text) {
    const vid = this.add.video(this.gameCenterX, this.gameCenterY, video);
    if (this.registry.get("noMusic") === false) {
      const music = this.sound.get("bgm");
      music.setVolume(0.1);
    }

    vid.play();
    vid.once("play", () => {
      this.uitool.disableUI();
    });
    vid.once("complete", () => {
      vid.destroy();
      this.uitool.unhideTexts();
      this.uitool.enableUI();
      if (this.registry.get("noMusic") === false) {
        music.setVolume(0.2);
      }
      this.texttool.frozenText(text);
    });
  }

  vidSequence(vids, texts, onComplete = null) {
    let currentIndex = 0;
    let previousVid = null;

    if (this.registry.get("noMusic") === false) {
      const music = this.sound.get("bgm");
      if (music) music.setVolume(0.1);
    }

    if (this.scene.isActive("UI")) {
      this.scene.setVisible(false, "UI");
      this.scene.sendToBack("UI");
    }

    const playNextStep = () => {
      if (currentIndex >= vids.length) {
        if (previousVid) {
          previousVid.destroy();
          previousVid = null;
        }
        if (this.registry.get("noMusic") === false) {
          const music = this.sound.get("bgm");
          if (music) music.setVolume(0.2);
        }

        // if (!this.scene.isActive("UI")) {
        this.scene.setVisible(true, "UI");
        this.scene.bringToTop("UI");
        const ui = this.scene.get("UI");
        ui.setGameplayVisible(this.showUI);
        // }

        // Add these 3 lines:
        if (typeof onComplete === "function") {
          onComplete();
        }

        return;
      }

      const currentVidKey = vids[currentIndex];
      const vid = this.add.video(
        this.gameCenterX,
        this.gameCenterY,
        currentVidKey,
      );

      vid.play();

      vid.once("play", () => {
        this.uitool.disableUI();
        if (previousVid) {
          previousVid.destroy();
        }
        previousVid = vid;
      });

      vid.once("complete", () => {
        this.uitool.unhideTexts();
        this.uitool.enableUI();

        if (currentIndex < texts.length) {
          const currentTextData = texts[currentIndex];

          if (Array.isArray(currentTextData)) {
            // Pass true as the 3rd argument to wait for complete text erasure before moving on
            this.texttool.frozenTexts(
              currentTextData,
              () => {
                currentIndex++;
                this.time.delayedCall(200, () => {
                  playNextStep();
                });
                return null;
              },
              true,
            );
          } else {
            this.texttool.frozenText(currentTextData, () => {
              currentIndex++;
              this.time.delayedCall(200, () => {
                playNextStep();
              });
            });
          }
        } else {
          currentIndex++;
          playNextStep();
        }
      });
    };

    playNextStep();
  }

  moveLocation(location) {
    const ui = this.scene.get("UI");
    ui.fadeOut(150);

    ui.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(location, { transition: true });
      ui.fadeIn(150);
    });
  }
}
