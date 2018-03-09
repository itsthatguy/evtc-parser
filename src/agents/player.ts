import { BaseAgent } from './base';
const specializations = require('../../__data__/specializations.json')

export class Player extends BaseAgent {
  public isPlayer: boolean = true;
  public account: string;
  public subgroup: number;

  constructor (properties: AgentProperties) {
    super(properties);

    const specialization = specializations.filter(p => p.id === properties.isElite);
    properties.specialization = specialization;

    const nameArray = properties.name.split('\0').filter(n => n != '');
    this.name = nameArray[0],
    this.account = nameArray[1].slice(1);
    this.subgroup = parseInt(nameArray[2]);
  }
};
