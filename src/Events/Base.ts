export class BaseEvent implements EventProperties {
  public time: number;
  public srcAgent: number;
  public dstAgent: number;
  public value: number;
  public buffDamage: number;
  public overstackValue: number;
  public skillId: number;
  public srcInstId: number;
  public dstInstId: number;
  public srcMasterInstId: number;
  public iff: number;
  public buff: number;
  public result: number;
  public isActivation: number;
  public isBuffRemove: number;
  public isNinety: number;
  public isFifty: number;
  public isMoving: number;
  public isStateChange: number;
  public isFlanking: number;
  public isShields: number;

  constructor (properties: EventProperties) {
    this.time = properties.time;
    this.srcAgent = properties.srcAgent;
    this.dstAgent = properties.dstAgent;
    this.value = properties.value;
    this.buffDamage = properties.buffDamage;
    this.overstackValue = properties.overstackValue;
    this.skillId = properties.skillId;
    this.srcInstId = properties.srcInstId;
    this.dstInstId = properties.dstInstId;
    this.srcMasterInstId = properties.srcMasterInstId;
    this.iff = properties.iff;
    this.buff = properties.buff;
    this.result = properties.result;
    this.isActivation = properties.isActivation;
    this.isBuffRemove = properties.isBuffRemove;
    this.isNinety = properties.isNinety;
    this.isFifty = properties.isFifty;
    this.isMoving = properties.isMoving;
    this.isStateChange = properties.isStateChange;
    this.isFlanking = properties.isFlanking;
    this.isShields = properties.isShields;
  }
};
