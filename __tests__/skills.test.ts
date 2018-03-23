describe('skills', () => {
  const parser = require('../src/index');
  let data;

  beforeAll(async () => {
    data = await parser.fromFile('./__data__/evtc/file_2.evtc.zip');
  });

  describe('file_2.evtc.zip', () => {
    it('has the correct number of skills', async () => {
      expect(data.encounter.skillCount).toEqual(430);
      expect(data.encounter.skills).toHaveLength(430);
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
