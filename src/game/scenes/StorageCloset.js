import { BaseScene } from "../tools/BaseScene";

export class StorageCloset extends BaseScene
{
    constructor ()
    {
        super('StorageCloset');
    }
    
    create()
    {
        this.createBase('storage_closet', 'Storage Closet');
        const storage_to_rear = this.makeButton('storage_to_rear', () => this.moveLocation('RearDeck'), 1);
        this.makeHover(storage_to_rear, 'Rear Sector', 1090, 815);

        // Items
        // memory card
        const clickMemoryCard = (memory_card_1) => {
            this.registry.set('collected_memory_card_1', true);
            memory_card_1.destroy();
            this.vidText('placeholder', 'Sam: Wow new memories cool');
        }
        if (!this.registry.get('collected_memory_card_1')) {
            let memory_card_1;
            memory_card_1 = this.makeButton('storage_memory_card_1', () => clickMemoryCard(memory_card_1), 1)
        }

        // wires
        this.makeButton('storage_wires_drawer', () => this.frozenText('(Sam): There are loose wires in this drawer.'));

        // bucket
        if (!this.registry.get('collected_bucket')) {
            const bucket = this.makeButton('storage_bucket', () => this.collectItem(bucket, 'inv_bucket', 'collected_bucket', "(Sam): There's a bucket here"), 1);
        }

    }
}