import { Scene } from "phaser";
import { animateText } from "../tools/Typewriter";

export class BaseScene extends Scene {
  constructor(sceneKey) {
    super(sceneKey);
  }

  init(data) {
    this.transition = data?.transition ?? true;
    if (data?.showUI !== undefined) {
      this.showUI = data.showUI;
    }
  }

  createBase(background, title = "") {
    if (this.scene.key !== "UI") {
      if (!this.scene.isActive("UI")) {
        this.scene.launch("UI");
      }

      const ui = this.scene.get("UI");
      ui.setGameplayVisible(this.showUI);
      this.scene.bringToTop("UI");

      if (this.transition) {
        ui.fadeIn();
      }
    }

    this.gameCenterX = this.scale.width / 2;
    this.gameCenterY = this.scale.height / 2;

    if (background) {
      this.add.image(this.gameCenterX, this.gameCenterY, background);
    }

    this.add.text(1500, 10, title, {
      fontFamily: "Walter Turncoat",
      fontSize: 48,
      color: "black",
      padding: { x: 10, y: 5 },
      strokeThickness: 10,
      align: "right",
    });
  }

  disableUI() {
    this.hideTexts();
    this.input.enabled = false;
    this.scene.sleep("UI");
  }

  enableUI() {
    this.input.enabled = true;
    this.scene.wake("UI");
  }

  makeButton(
    img,
    action,
    alpha = 0.001,
    flag = false,
    x = this.gameCenterX,
    y = this.gameCenterY,
    force = false,
  ) {
    const button = this.add.image(x, y, img);
    button.setAlpha(alpha);
    button.setInteractive({ pixelPerfect: true });
    button.on("pointerdown", () => {
      if (this.registry.get("frozen") != true || force == true) {
        action();
      }
    });

    if (flag) {
      this.registry.set(flag, true);
    }
    return button;
  }

  addImage(img, alpha = 1) {
    const image = this.add.image(this.gameCenterX, this.gameCenterY, img);
    image.setAlpha(alpha);
    return image;
  }

  vidText(video, text) {
    const vid = this.add.video(this.gameCenterX, this.gameCenterY, video);
    if (this.registry.get("noMusic") === false) {
      const music = this.sound.get("bgm");
      music.setVolume(0.1);
    }

    vid.play();
    vid.once("play", () => {
      this.disableUI();
    });
    vid.once("complete", () => {
      vid.destroy();
      this.unhideTexts();
      this.enableUI();
      if (this.registry.get("noMusic") === false) {
        music.setVolume(0.2);
      }
      this.frozenText(text);
    });
  }

  // vidSequence(vids, texts) {
  //   let activeVideo = null;
  //   if (this.registry.get("noMusic") === false) {
  //     const music = this.sound.get("bgm");
  //     music.setVolume(0.1);
  //   }
  //   for (let vidNum = 0; vidNum < vids.length; vidNum++) {
  //     // console.log(vids.length);
  //     const vid = this.add.video(
  //       this.gameCenterX,
  //       this.gameCenterY,
  //       vids[vidNum],
  //     );

  //     vid.play();
  //     if (activeVideo) {
  //       activeVideo.destroy();
  //     }
  //     activeVideo = vid;
  //     vid.once("play", () => {
  //       // if (activeVideo) {
  //       //   activeVideo.destroy();
  //       // }
  //       // activeVideo = vid;
  //       this.disableUI();
  //     });
  //     vid.once("complete", () => {
  //       // vid.destroy();
  //       this.unhideTexts();
  //       this.enableUI();
  //       console.log("progress");
  //       if (vidNum <= texts.length - 1) {
  //         this.frozenText(texts[vidNum]);
  //       }
  //     });
  //   }
  //   if (this.registry.get("noMusic") === false) {
  //     music.setVolume(0.2);
  //   }
  //   // input series of videos and texts
  //   // provide support for multi line texts, eventually

  //   // for videos in vid length
  //   // show video
  //   // frozen text
  //   // on click/frozen text skipped, destroy previous vid and proceed ato next video
  //   // rinse and repeat
  // }

  vidSequence(vids, texts) {
    let currentIndex = 0;
    let previousVid = null;

    if (this.registry.get("noMusic") === false) {
      const music = this.sound.get("bgm");
      if (music) music.setVolume(0.1);
    }

    if (this.scene.isActive("UI")) {
      this.scene.setVisible(false, "UI");
      this.scene.sendToBack("UI");
    }

    const playNextStep = () => {
      if (currentIndex >= vids.length) {
        if (previousVid) {
          previousVid.destroy();
          previousVid = null;
        }
        if (this.registry.get("noMusic") === false) {
          const music = this.sound.get("bgm");
          if (music) music.setVolume(0.2);
        }

        if (this.scene.isActive("UI")) {
          this.scene.setVisible(true, "UI");
          this.scene.bringToTop("UI");
          const ui = this.scene.get("UI");
          ui.setGameplayVisible(this.showUI);
        }
        return;
      }

      const currentVidKey = vids[currentIndex];
      const vid = this.add.video(
        this.gameCenterX,
        this.gameCenterY,
        currentVidKey,
      );

      vid.play();

      vid.once("play", () => {
        this.disableUI();
        if (previousVid) {
          previousVid.destroy();
        }
        previousVid = vid;
      });

      vid.once("complete", () => {
        this.unhideTexts();
        this.enableUI();

        if (currentIndex < texts.length) {
          const currentTextData = texts[currentIndex];

          if (Array.isArray(currentTextData)) {
            // Pass true as the 3rd argument to wait for complete text erasure before moving on
            this.frozenTexts(
              currentTextData,
              () => {
                currentIndex++;
                this.time.delayedCall(200, () => {
                  playNextStep();
                });
                return null;
              },
              true,
            );
          } else {
            this.frozenText(currentTextData, () => {
              currentIndex++;
              this.time.delayedCall(200, () => {
                playNextStep();
              });
            });
          }
        } else {
          currentIndex++;
          playNextStep();
        }
      });
    };

    playNextStep();
  }

  // 3. A variant of frozenText that shows ONLY your text and background bar,
  // without messing with global UI depth logic, allowing direct background clicking

  makeHover(area, text, x, y) {
    const name = this.add.text(x, y, text, {
      fontFamily: "Walter Turncoat",
      fontSize: 48,
      color: "black",
      padding: { x: 10, y: 5 },
      strokeThickness: 10,
      align: "center",
    });
    name.elem_type = "hoverText";
    name.setAlpha(0);
    area.on("pointerover", () => {
      name.setAlpha(1);
    });
    area.on("pointerout", () => {
      this.tweens.killTweensOf(name);
      this.tweens.add({
        targets: name,
        alpha: 0,
        duration: 150,
        ease: "Quad.easeOut",
      });
    });
  }

  collectItem = (item = "", inv_item, flag, text = "") => {
    if (item != "") {
      item.destroy();
    }
    const ui = this.scene.get("UI");
    ui.addItem(inv_item);
    this.registry.set(flag, true);
    if (text != "") {
      this.frozenText(text);
    }
  };

  canDrop(dropped_on_item, action) {
    dropped_on_item.setInteractive({ dropZone: true }); // enable drop detection
    dropped_on_item._onDropAction = action;
  }

  frozenText(text, onClose) {
    this.hideTexts();
    this.registry.set("frozen", true);

    // If the UI is active and wasn't manually hidden by the cutscene system, put it to sleep
    // const isUIActiveAndVisible =
    //   this.scene.isActive("UI") && this.scene.isVisible("UI");
    // if (isUIActiveAndVisible) {
    //   this.scene.sleep("UI");
    // }

    const text_bg = this.add
      .image(960, 920, "text_bar_trimmed")
      .setScale(0.9)
      .setDepth(100);
    const textObj = this.add
      .text(130, 850, text, {
        fontFamily: "Walter Turncoat",
        fontSize: 48,
        color: "black",
      })
      .setDepth(101);

    this.tweens.add({
      targets: text_bg,
      scale: 1,
      ease: "Power2",
      duration: 100,
    });

    let finished = false;
    animateText(textObj).then(() => {
      finished = true;
    });

    const clickHandler = () => {
      if (!finished) {
        textObj.skipText();
      } else {
        this.input.off("pointerdown", clickHandler);

        this.tweens.add({
          targets: textObj,
          scale: 0.9,
          x: 220, // Your original slide-left animation
          duration: 100,
          ease: "Power2",
          onComplete: function () {
            textObj.destroy();
          },
        });

        if (text_bg) {
          this.tweens.add({
            targets: text_bg,
            scale: 0.9,
            duration: 100,
            ease: "Power2",
            onComplete: () => {
              text_bg.destroy();
              this.registry.set("frozen", false);
              this.unhideTexts();

              // Only wake the UI scene if it was actually visible/active before this text popped up
              // if (isUIActiveAndVisible) {
              //   this.scene.wake("UI");
              // }

              if (onClose) onClose();
            },
          });
        }
      }
    };

    this.input.on("pointerdown", clickHandler);
  }

  frozenTexts(texts, action = null, executeAtEnd = false) {
    let btn = null;
    let index = 0;
    let text_bg = null;

    const showNext = () => {
      // 1. Puzzle Choice Behavior: Spawn the choice button *during* the final line of text
      if (index == texts.length - 1) {
        if (action && !executeAtEnd) {
          btn = action();
          if (btn && typeof btn.setScale === "function") {
            btn.setScale(0.9);
            this.tweens.add({
              targets: btn,
              scale: 1,
              duration: 100,
            });
          }
        }
      }

      if (index >= texts.length) {
        // CLEANUP: Clicking anywhere else increments index here to close everything out
        this.registry.set("frozen", false);
        this.unhideTexts();

        if (text_bg) {
          this.tweens.add({
            targets: text_bg,
            scale: 0.9,
            duration: 100,
            onComplete: () => {
              text_bg.destroy();

              // 2. Video Sequence Behavior: Only trigger progression after the layout completely closes
              if (action && executeAtEnd) {
                action();
              }
            },
          });
        }

        // Cleanly dismiss and fade out the puzzle button if the user chose to click away instead
        if (btn && typeof btn.destroy === "function") {
          this.tweens.add({
            targets: btn,
            scale: 0.9,
            duration: 100,
            onComplete: () => btn.destroy(),
          });
        }
        return;
      }

      this.registry.set("frozen", true);
      this.hideTexts();

      if (!text_bg) {
        text_bg = this.add.image(960, 920, "text_bar_trimmed");
        text_bg.setScale(0.9).setDepth(100);
        this.tweens.add({ targets: text_bg, scale: 1, duration: 100 });
      }

      const textObj = this.add
        .text(130, 850, texts[index], {
          fontFamily: "Walter Turncoat",
          fontSize: 48,
          color: "black",
        })
        .setDepth(101);

      let finished = false;
      animateText(textObj).then(() => {
        finished = true;
      });

      const clickHandler = () => {
        if (!finished) {
          textObj.skipText();
          if (index != 0) {
            finished = true;
          }
        } else {
          this.input.off("pointerdown", clickHandler);

          this.tweens.add({
            targets: textObj,
            alpha: 0,
            duration: 100,
            onComplete: () => {
              textObj.destroy();
              index++;
              showNext();
            },
          });
        }
      };

      this.input.on("pointerdown", clickHandler);
    };

    showNext();
  }

  moveLocation(location) {
    const ui = this.scene.get("UI");
    ui.fadeOut(150);

    ui.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(location, { transition: true });
      ui.fadeIn(150);
    });
  }

  hideTexts() {
    this.children.list
      .filter((obj) => obj.elem_type === "hoverText")
      .forEach((obj) => obj.setDepth(-1));
  }
  unhideTexts() {
    this.children.list
      .filter((obj) => obj.elem_type === "hoverText")
      .forEach((obj) => obj.setDepth(1));
  }
}
