describe('evtc-parser', () => {
  const parser = require('../src/index');
  let data;

  beforeAll(async () => {
    data = await parser.fromFile('./__data__/evtc/file_3.evtc.zip');
  });

  describe('agents', () => {
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

  describe('computed', () => {
    it('Nava Aylah', () => {
      const player = data.player('Nava Aylah')
      expect(player.bossDamage(data)).toEqual(214088)
    });

    it('Majis Flamescrawl', () => {
      const player = data.player('Majis Flamescrawl')
      expect(player.bossDamage(data)).toEqual(1157391)
    });

    it('Valera Puregaze', () => {
      const player = data.player('Valera Puregaze')
      expect(player.bossDamage(data)).toEqual(990309)
    });

    it('Bettrys', () => {
      const player = data.player('Bettrys')
      expect(player.bossDamage(data)).toEqual(1130339)
    });

    it('Reathe Thorne', () => {
      const player = data.player('Reathe Thorne')
      expect(player.bossDamage(data)).toEqual(374172)
    });

    it('All Used Up', () => {
      const player = data.player('All Used Up')
      expect(player.bossDamage(data)).toEqual(159335)
    });

    it('Carinjie', () => {
      const player = data.player('Carinjie')
      expect(player.bossDamage(data)).toEqual(564164)
    });

    it('Sushimao', () => {
      const player = data.player('Sushimao')
      expect(player.bossDamage(data)).toEqual(1581720)
    });

    it('Auppe', () => {
      const player = data.player('Auppe')
      expect(player.bossDamage(data)).toEqual(1013526)
    });

    it('Vikinghug', () => {
      const player = data.player('Vikinghug')
      expect(player.bossDamage(data)).toEqual(146739)
    });
  });
});
