/**
 * Formats a month label string from "YYYY-MM" format to a readable short month name (e.g. "Jan", "Feb").
 * Falls back to the original string if parsing fails.
 */
export const formatMonth = (value: string): string => {
  try {
    const parts = value.split("-");
    if (parts.length < 2) return value;
    const date = new Date(
      Number.parseInt(parts[0], 10),
      Number.parseInt(parts[1], 10) - 1,
      1,
    );
    return date.toLocaleDateString("en-US", { month: "short" });
  } catch {
    return value;
  }
};
