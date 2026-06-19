import { BaseScene } from "../tools/BaseScene";

export class EngineerRoom extends BaseScene {
  constructor() {
    super("EngineerRoom");
    this.showUI = true;
  }

  create() {
    this.createBase("engineer_room", "Engineer's Room");
    const rear_deck = this.makeButton("engineer_to_rear", () =>
      this.moveLocation("RearDeck"),
    );
    this.makeHover(rear_deck, "Rear Sector", 1450, 440);

    // transition from intro
    if (this.registry.get("introPlaying")) {
      this.registry.set("introPlaying", false);
      this.frozenText(
        "(Sam): I should look around and see what I can find out.",
      );
    }

    // engineer asset
    if (!this.registry.get("tripped_bot")) {
      this.makeButton(
        "engineer_engineer",
        () =>
          this.frozenText(
            "Engineer: While this gets sorted out, please return to your desk\nand resume your normal duties.",
          ),
        1,
      );
    }

    /*** screwdriver asset
     * if screwdriver not hinted, display sample text about screwdriver
     * else if screwdriver hinted and screwdriver not collected but not bot tripped, display screwdriver saying I should distract engi first
     * else if screwdriver hinted and screwdriver not collected and bot tripped and, display screwdriver with option to pick up
     * else if screwdriver hinted and screwdriver collected, display nothing.
     */
    if (
      !this.registry.get("collected_screwdriver") &&
      !this.registry.get("tripped_bot")
    ) {
      this.makeButton(
        "engineer_screwdriver",
        () =>
          this.frozenText(
            "(Sam): There is a screwdriver on this table, but I shouldn't take anything\nwhile the engineer is there.",
          ),
        1,
      );
    } else if (
      this.registry.get("tripped_bot") &&
      !this.registry.get("collected_screwdriver")
    ) {
      const screwdriver = this.makeButton(
        "engineer_screwdriver",
        () =>
          this.collectItem(
            screwdriver,
            "inv_screwdriver",
            "collected_screwdriver",
            "(Sam): Maybe this screwdriver will come in handy.",
          ),
        1,
      );
    }
  }
}
