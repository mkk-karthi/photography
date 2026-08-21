import { render, screen } from '@testing-library/react';
import PageLoader from '../components/PageLoader';
import { STUDIO_INFO } from '../data/portfolioData';
import { expect, test } from 'vitest';

test('renders PageLoader Viewfinder graphic', () => {
  render(<PageLoader />);

  expect(screen.getByText(new RegExp(STUDIO_INFO.brandFirstName, 'i'))).toBeInTheDocument();
  expect(screen.getByText(/REC/i)).toBeInTheDocument();
});
