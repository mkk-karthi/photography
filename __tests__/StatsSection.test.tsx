import { render, screen } from '@testing-library/react';
import StatsSection from '../components/StatsSection';
import { STUDIO_INFO, TRUST_BADGES } from '../data/portfolioData';
import { expect, test } from 'vitest';

test('renders StatsSection achievements, stats labels, and trust badges', () => {
  render(<StatsSection />);

  expect(screen.getByText(/Studio Achievements/i)).toBeInTheDocument();
  expect(screen.getByText(/Weddings Covered/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Established ${STUDIO_INFO.establishedYear}`, 'i'))).toBeInTheDocument();
});
