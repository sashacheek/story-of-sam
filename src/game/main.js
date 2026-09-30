import { Boot } from "./support/Boot";
import { Game as MainGame } from "./support/Game";
import { RearDeck } from "./scenes/RearDeck";
import { MainHallway } from "./scenes/MainHallway";
import { BotOffice } from "./scenes/BotOffice";
import { EngineerRoom } from "./scenes/EngineerRoom";
import { StorageCloset } from "./scenes/StorageCloset";
import { Research } from "./scenes/Research";
import { MainMenu } from "./staticscenes/MainMenu";
import { Preloader } from "./support/Preloader";
import { AUTO, Game } from "phaser";
import { Intro } from "./staticscenes/Intro";
// import { StorageError } from "./sequences/storage/StorageError";
import { UI } from "./support/UI";
import { Music } from "./support/Music";
import { Credits } from "./staticscenes/Credits";
import { ClockPuzzle } from "./staticscenes/ClockPuzzle";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    MainGame,
    Intro,
    RearDeck,
    MainHallway,
    BotOffice,
    EngineerRoom,
    StorageCloset,
    Research,
    UI,
    Music,
    Credits,
    ClockPuzzle,
  ],
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
