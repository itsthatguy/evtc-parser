describe('agents', () => {
  const parser = require('../src/index');
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
    it('Spoiled Ice Cream', () => {
      expect(data.player('Spoiled Ice Cream').bossDamage(data)).toEqual(4424215)
    });
    it('Viking Clawhug', () => {
      expect(data.player('Viking Clawhug').bossDamage(data)).toEqual(1419913)
    });
    it('Albireo North', () => {
      expect(data.player('Albireo North').bossDamage(data)).toEqual(3484548)
    });
    it('Eloo Siev', () => {
      expect(data.player('Eloo Siev').bossDamage(data)).toEqual(3576733)
    });
    it('Foxi Shadi', () => {
      expect(data.player('Foxi Shadi').bossDamage(data)).toEqual(3312402)
    });

    it('Lokizen', () => {
      const p = data.player('Lokizen')
      expect(data.player('Lokizen').bossDamage(data)).toEqual(506654)
    });
    it('Lanayia Swiftslayer', () => {
      expect(data.player('Lanayia Swiftslayer').bossDamage(data)).toEqual(706498)
    });
    it('Trahaldir', () => {
      expect(data.player('Trahaldir').bossDamage(data)).toEqual(412834)
    });
    it('Náme Here', () => {
      expect(data.player('Náme Here').bossDamage(data)).toEqual(927127)
    });
    it('Morat Gurgeh', () => {
      expect(data.player('Morat Gurgeh').bossDamage(data)).toEqual(2894145)
    });

    it('has correct skill damage', () => {
      const player1 = data.player('Foxi Shadi');
      expect(player1.skillDamage(data.encounter, 'Weakening Charge')).toEqual(261631)
      expect(player1.skillDamage(data.encounter, 'Vault')).toEqual(523144)
      expect(player1.skillDamage(data.encounter, 'Staff Bash')).toEqual(769568)
      expect(player1.skillDamage(data.encounter, 'Staff Strike')).toEqual(802054)
      expect(player1.skillDamage(data.encounter, 'Punishing Strikes')).toEqual(1600586)

      const player2 = data.player('Eloo Siev');
      expect(player2.skillDamage(data.encounter, 'Weakening Charge')).toEqual(1621057)
      expect(player2.skillDamage(data.encounter, 'Vault')).toEqual(55057)
      expect(player2.skillDamage(data.encounter, 'Staff Bash')).toEqual(754187)
      expect(player2.skillDamage(data.encounter, 'Staff Strike')).toEqual(921410)
      expect(player2.skillDamage(data.encounter, 'Punishing Strikes')).toEqual(760898)
    });

    it('has correct downs', () => {
      expect(data.player('Spoiled Ice Cream').downs(data)).toEqual(1)
      expect(data.player('Viking Clawhug').downs(data)).toEqual(1)
      expect(data.player('Albireo North').downs(data)).toEqual(0)
      expect(data.player('Morat Gurgeh').downs(data)).toEqual(1)
    });
  });
});
