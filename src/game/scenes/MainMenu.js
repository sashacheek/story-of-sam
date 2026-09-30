import { BaseScene } from "../tools/BaseScene";

export class MainMenu extends BaseScene {
  constructor() {
    super("MainMenu");
    this.showUI = false;
  }

  spawnPolygonCircle(startEdge, endEdge, mask, initialProgress = 0) {
    // 1. Pick a single random position percentage for the parallel paths
    const positionPercent = Phaser.Math.FloatBetween(0, 1);
    const startPoint = startEdge.getPoint(positionPercent);
    const endPoint = endEdge.getPoint(positionPercent);

    // 2. Determine the actual spawn point based on initialProgress
    // If initialProgress is 0.5, it spawns exactly halfway between start and end
    const pathLine = new Phaser.Geom.Line(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y,
    );
    const spawnPoint = pathLine.getPoint(initialProgress);

    // Randomize the circle's size
    const radius = Phaser.Math.Between(1, 4);

    // Create the circle at the calculated spawn point
    const circle = this.add.circle(
      spawnPoint.x,
      spawnPoint.y,
      radius,
      0xffffff,
    );
    circle.setDepth(-1);
    circle.setAlpha(1);
    circle.setMask(mask);

    // 3. Calculate speed and duration based on the REMAINING distance
    const distanceRemaining = Phaser.Math.Distance.BetweenPoints(
      spawnPoint,
      endPoint,
    );
    const speed = Phaser.Math.Between(15, 25); // pixels per second
    const duration = (distanceRemaining / speed) * 1000;

    // Animate the circle across the rest of the polygon
    this.tweens.add({
      targets: circle,
      x: endPoint.x,
      y: endPoint.y,
      duration: duration,
      ease: "Linear",
      onComplete: () => {
        circle.destroy();
      },
    });
  }

  makeMenuButton(x, y, text, action) {
    const buttonRect = this.add.rectangle(x, y, 540, 190, 0xffffff);
    buttonRect.setStrokeStyle(4, 0x000000);
    buttonRect.setInteractive();

    // text
    const buttonText = this.add
      .text(x, y - 12, text, {
        fontFamily: "Walter Turncoat",
        fontSize: 96,
        color: "black",
        padding: { x: 10, y: 5 },
        strokeThickness: 10,
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    buttonRect.on("pointerover", () => {
      this.tweens.add({
        targets: [buttonRect, buttonText],
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 150,
        ease: "Power4.easeOut",
        overwrite: true,
      });
    });

    buttonRect.on("pointerout", () => {
      this.tweens.add({
        targets: [buttonRect, buttonText],
        scaleX: 1,
        scaleY: 1,
        duration: 150,
        ease: "Power4.easeOut",
        overwrite: true,
      });
    });

    buttonRect.on("pointerdown", () => {
      action();
    });

    // text
    // text
    // const buttonText = this.add
    //   .text(x, y - 12, text, {
    //     fontFamily: "Walter Turncoat",
    //     fontSize: 96,
    //     color: "black",
    //     padding: { x: 10, y: 5 },
    //     strokeThickness: 10,
    //     align: "center",
    //   })
    //   .setOrigin(0.5, 0.5);
  }

  create() {
    this.createBase("menu", "");
    this.cameras.main.setBackgroundColor("#000000");

    // Define the polygon's points (e.g., a trapezoid shape)
    const points1 = [
      { x: 0, y: 170 }, // Top-Left
      { x: 175, y: 90 }, // Top-Right
      { x: 175, y: 600 }, // Bottom-Right
      { x: 0, y: 730 }, // Bottom-Left
    ];

    const points2 = [
      { x: 1920, y: 170 }, // Top-Left
      { x: 1755, y: 90 }, // Top-Right
      { x: 1755, y: 600 }, // Bottom-Right
      { x: 1920, y: 730 }, // Bottom-Left
    ];

    // Draw the polygon and create a Mask from it
    const polyGraphics = this.add.graphics();
    // polyGraphics.fillStyle(0x222222, 1);
    // polyGraphics.lineStyle(2, 0x00ff00, 1);
    polyGraphics.fillPoints(points1, true, true);
    polyGraphics.strokePoints(points1, true, true);

    const polyGraphics2 = this.add.graphics();
    // polyGraphics2.fillStyle(0x222222, 1);
    // polyGraphics2.lineStyle(2, 0x00ff00, 1);
    polyGraphics2.fillPoints(points2, true, true);
    polyGraphics2.strokePoints(points2, true, true);

    // polyGraphics.setDepth(-1);
    // polyGraphics2.setDepth(-1);

    // The mask ensures circles are only visible within these bounds
    const polyMask = new Phaser.Display.Masks.GeometryMask(this, polyGraphics);
    const polyMask2 = new Phaser.Display.Masks.GeometryMask(
      this,
      polyGraphics2,
    );

    // Define the Start and End edges using Phaser.Geom.Line
    const startEdge = new Phaser.Geom.Line(
      points1[0].x,
      points1[0].y,
      points1[3].x,
      points1[3].y,
    );
    const endEdge = new Phaser.Geom.Line(
      points1[1].x,
      points1[1].y,
      points1[2].x,
      points1[2].y,
    );

    const startEdge2 = new Phaser.Geom.Line(
      points2[0].x,
      points2[0].y,
      points2[3].x,
      points2[3].y,
    );
    const endEdge2 = new Phaser.Geom.Line(
      points2[1].x,
      points2[1].y,
      points2[2].x,
      points2[2].y,
    );

    for (let i = 0; i < 45; i++) {
      const randomProgress = Phaser.Math.FloatBetween(0.1, 0.9); // Spawn between 10% and 90% of the way across
      this.spawnPolygonCircle(startEdge, endEdge, polyMask, randomProgress);
      this.spawnPolygonCircle(startEdge2, endEdge2, polyMask2, randomProgress);
    }

    this.time.addEvent({
      delay: 220,
      loop: true,
      callback: () => {
        // Calls the custom method below
        this.spawnPolygonCircle(startEdge, endEdge, polyMask);
        this.spawnPolygonCircle(startEdge2, endEdge2, polyMask2);
      },
    });

    this.makeMenuButton(1080, 695, "Play", () => this.moveLocation("Game"));
    this.makeMenuButton(1080, 920, "Credits", () =>
      this.moveLocation("Credits"),
    );

    // this.buttontool.makeButton("play", () => {
    //   this.moveLocation("Game");
    // });
    // this.buttontool.makeButton("menu_to_credits", () => this.moveLocation("Credits"));
  }
}
