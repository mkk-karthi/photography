import { render, screen, fireEvent } from '@testing-library/react';
import CTASection from '../components/CTASection';
import { STUDIO_INFO, CTA_SECTION_TEXT } from '../data/portfolioData';
import { expect, test, vi } from 'vitest';

test('renders CTASection header, phone number and triggers consultation booking', () => {
  const handleOpenEnquiry = vi.fn();
  render(<CTASection onOpenEnquiry={handleOpenEnquiry} />);

  expect(screen.getByText(CTA_SECTION_TEXT.subtitle)).toBeInTheDocument();
  expect(screen.getByText(STUDIO_INFO.phone)).toBeInTheDocument();

  const bookBtn = screen.getByRole('button', { name: /Book a Free Consultation/i });
  fireEvent.click(bookBtn);

  expect(handleOpenEnquiry).toHaveBeenCalledTimes(1);
});
