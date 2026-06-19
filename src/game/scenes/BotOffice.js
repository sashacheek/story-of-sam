// BotOffice.js
import { BaseScene } from "../tools/BaseScene";

export class BotOffice extends BaseScene {
  constructor() {
    super("BotOffice");
    this.showUI = true;
  }

  create() {
    this.createBase("bot_office", "Bot Office");
    const main_hallway = this.makeButton("bo_to_main", () =>
      this.moveLocation("MainHallway"),
    );
    this.makeHover(main_hallway, "Main Corridor", 60, 820);

    // Energy cells bot
    this.makeButton("coin_bot", () =>
      this.frozenTexts([
        "Bot: Hey, you! You're one of the new bots, right? Sam, was it?",
        "Bot: I'm working on a little side project but I need 10 energy cells for it.\nCould you gather them for me? I'll give you something special if you do.",
      ]),
    );

    // Lead bot
    const unlockResearch = () => {
      this.registry.set("collected_research_pass", true);
      this.frozenTexts([
        "Lead Bot: Where is the Lead Research Assisstant? I need some very\nimportant files from him.",
        "Lead Bot: You want to fetch him for me? Sure, that would be great.",
        "Lead Bot: Here, take this key pass. It will get you into the research\nlab. Have him meet me here.",
      ]);
    };

    if (!this.registry.get("collected_memory_card_1")) {
      this.makeButton("lead_bot", () =>
        this.frozenText(
          "Lead Bot: Where is the Lead Research Assisstant? I need some very\nimportant files from him.",
        ),
      );
    } else {
      this.makeButton("lead_bot", () => unlockResearch());
    }

    // if trippod bot is true, change clock text and prevent clock game from triggering (?) or send into completed game just to view
    this.makeButton("clock_wires", () => {
      if (!this.registry.get("tripped_bot")) {
        this.frozenTexts(
          [
            "There is a panel on the wall with wires leading to the clock.",
            "I think I could hack into this and scramble the clock without anybody\nseeing.",
          ],
          () =>
            this.makeButton(
              "hack_clock",
              () => {
                this.registry.set("frozen", false);
                this.moveLocation("ClockPuzzle");
              },
              1,
              undefined,
              undefined,
              undefined,
              true,
            ),
        );
      } else {
        // take to clock game
        // clock game will check flag to show completion and stop being interactible
        this.moveLocation("ClockPuzzle");
      }
    });

    const hintStorage = () => {
      // makeClockDroppable();
      this.frozenTexts([
        "Bot: So much to do and so little time! I have to finish all this and go to\ncomms for shift change at 9.",
        "Bot: Have I seen anything strange? Well... Now that you mention it, I did\nhear something strange by the storage closet earlier.",
        "Bot: And that's around where they found that bot that got messed\nwith, too!",
      ]);
    };

    if (!this.registry.get("tripped_bot")) {
      var stressed_bot = this.addImage("bo_bot_desk");
      var stressed_bot_button = this.makeButton(
        "stressed_bot",
        hintStorage,
        undefined,
        "hinted_storage",
      );
    }

    if (this.registry.get("tripped_bot")) {
      this.addImage("bo_engineer_and_bot");
      this.makeButton(
        "bo_engineer_and_bot",
        () =>
          this.frozenText(
            "(Sam): The engineer is in a deep focus while repairing the fallen bot.",
          ),
        1,
      );
    }

    // Your desk
    // this.makeButton('sams_desk', () => this.frozenText("(Sam): This is my desk"));

    // Interactables
    // Clock
    const clock = this.makeButton("clock", () =>
      this.frozenText("(Sam): There is a large digital clock on this wall."),
    );

    // if (
    //   this.registry.get("hinted_storage") &&
    //   !this.registry.get("tripped_bot")
    // ) {
    //   makeClockDroppable();
    // }

    // Items
    // let ruler;
    // if (!this.registry.get("collected_ruler")) {
    //   ruler = this.makeButton(
    //     "ruler",
    //     () =>
    //       this.collectItem(
    //         ruler,
    //         "inv_ruler",
    //         "collected_ruler",
    //         "(Sam): There's a meter stick by this shelf.",
    //       ),
    //     1,
    //   );
    // }
  }
}
