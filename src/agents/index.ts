import { BaseAgent } from './Base';
import { Boss } from './Boss';
import { Gadget } from './Gadget';
import { Npc } from './Npc';
import { Player } from './Player';

const splitProfession = (properties: AgentProperties) => {
  const professionBuffer = Buffer.allocUnsafe(4);
  professionBuffer.writeUIntLE(properties.profession, 0, 4);

  properties.professionLower = professionBuffer.readUIntLE(0, 2);
  properties.professionUpper = professionBuffer.readUIntLE(2, 2);
  return properties;
};

const combiner = (properties: AgentProperties) => {
  const propertiesWithSlipProfession = splitProfession(properties);
  return (fn, encounter = null) => fn(propertiesWithSlipProfession, encounter);
};

const checkGadget = ({ isElite, professionUpper }: AgentProperties) => (isElite === 0xffffffff && professionUpper == 0xffff);
const checkNpc = ({ isElite, professionUpper }: AgentProperties) => (isElite === 0xffffffff && professionUpper != 0xffff);
const checkPlayer = ({ isElite }: AgentProperties) => (isElite !== 0xffffffff);
const checkBoss = ({ isElite, profession }: AgentProperties, { targetSpeciesId }) => (
  isElite === 0xffffffff
  && targetSpeciesId
  && targetSpeciesId === profession
);

const isGadget = (properties: AgentProperties) => combiner(properties)(checkGadget)
const isNpc = (properties) => combiner(properties)(checkNpc)
const isBoss = (properties, encounter) => combiner(properties)(checkBoss, encounter)
const isPlayer = (properties) => combiner(properties)(checkPlayer)

export default (encounter, properties: AgentProperties) => {
  try {
    if (isBoss(properties, encounter)) return new Boss(properties);
    else if (isGadget(properties)) return new Gadget(properties);
    else if (isNpc(properties)) return new Npc(properties);
    else if (isPlayer(properties)) return new Player(properties);
    else throw new Error(`I DON'T KNOW WHAT THIS IS`);
  } catch (error) {
    console.error(error);
  }
};
