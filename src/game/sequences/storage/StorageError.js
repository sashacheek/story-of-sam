import { Scene } from 'phaser';
import { Frame } from '../../tools/Frame';

export class StorageError extends Scene {
    constructor() {
        super('StorageError');
    }

    create() {
        this.scene.add('RearStorageError', new Frame('RearStorageError'), false);
        this.scene.start('RearStorageError', {
            media: 'rear_deck',
            mediaType: 'image',
            text: 'The card reader is glitching, I can\'t go in there right now',
            nextScene: 'RearDeck',
            transition: false,
            framesList: {}
        });
    }
}
