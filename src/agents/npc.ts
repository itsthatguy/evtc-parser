import { BaseAgent } from './base';

export class Npc extends BaseAgent {
  public isNpc: boolean = true;

  constructor (properties: AgentProperties) {
    super(properties);
  }
};
