function enableUI(scene) {
  scene.input.enabled = true;
  scene.scene.wake("UI");
}

function disableUI(scene) {
  hideTexts(scene);
  scene.input.enabled = false;
  scene.scene.sleep("UI");
}

function hideTexts(scene) {
  scene.children.list
    .filter((obj) => obj.elem_type === "hoverText")
    .forEach((obj) => obj.setDepth(-1));
}
function unhideTexts(scene) {
  scene.children.list
    .filter((obj) => obj.elem_type === "hoverText")
    .forEach((obj) => obj.setDepth(1));
}

export { enableUI, disableUI, hideTexts, unhideTexts };
