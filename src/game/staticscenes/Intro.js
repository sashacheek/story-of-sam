import { BaseScene } from "../support/BaseScene";

export class Intro extends BaseScene {
  constructor() {
    super("Intro");
  }

  create() {
    this.gameCenterX = this.scale.width / 2;
    this.gameCenterY = this.scale.height / 2;
    this.registry.set("introPlaying", true);

    this.vidtool.vidSequence(
      ["intro_1", "intro_2", "intro_3", "intro_4", "intro_5", "intro_6"],
      [
        [
          "Engineer: Sam! Are you awake? Bot 792, nickname Sam!",
          "Engineer: Can you remember anything?",
          "Engineer: Not really?",
        ],
        "Engineer: I found you unconcious on the floor of the rear sector. You\nwere a little banged up, too!",
        "Engineer: I've examined you and fixed you up a bit. Nothing seems too bad,\nthough, except...",
        "Engineer: You're missing all but one of your Memory Chips!",
        "Engineer: While this gets sorted this out, please return to your desk\nand resume your normal duties.",
        "You: I can't remember a thing... what happened to me?",
      ],
      () => {
        this.moveLocation("EngineerRoom");
      },
    );
  }
}
