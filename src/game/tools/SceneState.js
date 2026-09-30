let activeScene = null;

function setScene(scene) {
  activeScene = scene;
}

function getScene() {
  return activeScene;
}

export { setScene, getScene };
