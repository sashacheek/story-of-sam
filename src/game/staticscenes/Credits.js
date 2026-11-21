import { BaseScene } from "../support/BaseScene";

export class Credits extends BaseScene {
  constructor() {
    super("Credits");
  }
  create() {
    this.createBase("");
    const vid = this.add.video(1920 / 2, 1080 / 2);
    vid.loadURL("assets/prototype_videos/credits_vid.mp4");
    vid.play(true);
    const nav = this.buttontool.makeButton(
      "credits_to_menu",
      () => this.moveLocation("MainMenu"),
      1,
    );
  }
}
