import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { STUDIO_INFO } from '../data/portfolioData';
import { expect, test, vi } from 'vitest';

test('renders Navbar brand logo and consultation action button', () => {
  const handleOpenEnquiry = vi.fn();
  render(<Navbar onOpenEnquiry={handleOpenEnquiry} />);

  expect(screen.getByText(new RegExp(STUDIO_INFO.brandFirstName, 'i'))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(STUDIO_INFO.brandSecondName, 'i'))).toBeInTheDocument();

  const enquireButtons = screen.getAllByRole('button', { name: /Get Free Quote/i });
  expect(enquireButtons.length).toBeGreaterThan(0);

  fireEvent.click(enquireButtons[0]);
  expect(handleOpenEnquiry).toHaveBeenCalledTimes(1);
});
