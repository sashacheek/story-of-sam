// BotOffice.js
import { BaseScene } from '../tools/BaseScene';

export class BotOffice extends BaseScene {
    constructor() {
        super('BotOffice');
    }

    create() {
        this.createBase('bot_office', 'Bot Office');
        const main_hallway = this.makeButton('bo_to_main', () => this.moveLocation('MainHallway'));
        this.makeHover(main_hallway, "Main Corridor", 60, 820);

        // Energy cells bot
        this.makeButton('coin_bot', () => this.frozenTexts([
            "Bot: Hey, you! You're one of the new bots, right? Sam, was it?",
            "Bot: I'm working on a little side project but I need 10 energy cells for it.\nCould you gather them for me? I'll give you something special if you do."
        ]));

        // Lead bot
        const unlockResearch = () => {
            this.registry.set('collected_research_pass', true);
            this.frozenTexts(["Lead Bot: Where is the Lead Research Assisstant? I need some very\nimportant files from him.",
                "Lead Bot: You want to fetch him for me? Sure, that would be great.",
                "Lead Bot: Here, take this key pass. It will get you into the research\nlab. Have him meet me here."
            ])
        }

        if (!this.registry.get('collected_memory_card_1')) {
            this.makeButton('lead_bot', () => this.frozenText("Lead Bot: Where is the Lead Research Assisstant? I need some very\nimportant files from him."));
        } else {
            this.makeButton('lead_bot', () => unlockResearch());
        }

        // Stressed bot
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
                    if (!this.registry.set('noMusic')) {
                        const music = this.sound.get('bgm');
                        music.setVolume(0.1);
                    }
                    vid.once('complete', () => {
                        this.registry.set('tripped_bot', true);
                        if (stressed_bot) {
                            stressed_bot.destroy();
                        }
                        stressed_bot_button.destroy();
                        vid.destroy();
                        if (!this.registry.set('noMusic')) {
                            music.setVolume(0.2);
                        }
                        this.makeButton('bo_engineer_and_bot', () => this.frozenText("(Sam): The engineer is in a deep focus while repairing the fallen bot."), 1);
                        this.enableUI();
                    })
                }
            });
        }

        const hintStorage = () => {
            makeClockDroppable();
            this.frozenTexts([
                        "Bot: So much to do and so little time! I have to finish all this and go to\ncomms for shift change at 9.",
                        "Bot: Have I seen anything strange? Well... Now that you mention it, I did\nhear something strange by the storage closet earlier.",
                        "Bot: And that's around where they found that bot that got messed\nwith, too!"]);
        }

        if (!this.registry.get('tripped_bot')) {
            var stressed_bot = this.addImage('bo_bot_desk');
            var stressed_bot_button = this.makeButton('stressed_bot', hintStorage, undefined, 'hinted_storage');
        }

        if (this.registry.get('tripped_bot')) {
            this.addImage('bo_engineer_and_bot');
            this.makeButton('bo_engineer_and_bot', () => this.frozenText("(Sam): The engineer is in a deep focus while repairing the fallen bot."), 1);
        }

        // Your desk
        // this.makeButton('sams_desk', () => this.frozenText("(Sam): This is my desk"));
        
        // Interactables
        // Clock
        const clock = this.makeButton('clock', () => this.frozenText("(Sam): There is a clock high up on this wall. I might be able to adjust\nthe time, if I could only reach it."), 1, null, 930, 50);
    
        if (this.registry.get('hinted_storage') && !this.registry.get('tripped_bot')) {
            makeClockDroppable()
        }


        // Items
        let ruler;
        if (!this.registry.get('collected_ruler')) {
            ruler = this.makeButton('ruler', () => this.collectItem(ruler, 'inv_ruler', 'collected_ruler', "(Sam): There's a meter stick by this shelf."), 1);
        }
    }
}
