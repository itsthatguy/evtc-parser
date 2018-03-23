describe('dps', () => {
  const parser = require('../../src/index');
  let data;

  describe('file_2.evtc.zip', () => {
    beforeAll(async () => {
      data = await parser.fromFile('./__data__/evtc/file_2.evtc.zip');
    });

    afterAll(() => data = null);

    fit('has the correct dps for -----', () => {
      const player = data.player('Viking Clawhug');
      expect(player.name).toEqual('Viking Clawhug');
    });
  });
});
