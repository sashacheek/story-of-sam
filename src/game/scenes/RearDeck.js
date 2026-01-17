import { BaseScene } from '../tools/BaseScene';

export class RearDeck extends BaseScene
{
    constructor ()
    {
        super('RearDeck')
    }

    create()
    {
        this.createBase('rear_deck', 'Rear Sector');
        const main_hallway = this.makeButton('rear_to_main', () => this.moveLocation('MainHallway'));
        this.makeHover(main_hallway, 'Main Corridor', 800, 130)
        const engineer_room = this.makeButton('rear_to_engineer', () => this.moveLocation('EngineerRoom'));
        this.makeHover(engineer_room, 'Engineer\'s Room', 380, 675)

        const handleStorage = () => {
            if (!this.registry.get('shown_storage_error')) {
                this.input.enabled = false;
                const vid = this.add.video(this.gameCenterX, this.gameCenterY, 'storage_error');
                this.registry.set('frozen', true);
                vid.once('play', () => {
                    this.disableUI();
                });

                vid.play();
                if (!this.registry.set('noMusic')) {
                    const music = this.sound.get('bgm');
                    music.setVolume(0.1);
                }
                vid.once('complete', () => {
                    // if storagevid 2 not shown
                    if (this.registry.get('hinted_storage') && !this.registry.get('hinted_screwdriver')) {
                        const vid2 = this.add.video(this.gameCenterX, this.gameCenterY, 'storage_screw');
                        vid2.play();

                        vid2.once('complete', () => {
                            vid.destroy();
                            vid2.destroy();
                            if (!this.registry.set('noMusic')) {
                                music.setVolume(0.2);
                            }
                            this.registry.set('hinted_screwdriver', true)
                            this.enableUI();
                            this.frozenText('(Sam): If I could just open up the card reader, maybe I could fix it.');
                        })
                    } else {
                        vid.destroy();
                        if (!this.registry.set('noMusic')) {
                            music.setVolume(0.2);
                        }
                        this.enableUI();
                        this.frozenText('(Sam): The card reader is glitching, I can\'t go in there right now');
                    }
                });
                this.registry.set('shown_storage_error',  true);
            } else if (this.registry.get('hinted_storage') && !this.registry.get('hinted_screwdriver')) {
                const vid2 = this.add.video(this.gameCenterX, this.gameCenterY, 'storage_screw');
                vid2.play();
                if (!this.registry.set('noMusic')) {
                    music.setVolume(0.1);
                }

                vid2.once('complete', () => {
                    vid2.destroy();
                    if (!this.registry.set('noMusic')) {
                        music.setVolume(0.2);
                    }
                    this.registry.set('hinted_screwdriver', true)
                    this.enableUI();
                    this.frozenText('(Sam): If I could just open up the card reader, maybe I could fix it.');
                })
            } else {
                this.frozenText(this.registry.get('hinted_screwdriver') ? '(Sam): If I could just open up the card reader, maybe I could fix it.' : '(Sam): The card reader is glitching, I can\'t go in there right now');
            }
        };

        const storage_closet = this.makeButton('rear_to_storage', () => this.registry.get('unlocked_storage') ? this.moveLocation('StorageCloset') : handleStorage());
        this.makeHover(storage_closet, 'Storage Closet', 1095, 675);
        // droppable
        const makeStorageClosetDroppable = () => {
            storage_closet.setInteractive({ dropZone: true });

            this.canDrop(storage_closet, (item, target) => {
                let textureKey = item.texture ? item.texture.key : (item.list && item.list[0].texture.key);
                if (textureKey === 'inv_screwdriver') {
                    // SCREWDRIVER ON STORAGE CLOSET
                    const vid = this.add.video(this.gameCenterX, this.gameCenterY, 'placeholder');
                    vid.once('play', () => {
                        this.disableUI();
                    });

                    vid.play();
                    vid.once('complete', () => {
                        this.registry.set('unlocked_storage', true);
                        this.moveLocation('StorageCloset')
                        this.enableUI();
                    })
                }
            });
        }
        if (this.registry.get('collected_screwdriver')) {
            makeStorageClosetDroppable()
        }
    }
}
