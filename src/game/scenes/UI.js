// UI.js
import { BaseScene } from "../tools/BaseScene";

export class UI extends BaseScene {
  constructor() {
    super({ key: "UI", active: false });
  }

  create() {
    this.createBase("");
    this.cameras.main.resetFX();
    this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.setScroll(0, 0);

    this.uiRoot = this.add.container(0, 0);

    this.inventory = this.add.container(150, 25);
    this.uiRoot.add(this.inventory);

    const bg = this.add.rectangle(0, 0, 450, 90, 0x000000, 0).setOrigin(0);
    this.inventory.add(bg);

    this.slotSize = 90;
    this.items = [];
    this.slots = [];

    for (let i = 0; i < 5; i++) {
      const slot = this.add
        .rectangle(10 + i * this.slotSize, 45, 80, 80, 0xffffff, 0)
        .setOrigin(0, 0.5);
      this.inventory.add(slot);
      this.slots.push(slot);
    }

    const showSettings = () => {
      // this.image.add("")
      console.log("yippee");
    };

    const settingsBtn = this.makeButton("settings", () => showSettings(), 1);
    settingsBtn.setDepth(5);

    this.uiRoot.add(settingsBtn);

    // DRAGGING
    this.input.on("dragstart", (pointer, item) => {
      item.setDepth(1000);
    });

    this.input.on("drag", (pointer, item, dragX, dragY) => {
      item.x = dragX;
      item.y = dragY;
    });

    // UI.js - inside dragend
    this.input.on("dragend", (pointer, item, dropped) => {
      const activeScenes = this.scene.manager.getScenes(true);

      activeScenes.forEach((scene) => {
        scene.children.list.forEach((obj) => {
          if (obj._onDropAction) {
            const itemBounds = item.getBounds();
            const objBounds = obj.getBounds();

            // console.log('Dragged item bounds:', itemBounds);
            // console.log('Target bounds:', objBounds);

            if (
              Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, objBounds)
            ) {
              // console.log('INTERSECT with', obj.texture?.key || obj.name);
              obj._onDropAction(item, obj);
            }
          }
        });
      });

      if (!dropped) {
        item.x = item.getData("startX");
        item.y = item.getData("startY");
      }
    });

    this.input.on("drop", (pointer, item, dropZone) => {
      if (dropZone && dropZone._onDropAction) {
        dropZone._onDropAction(item, dropZone);
      }
    });
  }

  setGameplayVisible(visible) {
    // hide/show gameplay UI elements
    this.uiRoot.setVisible(visible);

    // enable/disable interaction
    this.input.enabled = visible;
  }

  addItem(textureKey, useContainer = true) {
    if (this.items.find((i) => i.texture.key === textureKey)) return;
    if (this.items.length >= this.slots.length && useContainer) return;

    let x, y;
    if (useContainer) {
      const slot = this.slots[this.items.length];

      // Convert slot position to world space
      const worldPoint = this.inventory
        .getWorldTransformMatrix()
        .transformPoint(slot.x + slot.width / 2, slot.y);

      x = worldPoint.x;
      y = worldPoint.y;
    } else {
      // For world items like ruler, start somewhere in scene (or top-left)
      x = 50;
      y = 50;
    }

    const item = this.add
      .image(x, y, textureKey)
      .setOrigin(0.5)
      .setInteractive({ draggable: true });

    this.uiRoot.add(item);

    this.input.setDraggable(item);

    item.setData("startX", item.x);
    item.setData("startY", item.y);

    // Scale animation
    const padding = 4;
    let scale = 1;
    if (useContainer) {
      scale = Math.min(
        (this.slots[this.items.length].width - padding) / item.width,
        (this.slots[this.items.length].height - padding) / item.height,
      );
    }

    item.setScale(0);
    this.tweens.add({
      targets: item,
      scale,
      duration: 150,
      ease: "Quad.easeOut",
    });

    this.items.push(item);

    return item;
  }

  fadeOut(duration = 150) {
    const cam = this.cameras.main;
    cam.resetFX();
    cam.setAlpha(1);
    cam.fadeOut(duration, 0, 0, 0);
  }

  fadeIn(duration = 150) {
    const cam = this.cameras.main;
    cam.resetFX();
    cam.setAlpha(1);
    cam.fadeIn(duration, 0, 0, 0);
  }
}
