import { BaseScene } from "../support/BaseScene";

export class Research extends BaseScene {
  constructor() {
    super("Research");
    this.showUI = true;
  }
  create() {
    this.createBase("research", "Research");
    this.registry.set("frozen", false);

    if (this.registry.get("researchGameWon")) {
      this.texttool.frozenText(
        "Thanks so much for your help! Here, have this energy cell for your\ntroubles.",
        () => {
          this.buttontool.addEnergyCellUI();
          this.registry.set("researchGameWon", false);
          this.registry.set("cellResearchGame", true);
        },
      );
    }

    const reasearch_to_main = this.buttontool.makeButton(
      "research_to_main",
      () => this.moveLocation("MainHallway"),
    );
    this.buttontool.makeHover(reasearch_to_main, "Main Hallway", 1530, 660);

    this.buttontool.makeButton(
      "research_researcher_1",
      () => {
        this.texttool.frozenText(
          "Researcher 1: Hi I am researcher 1. This is a hint about the confidential\npass",
        );
        this.registry.set("hinted_confidential_pass", true);
      },
      1,
    );

    // researcher 2

    this.buttontool.makeButton(
      "research_researcher_2",
      () => {
        if (!this.registry.get("cellResearchGame")) {
          this.texttool.frozenTexts(
            [
              "Researcher 2: Hi I am researcher 2.",
              "Would you like to help with xyz?",
            ],
            () =>
              this.buttontool.makeButton(
                "help_researcher",
                () => {
                  this.registry.set("frozen", false);
                  this.moveLocation("ResearchGame");
                },
                1,
                undefined,
                undefined,
                undefined,
                true,
              ),
          );
        } else {
          this.texttool.frozenText(
            "Thanks again for your help, I'm all ready for lunch now.",
          );
        }
      },
      1,
    );

    if (!this.registry.get("talked_lead_ra")) {
      let lead_ra;
      lead_ra = this.buttontool.makeButton(
        "research_lead_ra",
        () => {
          this.registry.set("talked_lead_ra", true);
          this.vidtool.vidSequence(
            [
              "lead_ra_leaves_1",
              "lead_ra_leaves_2",
              "lead_ra_leaves_3",
              "lead_ra_leaves_4",
            ],
            [
              "A bot? We don't get many bots around here.",
              "The Lead Bot needs some papers from me?",
              "Crap, I totally forgot!",
            ],
            () => {
              lead_ra.destroy();
            },
          );
        },
        1,
      );
    }
  }
}
