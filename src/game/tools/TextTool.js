import * as SceneState from "./SceneState";
import * as uitool from "./UITool";

function animateText(target, speedInMs = 24, delayMs = 100) {
  let message = target.text;

  const invisibleMessage = message.replace(/[^ ]/g, " "); // keeps spaces
  target.text = "";

  let visibleText = "";
  const scene = target.scene;
  if (!scene) {
    console.warn("animateText: target has no scene");
    target.text = message;
    return Promise.resolve();
  }

  let finished = false;
  let started = false;
  let timer = null;

  return new Promise((resolve) => {
    // delayed start for fade-in or timing
    const delayedStart = scene.time.delayedCall(delayMs, () => {
      started = true;

      timer = scene.time.addEvent({
        delay: speedInMs,
        loop: true,
        callback: () => {
          if (!target || !target.scene) {
            timer.destroy();
            finished = true;
            return resolve();
          }
          // show background img
          visibleText += message[visibleText.length];
          target.text =
            visibleText + invisibleMessage.substring(visibleText.length);

          if (visibleText.length >= message.length) {
            timer.destroy();
            finished = true;
            resolve();
          }
        },
      });
    });

    // attach skipText immediately
    target.skipText = () => {
      if (finished || !started) return; // ignore clicks before timer starts
      if (timer) timer.destroy();
      target.text = message;
      finished = true;
      resolve();
    };
  });
}

function showContinue() {
  let text = "Click Anywhere To Continue";
  SceneState.getScene().continueText = SceneState.getScene().add.text(
    650,
    745,
    text,
    {
      fontFamily: "Walter Turncoat",
      fontSize: 48,
      color: "black",
      padding: { x: 10, y: 5 },
      strokeThickness: 10,
      align: "right",
    },
  );

  SceneState.getScene().tweens.add({
    targets: SceneState.getScene().continueText,
    alpha: { from: 0, to: 1 },
    ease: "Sine.InOut",
    duration: 900,
    repeat: -1,
    yoyo: true,
  });
}

function removeContinue() {
  if (SceneState.getScene().continueText) {
    SceneState.getScene().continueText.destroy();
  }
  if (SceneState.getScene().continueTimer) {
    SceneState.getScene().continueTimer.destroy();
  }
}

function createTimer() {
  SceneState.getScene().continueTimer = SceneState.getScene().time.delayedCall(
    5000,
    showContinue,
    [],
    SceneState.getScene(),
  );
}

function frozenText(text, onClose) {
  uitool.hideTexts();
  SceneState.getScene().registry.set("frozen", true);

  const text_bg = SceneState.getScene()
    .add.image(960, 920, "text_bar_trimmed")
    .setScale(0.9)
    .setDepth(100);

  const textObj = SceneState.getScene()
    .add.text(130, 850, text, {
      fontFamily: "Walter Turncoat",
      fontSize: 48,
      color: "black",
    })
    .setDepth(101);

  SceneState.getScene().tweens.add({
    targets: text_bg,
    scale: 1,
    ease: "Power2",
    duration: 100,
  });

  let finished = false;
  animateText(textObj).then(() => {
    finished = true;
    createTimer();
  });

  const clickHandler = () => {
    if (!finished) {
      textObj.skipText();
    } else {
      removeContinue();
      SceneState.getScene().input.off("pointerdown", clickHandler);

      SceneState.getScene().tweens.add({
        targets: textObj,
        scale: 0.9,
        x: 220,
        duration: 100,
        ease: "Power2",
        onComplete: function () {
          textObj.destroy();
        },
      });

      if (text_bg) {
        SceneState.getScene().tweens.add({
          targets: text_bg,
          scale: 0.9,
          duration: 100,
          ease: "Power2",
          onComplete: () => {
            text_bg.destroy();
            SceneState.getScene().registry.set("frozen", false);
            uitool.unhideTexts();

            if (onClose) onClose();
          },
        });
      }
    }
  };

  SceneState.getScene().input.on("pointerdown", clickHandler);
}

function frozenTexts(texts, action = null, executeAtEnd = false) {
  let btn = null;
  let index = 0;
  let text_bg = null;

  const showNext = () => {
    removeContinue();
    if (index == texts.length - 1) {
      if (action && !executeAtEnd) {
        btn = action();
        if (btn && typeof btn.setScale === "function") {
          btn.setScale(0.9);
          SceneState.getScene().tweens.add({
            targets: btn,
            scale: 1,
            duration: 100,
          });
        }
      }
    }

    if (index >= texts.length) {
      SceneState.getScene().registry.set("frozen", false);
      uitool.unhideTexts();

      if (text_bg) {
        SceneState.getScene().tweens.add({
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
        SceneState.getScene().tweens.add({
          targets: btn,
          scale: 0.9,
          duration: 100,
          onComplete: () => btn.destroy(),
        });
      }
      return;
    }

    SceneState.getScene().registry.set("frozen", true);
    uitool.hideTexts();

    if (!text_bg) {
      text_bg = SceneState.getScene().add.image(960, 920, "text_bar_trimmed");
      text_bg.setScale(0.9).setDepth(100);
      SceneState.getScene().tweens.add({
        targets: text_bg,
        scale: 1,
        duration: 100,
      });
    }

    const textObj = SceneState.getScene()
      .add.text(130, 850, texts[index], {
        fontFamily: "Walter Turncoat",
        fontSize: 48,
        color: "black",
      })
      .setDepth(101);

    let finished = false;
    animateText(textObj).then(() => {
      finished = true;
      createTimer();
    });

    const clickHandler = () => {
      if (!finished) {
        textObj.skipText();
        if (index != 0) {
          finished = true;
        }
      } else {
        SceneState.getScene().input.off("pointerdown", clickHandler);

        SceneState.getScene().tweens.add({
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

    SceneState.getScene().input.on("pointerdown", clickHandler);
  };

  showNext();
}

export { frozenText, frozenTexts };
