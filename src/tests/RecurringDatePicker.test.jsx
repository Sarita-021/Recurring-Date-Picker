import { render, screen } from '@testing-library/react';
import RecurringDatePicker from '../components/RecurringDatePicker';

test('renders recurring date picker component', () => {
  render(<RecurringDatePicker />);
  expect(screen.getByText(/Recurring Date Picker/i)).toBeInTheDocument();
});
