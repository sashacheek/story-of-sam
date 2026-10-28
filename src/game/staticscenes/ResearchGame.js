import { BaseScene } from "../support/BaseScene";

export class ResearchGame extends BaseScene {
  constructor() {
    super("ResearchGame");
    this.showUI = false;
  }

  create() {
    let collapse = "";
    let isExpanded = false;
    let activeReport = "";
    let mismatchElements = {
      mismatchForm: "",
      expandIcon: "",
      collapseIcon: "",
      submitButton: "",
    };

    this.createBase("research_game_background", "");

    let back = this.buttontool.makeButton(
      "credits_to_menu",
      () => this.moveLocation("Research"),
      1,
    );
    back.setDepth(30);

    let reportIndex = 0;

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

    const reports = {
      tutorial: {
        image: "report_training",
        mismatch: true,
        key: [true, false, false, false, false, false, false, false],
      },
      report_1: {
        image: "report_1",
        mismatch: true,
        key: [false, false, false, false, true, false, true, false],
      },
      report_2: {
        image: "report_2",
        mismatch: false,
        key: [false, false, false, false, false, false, false, false],
      },
      report_3: {
        image: "report_3",
        mismatch: true,
        key: [true, false, false, false, false, true, false, false],
      },
      report_4: {
        image: "report_4",
        mismatch: true,
        key: [true, true, true, true, true, true, true, true],
      },
      report_5: {
        image: "report_5",
        mismatch: false,
        key: [false, false, false, false, false, false, false, false],
      },
    };

    const createExpand = () => {
      isExpanded = false;
      // if collapse, destroy collapse
      if (collapse) {
        if (mismatchElements.collapseIcon) {
          mismatchElements.collapseIcon.destroy();
        }
        collapse.destroy();
        let expand_elements = [];
        const buttons_data = Object.values(buttons_key);
        for (const button of buttons_data) {
          expand_elements.push(button.filled_box);
          expand_elements.push(button.highlight_box);
        }
        expand_elements.push(mismatchElements.mismatchForm);
        expand_elements.push(mismatchElements.submitButton);
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
              mismatchElements.expandIcon = this.addImage("expand_icon");
              this.tweens.add({
                targets: mismatchElements.expandIcon,
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
        mismatchElements.expandIcon = this.addImage("expand_icon");
        this.tweens.add({
          targets: mismatchElements.expandIcon,
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
        expand_elements.push(mismatchElements.mismatchForm);
        expand_elements.push(mismatchElements.submitButton);
        this.tweens.add({
          targets: expand_elements,
          y: "-=920",
          duration: 500,
          ease: "Sine.easeInOut",
        });

        if (mismatchElements.expandIcon) {
          mismatchElements.expandIcon.destroy();
        }
        expand.destroy();
        // stop if collapse is called
        this.time.delayedCall(
          600,
          () => {
            if (isExpanded) {
              mismatchElements.collapseIcon = this.addImage("collapse_icon");
              mismatchElements.collapseIcon.setDepth(10);
              mismatchElements.collapseIcon.y += 10;
              this.tweens.add({
                targets: mismatchElements.collapseIcon,
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

    const createMismatch = () => {
      mismatchElements.mismatchForm = this.addImage("mismatch_form");
      mismatchElements.mismatchForm.y += 920;
      mismatchElements.mismatchForm.setDepth(10);

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
      mismatchElements.submitButton = this.buttontool.makeButton(
        "rg_submit",
        () => {
          submitForm();
        },
        1,
        false,
        962,
        977,
      );
      mismatchElements.submitButton.y += 920;
      mismatchElements.submitButton.setDepth(20);

      mismatchElements.submitButton.on("pointerover", () => {
        this.tweens.add({
          targets: [mismatchElements.submitButton],
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 150,
          ease: "Power4.easeOut",
          overwrite: true,
        });
      });

      mismatchElements.submitButton.on("pointerout", () => {
        this.tweens.add({
          targets: [mismatchElements.submitButton],
          scaleX: 1,
          scaleY: 1,
          duration: 150,
          ease: "Power4.easeOut",
          overwrite: true,
        });
      });

      // createCollapse = () => {};

      createExpand();
    };

    const transitionReport = (isValid) => {
      // animate take back report
      // if not isvalid, say that's not right, end minigame if not tutorial or retry if tutorial (?)
      // if isvalid, say it's valid and retrigger minigame with next index, or if at end of index, end minigame
      const mismatchItems = Object.values(mismatchElements);
      for (const item of mismatchItems) {
        item.destroy();
      }

      const buttons_data = Object.values(buttons_key);
      for (const button of buttons_data) {
        button.highlight_box.destroy();
        button.filled_box.destroy();
        button.selected = false;
      }

      let researcher_hands = this.addImage("researcher_hands");
      researcher_hands.y -= 1200;
      this.tweens.add({
        targets: researcher_hands,
        y: 540,
        duration: 1000,
        ease: "Sine.easeInOut",
        onComplete: () => {
          let moveUp = [];
          moveUp.push(researcher_hands);
          moveUp.push(activeReport);
          this.tweens.add({
            targets: moveUp,
            y: "-=1200",
            duration: 1000,
            ease: "Sine.easeInOut",
            onComplete: () => {
              // if isvalid processing
              if (!isValid) {
                if (reportIndex == 0) {
                  this.texttool.frozenTexts(
                    [
                      "Hmm... That doesn't look quite right.",
                      "Maybe take take another look and try again.",
                    ],
                    () => {
                      triggerGame();
                    },
                    true,
                  );
                } else {
                  this.texttool.frozenTexts(
                    [
                      "Hmm... That doesn't look quite right. Thanks for trying, though.",
                      "Talk to me again if you'd like to give it another shot.",
                    ],
                    () => {
                      this.registry.set("frozen", false);
                      this.moveLocation("Research");
                    },
                  );
                }
              } else {
                if (reportIndex == 5) {
                  this.texttool.frozenTexts(
                    [
                      "That looks great!",
                      "Those are all the reports I have right now. You've been a great help.",
                      // "Here, have this energy cell for giving me a hand with this.",
                    ],
                    () => {
                      this.registry.set("frozen", false);
                      this.registry.set("researchGameWon", true);
                      this.moveLocation("Research");
                    },
                    true,
                  );
                } else {
                  this.texttool.frozenTexts(
                    [
                      "That looks great!",
                      "Here, try check this next report for me, would you?",
                    ],
                    () => {
                      reportIndex++;
                      triggerGame();
                    },
                    true,
                  );
                }
              }
            },
          });
        },
      });
    };

    const submitForm = () => {
      const solution_key = Object.values(reports)[reportIndex].key;
      const solution_mismatch = Object.values(reports)[reportIndex].mismatch;
      // get data from submitted form
      // if any are marked, first check if mismatch is true
      // then check if marked items are in solution key
      let isMismatch = false;
      let isValid = true;
      const buttons_data = Object.values(buttons_key);
      for (let i = 0; i < buttons_data.length; i++) {
        if (buttons_data[i].selected) {
          isMismatch = true;
          if (buttons_data[i].selected != solution_key[i]) {
            isValid = false;
          }
        }
      }
      if (solution_mismatch != isMismatch) {
        isValid = false;
      }
      transitionReport(isValid);
      // if isvalid, trigger next
    };

    const triggerGame = () => {
      collapse = "";
      this.time.delayedCall(
        200,
        () => {
          activeReport = this.addImage(
            Object.values(reports)[reportIndex].image,
          );
          let researcher_hands = this.addImage("researcher_hands");
          // report_1.setDepth(0);
          activeReport.y -= 1200;
          researcher_hands.y -= 1200;

          this.tweens.add({
            targets: activeReport,
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
        },
        [],
        this,
      );

      createMismatch();
    };

    const startTutorial = () => {
      this.registry.set("seen_research_game_tutorial");
      let tutorial_1 = "";
      let tutorial_2 = "";
      let tutorial_3 = "";

      this.texttool.frozenText(
        "Researcher: (Dialogue about happy you are helping)",
        () => {
          activeReport = this.addImage("report_training");
          let researcher_hands = this.addImage("researcher_hands");
          // report_1.setDepth(0);
          activeReport.y -= 1200;
          researcher_hands.y -= 1200;

          this.tweens.add({
            targets: activeReport,
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
                                                  tutorial_x.destroy();
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

    // if (this.registry.get("seen_research_game_tutorial")) {
    //    this.texttool.frozenTexts(
    //       [
    //         "I showed you the ropes last time, but would you like me to explain how it works again?",
    //       ],
    //       () =>
    //         this.buttontool.makeButton(
    //           "help_researcher",
    //           () => {
    //             // this.registry.set("frozen", false);
    //             startTutorial();
    //           },
    //           1,
    //           undefined,
    //           undefined,
    //           undefined,
    //           true,
    //         ),
    //     ),
    // }
    startTutorial();
  }
}
