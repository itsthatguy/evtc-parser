import * as fs from 'fs';
import { resolve } from 'path';
import { forEach } from 'lodash';

describe('damage', () => {
  const parser = require('../../src/index');
  let data;

  describe('automated tests', () => {

    fs.readdirSync(resolve(__dirname, '../../downloads')).forEach(f => {
      if (/\.json$/.test(f)) {
        const file = require(`../../downloads/${f}`)
        describe(`${file.encounter.name} (${f})`, () => {

        beforeAll(async () => {
          data = await parser.fromFile(`./downloads/${file.encounter.url_id}.zip`);
        });

        forEach(file.encounter.parties, (p) => {
          forEach(p.members, (m) => {
            let player;
            const { actual, actual_boss, events } = m.phases.All;

            beforeEach(() => {
              player = data.player(m.name)
            });

            describe(m.name, () => {
              it(`should have the correct boss damage`, () => {
                expect(player.bossDamage(data)).toEqual(actual_boss.total)
              });

              it(`should have the correct cleave damage`, () => {
                expect(player.cleaveDamage(data)).toEqual(actual.total)
              });
              it(`should have the correct number of downs`, () => {
                expect(player.downs(data)).toEqual(events.downs)
              });
            });
          })
        });
      });
    });
  });
});
