import { BaseScene } from "../tools/BaseScene";

export class MainMenu extends BaseScene {
  constructor() {
    super("MainMenu");
    this.showUI = false;
  }

  create() {
    this.createBase("menu", "");
    this.makeButton("play", () => {
      this.moveLocation("Game");
    });
    this.makeButton("menu_to_credits", () => this.moveLocation("Credits"));
  }
}
