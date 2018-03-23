describe('damage', () => {
  const parser = require('../../src/index');
  let data;

  describe('file_2.evtc.zip', () => {

    beforeAll(async () => {
      data = await parser.fromFile('./__data__/evtc/file_2.evtc.zip');
    });

    afterAll(() => data = null)

    it('Spoiled Ice Cream', () => {
      const player = data.player('Spoiled Ice Cream')
      expect(player.cleaveDamage(data)).toEqual(5839038);
      expect(player.bossDamage(data)).toEqual(4424215);
    });
    it('Viking Clawhug', () => {
      const player = data.player('Viking Clawhug')
      expect(player.bossDamage(data)).toEqual(1419913)
      expect(player.cleaveDamage(data)).toEqual(2162294)
    });
    it('Albireo North', () => {
      const player = data.player('Albireo North')
      expect(player.bossDamage(data)).toEqual(3484548)
      expect(player.cleaveDamage(data)).toEqual(5492039)
    });
    it('Foxi Shadi', () => {
      expect(data.player('Foxi Shadi').bossDamage(data)).toEqual(3312402)
      expect(data.player('Foxi Shadi').cleaveDamage(data)).toEqual(5124294)
    });

    it('Eloo Siev', () => {
      const player = data.player('Eloo Siev')
      expect(player.bossDamage(data)).toEqual(3576733)
      expect(player.cleaveDamage(data)).toEqual(5043370)
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

    it('has correct downs', () => {
      expect(data.player('Spoiled Ice Cream').downs(data)).toEqual(1)
      expect(data.player('Viking Clawhug').downs(data)).toEqual(1)
      expect(data.player('Albireo North').downs(data)).toEqual(0)
      expect(data.player('Morat Gurgeh').downs(data)).toEqual(1)
    });
  });

  describe('file_3.evtc.zip', () => {

    beforeAll(async () => {
      data = await parser.fromFile('./__data__/evtc/file_3.evtc.zip');
    });

    afterAll(() => data = null)

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
