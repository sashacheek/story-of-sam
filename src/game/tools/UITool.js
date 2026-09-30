import * as SceneState from "./SceneState";

function enableUI() {
  SceneState.getScene().input.enabled = true;
  SceneState.getScene().scene.wake("UI");
}

function disableUI() {
  hideTexts();
  SceneState.getScene().input.enabled = false;
  SceneState.getScene().scene.sleep("UI");
}

function hideTexts() {
  SceneState.getScene()
    .children.list.filter((obj) => obj.elem_type === "hoverText")
    .forEach((obj) => obj.setDepth(-1));
}
function unhideTexts() {
  SceneState.getScene()
    .children.list.filter((obj) => obj.elem_type === "hoverText")
    .forEach((obj) => obj.setDepth(1));
}

export { enableUI, disableUI, hideTexts, unhideTexts };
