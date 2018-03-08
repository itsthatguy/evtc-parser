import { BaseAgent } from './base';

export class Player extends BaseAgent {
  public isPlayer: boolean = true;
  public account: string;
  public subgroup: number;

  constructor (properties) {
    super(properties);

    const nameArray = properties.name.split("\0").filter(n => n != "");
    this.name = nameArray[0],
    this.account = nameArray[1].slice(1);
    this.subgroup = parseInt(nameArray[2]);
  }
};
