// UI.js
import { Scene } from 'phaser';

export class UI extends Scene {
    constructor() {
        super({ key: 'UI', active: true });
    }

    create() {
        this.uiRoot = this.add.container(0, 0);

        this.inventory = this.add.container(20, 20);
        this.uiRoot.add(this.inventory);

        const bg = this.add.rectangle(0, 0, 450, 90, 0x000000, 0).setOrigin(0);
        this.inventory.add(bg);

        this.slotSize = 90;
        this.items = [];
        this.slots = [];

        for (let i = 0; i < 5; i++) {
            const slot = this.add.rectangle(10 + i * this.slotSize, 45, 80, 80, 0xffffff, 0)
                .setOrigin(0, 0.5);
            this.inventory.add(slot);
            this.slots.push(slot);
        }

        // -------------------------
        // DRAGGING
        // -------------------------
this.input.on('dragstart', (pointer, item) => {
    item.setDepth(1000);
});


this.input.on('drag', (pointer, item, dragX, dragY) => {
    item.x = dragX;
    item.y = dragY;
});






// UI.js - inside dragend
this.input.on('dragend', (pointer, item, dropped) => {
    const activeScenes = this.scene.manager.getScenes(true);

    activeScenes.forEach(scene => {
        scene.children.list.forEach(obj => {
            if (obj._onDropAction) {
                const itemBounds = item.getBounds();
                const objBounds = obj.getBounds();

                // console.log('Dragged item bounds:', itemBounds);
                // console.log('Target bounds:', objBounds);

                if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, objBounds)) {
                    // console.log('INTERSECT with', obj.texture?.key || obj.name);
                    obj._onDropAction(item, obj);
                }
            }
        });
    });

        if (!dropped) {
        item.x = item.getData('startX');
        item.y = item.getData('startY');
    }

});



        // -------------------------
        // UNIVERSAL DROP HANDLER
        // -------------------------
        // this.input.on('drop', (pointer, draggedItem, dropZone) => {
        //     // 1️⃣ Drop on UI dropZone (optional, if you ever add one)
        //     if (dropZone && dropZone._onDropAction) {
        //         dropZone._onDropAction(draggedItem, dropZone);
        //         return;
        //     }

        //     // 2️⃣ Drop on world scene objects with _onDropAction
        //     const activeScenes = this.scene.manager.getScenes(true); // only active
        //     activeScenes.forEach(scene => {
        //         scene.children.list.forEach(obj => {
        //             if (obj._onDropAction) {
        //                 const objBounds = obj.getBounds();
        //                 const itemBounds = draggedItem.getBounds();

        //                 if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, objBounds)) {
        //                     obj._onDropAction(draggedItem, obj);
        //                 }
        //             }
        //         });
        //     });
        // });

this.input.on('drop', (pointer, item, dropZone) => {
    if (dropZone && dropZone._onDropAction) {
        dropZone._onDropAction(item, dropZone);
    }
});


    }

    // -------------------------
    // ADD ITEM TO INVENTORY
    // -------------------------
    // addItem(textureKey) {
    //     if (this.items.find(i => i.texture.key === textureKey)) return;
    //     if (this.items.length >= this.slots.length) return;

    //     const slot = this.slots[this.items.length];

    //     const item = this.add.image(slot.x + slot.width / 2, slot.y, textureKey)
    //         .setOrigin(0.5)
    //         .setInteractive({ draggable: true });

    //     this.input.setDraggable(item);

    //     item.setData('startX', item.x);
    //     item.setData('startY', item.y);

    //     // Scale animation
    //     const padding = 4;
    //     const scale = Math.min(
    //         (slot.width - padding) / item.width,
    //         (slot.height - padding) / item.height
    //     );

    //     item.setScale(0);
    //     this.tweens.add({
    //         targets: item,
    //         scale,
    //         duration: 150,
    //         ease: 'Back.Out'
    //     });

    //     this.inventory.add(item);
    //     this.items.push(item);
    // }

    addItem(textureKey, useContainer = true) {
    if (this.items.find(i => i.texture.key === textureKey)) return;
    if (this.items.length >= this.slots.length && useContainer) return;

    let x, y;
    if (useContainer) {
        const slot = this.slots[this.items.length];
        x = slot.x + slot.width / 2;
        y = slot.y;
    } else {
        // For world items like ruler, start somewhere in scene (or top-left)
        x = 50;
        y = 50;
    }

    const item = this.add.image(x, y, textureKey)
        .setOrigin(0.5)
        .setInteractive({ draggable: true });

    this.input.setDraggable(item);

    item.setData('startX', item.x);
    item.setData('startY', item.y);

    // Scale animation
    const padding = 4;
    let scale = 1;
    if (useContainer) {
        scale = Math.min(
            (this.slots[this.items.length].width - padding) / item.width,
            (this.slots[this.items.length].height - padding) / item.height
        );
    }

    item.setScale(0);
    this.tweens.add({
        targets: item,
        scale,
        duration: 150,
        ease: 'Back.Out'
    });

    if (useContainer) this.inventory.add(item);
    this.items.push(item);

    return item;
}

}
