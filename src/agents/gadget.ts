import { BaseAgent } from './base';

export class Gadget extends BaseAgent {
  public isGadget: boolean = true;

  constructor (properties: AgentProperties) {
    super(properties);
  }
};
