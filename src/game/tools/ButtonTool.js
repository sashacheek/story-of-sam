import * as SceneState from "./SceneState";

function makeButton(
  img,
  action,
  alpha = 0.001,
  flag = false,
  x = SceneState.getScene().gameCenterX,
  y = SceneState.getScene().gameCenterY,
  force = false,
) {
  const button = SceneState.getScene().add.image(x, y, img);
  button.setAlpha(alpha);
  button.setInteractive({ pixelPerfect: true });
  button.on("pointerdown", () => {
    if (SceneState.getScene().registry.get("frozen") != true || force == true) {
      action();
    }
  });

  if (flag) {
    SceneState.getScene().registry.set(flag, true);
  }
  return button;
}

function makeHover(area, text, x, y) {
  const name = SceneState.getScene().add.text(x, y, text, {
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
    SceneState.getScene().tweens.killTweensOf(name);
    SceneState.getScene().tweens.add({
      targets: name,
      alpha: 0,
      duration: 150,
      ease: "Quad.easeOut",
    });
  });
}

function collectItem(item = "", inv_item, flag, text = "") {
  if (item != "") {
    item.destroy();
  }
  const ui = SceneState.getScene().scene.get("UI");
  ui.addItem(inv_item);
  SceneState.getScene().registry.set(flag, true);
  if (text != "") {
    SceneState.getScene().frozenText(text);
  }
}

function canDrop(dropped_on_item, action) {
  dropped_on_item.setInteractive({ dropZone: true }); // enable drop detection
  dropped_on_item._onDropAction = action;
}

export { makeButton, makeHover, collectItem, canDrop };
