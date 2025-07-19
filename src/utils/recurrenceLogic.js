/**
 * Generates recurring dates based on the provided recurrence rule and date range
 * @param {Object} dateRange - The date range with start and optional end date
 * @param {Object} rule - The recurrence rule configuration
 * @returns {Array} - Array of Date objects representing the recurring dates
 */
export function generateRecurringDates(dateRange, rule) {
  if (!dateRange?.start) return [];
  
  const results = [];
  const current = new Date(dateRange.start);
  // Set time to midnight for consistent date handling
  current.setHours(0, 0, 0, 0);
  
  // If no end date is provided, limit to 1 year from start for safety
  const end = dateRange.end ? new Date(dateRange.end) : new Date(current);
  end.setHours(23, 59, 59, 999); // End of the day
  
  if (!dateRange.end) {
    end.setFullYear(end.getFullYear() + 1); // Default 1 year limit if no end date
  }
  
  // Maximum number of occurrences to prevent infinite loops
  const MAX_OCCURRENCES = 100;
  
  // For weekly recurrence, if no days are selected, use the start date's day
  if (rule.frequency === 'weekly' && (!rule.daysOfWeek || rule.daysOfWeek.length === 0)) {
    rule.daysOfWeek = [current.getDay()];
  }
  
  // Handle different recurrence patterns
  switch (rule.frequency) {
    case 'daily': {
      // Simple daily recurrence with interval
      let count = 0;
      const date = new Date(current);
      
      while (date <= end && count < MAX_OCCURRENCES) {
        results.push(new Date(date));
        date.setDate(date.getDate() + rule.interval);
        count++;
      }
      break;
    }
    
    case 'weekly': {
      // Weekly recurrence on specific days of week
      let count = 0;
      const date = new Date(current);
      
      // Find the first occurrence
      while (date <= end && count < MAX_OCCURRENCES) {
        if (rule.daysOfWeek.includes(date.getDay())) {
          results.push(new Date(date));
          count++;
        }
        date.setDate(date.getDate() + 1);
      }
      
      // Add interval weeks for subsequent occurrences
      if (rule.interval > 1 && results.length > 0) {
        const filteredResults = [results[0]];
        let lastWeekStart = new Date(results[0]);
        
        for (let i = 1; i < results.length; i++) {
          const currentDate = results[i];
          const weekDiff = Math.floor((currentDate - lastWeekStart) / (7 * 24 * 60 * 60 * 1000));
          
          if (weekDiff >= rule.interval) {
            filteredResults.push(currentDate);
            lastWeekStart = new Date(currentDate);
            lastWeekStart.setDate(lastWeekStart.getDate() - lastWeekStart.getDay());
          }
        }
        
        return filteredResults;
      }
      break;
    }
    
    case 'monthly': {
      // Monthly recurrence
      let count = 0;
      const date = new Date(current);
      const dayOfMonth = current.getDate();
      
      while (date <= end && count < MAX_OCCURRENCES) {
        if (rule.pattern) {
          // Handle "First Monday", "Second Tuesday", etc.
          const [ordinal, weekday] = rule.pattern.split(' ');
          const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);
          
          if (weekdayIndex !== -1) {
            const targetDate = findNthWeekdayInMonth(
              date.getFullYear(),
              date.getMonth(),
              weekdayIndex,
              ['First', 'Second', 'Third', 'Fourth', 'Last'].indexOf(ordinal)
            );
            
            if (targetDate && targetDate <= end) {
              results.push(new Date(targetDate));
            }
          }
        } else {
          // Simple day-of-month recurrence
          const targetDate = new Date(date.getFullYear(), date.getMonth(), dayOfMonth);
          
          // Handle cases where the day doesn't exist in the month (e.g., Feb 30)
          if (targetDate.getMonth() === date.getMonth() && targetDate <= end) {
            results.push(new Date(targetDate));
          }
        }
        
        // Move to next month based on interval
        date.setMonth(date.getMonth() + rule.interval);
        count++;
      }
      break;
    }
    
    case 'yearly': {
      // Yearly recurrence on the same day/month each year
      let count = 0;
      const date = new Date(current);
      const month = current.getMonth();
      const dayOfMonth = current.getDate();
      
      while (date <= end && count < MAX_OCCURRENCES) {
        const targetDate = new Date(date.getFullYear(), month, dayOfMonth);
        
        if (targetDate <= end) {
          results.push(new Date(targetDate));
        }
        
        // Move to next year based on interval
        date.setFullYear(date.getFullYear() + rule.interval);
        count++;
      }
      break;
    }
    
    default:
      break;
  }
  
  return results;
}

/**
 * Finds the nth occurrence of a specific weekday in a month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @param {number} weekday - The weekday (0-6, where 0 is Sunday)
 * @param {number} n - The occurrence (0-4, where 4 means last)
 * @returns {Date} - The date of the nth weekday
 */
function findNthWeekdayInMonth(year, month, weekday, n) {
  const date = new Date(year, month, 1);
  let count = 0;
  
  // If looking for the last occurrence
  if (n === 4) {
    // Start from the last day of the month and go backwards
    date.setMonth(month + 1, 0); // Last day of the month
    
    while (date.getDay() !== weekday) {
      date.setDate(date.getDate() - 1);
    }
    
    return date;
  }
  
  // For 1st, 2nd, 3rd, 4th occurrences
  while (date.getMonth() === month) {
    if (date.getDay() === weekday) {
      if (count === n) {
        return date;
      }
      count++;
    }
    date.setDate(date.getDate() + 1);
  }
  
  // If the requested occurrence doesn't exist in this month
  return null;
}
