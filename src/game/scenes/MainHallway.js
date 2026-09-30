import { BaseScene } from "../support/BaseScene";

export class MainHallway extends BaseScene {
  constructor() {
    super("MainHallway");
    this.showUI = true;
  }

  create() {
    // DEGUG
    if (this.registry.get("skipPhaseOne")) {
      // Skip Phase 1
      for (var flag of this.registry.get("phaseOneFlags")) {
        this.registry.set(flag, true);
      }
      for (const [item, flag] of Object.entries(
        this.registry.get("phaseOneItems"),
      )) {
        this.buttontool.collectItem("", item, flag);
      }
    }

    const accessDenied = () => {
      let text = "(Sam): I don't have the access to go in there.";
      if (!this.registry.get("shown_access_denied")) {
        this.registry.set("shown_access_denied", true);
        this.vidtool.vidText("placeholder", text);
      } else {
        this.texttool.frozenText(text);
      }
    };

    this.createBase("main_hallway", "Main Corridor");
    const rear_deck = this.buttontool.makeButton("main_to_rear", () =>
      this.moveLocation("RearDeck"),
    );
    this.buttontool.makeHover(rear_deck, "Rear Sector", 800, 850);

    // research
    const research = this.buttontool.makeButton("main_to_research", () =>
      this.registry.get("collected_research_pass")
        ? this.moveLocation("Research")
        : accessDenied(),
    );
    this.buttontool.makeHover(research, "Research", 200, 400);

    const bathroom = this.buttontool.makeButton("main_to_bathroom", () =>
      accessDenied(),
    );
    this.buttontool.makeHover(bathroom, "Bathroom", 515, 240);

    const bunkers = this.buttontool.makeButton("main_to_bunkers", () =>
      accessDenied(),
    );
    this.buttontool.makeHover(bunkers, "Bunkers", 730, 130);

    const restricted = this.buttontool.makeButton("main_to_restricted", () =>
      accessDenied(),
    );
    this.buttontool.makeHover(restricted, "Restricted\nHallway", 830, 50);

    const cafeteria = this.buttontool.makeButton("main_to_cafeteria", () =>
      accessDenied(),
    );
    this.buttontool.makeHover(cafeteria, "Cafeteria", 990, 150);

    const bot_office = this.buttontool.makeButton("main_to_bo", () =>
      this.moveLocation("BotOffice"),
    );
    this.buttontool.makeHover(bot_office, "Bot Office", 1380, 400);
  }
}
