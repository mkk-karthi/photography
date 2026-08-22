import { render, screen } from '@testing-library/react';
import AboutStudio from '../components/About/AboutStudio';
import { STUDIO_INFO, ABOUT_SECTION_TEXT, STUDIO_MILESTONES } from '../data/portfolioData';
import { expect, test } from 'vitest';

test('renders AboutStudio section title and milestones', () => {
  render(<AboutStudio />);

  expect(screen.getByText(ABOUT_SECTION_TEXT.badge)).toBeInTheDocument();
  expect(screen.getByText(STUDIO_MILESTONES[0].title)).toBeInTheDocument();
});
