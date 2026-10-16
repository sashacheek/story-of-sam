import { BaseScene } from "../support/BaseScene";

export class RearDeck extends BaseScene {
  constructor() {
    super("RearDeck");
    this.showUI = true;
  }

  create() {
    this.createBase("rear_deck", "Rear Sector");
    const main_hallway = this.buttontool.makeButton("rear_to_main", () =>
      this.moveLocation("MainHallway"),
    );

    // doors
    this.buttontool.makeHover(main_hallway, "Main Corridor", 800, 130);
    const engineer_room = this.buttontool.makeButton("rear_to_engineer", () =>
      this.moveLocation("EngineerRoom"),
    );
    this.buttontool.makeHover(engineer_room, "Engineer's Room", 380, 675);

    // storage door
    const handleStorage = () => {
      if (!this.registry.get("shown_storage_error")) {
        this.input.enabled = false;
        const vid = this.add.video(
          this.gameCenterX,
          this.gameCenterY,
          "storage_error",
        );
        this.registry.set("frozen", true);
        vid.once("play", () => {
          this.uitool.disableUI();
        });

        vid.play();
        if (!this.registry.set("noMusic")) {
          const music = this.sound.get("bgm");
          music.setVolume(0.1);
        }
        vid.once("complete", () => {
          // if storagevid 2 not shown
          if (
            this.registry.get("hinted_storage") &&
            !this.registry.get("hinted_screwdriver")
          ) {
            const vid2 = this.add.video(
              this.gameCenterX,
              this.gameCenterY,
              "storage_screw",
            );
            vid2.play();

            vid2.once("complete", () => {
              vid.destroy();
              vid2.destroy();
              if (!this.registry.set("noMusic")) {
                music.setVolume(0.2);
              }
              this.registry.set("hinted_screwdriver", true);
              this.uitool.enableUI();
              this.texttool.frozenText(
                "(Sam): If I could just open up the card reader, maybe I could fix it.",
              );
            });
          } else {
            vid.destroy();
            if (!this.registry.set("noMusic")) {
              music.setVolume(0.2);
            }
            this.uitool.enableUI();
            this.texttool.frozenText(
              "(Sam): The card reader is glitching, I can't go in there right now",
            );
          }
        });
        this.registry.set("shown_storage_error", true);
      } else if (
        this.registry.get("hinted_storage") &&
        !this.registry.get("hinted_screwdriver")
      ) {
        const vid2 = this.add.video(
          this.gameCenterX,
          this.gameCenterY,
          "storage_screw",
        );
        vid2.play();
        if (!this.registry.set("noMusic")) {
          music.setVolume(0.1);
        }

        vid2.once("complete", () => {
          vid2.destroy();
          if (!this.registry.set("noMusic")) {
            music.setVolume(0.2);
          }
          this.registry.set("hinted_screwdriver", true);
          this.uitool.enableUI();
          this.texttool.frozenText(
            "(Sam): If I could just open up the card reader, maybe I could fix it.",
          );
        });
      } else {
        this.texttool.frozenText(
          this.registry.get("hinted_screwdriver")
            ? "(Sam): If I could just open up the card reader, maybe I could fix it."
            : "(Sam): The card reader is glitching, I can't go in there right now",
        );
      }
    };

    const storage_closet = this.buttontool.makeButton(
      "rear_to_storage_draggable",
      () =>
        this.registry.get("unlocked_storage")
          ? this.moveLocation("StorageCloset")
          : handleStorage(),
      0.001,
      null,
      1340,
      895,
    );

    this.buttontool.makeHover(storage_closet, "Storage Closet", 1095, 675);

    // droppable
    if (!this.registry.get("unlocked_storage")) {
      const makeStorageClosetDroppable = () => {
        storage_closet.setInteractive({ dropZone: true });

        this.buttontool.canDrop(storage_closet, (item, target) => {
          let textureKey = item.texture
            ? item.texture.key
            : item.list && item.list[0].texture.key;
          if (textureKey === "inv_screwdriver") {
            // SCREWDRIVER ON STORAGE CLOSET
            const vid = this.add.video(
              this.gameCenterX,
              this.gameCenterY,
              "unlock_storage",
            );
            vid.once("play", () => {
              this.uitool.disableUI();
            });

            vid.play();
            vid.once("complete", () => {
              this.registry.set("unlocked_storage", true);
              this.moveLocation("StorageCloset");
              this.uitool.enableUI();
            });
          }
        });
      };
      if (this.registry.get("collected_screwdriver")) {
        makeStorageClosetDroppable();
      }
    }
  }
}
