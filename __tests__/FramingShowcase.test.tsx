import { render, screen, fireEvent } from '@testing-library/react';
import FramingShowcase from '../components/Services/FramingShowcase';
import { STUDIO_INFO } from '../data/portfolioData';
import { expect, test, vi } from 'vitest';

test('renders FramingShowcase frame options and triggers order action', () => {
  const handleOrderFrame = vi.fn();
  render(<FramingShowcase onOrderFrame={handleOrderFrame} />);

  expect(screen.getByText(new RegExp(`${STUDIO_INFO.shortName} Custom Framing Studio`, 'i'))).toBeInTheDocument();
  expect(screen.getByText(/Archival Wall Art/i)).toBeInTheDocument();

  const orderButtons = screen.getAllByRole('button', { name: /Order/i });
  expect(orderButtons.length).toBeGreaterThan(0);

  fireEvent.click(orderButtons[0]);
  expect(handleOrderFrame).toHaveBeenCalledTimes(1);
});
