import { render, screen } from '@testing-library/react';
import ServicesSection from '../components/Services/ServicesSection';
import { expect, test, vi } from 'vitest';

test('renders ServicesSection packages and book actions', () => {
  const handleSelectService = vi.fn();
  render(<ServicesSection onSelectService={handleSelectService} />);

  expect(screen.getByText(/Royal Wedding Photography/i)).toBeInTheDocument();
  expect(screen.getByText(/Cinematic Pre-Wedding Shoot/i)).toBeInTheDocument();
});
