export class BaseAgent {
  public agentId: number;
  public profession: number;
  public professionLower: number;
  public professionUpper: number;
  public isElite: number;
  public toughness: number;
  public healing: number;
  public condition: number;
  public name: string;
  public instanceId: number;
  public firstAware: number;
  public lastAware: number;

  constructor (properties: AgentProperties) {
    this.agentId = properties.agentId;
    this.profession = properties.profession
    this.professionLower = properties.professionLower;
    this.professionUpper = properties.professionUpper;
    this.isElite = properties.isElite
    this.toughness = properties.toughness;
    this.healing = properties.healing;
    this.condition = properties.condition;
    this.name = properties.name;
  }
};
