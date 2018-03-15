import { BaseAgent } from './base';
import { CombatResult } from '../CombatEvents';
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

  private successfulHit (event) {
    return event.result !== CombatResult.BLOCK
      && event.result !== CombatResult.EVADE
      && event.result !== CombatResult.ABSORB
      && event.result !== CombatResult.BLIND;
  }

  eventsForTargetId (events, targetId, equal = true) {
    return events.filter(e => {
      const goodTarget = e.srcAgent === this.agentId
        && ((e.dstAgent === targetId) === equal)
        && e.dstAgent !== 0

      return goodTarget && this.successfulHit(e);
    });
  };

  eventsForAll (events) {
    return events.filter(e => {
      const goodTarget = e.srcAgent === this.agentId
        && this.agentId !== e.dstAgent
        && e.dstAgent !== 0

      return goodTarget && this.successfulHit(e);
    });
  };

  filterSkillEvents (events, skills, name) {
    const filterSkill = skills.find(s => s.name === name);

    return events.filter(e => {
      const goodTarget = e.srcAgent === this.agentId
        && e.skillId === filterSkill.skillId
        && e.dstAgent !== 0;

      return goodTarget && this.successfulHit(e);
    });
  };

  private damageFor (events) {
    return events.map((e) => {
      const damage = (e.buff) ? e.buffDamage : e.value;
      return (damage > 0) ? damage : 0;
    });
  }

  sum = (v) => v.reduce((a, b) => a + b, 0)

  public totalDamage ({ boss, encounter }) {
    const bossEvents = this.eventsForTargetId(encounter.events, boss().agentId);
    const bossDamage = this.damageFor(bossEvents);
    return this.sum(bossDamage)
  }

  public cleaveDamage ({ events }) {
    const cleaveEvents = this.eventsForAll(events);
    const cleaveDamage = this.damageFor(cleaveEvents);
    return this.sum(cleaveDamage);
  }

  public skillTotal ({ events, skills }, name) {
    const skillEvents = this.filterSkillEvents(events, skills, name);
    const skillDamage = this.damageFor(skillEvents);
    return this.sum(skillDamage);
  }
}
