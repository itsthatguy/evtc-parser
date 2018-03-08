export class BaseAgent {
  public agentId: string;
  public profession: string;
  public isElite: boolean;
  public toughness: number;
  public healing: number;
  public condition: number;
  public name: string;

  constructor (properties) {
    this.agentId = properties.agentId;
    this.profession = properties.profession
    this.isElite = properties.isElite
    this.toughness = properties.toughness;
    this.healing = properties.healing;
    this.condition = properties.condition;
    this.name = properties.name;
  }
};
