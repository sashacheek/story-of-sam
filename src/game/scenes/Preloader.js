import { BaseScene } from '../tools/BaseScene';

export class Preloader extends BaseScene
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

        // areas
        this.load.image('rear_deck', 'areas/rear_module.PNG');
        this.load.image('main_hallway', 'areas/main_hallway.PNG');
        this.load.image('bot_office', 'areas/bot_office.PNG');
        this.load.image('engineer_room', 'areas/engineer_room.PNG');
        this.load.image('storage_closet', 'areas/storage_closet.PNG');
        this.load.image('research', 'areas/research.PNG');

        // area changeables
        this.load.image('bo_bot_desk','area_changeables/bo_bot_desk.PNG');
        this.load.image('bo_engineer_and_bot','area_changeables/bo_engineer_and_bot.PNG');
        this.load.image('engineer_screwdriver','area_changeables/engineer_screwdriver.PNG');
        this.load.image('engineer_engineer','area_changeables/engineer_engineer.PNG');
        this.load.image('research_lead_ra', 'area_changeables/research_lead_ra.PNG');
        this.load.image('research_researcher_1', 'area_changeables/research_researcher_1.PNG');
        this.load.image('research_researcher_2', 'area_changeables/research_researcher_2.PNG');
        this.load.image('storage_bucket', 'area_changeables/storage_bucket.PNG');
        this.load.image('storage_memory_card_1', 'area_changeables/storage_memory_card_1.PNG');

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
        this.load.image('storage_to_rear', 'navigation_buttons/storage_to_rear.PNG');
        this.load.image('research_to_main', 'navigation_buttons/research_to_main.PNG')

        // interaction buttons
        this.load.image('clock', 'interaction_buttons/clock.PNG');
        this.load.image('coin_bot', 'interaction_buttons/coin_bot.PNG');
        this.load.image('lead_bot', 'interaction_buttons/lead_bot.PNG');
        this.load.image('sams_desk', 'interaction_buttons/sams_desk.PNG');
        this.load.image('stressed_bot', 'interaction_buttons/stressed_bot.PNG');
        this.load.image('test', 'interaction_buttons/test.png');
        this.load.image('storage_wires_drawer', 'interaction_buttons/storage_wires_drawer.PNG');

        // collectibles
        this.load.image('ruler', 'interaction_buttons/ruler.PNG');

        // inventory
        this.load.image('inv_ruler', 'inventory/meter_stick.PNG');
        this.load.image('inv_screwdriver', 'inventory/screwdriver.PNG');
        this.load.image('inv_bucket', 'inventory/storage_bucket.PNG');
        
    }

    create ()
    {
        // DEBUG
        this.registry.set('skipIntro', true);
        this.registry.set('skipPhaseOne', false);
        this.registry.set('noMusic', true);

        // Phase 1
        this.registry.set('phaseOneFlags', [
           'tripped_bot' ,
           'collected_ruler',
           'hinted_storage',
           'shown_storage_error',
           'shown_access_denied',
           'unlocked_storage',
           'collected_memory_card_1'
        ])

        this.registry.set('phaseOneItems', {
            'inv_ruler': 'collected_ruler',
            'inv_screwdriver': 'collected_screwdriver'
        })

        // Phase 2
        this.registry.set('phaseTwoFlags', [
            'collected_research_pass'
        ])

        this.registry.set('phaseTwoItems', {
            'inv_bucket' : 'collected_bucket'
        })


        // Set all flags as false
        for (var flag of this.registry.get('phaseOneFlags'))
        {
            this.registry.set(flag, false);
        }
        for (const [item, flag] of Object.entries(this.registry.get('phaseOneItems')))
        {
            this.registry.set(flag, false)
        }
                for (var flag of this.registry.get('phaseTwoFlags'))
        {
            this.registry.set(flag, false);
        }
        for (const [item, flag] of Object.entries(this.registry.get('phaseTwoItems')))
        {
            this.registry.set(flag, false)
        }



        this.scene.launch('UI');

        if (!this.registry.get('noMusic'))
        {
            this.scene.launch('MusicScene');
        }

        if (this.registry.get('skipIntro') || this.registry.get('skipPhaseOne')) {
            this.scene.start('MainHallway');
        } else {
            this.scene.start('MainMenu');
        }
    }
}
