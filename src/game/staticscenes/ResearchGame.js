import { BaseScene } from "../support/BaseScene";

export class ResearchGame extends BaseScene {
  constructor() {
    super("ResearchGame");
    this.showUI = false;
  }

  create() {
    let collapse = "";
    let collapse_icon = "";
    let expand_icon = "";
    let isExpanded = false;

    // create expand
    // expand calls collapse
    // collapse calls expand (itself) ?

    this.createBase("research_game_background", "");

    let buttons_key = {
      report_number: {
        highlight_key: "rg_highlight_1",
        filled_key: "rg_filled_1",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 373,
        box: "",
      },
      title: {
        highlight_key: "rg_highlight_2",
        filled_key: "rg_filled_2",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 442,
        box: "",
      },
      image: {
        highlight_key: "rg_highlight_3",
        filled_key: "rg_filled_3",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 511,
        box: "",
      },
      report_type: {
        highlight_key: "rg_highlight_4",
        filled_key: "rg_filled_4",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 582,
        box: "",
      },
      author: {
        highlight_key: "rg_highlight_5",
        filled_key: "rg_filled_5",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 650,
        box: "",
      },
      description: {
        highlight_key: "rg_highlight_6",
        filled_key: "rg_filled_6",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 718,
        box: "",
      },
      criticality: {
        highlight_key: "rg_highlight_7",
        filled_key: "rg_filled_7",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 783,
        box: "",
      },
      seal: {
        highlight_key: "rg_highlight_8",
        filled_key: "rg_filled_8",
        highlight_box: "",
        filled_box: "",
        selected: false,
        Y: 854,
        box: "",
      },
    };

    const createMismatch = () => {
      let mismatch_form = this.addImage("mismatch_form");
      mismatch_form.y += 920;
      mismatch_form.setDepth(10);

      // create buttons
      const buttons_data = Object.values(buttons_key);
      for (const button of buttons_data) {
        button.highlight_box = this.addImage(button.highlight_key, 0.001);
        button.highlight_box.setDepth(20);
        button.filled_box = this.addImage(button.filled_key, 0.001);
        button.filled_box.setDepth(20);
        button.highlight_box.y += 920;
        button.filled_box.y += 920;
        if (button.selected) {
          button.filled_box.setAlpha(1);
        }
        button.box = this.add.image(778, button.Y, "rg_checkbox");
        button.box.setDepth(20);
        button.box.setAlpha(0.001);
        button.box.setInteractive();
        button.box.on("pointerover", () => {
          if (!button.selected) {
            button.highlight_box.setAlpha(1);
          }
        });
        button.box.on("pointerout", () => {
          button.highlight_box.setAlpha(0.001);
        });
        button.box.on("pointerdown", () => {
          if (!button.selected) {
            button.filled_box.setAlpha(1);
            button.selected = true;
          } else {
            button.filled_box.setAlpha(0.001);
            button.selected = false;
          }
        });
      }
      const submit = this.buttontool.makeButton(
        "rg_submit",
        () => {
          console.log("submit");
        },
        1,
        false,
        962,
        977,
      );
      submit.y += 920;
      submit.setDepth(20);

      submit.on("pointerover", () => {
        this.tweens.add({
          targets: [submit],
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 150,
          ease: "Power4.easeOut",
          overwrite: true,
        });
      });

      submit.on("pointerout", () => {
        this.tweens.add({
          targets: [submit],
          scaleX: 1,
          scaleY: 1,
          duration: 150,
          ease: "Power4.easeOut",
          overwrite: true,
        });
      });

      // createCollapse = () => {};

      const createExpand = (submit) => {
        // create buttons

        isExpanded = false;
        // if collapse, destroy collapse
        if (collapse) {
          if (collapse_icon) {
            collapse_icon.destroy();
          }
          collapse.destroy();
          let expand_elements = [];
          const buttons_data = Object.values(buttons_key);
          for (const button of buttons_data) {
            expand_elements.push(button.filled_box);
            expand_elements.push(button.highlight_box);
          }
          expand_elements.push(mismatch_form);
          expand_elements.push(submit);
          this.tweens.add({
            targets: expand_elements,
            y: "+=920",
            duration: 500,
            ease: "Sine.easeInOut",
          });
          // stop if expand is called
          this.time.delayedCall(
            600,
            () => {
              if (!isExpanded) {
                expand_icon = this.addImage("expand_icon");
                this.tweens.add({
                  targets: expand_icon,
                  y: 560,
                  duration: 1000,
                  ease: "Sine.easeInOut",
                  yoyo: true,
                  repeat: -1,
                });
              }
            },
            [],
            this,
          );
        } else {
          expand_icon = this.addImage("expand_icon");
          this.tweens.add({
            targets: expand_icon,
            y: 560,
            duration: 1000,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
          });
        }

        let expand = this.buttontool.makeButton("expand", () => {
          isExpanded = true;
          let expand_elements = [];
          const buttons_data = Object.values(buttons_key);
          for (const button of buttons_data) {
            expand_elements.push(button.filled_box);
            expand_elements.push(button.highlight_box);
          }
          expand_elements.push(mismatch_form);
          expand_elements.push(submit);
          this.tweens.add({
            targets: expand_elements,
            y: "-=920",
            duration: 500,
            ease: "Sine.easeInOut",
          });

          if (expand_icon) {
            expand_icon.destroy();
          }
          expand.destroy();
          // delete buttons
          // stop if collapse is called
          this.time.delayedCall(
            600,
            () => {
              if (isExpanded) {
                collapse_icon = this.addImage("collapse_icon");
                collapse_icon.setDepth(10);
                collapse_icon.y += 10;
                this.tweens.add({
                  targets: collapse_icon,
                  y: 560,
                  duration: 1000,
                  ease: "Sine.easeInOut",
                  yoyo: true,
                  repeat: -1,
                });
              }
            },
            [],
            this,
          );
          collapse = this.buttontool.makeButton("collapse", () => {
            createExpand();
          });
        });
      };
      createExpand(submit);
    };

    // create report, pass in few values
    // report img
    // correct field answers
    // tutoriaL flag ?

    const createReport = () => {};

    const startTutorial = () => {
      let tutorial_1 = "";
      let tutorial_2 = "";
      let tutorial_3 = "";

      this.texttool.frozenText(
        "Researcher: (Dialogue about happy you are helping)",
        () => {
          let report_1 = this.addImage("report_training");
          let researcher_hands = this.addImage("researcher_hands");
          // report_1.setDepth(0);
          report_1.y -= 1200;
          researcher_hands.y -= 1200;

          this.tweens.add({
            targets: report_1,
            y: 540,
            duration: 1000,
            ease: "Sine.easeInOut",
          });

          let selections = [];
          const buttons_data = Object.values(buttons_key);
          for (const button of buttons_data) {
            selections.push(button.filled_box);
          }

          this.tweens.add({
            targets: selections,
            y: 540,
            duration: 1000,
            ease: "Sine.easeInOut",
          });

          this.tweens.add({
            targets: researcher_hands,
            y: 540,
            duration: 1000,
            ease: "Sine.easeInOut",
            yoyo: true,
            onComplete: () => {
              this.texttool.frozenTexts(
                [
                  "Here is some dialogue about the premise of the game.",
                  "Here is a secondary line.",
                ],
                () => {
                  // add in highlights for parts of the document
                  tutorial_1 = this.addImage("tutorial_1");
                  tutorial_1.y = 520;
                  this.tweens.add({
                    targets: tutorial_1,
                    alpha: { from: 0, to: 1 },
                    y: 540,
                    duration: 500,
                    ease: "Sine.easeInOut",
                  });
                  this.time.delayedCall(
                    100,
                    () => {
                      tutorial_2 = this.addImage("tutorial_2");
                      tutorial_2.y = 520;
                      this.tweens.add({
                        targets: tutorial_2,
                        alpha: { from: 0, to: 1 },
                        y: 540,
                        duration: 500,
                        ease: "Sine.easeInOut",
                      });
                    },
                    [],
                    this,
                  );
                  this.time.delayedCall(
                    200,
                    () => {
                      tutorial_3 = this.addImage("tutorial_3");
                      tutorial_3.y = 520;
                      this.tweens.add({
                        targets: tutorial_3,
                        alpha: { from: 0, to: 1 },
                        y: 540,
                        duration: 500,
                        ease: "Sine.easeInOut",
                        onComplete: () => {
                          this.time.delayedCall(500, () => {
                            this.texttool.frozenText(
                              "Dialogue about the various fields",
                              () => {
                                this.tweens.add({
                                  targets: tutorial_1,
                                  alpha: { from: 1, to: 0 },
                                  y: 560,
                                  duration: 500,
                                  ease: "Sine.easeInOut",
                                  onComplete: () => {
                                    tutorial_1.destroy();
                                  },
                                });
                                this.time.delayedCall(
                                  100,
                                  () => {
                                    this.tweens.add({
                                      targets: tutorial_2,
                                      alpha: { from: 1, to: 0 },
                                      y: 560,
                                      duration: 500,
                                      ease: "Sine.easeInOut",
                                      onComplete: () => {
                                        tutorial_2.destroy();
                                      },
                                    });
                                  },
                                  [],
                                  this,
                                );
                                this.time.delayedCall(
                                  200,
                                  () => {
                                    this.tweens.add({
                                      targets: tutorial_3,
                                      alpha: { from: 1, to: 0 },
                                      y: 560,
                                      duration: 500,
                                      ease: "Sine.easeInOut",
                                      onComplete: () => {
                                        tutorial_3.destroy();
                                        let tutorial_x =
                                          this.addImage("tutorial_x");
                                        tutorial_x.y = 520;
                                        this.tweens.add({
                                          targets: tutorial_x,
                                          alpha: { from: 0, to: 1 },
                                          y: 540,
                                          duration: 500,
                                          ease: "Sine.easeInOut",
                                          onComplete: () => {
                                            this.time.delayedCall(500, () => {
                                              this.texttool.frozenTexts(
                                                [
                                                  "Dialogue about fields that don't match:",
                                                  "Mark these on the mismatch form",
                                                ],
                                                () => {
                                                  // add mismatch form
                                                  // pass in forms
                                                  createMismatch();
                                                },
                                                true,
                                              );
                                            });
                                          },
                                        });
                                      },
                                    });
                                  },
                                  [],
                                  this,
                                );
                              },
                            );
                          });
                        },
                      });
                    },
                    [],
                    this,
                  );
                },
                true,
              );
            },
          });
        },
      );
    };

    startTutorial();

    const triggerGame = () => {
      this.time.delayedCall(
        200,
        () => {
          let report_1 = this.addImage("report_1");
          let researcher_hands = this.addImage("researcher_hands");
          // report_1.setDepth(0);
          report_1.y -= 1200;
          researcher_hands.y -= 1200;

          this.tweens.add({
            targets: report_1,
            y: 540,
            duration: 1000,
            ease: "Sine.easeInOut",
          });
          this.tweens.add({
            targets: researcher_hands,
            y: 540,
            duration: 1000,
            ease: "Sine.easeInOut",
            yoyo: true,
          });

          // this.tweens.add({
          //   targets: researcher_hands,
          //   y: 540,
          //   duration: 1000,
          //   ease: "Sine.easeInOut",
          // });
        },
        [],
        this,
      );

      createExpand();

      let back = this.buttontool.makeButton(
        "credits_to_menu",
        () => this.moveLocation("Research"),
        1,
      );
      back.setDepth(10);
    };
  }
}
