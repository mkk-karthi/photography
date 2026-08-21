import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { STUDIO_INFO } from '../data/portfolioData';
import { expect, test, vi } from 'vitest';

test('renders Footer studio info and contact details', () => {
  const handleOpenEnquiry = vi.fn();
  render(<Footer onOpenEnquiry={handleOpenEnquiry} />);

  expect(screen.getAllByText(new RegExp(STUDIO_INFO.brandFirstName, 'i')).length).toBeGreaterThan(0);
  expect(screen.getByText(new RegExp(STUDIO_INFO.email, 'i'))).toBeInTheDocument();
});
