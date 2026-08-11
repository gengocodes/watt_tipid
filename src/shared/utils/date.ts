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

/**
 * Formats a month label string from "YYYY-MM" format to a full month and year name (e.g. "August 2026").
 * Falls back to the original string if parsing fails.
 */
export const formatMonthWithYear = (value: string): string => {
  try {
    const parts = value.split("-");
    if (parts.length < 2) return value;
    const date = new Date(
      Number.parseInt(parts[0], 10),
      Number.parseInt(parts[1], 10) - 1,
      1,
    );
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch {
    return value;
  }
};

/**
 * Returns a "YYYY-MM" formatted string for a given Date object in local time (defaults to current date).
 * Prevents UTC timezone offset shifts when generating month keys.
 */
export const getLocalYearMonth = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};
