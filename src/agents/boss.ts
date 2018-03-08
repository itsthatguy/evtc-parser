import { BaseAgent } from './base';

export class Boss extends BaseAgent {
  public isBoss: boolean = true;

  constructor (properties) {
    super(properties);
  }
};
