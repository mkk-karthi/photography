import { render, screen } from '@testing-library/react';
import AboutStudio from '../components/About/AboutStudio';
import { STUDIO_INFO } from '../data/portfolioData';
import { expect, test } from 'vitest';

test('renders AboutStudio section title and milestones', () => {
  render(<AboutStudio />);

  expect(screen.getByText(new RegExp(`${STUDIO_INFO.name} Studio`, 'i'))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Studio Founded in ${STUDIO_INFO.city}`, 'i'))).toBeInTheDocument();
});
