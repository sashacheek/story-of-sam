// UI.js
import { BaseScene } from "./BaseScene";

// import * as ButtonTool from "../tools/ButtonTool";

export class UI extends BaseScene {
  constructor() {
    super({ key: "UI", active: false });
  }

  init(data) {
    super.init(data);
    this.cardSlots = [];
    this.cards = [];
    this.cardSlotSize = 140;
    this.invSlotSize = 90;
    this.items = [];
    this.invSlots = [];
    this.initialCard = data?.initialCard;
    this.memoryCardNum = data?.memoryCardNum;
    this.cellsNum = data?.cellsNum;
  }

  create() {
    this.createBase("");
    this.cameras.main.resetFX();
    this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.setScroll(0, 0);

    this.uiRoot = this.add.container(0, 0);

    this.inventory = this.add.container(10, 175);
    this.uiRoot.add(this.inventory);

    this.accessCards = this.add.container(0, 0);
    this.uiRoot.add(this.accessCards);

    // this.cardSlots = [];
    // this.cards = [];
    // this.cardSlotSize = 140;

    for (let i = 0; i < 5; i++) {
      const slot = this.add
        .rectangle(10 + i * this.cardSlotSize, 45, 130, 130, 0xffffff, 0)
        .setOrigin(0, 0.5);
      this.accessCards.add(slot);
      this.cardSlots.push(slot);
    }

    const bg = this.add.rectangle(0, 0, 450, 90, 0x000000, 0).setOrigin(0);
    this.inventory.add(bg);

    // this.invSlotSize = 90;
    // this.items = [];
    // this.invSlots = [];

    for (let i = 0; i < 5; i++) {
      const slot = this.add
        .rectangle(10 + i * this.invSlotSize, 45, 80, 80, 0xffffff, 0)
        .setOrigin(0, 0.5);
      this.inventory.add(slot);
      this.invSlots.push(slot);
    }

    const showSettings = () => {
      // this.image.add("")
      console.log("yippee");
    };

    const settingsBtn = this.buttontool.makeButton(
      "settings",
      () => showSettings(),
      1,
      false,
      1865,
      55,
    );
    settingsBtn.setDepth(5);
    settingsBtn.setScale(0.7);

    this.uiRoot.add(settingsBtn);

    // memory card

    this.anims.create({
      key: "shine1",
      frames: this.anims.generateFrameNames("ui_card_1_animate"),
      frameRate: 24,
      repeat: 0,
    });

    this.anims.create({
      key: "shine2",
      frames: this.anims.generateFrameNames("ui_card_2_animate"),
      frameRate: 24,
      repeat: 0,
    });

    this.memoryCardCount = 1;
    this.memoryCards = this.add.sprite(15, 90, "ui_1_card");
    this.memoryCards.setOrigin(0, 0);
    this.memoryCards.setScale(0.8);
    this.uiRoot.add(this.memoryCards);

    this.memoryCards.on("animationcomplete-shine1", () => {
      this.memoryCards.setTexture("ui_1_card");
    });

    this.memoryCards.on("animationcomplete-shine2", () => {
      this.memoryCards.setTexture("ui_2_card");
    });

    if (this.memoryCardNum) {
      let image = "ui_" + this.memoryCardNum + "_card";
      this.memoryCardCount = this.memoryCardNum;
      this.memoryCards.setTexture(image);
    }

    // energy cells

    this.cellsCount = 0;

    if (this.cellsNum) {
      this.cellsCount = this.cellsNum;
    }

    this.cellsContainer = this.add.container(140, 102);
    this.uiRoot.add(this.cellsContainer);
    const energyCellBg = this.add.image(0, 0, "ui_energy_cell").setOrigin(0, 0);
    this.cellsContainer.add(energyCellBg);
    energyCellBg.setScale(0.75);

    this.energyText = this.add
      .text(
        energyCellBg.width / 2 - 14,
        energyCellBg.height / 2 - 5,
        this.cellsCount.toString(),
        {
          fontFamily: "Saira Extra Condensed",
          fontSize: "76px",
          color: "#000000",
          padding: { x: 10, y: 5 },
          strokeThickness: 5,
        },
      )
      .setOrigin(0.5, 0.5); // Center the text's own origin point

    this.cellsContainer.add(this.energyText);

    if (this.initialCard) {
      this.addCard(this.initialCard);
    }

    // objectives icon
    this.anims.create({
      key: "objectives_expand",
      frames: this.anims.generateFrameNames("ui_objectives_expand_animate"),
      frameRate: 24,
      repeat: 0,
    });

    // this.objectives = this.add.sprite(1920 / 2, 1080 / 2, "ui_objectives");
    // this.uiRoot.add(this.objectives);

    this.objectivesButton = this.buttontool.makeButton(
      "ui_objectives",
      () => {
        // this.objectives.play("objectives_expand");
        // this.objectivesButton.destroy();
        console.log("display objectives");
      },
      1,
    );
    this.objectivesButton.x = 1920 / 2 + 232;
    this.objectivesButton.y = 1080 / 2 - 145;
    this.objectivesButton.setScale(0.8);
    this.uiRoot.add(this.objectivesButton);

    // this.uiRoot.add(this.objectivesButton);

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

  addMemoryCard = () => {
    this.memoryCardCount++;
    const animation = "shine" + this.memoryCardCount;
    this.memoryCards.play(animation);
  };

  addEnergyCell = () => {
    this.cellsCount++;
    this.energyText.setText(this.cellsCount.toString());
    // 84
    this.tweens.addCounter({
      from: 100,
      to: 76,
      duration: 400,
      ease: "Sine.easeInOut",
      onUpdate: (tween) => {
        const value = Math.floor(tween.getValue());
        this.energyText.setFontSize(value);
      },
    });
  };

  setGameplayVisible(visible) {
    // hide/show gameplay UI elements
    this.uiRoot.setVisible(visible);

    // enable/disable interaction
    this.input.enabled = visible;
  }

  addItem(textureKey, useContainer = true) {
    if (this.items.find((i) => i.texture.key === textureKey)) return;
    if (this.items.length >= this.invSlots.length && useContainer) return;

    let x, y;
    if (useContainer) {
      const slot = this.invSlots[this.items.length];

      // Convert slot position to world space
      const worldPoint = this.inventory
        .getWorldTransformMatrix()
        .transformPoint(slot.x + slot.width / 2, slot.y);

      x = worldPoint.x;
      y = worldPoint.y;
    } else {
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
        (this.invSlots[this.items.length].width - padding) / item.width,
        (this.invSlots[this.items.length].height - padding) / item.height,
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

  addCard(textureKey, useContainer = true) {
    if (this.cards.find((i) => i.texture.key === textureKey)) return;
    if (this.cards.length >= this.cardSlots.length && useContainer) return;

    let x, y;
    if (useContainer) {
      const slot = this.cardSlots[this.cards.length];

      // Convert slot position to world space
      const worldPoint = this.accessCards
        .getWorldTransformMatrix()
        .transformPoint(slot.x + slot.width / 2, slot.y);

      x = worldPoint.x;
      y = worldPoint.y;
    } else {
      x = 50;
      y = 50;
    }

    const item = this.add.image(x, y, textureKey).setOrigin(0.5);

    this.uiRoot.add(item);

    item.setData("startX", item.x);
    item.setData("startY", item.y);

    // Scale animation
    const padding = 4;
    let scale = 1;
    if (useContainer) {
      scale = Math.min(
        (this.cardSlots[this.cards.length].width - padding) / item.width,
        (this.cardSlots[this.cards.length].height - padding) / item.height,
      );
    }

    item.setScale(0);
    this.tweens.add({
      targets: item,
      scale,
      duration: 150,
      ease: "Quad.easeOut",
    });

    this.cards.push(item);

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
