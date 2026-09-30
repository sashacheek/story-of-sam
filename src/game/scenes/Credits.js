import { BaseScene } from "../tools/BaseScene";

export class Credits extends BaseScene {
  constructor() {
    super("Credits");
  }
  create() {
    this.createBase("");
    const vid = this.add.video(1920 / 2, 1080 / 2, "credits_vid");
    vid.play(true);
    const nav = this.buttontool.makeButton(
      "credits_to_menu",
      () => this.moveLocation("MainMenu"),
      1,
    );
  }
}
