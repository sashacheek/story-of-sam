// BotOffice.js
import { BaseScene } from '../tools/BaseScene';

export class BotOffice extends BaseScene {
    constructor() {
        super('BotOffice');
    }

    create() {
        this.createBase('bot_office', 'Bot Office');

        const main_hallway = this.makeButton('bo_to_main', () => this.moveLocation('MainHallway'));
        // this.makeButton('sams_desk', () => this.frozenText("(Sam): This is my desk"));
        this.makeButton('coin_bot', () => this.frozenTexts([
            "Bot: With this high alert going on, there's no way I can get all the\nparts I need.",
            "Bot: Could you bring me 10 energy cells? It's for a side\nproject of mine."
        ]));
        this.makeButton('lead_bot', () => this.frozenText("Lead Bot: Where is the Lead Research Assisstant? I need some very\nimportant files from him."));

        let ruler;
        if (!this.registry.get('collected_ruler')) {
            ruler = this.makeButton('ruler', () => this.collectItem(ruler, 'inv_ruler', 'collected_ruler', "(Sam): There's a meter stick by this shelf."), 1);
        }
        
        if (this.registry.get('tripped_bot')) {
            this.addImage('bo_engineer_and_bot');
            this.makeButton('bo_engineer_and_bot', () => this.frozenText("(Sam): The engineer is in a deep focus while repairing the fallen bot."), 1);
        }

        this.makeHover(main_hallway, "Main Corridor", 60, 820);

        const hintStorage = () => {
            makeClockDroppable();
            this.frozenTexts([
                        "Bot: So much to do and so little time! I have to finish all this and be\nin comms for shift change by 9.",
                        "Bot: Have I seen anything strange? Well... Now that you mention it, I did\nhear something strange by the storage closet earlier.",
                        "Bot: And that's around where they found that bot without its memory\nchips, too!"]);
        }
        
        if (!this.registry.get('tripped_bot')) {
            var stressed_bot = this.addImage('bo_bot_desk');
            var stressed_bot_button = this.makeButton('stressed_bot', hintStorage, undefined, 'hinted_storage');
        }

        const clock = this.makeButton('clock', () => this.frozenText("(Sam): There is a clock here. It is high up on the wall."), 1, null, 930, 50);

        const makeClockDroppable = () => {
            clock.setInteractive({ dropZone: true });

            this.canDrop(clock, (item, target) => {
                let textureKey = item.texture ? item.texture.key : (item.list && item.list[0].texture.key);
                if (textureKey === 'inv_ruler') {
                    // RULER ON CLOCK
                    const vid = this.add.video(this.gameCenterX, this.gameCenterY, 'placeholder');
                    vid.once('play', () => {
                        this.disableUI();
                    });

                    vid.play();
                    vid.once('complete', () => {
                        this.registry.set('tripped_bot', true);
                        if (stressed_bot) {
                            stressed_bot.destroy();
                        }
                        stressed_bot_button.destroy();
                        vid.destroy();
                        this.makeButton('bo_engineer_and_bot', () => this.frozenText("(Sam): The engineer is in a deep focus while repairing the fallen bot."), 1);
                        this.enableUI();
                    })
                }
            });
        }


        if (this.registry.get('hinted_storage') && !this.registry.get('tripped_bot')) {
            makeClockDroppable()
        }
    }
}
