import { BaseAgent } from './base';
import { Player } from './player';
import { Boss } from './boss';
const specializations = require('../../__data__/specializations.json')

export default (encounter, properties) => {
  if (properties.isElite !== 0xffffffff) {
    const foo = specializations.filter(p => p.id === properties.profession);
    const name = properties.name
      .split("\0")
      .filter(n => n != '');

    if (foo.length > 0) return new Player(properties);
    return new Player(properties);
  } else if (
  encounter.targetSpeciesId &&
  encounter.targetSpeciesId === properties.profession) {
    return new Boss(properties)
  } else {
    return new BaseAgent(properties.name);
  }
}

export { Player };
