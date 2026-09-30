import { Scene } from "phaser";
import { animateText } from "../tools/Typewriter";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  scaleVideoToFit(video) {
    const gameW = this.scale.width;
    const gameH = this.scale.height;

    const videoW = video.video.width;
    const videoH = video.video.height;

    video.setOrigin(0.5, 0.5);
  }

  create() {
    const gameCenterX = this.scale.width / 2;
    const gameCenterY = this.scale.height / 2;

    this.scene.start("Intro");
  }
}
