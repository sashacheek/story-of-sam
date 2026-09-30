import { BaseScene } from "../tools/BaseScene";

export class StorageCloset extends BaseScene {
  constructor() {
    super("StorageCloset");
    this.showUI = true;
  }

  create() {
    this.createBase("storage_closet", "Storage Closet");
    const storage_to_rear = this.buttontool.makeButton(
      "storage_to_rear",
      () => this.moveLocation("RearDeck"),
      1,
    );
    this.buttontool.makeHover(storage_to_rear, "Rear Sector", 1090, 815);

    // Items
    // memory card
    const clickMemoryCard = (memory_card_1) => {
      this.registry.set("collected_memory_card_1", true);
      memory_card_1.destroy();
      // this.vidText("memory_1", "(Sam): No way!");
      this.vidSequence(
        ["card1_1", "card1_2", "card1_3", "card1_4"],
        [
          "Unknown: Yeah, it's all going well. They don't suspect a thing.",
          [
            "Unknown: I told you I could handle this didn't I?",
            "...",
            "Unknown: Once I get that from the Research Lab, I should be ready to\nstart the next phase of the plan.",
          ],
          ["...", "Unknown: So just how much of that did you hear?"],
        ],
      );
    };
    if (!this.registry.get("collected_memory_card_1")) {
      let memory_card_1;
      memory_card_1 = this.buttontool.makeButton(
        "storage_memory_card_1",
        () => clickMemoryCard(memory_card_1),
        1,
      );
    }

    // wires
    this.buttontool.makeButton("storage_wires_drawer", () =>
      this.frozenText("(Sam): There are loose wires in this drawer."),
    );

    // bucket
    if (!this.registry.get("collected_bucket")) {
      const bucket = this.buttontool.makeButton(
        "storage_bucket",
        () =>
          this.buttontool.collectItem(
            bucket,
            "inv_bucket",
            "collected_bucket",
            "(Sam): There's a bucket here",
          ),
        1,
      );
    }
  }
}
