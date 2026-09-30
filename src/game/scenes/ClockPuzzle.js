import { BaseScene } from "../tools/BaseScene";

export class ClockPuzzle extends BaseScene {
  constructor() {
    super("ClockPuzzle");
    this.showUI = false;
  }

  create() {
    this.createBase("clock_puzzle", "");
    // this.addImage("clock_numbers");

    const nodes = {
      1: [2, 13],
      2: [1, 10],
      3: [4],
      4: [3, 5, 8],
      5: [4],
      6: [7],
      7: [6, 8, 21],
      8: [4, 7],
      9: [10],
      10: [2, 9, 11, 18],
      11: [10],
      12: [13, 20],
      13: [1, 12, 14],
      14: [13],
      15: [16],
      16: [15, 19],
      17: [18],
      18: [10, 17, 19],
      19: [16, 18],
      20: [12, 21],
      21: [7, 20],
    };

    const win_stack = [17, 18, 10, 2, 1, 13, 12, 20, 21, 7, 8, 4, 5];

    if (this.registry.get("tripped_bot")) {
      for (let j = 0; j < win_stack.length - 1; j++) {
        let i = win_stack[j];
        let last_node = win_stack[j + 1];
        const small = i < last_node ? i : last_node;
        const large = i > last_node ? i : last_node;
        const image = `node_conn_${small}-${large}`;
        this.addImage(image);
      }
    } else {
      const nodes_stack = [17];

      const visual_stack = [];

      for (let i = 1; i <= 21; i++) {
        this.buttontool.makeButton(`clock_${i}`, () => {
          const last_node = nodes_stack.at(-1);
          if (nodes[last_node].includes(i)) {
            if (!nodes_stack.includes(i)) {
              const small = i < last_node ? i : last_node;
              const large = i > last_node ? i : last_node;
              const image = `node_conn_${small}-${large}`;
              const element = this.addImage(image);
              nodes_stack.push(i);
              visual_stack.push(element);
            } else {
              if (nodes_stack.length > 1 && i == nodes_stack.at(-2)) {
                visual_stack.at(-1).destroy();
                nodes_stack.pop();
                visual_stack.pop();
              }
            }
          }
          // win check
          if (
            nodes_stack.length === win_stack.length &&
            nodes_stack.every((val, index) => val === win_stack[index])
          ) {
            this.registry.set("tripped_bot", true);
            // trigger video
            this.moveLocation("BotOffice");
          }
        });
      }
    }

    this.buttontool.makeButton(
      "credits_to_menu",
      () => this.moveLocation("BotOffice"),
      1,
    );
  }
}
