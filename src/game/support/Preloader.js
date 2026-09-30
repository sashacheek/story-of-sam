// import { BaseScene } from "../tools/BaseScene";
import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here\
    this.cameras.main.setBackgroundColor("#ffffff");

    // this.add.image(960, 540, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(960, 540, 640, 48).setStrokeStyle(1, 0x000000);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(960 - 315, 540, 4, 42, 0x963bff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 536 * progress;
    });
  }

  preload() {
    this.load.setPath("assets");

    // videos
    this.load.video("credits_vid", "prototype_videos/credits_vid.mp4");
    this.load.video("intro", "prototype_videos/intro.mp4");
    this.load.video("storage_error", "prototype_videos/storage_error.mp4");
    this.load.video("storage_screw", "prototype_videos/storage_screw.mp4");
    this.load.video("unlock_storage", "prototype_videos/unlock_storage.mp4");
    this.load.video("memory_1", "prototype_videos/memory_1.mp4");
    this.load.video("clock_1", "prototype_videos/clock_1.mp4");
    this.load.video("placeholder", "prototype_videos/sample_video.mp4");
    this.load.video(
      "attempt_steal_pass",
      "prototype_videos/attempt_steal_pass.mp4",
    );
    this.load.video(
      "attempt_steal_metal",
      "prototype_videos/attempt_steal_metal.mp4",
    );

    this.load.video("card1_1", "prototype_videos/card1_1.mp4");
    this.load.video("card1_2", "prototype_videos/card1_2.mp4");
    this.load.video("card1_3", "prototype_videos/card1_3.mp4");
    this.load.video("card1_4", "prototype_videos/card1_4.mp4");

    this.load.video("intro_1", "prototype_videos/intro_1.mp4");
    this.load.video("intro_2", "prototype_videos/intro_2.mp4");
    this.load.video("intro_3", "prototype_videos/intro_3.mp4");
    this.load.video("intro_4", "prototype_videos/intro_4.mp4");
    this.load.video("intro_5", "prototype_videos/intro_5.mp4");
    this.load.video("intro_6", "prototype_videos/intro_6.mp4");

    this.load.video(
      "lead_ra_leaves_1",
      "prototype_videos/lead_ra_leaves_1.mp4",
    );
    this.load.video(
      "lead_ra_leaves_2",
      "prototype_videos/lead_ra_leaves_2.mp4",
    );
    this.load.video(
      "lead_ra_leaves_3",
      "prototype_videos/lead_ra_leaves_3.mp4",
    );
    this.load.video(
      "lead_ra_leaves_4",
      "prototype_videos/lead_ra_leaves_4.mp4",
    );

    this.load.video("open_leg", "prototype_videos/open_leg.mp4");

    // Images

    // areas
    this.load.image("menu", "areas/menu.png");
    this.load.image("rear_deck", "areas/rear_module.PNG");
    this.load.image("main_hallway", "areas/main_hallway.PNG");
    this.load.image("bot_office", "areas/bot_office.PNG");
    this.load.image("engineer_room", "areas/engineer_room.png");
    this.load.image("storage_closet", "areas/storage_closet.PNG");
    this.load.image("research", "areas/research.PNG");
    this.load.image("clock_puzzle", "areas/clock_puzzle.PNG");

    // area changeables
    this.load.image("bo_bot_desk", "area_changeables/bo_bot_desk.PNG");
    this.load.image(
      "bo_engineer_and_bot",
      "area_changeables/bo_engineer_and_bot.PNG",
    );
    this.load.image(
      "engineer_screwdriver",
      "area_changeables/engineer_screwdriver.png",
    );
    this.load.image(
      "engineer_engineer",
      "area_changeables/engineer_engineer.png",
    );
    this.load.image(
      "engineer_leg_closed",
      "area_changeables/engineer_leg_closed.png",
    );
    this.load.image(
      "engineer_leg_open",
      "area_changeables/engineer_leg_open.png",
    );
    this.load.image(
      "research_lead_ra",
      "area_changeables/research_lead_ra.PNG",
    );
    this.load.image(
      "research_researcher_1",
      "area_changeables/research_researcher_1.PNG",
    );
    this.load.image(
      "research_researcher_2",
      "area_changeables/research_researcher_2.PNG",
    );
    this.load.image("storage_bucket", "area_changeables/storage_bucket.PNG");
    this.load.image(
      "storage_memory_card_1",
      "area_changeables/storage_memory_card_1.PNG",
    );

    // navigation buttons
    this.load.image(
      "menu_to_credits",
      "navigation_buttons/menu_to_credits.PNG",
    );
    this.load.image(
      "credits_to_menu",
      "navigation_buttons/credits_to_menu.PNG",
    );
    this.load.image(
      "engineer_to_rear",
      "navigation_buttons/engineer_to_rear.png",
    );
    this.load.image("rear_to_main", "navigation_buttons/rear_to_main.PNG");
    this.load.image(
      "rear_to_engineer",
      "navigation_buttons/rear_to_engineer.PNG",
    );
    this.load.image(
      "rear_to_storage",
      "navigation_buttons/rear_to_storage.PNG",
    );
    this.load.image(
      "rear_to_storage_draggable",
      "navigation_buttons/rear_to_storage_draggable.PNG",
    );
    this.load.image(
      "main_to_research",
      "navigation_buttons/main_to_research.PNG",
    );
    this.load.image(
      "main_to_bathroom",
      "navigation_buttons/main_to_bathroom.PNG",
    );
    this.load.image(
      "main_to_bunkers",
      "navigation_buttons/main_to_bunkers.PNG",
    );
    this.load.image(
      "main_to_cafeteria",
      "navigation_buttons/main_to_cafeteria.PNG",
    );
    this.load.image(
      "main_to_restricted",
      "navigation_buttons/main_to_restricted.PNG",
    );
    this.load.image("main_to_bo", "navigation_buttons/main_to_bo.PNG");
    this.load.image("bo_to_main", "navigation_buttons/bo_to_main.PNG");
    this.load.image("main_to_rear", "navigation_buttons/main_to_rear.PNG");
    this.load.image(
      "storage_to_rear",
      "navigation_buttons/storage_to_rear.PNG",
    );
    this.load.image(
      "research_to_main",
      "navigation_buttons/research_to_main.PNG",
    );

    // interaction buttons
    this.load.image("settings", "interaction_buttons/settings.PNG");
    this.load.image("play", "interaction_buttons/play.PNG");
    this.load.image("clock", "interaction_buttons/clock.PNG");
    this.load.image("coin_bot", "interaction_buttons/coin_bot.PNG");
    this.load.image("lead_bot", "interaction_buttons/lead_bot.PNG");
    this.load.image("sams_desk", "interaction_buttons/sams_desk.PNG");
    this.load.image("stressed_bot", "interaction_buttons/stressed_bot.PNG");
    this.load.image(
      "storage_wires_drawer",
      "interaction_buttons/storage_wires_drawer.PNG",
    );
    this.load.image("clock_wires", "interaction_buttons/clock_wires.PNG");
    this.load.image("hack_clock", "interaction_buttons/hack_clock.PNG");

    this.load.image(
      "help_researcher",
      "interaction_buttons/help_researcher.png",
    );

    this.load.image("inv_screwdriver", "inventory/screwdriver.PNG");
    this.load.image("inv_bucket", "inventory/storage_bucket.PNG");
    this.load.image("text_bar", "inventory/text_bar.PNG");
    this.load.image("text_bar_trimmed", "inventory/text_bar_trimmed.PNG");

    //clock game
    for (let i = 1; i <= 21; i++) {
      this.load.image(`clock_${i}`, `clock_game/${i}.PNG`);
    }
    this.load.image("clock_numbers", "clock_game/numbers.png");

    this.load.image("node_conn_1-2", "clock_game/node_connections/1-2.png");
    this.load.image("node_conn_1-13", "clock_game/node_connections/1-13.png");
    this.load.image("node_conn_2-10", "clock_game/node_connections/2-10.png");
    this.load.image("node_conn_3-4", "clock_game/node_connections/3-4.png");
    this.load.image("node_conn_4-5", "clock_game/node_connections/4-5.png");
    this.load.image("node_conn_4-8", "clock_game/node_connections/4-8.png");
    this.load.image("node_conn_6-7", "clock_game/node_connections/6-7.png");
    this.load.image("node_conn_7-8", "clock_game/node_connections/7-8.png");
    this.load.image("node_conn_7-21", "clock_game/node_connections/7-21.png");
    this.load.image("node_conn_9-10", "clock_game/node_connections/9-10.png");
    this.load.image("node_conn_10-11", "clock_game/node_connections/10-11.png");
    this.load.image("node_conn_10-18", "clock_game/node_connections/10-18.png");
    this.load.image("node_conn_12-13", "clock_game/node_connections/12-13.png");
    this.load.image("node_conn_12-20", "clock_game/node_connections/12-20.png");
    this.load.image("node_conn_13-14", "clock_game/node_connections/13-14.png");
    this.load.image("node_conn_15-16", "clock_game/node_connections/15-16.png");
    this.load.image("node_conn_16-19", "clock_game/node_connections/16-19.png");
    this.load.image("node_conn_17-18", "clock_game/node_connections/17-18.png");
    this.load.image("node_conn_18-19", "clock_game/node_connections/18-19.png");
    this.load.image("node_conn_20-21", "clock_game/node_connections/20-21.png");
  }

  create() {
    // DEBUG
    this.registry.set("skipIntro", false);
    this.registry.set("skipPhaseOne", false);
    this.registry.set("noMusic", true);

    // Phase 1
    this.registry.set("phaseOneFlags", [
      "tripped_bot",
      "hinted_storage",
      "shown_storage_error",
      "shown_access_denied",
      "unlocked_storage",
      "collected_memory_card_1",
    ]);

    this.registry.set("phaseOneItems", {
      inv_screwdriver: "collected_screwdriver",
    });

    // Phase 2
    this.registry.set("phaseTwoFlags", [
      "collected_research_pass",
      "talked_lead_ra",
      "hinted_confidential_pass",
      "attempted_steal_pass",
      "attempted_steal_metal",
      "opened_leg",
    ]);

    this.registry.set("phaseTwoItems", {
      inv_bucket: "collected_bucket",
    });

    // Set all flags as false
    for (var flag of this.registry.get("phaseOneFlags")) {
      this.registry.set(flag, false);
    }
    for (const [item, flag] of Object.entries(
      this.registry.get("phaseOneItems"),
    )) {
      this.registry.set(flag, false);
    }
    for (var flag of this.registry.get("phaseTwoFlags")) {
      this.registry.set(flag, false);
    }
    for (const [item, flag] of Object.entries(
      this.registry.get("phaseTwoItems"),
    )) {
      this.registry.set(flag, false);
    }

    this.scene.launch("UI");

    if (!this.registry.get("noMusic")) {
      this.scene.launch("MusicScene");
    }
    document.fonts.load('10pt "Walter Turncoat"').then(() => {
      if (this.registry.get("skipIntro") || this.registry.get("skipPhaseOne")) {
        this.scene.start("MainHallway");
      } else {
        this.scene.start("MainMenu");
      }
    });
  }
}
