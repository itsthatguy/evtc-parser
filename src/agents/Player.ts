import { BaseAgent } from './base';
import { CombatResult, CombatStateChange, CombatActivation } from '../CombatEvents';
import { find } from 'lodash';
const specializations = require('../../__data__/specializations.json')

export class Player extends BaseAgent {
  public isPlayer: boolean = true;
  public account: string;
  public subgroup: number;
  public instanceId: number;

  constructor (properties: AgentProperties) {
    super(properties);

    const specialization = specializations.filter(p => p.id === properties.isElite);
    properties.specialization = specialization;

    const nameArray = properties.name.split('\0').filter(n => n != '');
    this.name = nameArray[0],
    this.account = nameArray[1].slice(1);
    this.subgroup = parseInt(nameArray[2]);
  }

  private isSuccessfulHit (event) {
    return event.result !== CombatResult.EVADE
      && event.result !== CombatResult.ABSORB
      && event.result !== CombatResult.BLIND;
  }

  private isPlayerOwned (event) {
    const isPet = event.srcMasterInstId === this.instanceId;
    const isPlayer = event.srcAgent === this.agentId;

    return isPet || isPlayer;
  }

  private isKnownStateChange (event) {
    return event.isStateChange < 16;
  }

  eventsForTargetId (events, targetId) {
    return events.filter(event => {
      if (!this.isKnownStateChange(event)) return false;

      const isAgainstTarget = event.dstAgent === targetId;
      const isCancelled = event.isActivation > 0;

      return this.isPlayerOwned(event)
        && isAgainstTarget
        && !isCancelled
        && this.isSuccessfulHit(event);
    });
  };

  eventsForAll (events) {
    return events.filter(e => {
      const goodTarget = e.srcAgent === this.agentId
        && this.agentId !== e.dstAgent
        && e.dstAgent !== 0

      return goodTarget && this.isSuccessfulHit(e);
    });
  };

  filterSkillEvents (events, skills, name) {
    const skill = skills.find(s => s.name === name);

    return events.filter(event => {
      if (!this.isKnownStateChange(event)) return false;

      const isCancelled = event.isActivation > 0;
      const isCorrectSkill = event.skillId === skill.skillId;

      return isCorrectSkill
        && !isCancelled
        && this.isPlayerOwned(event)
        && this.isSuccessfulHit(event);
    });
  };

  private damageFor (events) {
    return events.map((e) => {
      const damage = (e.buff) ? e.buffDamage : e.value;
      return (damage > 0) ? damage : 0;
    });
  }

  sum = (v) => v.reduce((a, b) => a + b, 0)

  public bossDamage ({ boss, encounter }) {
    const bossEvents = this.eventsForTargetId(encounter.events, boss().agentId);
    const bossDamage = this.damageFor(bossEvents);
    return this.sum(bossDamage)
  }

  public cleaveDamage ({ events }) {
    const cleaveEvents = this.eventsForAll(events);
    const cleaveDamage = this.damageFor(cleaveEvents);
    return this.sum(cleaveDamage);
  }

  public skillDamage ({ events, skills }, name) {
    const skillEvents = this.filterSkillEvents(events, skills, name);
    const skillDamage = this.damageFor(skillEvents);
    return this.sum(skillDamage);
  }

  public downs ({ encounter }): number {
    return encounter.events.filter(event => {
      const playerEvent = event.srcAgent === this.agentId;
      const isDown = event.isStateChange === CombatStateChange.CHANGEDOWN;

      return isDown && playerEvent;
    }).length;
  }
}
