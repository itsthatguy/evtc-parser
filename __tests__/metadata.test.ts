describe('metadata', () => {
  const parser = require('../src/index');
  let data;

  describe('file_1.evtc.zip', () => {
    beforeAll(async () => {
      data = await parser.fromFile('./__data__/evtc/file_1.evtc.zip');
    });

    afterAll(() => data = null);

    it('has the correct number of agents', async () => {
      expect(data.encounter.agentCount).toEqual(162);
      expect(data.encounter.agents).toHaveLength(162);
    });

    it('contains a boss named `Mursaat Overseer`', () => {
      expect(data.encounter.agents.find(a => a.isBoss).name).toEqual('Mursaat Overseer');
    });
  });

  describe('file_2.evtc.zip', () => {
    beforeAll(async () => {
      data = await parser.fromFile('./__data__/evtc/file_2.evtc.zip');
    });

    afterAll(() => data = null);

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
  });

  describe('file_3.evtc.zip', () => {
    beforeAll(async () => {
      data = await parser.fromFile('./__data__/evtc/file_3.evtc.zip');
    });

    afterAll(() => data = null);

    it('has the correct number of agents', async () => {
      expect(data.encounter.agentCount).toEqual(92);
      expect(data.encounter.agents).toHaveLength(92);
    });

    it('contains 1 boss', () => {
      expect(data.encounter.agents.filter(a => a.isBoss)).toHaveLength(1);
    });

    it('contains a boss named `Gorseval the Multifarious`', () => {
      expect(data.encounter.agents.find(a => a.isBoss).name).toEqual('Gorseval the Multifarious');
    });
  });
});
