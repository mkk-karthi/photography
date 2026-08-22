import { render, screen } from '@testing-library/react';
import ServicesSection from '../components/Services/ServicesSection';
import { SERVICES_SECTION_TEXT, SERVICE_PACKAGES } from '../data/portfolioData';
import { expect, test, vi } from 'vitest';

test('renders ServicesSection packages and book actions', () => {
  const handleSelectService = vi.fn();
  render(<ServicesSection onSelectService={handleSelectService} />);

  expect(screen.getByText(SERVICES_SECTION_TEXT.badge)).toBeInTheDocument();
  expect(screen.getByText(SERVICE_PACKAGES[0].title)).toBeInTheDocument();
  expect(screen.getByText(SERVICE_PACKAGES[1].title)).toBeInTheDocument();
});
