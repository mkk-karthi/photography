import { render, screen } from '@testing-library/react';
import StatsSection from '../components/StatsSection';
import { STUDIO_INFO, STATS_SECTION_TEXT, STUDIO_STATS } from '../data/portfolioData';
import { expect, test } from 'vitest';

test('renders StatsSection achievements, stats labels, and trust badges', () => {
  render(<StatsSection />);

  expect(screen.getByText(STATS_SECTION_TEXT.badge)).toBeInTheDocument();
  expect(screen.getByText(STUDIO_STATS[0].label)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Established ${STUDIO_INFO.establishedYear}`, 'i'))).toBeInTheDocument();
});
