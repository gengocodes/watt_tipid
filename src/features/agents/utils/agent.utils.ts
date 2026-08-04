export const TOOL_LABEL_MAP: Record<string, string> = {
  get_user_appliances: "Appliance Lookup",
  get_user_energy_summary: "Energy Summary",
};

export const getToolLabel = (toolName: string): string => {
  if (TOOL_LABEL_MAP[toolName]) {
    return TOOL_LABEL_MAP[toolName];
  }
  const cleanName = toolName.replaceAll("get_", "").replaceAll("_", " ");
  return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
};
