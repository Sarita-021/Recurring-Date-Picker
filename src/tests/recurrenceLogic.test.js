import { generateRecurringDates } from '../utils/recurrenceLogic';

test('generates weekly recurrence on specific days', () => {
  const rule = { frequency: 'weekly', interval: 1, daysOfWeek: [1, 3] };
  const range = {
    start: new Date('2025-07-01'),
    end: new Date('2025-07-15'),
  };
  const dates = generateRecurringDates(rule, range);
  expect(dates.every(d => [1, 3].includes(d.getDay()))).toBe(true);
});

