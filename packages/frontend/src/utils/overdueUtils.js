/**
 * Overdue Utils
 * Pure helpers for deriving overdue status and presentation timing for todos.
 * Overdue determination uses a UTC calendar-date boundary (see spec Clarifications).
 */

/** Maximum interval for re-evaluating overdue status while a list view stays open. */
export const OVERDUE_REFRESH_INTERVAL_MS = 60000;

/**
 * Check whether a due date value is a valid, comparable date.
 * @param {string|null|undefined} dueDate
 * @returns {boolean}
 */
export function isValidDueDate(dueDate) {
  if (!dueDate || typeof dueDate !== 'string') {
    return false;
  }

  const parsed = new Date(dueDate);
  return !isNaN(parsed.getTime());
}

/**
 * Convert a Date to a UTC calendar-date string (YYYY-MM-DD) for boundary comparisons.
 * @param {Date} date
 * @returns {string}
 */
export function toUtcDateString(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Determine whether a todo is overdue: incomplete, with a valid due date earlier
 * than the current UTC calendar date.
 * @param {{completed?: number|boolean, dueDate?: string|null}} todo
 * @param {Date} [referenceDate] - Defaults to now; injectable for deterministic tests.
 * @returns {boolean}
 */
export function isOverdue(todo, referenceDate = new Date()) {
  if (!todo || todo.completed) {
    return false;
  }

  if (!isValidDueDate(todo.dueDate)) {
    return false;
  }

  return todo.dueDate < toUtcDateString(referenceDate);
}
