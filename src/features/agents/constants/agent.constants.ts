export const ASSISTANT_NAME = "Gorlock";

export const SUGGESTED_PROMPTS = [
  {
    icon: "zap",
    title: "Analyze My Appliances",
    desc: "Find which appliances consume the most electricity",
    prompt:
      "Which of my appliances use the most electricity and how can I reduce their consumption?",
  },
  {
    icon: "plus",
    title: "Add an Appliance",
    desc: "Tell Gorlock about an appliance to track it",
    prompt:
      "I want to add my air conditioner. It's 1000 watts and I use it about 8 hours a day.",
  },
  {
    icon: "calculator",
    title: "My Monthly Electricity Cost",
    desc: "Check my estimated bill and energy usage",
    prompt:
      "How much is my estimated monthly electricity bill and what is causing my energy consumption?",
  },
  {
    icon: "lightbulb",
    title: "Personalized Saving Tips",
    desc: "Get energy-saving advice based on my appliances",
    prompt:
      "Give me personalized tips to reduce my electricity bill based on my appliances and energy usage.",
  },
  {
    icon: "settings",
    title: "Update My Appliances",
    desc: "Change wattage, usage hours, or icons of appliances",
    prompt:
      "Can you show me my appliances? I need to update some of their details.",
  },
  {
    icon: "chart",
    title: "My Energy Score",
    desc: "Understand your saving score and improve it",
    prompt: "What is my energy saving score and what can I do to improve it?",
  },
];

export const MUTATION_TOOL_NAMES = new Set([
  "add_user_appliance",
  "update_user_appliance",
  "delete_user_appliance",
]);
