import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');

        // videos
        this.load.video('intro', 'prototype_videos/intro.mp4');
        this.load.video('storage_error', 'prototype_videos/storage_error.mp4');
        this.load.video('storage_screw', 'prototype_videos/storage_screw.mp4');
        this.load.video('placeholder', 'prototype_videos/sample_video.mp4');
        
        // sequences
        this.load.image('intro1', 'intro/1.PNG');
        this.load.image('intro2', 'intro/2.PNG');
        this.load.image('intro3', 'intro/3.PNG');
        this.load.image('intro4', 'intro/4.PNG');
        this.load.image('intro5', 'intro/5.PNG');
        this.load.image('intro6', 'intro/6.PNG');
        this.load.image('intro7', 'intro/7.PNG');

        // area
        this.load.image('rear_deck', 'areas/rear_module.PNG');
        this.load.image('main_hallway', 'areas/main_hallway.PNG');
        this.load.image('bot_office', 'areas/bot_office.PNG');
        this.load.image('engineer_room', 'areas/engineer_room.PNG');

        // area changeables
        this.load.image('bo_bot_desk','area_changeables/bo_bot_desk.PNG');
        this.load.image('bo_engineer_and_bot','area_changeables/bo_engineer_and_bot.PNG');
        this.load.image('engineer_screwdriver','area_changeables/engineer_screwdriver.PNG');
        this.load.image('engineer_engineer','area_changeables/engineer_engineer.PNG');

        // navigation buttons
        this.load.image('engineer_to_rear', 'navigation_buttons/engineer_to_rear.PNG');
        this.load.image('rear_to_main', 'navigation_buttons/rear_to_main.PNG');
        this.load.image('rear_to_engineer', 'navigation_buttons/rear_to_engineer.PNG');
        this.load.image('rear_to_storage', 'navigation_buttons/rear_to_storage.PNG');
        this.load.image('main_to_research', 'navigation_buttons/main_to_research.PNG');
        this.load.image('main_to_bathroom', 'navigation_buttons/main_to_bathroom.PNG');
        this.load.image('main_to_bunkers', 'navigation_buttons/main_to_bunkers.PNG');
        this.load.image('main_to_cafeteria', 'navigation_buttons/main_to_cafeteria.PNG');
        this.load.image('main_to_restricted', 'navigation_buttons/main_to_restricted.PNG');
        this.load.image('main_to_bo', 'navigation_buttons/main_to_bo.PNG');
        this.load.image('bo_to_main', 'navigation_buttons/bo_to_main.PNG');
        this.load.image('main_to_rear', 'navigation_buttons/main_to_rear.PNG');

        // interaction buttons
        this.load.image('clock', 'interaction_buttons/clock.PNG');
        this.load.image('coin_bot', 'interaction_buttons/coin_bot.PNG');
        this.load.image('lead_bot', 'interaction_buttons/lead_bot.PNG');
        this.load.image('sams_desk', 'interaction_buttons/sams_desk.PNG');
        this.load.image('stressed_bot', 'interaction_buttons/stressed_bot.PNG');
        this.load.image('test', 'interaction_buttons/test.png');

        // collectibles
        this.load.image('ruler', 'interaction_buttons/ruler.PNG');

        // inventory
        this.load.image('inv_ruler', 'inventory/meter_stick.PNG');
        this.load.image('inv_screwdriver', 'inventory/screwdriver.PNG');
        
    }

    create ()
    {
        // flags
        this.registry.set('tripped_bot', false);
        this.registry.set('collected_ruler', false);
        this.registry.set('collected_screwdriver', false);
        this.registry.set('hinted_storage', false);
        this.registry.set('hinted_screwdriver', false);
        this.registry.set('shown_storage_error', false);
        this.registry.set('shown_access_denied', false);

        // DEBUG
        const skipIntro = false;

        this.scene.launch('UI');

        if (skipIntro) {
            this.scene.start('MainHallway');
        } else {
            this.scene.start('MainMenu');
        }
    }
}
