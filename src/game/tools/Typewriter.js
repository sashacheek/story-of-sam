

/**
 * Typewriter animation with skip support and delayed start
 * @param {Phaser.GameObjects.Text} target
 * @param {number} [speedInMs=24] - delay between characters
 * @param {number} [delayMs=100] - optional delay before starting
 * @returns {Promise<void>}
 */
export function animateText(target, speedInMs = 24, delayMs = 100) {
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
                    target.text = visibleText + invisibleMessage.substring(visibleText.length);

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
