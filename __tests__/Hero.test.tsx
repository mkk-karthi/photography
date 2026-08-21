import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../components/Hero';
import { STUDIO_INFO } from '../data/portfolioData';
import { expect, test, vi } from 'vitest';

test('renders Hero title and book consultation button', () => {
  const handleOpenEnquiry = vi.fn();
  render(<Hero onOpenEnquiry={handleOpenEnquiry} />);

  expect(screen.getAllByText(new RegExp(STUDIO_INFO.name, 'i')).length).toBeGreaterThan(0);
  const bookButton = screen.getByRole('button', { name: /Book Event Consultation/i });
  expect(bookButton).toBeInTheDocument();

  fireEvent.click(bookButton);
  expect(handleOpenEnquiry).toHaveBeenCalledTimes(1);
});
