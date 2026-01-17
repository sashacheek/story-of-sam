import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { RearDeck } from './scenes/RearDeck';
import { MainHallway } from './scenes/MainHallway';
import { BotOffice } from './scenes/BotOffice'
import { EngineerRoom } from './scenes/EngineerRoom'
import { StorageCloset } from './scenes/StorageCloset';
import { Research } from './scenes/Research';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { AUTO, Game } from 'phaser';
import { Intro } from './sequences/intro/Intro';
import { StorageError } from './sequences/storage/StorageError';
import { UI } from './scenes/UI'
import { Music } from './scenes/Music';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
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
        StorageError,
        UI,
        Music
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
