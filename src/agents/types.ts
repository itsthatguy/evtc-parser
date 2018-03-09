declare interface AgentProperties {
  agentId: number;
  profession: number;
  professionLower?: number;
  professionUpper?: number;
  isElite: number;
  toughness: number;
  healing: number;
  condition: number;
  name: string;
  specialization?: number;

  isBoss?: boolean;
  isGadget?: boolean;
  isNpc?: boolean;
  isPlayer?: boolean;
}
