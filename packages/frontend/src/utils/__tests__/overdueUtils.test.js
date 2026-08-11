import { isValidDueDate, isOverdue, toUtcDateString, OVERDUE_REFRESH_INTERVAL_MS } from '../overdueUtils';

describe('overdueUtils', () => {
  describe('isValidDueDate', () => {
    it('should return true for a valid date string', () => {
      expect(isValidDueDate('2025-12-25')).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidDueDate(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidDueDate(undefined)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isValidDueDate('')).toBe(false);
    });

    it('should return false for an invalid date string', () => {
      expect(isValidDueDate('not-a-date')).toBe(false);
    });
  });

  describe('toUtcDateString', () => {
    it('should format a Date as a UTC calendar-date string', () => {
      expect(toUtcDateString(new Date('2026-08-11T23:59:00Z'))).toBe('2026-08-11');
    });
  });

  describe('isOverdue', () => {
    const referenceDate = new Date('2026-08-11T12:00:00Z');

    it('should return true for an incomplete todo with a due date before the reference date', () => {
      const todo = { dueDate: '2026-08-10', completed: 0 };
      expect(isOverdue(todo, referenceDate)).toBe(true);
    });

    it('should return false for an incomplete todo due on the reference date', () => {
      const todo = { dueDate: '2026-08-11', completed: 0 };
      expect(isOverdue(todo, referenceDate)).toBe(false);
    });

    it('should return false for an incomplete todo due after the reference date', () => {
      const todo = { dueDate: '2026-08-12', completed: 0 };
      expect(isOverdue(todo, referenceDate)).toBe(false);
    });

    it('should return false for a completed todo even if past due', () => {
      const todo = { dueDate: '2026-08-10', completed: 1 };
      expect(isOverdue(todo, referenceDate)).toBe(false);
    });

    it('should return false when dueDate is missing', () => {
      const todo = { dueDate: null, completed: 0 };
      expect(isOverdue(todo, referenceDate)).toBe(false);
    });

    it('should return false when dueDate is invalid', () => {
      const todo = { dueDate: 'not-a-date', completed: 0 };
      expect(isOverdue(todo, referenceDate)).toBe(false);
    });

    it('should return false when todo is null or undefined', () => {
      expect(isOverdue(null, referenceDate)).toBe(false);
      expect(isOverdue(undefined, referenceDate)).toBe(false);
    });
  });

  describe('OVERDUE_REFRESH_INTERVAL_MS', () => {
    it('should be at most 60 seconds', () => {
      expect(OVERDUE_REFRESH_INTERVAL_MS).toBeLessThanOrEqual(60000);
    });
  });
});
