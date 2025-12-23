import { BaseScene } from "../tools/BaseScene"

export class MainHallway extends BaseScene
{
    constructor ()
    {
        super('MainHallway')
    }

    create()
    {
        const accessDenied = () => {
            let text = '(Sam): I don\'t have the access to go in there.';
            if (!this.registry.get('shown_access_denied')) {
                this.registry.set('shown_access_denied', true);
                this.vidText('placeholder', text)
            } else {
                this.frozenText(text);
            }
        }

        this.createBase('main_hallway', 'Main Corridor');
        const rear_deck = this.makeButton('main_to_rear', () => this.moveLocation('RearDeck'));
        this.makeHover(rear_deck, 'Rear Sector', 800, 850);

        const research = this.makeButton('main_to_research', () => accessDenied());
        this.makeHover(research, 'Research', 200, 400);

        const bathroom = this.makeButton('main_to_bathroom', () => accessDenied());
        this.makeHover(bathroom, 'Bathroom', 515, 240);

        const bunkers = this.makeButton('main_to_bunkers', () => accessDenied());
        this.makeHover(bunkers, 'Bunkers', 730, 130);

        const restricted = this.makeButton('main_to_restricted', () => accessDenied());
        this.makeHover(restricted, 'Restricted\nHallway', 830, 50);

        const cafeteria = this.makeButton('main_to_cafeteria', () => accessDenied());
        this.makeHover(cafeteria, 'Cafeteria', 990, 150);

        const bot_office = this.makeButton('main_to_bo', () => this.moveLocation('BotOffice'));
        this.makeHover(bot_office, 'Bot Office', 1380, 400);
    }
}
