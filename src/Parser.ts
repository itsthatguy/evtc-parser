import SmartBuffer from './smarter-buffer';
import createAgent from './Agents';
import createEvent from './Events';
import { CombatStateChange } from './CombatEvents';

type Encounter = {
  arcVersion: number;
  targetSpeciesId: number;
  agentCount: number;
  agents: any[];
  skillCount: number;
  skills: any[];
  players: any[];
  eventCount: number;
  events: any[];
}

const BYTES = {
  arcVersion: 12,
  targetSpeciesId: 2,
  agentsCount: 4,
  agents: 96,
  skillCount: 4,
  skills: 68,
  combatEvents: 64,
};

export default class Parser {
  private buffer;
  public encounter: Encounter = {
    arcVersion: null,
    targetSpeciesId: null,
    agentCount: null,
    agents: [],
    skillCount: null,
    skills: [],
    players: [],
    eventCount: null,
    events: [],
  };

  constructor (buffer) {
    this.buffer = SmartBuffer.fromBuffer(buffer);

    this.parseMetadata();
    this.parseAgents();
    this.parseSkills();
    this.parseEvents();
    this.addInstanceIds();
    this.addAwareTimes();
  }

  private addAwareTimes () {
    const { agents, events } = this.encounter;

    agents.map((agent) => {
      agent.firstAware = events[0].time
      agent.lastAware = events[events.length-1].time
      return agent;
    });
  }

  private addInstanceIds() {
    this.encounter.events.forEach((event) => {
      this.encounter.agents.map((agent) => {
        if (agent.agentId === event.srcAgent && !event.isStateChange) {
          agent.instanceId = event.srcInstId;
        }

        return agent;
      });
    })
  }

  private parseMetadata () {
    this.encounter.arcVersion = this.buffer.readString(BYTES.arcVersion);
    this.encounter.targetSpeciesId = this.buffer.skip(1).readUIntLE(BYTES.targetSpeciesId);
  }

  private parseAgents () {
    this.encounter.agentCount = this.buffer.skip(1).readUIntLE(4);
    this.buffer.setBookmark('agents');
    this.buffer.readUIntLE(BYTES.agentsCount);

    for (let i = 0; i < this.encounter.agentCount; i++) {
      this.buffer.useBookmark('agents');
      this.buffer.skip(BYTES.agents * i);
      const agent = createAgent(this.encounter, {
        agentId: this.buffer.readUIntLE(8),
        profession: this.buffer.readUIntLE(4),
        isElite: this.buffer.readUIntLE(4),
        toughness: this.buffer.readUIntLE(4),
        healing: this.buffer.readUIntLE(4),
        condition: this.buffer.readUIntLE(4),
        name: this.buffer.readString(68)
      });

      this.encounter.agents.push(agent);
    }
  }

  private parseSkills () {
    this.encounter.skillCount = this.buffer.readUIntLE(BYTES.skillCount);
    this.buffer.setBookmark('skills');

    for (let i = 0; i < this.encounter.skillCount; i++) {
      this.buffer.useBookmark('skills')
      this.buffer.skip(BYTES.skills * i);

      this.encounter.skills.push({
        skillId: this.buffer.readUIntLE(4),
        name: this.buffer.readString(64)
      });
    }
  }

  private parseEvents () {
    this.encounter.eventCount = this.buffer.remaining() / BYTES.combatEvents;
    this.buffer.setBookmark('events');

    for (let i = 0; i < this.encounter.eventCount; i++) {
      this.buffer.useBookmark('events')
      this.buffer.skip(BYTES.combatEvents * i);
      const event = {
        time: this.buffer.readUIntLE(8),
        srcAgent: this.buffer.readUIntLE(8),
        dstAgent: this.buffer.readUIntLE(8),
        value: this.buffer.readUIntLE(4),
        buffDamage: this.buffer.readUIntLE(4),
        overstackValue: this.buffer.readUIntLE(2),
        skillId: this.buffer.readUIntLE(2),
        srcInstId: this.buffer.readUIntLE(2),
        dstInstId: this.buffer.readUIntLE(2),
        srcMasterInstId: this.buffer.readUIntLE(2),
        iff: this.buffer.skip(9).readUIntLE(1),
        buff: this.buffer.readUIntLE(1),
        result: this.buffer.readUIntLE(1),
        isActivation: this.buffer.readUIntLE(1),
        isBuffRemove: this.buffer.readUIntLE(1),
        isNinety: this.buffer.readUIntLE(1),
        isFifty: this.buffer.readUIntLE(1),
        isMoving: this.buffer.readUIntLE(1),
        isStateChange: this.buffer.readUIntLE(1),
        isFlanking: this.buffer.readUIntLE(1),
        isShields: this.buffer.readUIntLE(1),
      };

      this.encounter.events.push(event);
    }
  }

  public boss = () => {
    return this.encounter.agents.find(a => a.isBoss);
  }

  public players () {
    return this.encounter.agents.filter(a => a.isPlayer);
  }

  public player (nameOrAccountOrId) {
    return this.players().find(a => {
      return a.name == nameOrAccountOrId
        || a.account === nameOrAccountOrId
        || a.agentId === nameOrAccountOrId;
    });
  }

  public totalDamage () {
  }

  parseDPS () {
    return 'NOT IMPLEMENTED';
  }
}
