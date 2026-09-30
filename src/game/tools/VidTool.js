import * as SceneState from "./SceneState";
import * as uitool from "./UITool";
import * as texttool from "./TextTool";

function vidText(video, text) {
  const vid = SceneState.getScene().add.video(
    SceneState.getScene().gameCenterX,
    SceneState.getScene().gameCenterY,
    video,
  );
  if (SceneState.getScene().registry.get("noMusic") === false) {
    const music = SceneState.getScene().sound.get("bgm");
    music.setVolume(0.1);
  }

  vid.play();
  vid.once("play", () => {
    uitool.disableUI();
  });
  vid.once("complete", () => {
    vid.destroy();
    uitool.unhideTexts();
    uitool.enableUI();
    if (SceneState.getScene().registry.get("noMusic") === false) {
      music.setVolume(0.2);
    }
    texttool.frozenText(text);
  });
}

function vidSequence(vids, texts, onComplete = null) {
  let currentIndex = 0;
  let previousVid = null;

  if (SceneState.getScene().registry.get("noMusic") === false) {
    const music = SceneState.getScene().sound.get("bgm");
    if (music) music.setVolume(0.1);
  }

  if (SceneState.getScene().scene.isActive("UI")) {
    SceneState.getScene().scene.setVisible(false, "UI");
    SceneState.getScene().scene.sendToBack("UI");
  }

  const playNextStep = () => {
    if (currentIndex >= vids.length) {
      if (previousVid) {
        previousVid.destroy();
        previousVid = null;
      }
      if (SceneState.getScene().registry.get("noMusic") === false) {
        const music = SceneState.getScene().sound.get("bgm");
        if (music) music.setVolume(0.2);
      }

      // if (!SceneState.getScene().scene.isActive("UI")) {
      SceneState.getScene().scene.setVisible(true, "UI");
      SceneState.getScene().scene.bringToTop("UI");
      const ui = SceneState.getScene().scene.get("UI");
      ui.setGameplayVisible(SceneState.getScene().showUI);
      // }

      // Add these 3 lines:
      if (typeof onComplete === "function") {
        onComplete();
      }

      return;
    }

    const currentVidKey = vids[currentIndex];
    const vid = SceneState.getScene().add.video(
      SceneState.getScene().gameCenterX,
      SceneState.getScene().gameCenterY,
      currentVidKey,
    );

    vid.play();

    vid.once("play", () => {
      uitool.disableUI();
      if (previousVid) {
        previousVid.destroy();
      }
      previousVid = vid;
    });

    vid.once("complete", () => {
      uitool.unhideTexts();
      uitool.enableUI();

      if (currentIndex < texts.length) {
        const currentTextData = texts[currentIndex];

        if (Array.isArray(currentTextData)) {
          // Pass true as the 3rd argument to wait for complete text erasure before moving on
          texttool.frozenTexts(
            currentTextData,
            () => {
              currentIndex++;
              SceneState.getScene().time.delayedCall(200, () => {
                playNextStep();
              });
              return null;
            },
            true,
          );
        } else {
          texttool.frozenText(currentTextData, () => {
            currentIndex++;
            SceneState.getScene().time.delayedCall(200, () => {
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

export { vidText, vidSequence };
