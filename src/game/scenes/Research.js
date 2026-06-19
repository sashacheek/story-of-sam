import { BaseScene } from "../tools/BaseScene";

export class Research extends BaseScene {
  constructor() {
    super("Research");
    this.showUI = true;
  }
  create() {
    this.createBase("research", "Research");
    const reasearch_to_main = this.makeButton("research_to_main", () =>
      this.moveLocation("MainHallway"),
    );
    this.makeHover(reasearch_to_main, "Main Hallway", 1530, 660);

    this.makeButton(
      "research_researcher_1",
      () => this.frozenText("Researcher 1: Hi I am researcher 1."),
      1,
    );
    this.makeButton(
      "research_researcher_2",
      () => this.frozenText("Researcher 2: Hi I am researcher 2."),
      1,
    );

    // this.makeButton(
    //   "research_lead_ra",
    //   () => this.frozenText("Lead Research Assisstant: Hi I am the lead ra."),
    //   1,
    // );

    const clickLeadRa = () => {
      this.registry.set("talked_lead_ra", true);
      // memory_card_1.destroy();
      this.vidSequence(
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
      );
    };

    if (!this.registry.get("talked_lead_ra")) {
      let lead_ra;
      lead_ra = this.makeButton("research_lead_ra", () => clickLeadRa(), 1);
    }

    // talked_lead_ra

    // when talk to lead ra, if flag not set, trigger cutscene
    //
    // later -> redraw BO and research with new lead ra state
  }
}
