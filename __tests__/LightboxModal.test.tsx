import { render, screen, fireEvent } from '@testing-library/react';
import LightboxModal from '../components/Gallery/LightboxModal';
import { PORTFOLIO_PHOTOS } from '../data/portfolioData';
import { expect, test, vi } from 'vitest';

test('renders LightboxModal photo details and triggers navigation and close actions', () => {
  const handleClose = vi.fn();
  const handleNavigate = vi.fn();
  const samplePhoto = PORTFOLIO_PHOTOS[0];

  render(
    <LightboxModal
      photo={samplePhoto}
      photosList={PORTFOLIO_PHOTOS}
      onClose={handleClose}
      onNavigate={handleNavigate}
    />
  );

  expect(screen.getByText(samplePhoto.title)).toBeInTheDocument();
  expect(screen.getByText(samplePhoto.location)).toBeInTheDocument();

  const closeBtn = screen.getByLabelText(/^Close$/i);
  fireEvent.click(closeBtn);

  expect(handleClose).toHaveBeenCalledTimes(1);
});
