import { Scene } from "phaser";
import * as SceneState from "./SceneState.js";

import * as UITool from "../tools/UITool.js";
import * as TextTool from "../tools/TextTool.js";
import * as ButtonTool from "../tools/ButtonTool.js";
import * as VidTool from "../tools/VidTool.js";

export class BaseScene extends Scene {
  constructor(sceneKey) {
    super(sceneKey);

    this.uitool = UITool;
    this.texttool = TextTool;
    this.buttontool = ButtonTool;
    this.vidtool = VidTool;
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

  moveLocation(location) {
    const ui = this.scene.get("UI");
    ui.fadeOut(150);

    ui.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(location, { transition: true });
      ui.fadeIn(150);
    });
  }
}
