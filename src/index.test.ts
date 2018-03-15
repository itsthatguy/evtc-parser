import { CombatResult } from './CombatEvents';

describe('evtc-parser', () => {
  const parser = require('./index');
  let data;

  beforeAll(async () => {
    data = await parser.fromFile('./__data__/evtc/file_2.evtc.zip');
  });

  describe('agents', () => {
    it('has the correct number of agents', async () => {
      expect(data.encounter.agentCount).toEqual(270);
      expect(data.encounter.agents).toHaveLength(270);
    });

    it('contains 1 boss', () => {
      expect(data.encounter.agents.filter(a => a.isBoss)).toHaveLength(1);
    });

    it('contains a boss named `Gorseval the Multifarious`', () => {
      expect(data.encounter.agents.find(a => a.isBoss).name).toEqual('Gorseval the Multifarious');
    });

    it('contains a player with account `itsthatguy.1062`', () => {
      expect(data.encounter.agents.filter((a) => a.account === 'itsthatguy.1062').length).toBeGreaterThan(0);
    });

    it('contains 10 players', () => {
      expect(data.encounter.agents.filter(a => a.isPlayer)).toHaveLength(10);
    });
  });

  describe('skills', () => {
    it('has the correct number of skills', async () => {
      expect(data.encounter.skillCount).toEqual(430);
      expect(data.encounter.skills).toHaveLength(430);
    });
  });

  describe('events', () => {
    it('has the correct number of events', async () => {
      expect(data.encounter.eventCount).toEqual(115914);
      expect(data.encounter.events).toHaveLength(115914);
    });
  });

  describe('computed', () => {
    it('has dps', () => {
      expect(data.player('Spoiled Ice Cream').totalDamage(data)).toEqual(4424215)
      expect(data.player('Viking Clawhug').totalDamage(data)).toEqual(1419913)
      expect(data.player('Albireo North').totalDamage(data)).toEqual(3484548)
      expect(data.player('Morat Gurgeh').totalDamage(data)).toEqual(2894145)
    });
  });
});
