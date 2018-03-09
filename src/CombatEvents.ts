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
