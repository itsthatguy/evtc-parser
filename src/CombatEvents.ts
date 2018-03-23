export enum CombatResult {// good physical hit
  CRIT, // physical hit was crit
  GLANCE, // physical hit was glance
  BLOCK, // physical hit was blocked eg. mesmer shield 4
  EVADE, // physical hit was evaded, eg. dodge or mesmer sword 2
  INTERRUPT, // physical hit interrupted something
  ABSORB, // physical hit was "invlun" or absorbed eg. guardian elite
  BLIND, // physical hit missed
  KILLINGBLOW // physical hit was killing hit
};

export enum CombatStateChange {
	NONE, // not used - not this kind of event
	ENTERCOMBAT, // src_agent entered combat, dst_agent is subgroup
	EXITCOMBAT, // src_agent left combat
	CHANGEUP, // src_agent is now alive
	CHANGEDEAD, // src_agent is now dead
	CHANGEDOWN, // src_agent is now downed
	SPAWN, // src_agent is now in game tracking range
	DESPAWN, // src_agent is no longer being tracked
	HEALTHUPDATE, // src_agent has reached a health marker. dst_agent = percent * 10000 (eg. 99.5% will be 9950)
	LOGSTART, // log start. value = server unix timestamp **uint32**. buff_dmg = local unix timestamp. src_agent = 0x637261 (arcdps id)
	LOGEND, // log end. value = server unix timestamp **uint32**. buff_dmg = local unix timestamp. src_agent = 0x637261 (arcdps id)
	WEAPSWAP, // src_agent swapped weapon set. dst_agent = current set id (0/1 water, 4/5 land)
	MAXHEALTHUPDATE, // src_agent has had it's maximum health changed. dst_agent = new max health
	POINTOFVIEW, // src_agent will be agent of "recording" player
	LANGUAGE, // src_agent will be text language
	GWBUILD, // src_agent will be game build
	SHARDID, // src_agent will be sever shard id
	REWARD // src_agent is self, dst_agent is reward id, value is reward type. these are the wiggly boxes that you get
};

export enum CombatActivation {
	NONE, // not used - not this kind of event
	NORMAL, // activation without quickness
	QUICKNESS, // activation with quickness
	CANCEL_FIRE, // cancel with reaching channel time
	CANCEL_CANCEL, // cancel without reaching channel time
	RESET // animation completed fully
};
