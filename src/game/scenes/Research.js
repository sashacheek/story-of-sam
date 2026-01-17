import { BaseScene } from "../tools/BaseScene";

export class Research extends BaseScene
{
    constructor()
    {
        super('Research')
    }
    create()
    {
        this.createBase('research', 'Research');
        const reasearch_to_main = this.makeButton('research_to_main', () => this.moveLocation('MainHallway'));
        this.makeHover(reasearch_to_main, 'Main Hallway', 1530, 660)
        this.makeButton('research_researcher_1', () => this.frozenText("Researcher 1: Hi I am researcher 1."), 1);
        this.makeButton('research_researcher_2', () => this.frozenText("Researcher 2: Hi I am researcher 2."), 1);
        this.makeButton('research_lead_ra', () => this.frozenText("Lead Research Assisstant: Hi I am the lead ra."), 1);
    }
}