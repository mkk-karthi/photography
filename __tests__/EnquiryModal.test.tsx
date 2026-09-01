import { render, screen, fireEvent } from '@testing-library/react';
import EnquiryModal from '../components/Enquiry/EnquiryModal';
import { expect, test, vi } from 'vitest';

test('renders EnquiryModal tabs and handles closing', () => {
  const handleClose = vi.fn();
  render(<EnquiryModal isOpen={true} onClose={handleClose} />);

  expect(screen.getByRole('button', { name: /Photoshoot/i })).toBeInTheDocument();

  const closeButton = screen.getByTitle('Close form');
  fireEvent.click(closeButton);

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('switches form when clicking tabs', async () => {
  render(<EnquiryModal isOpen={true} onClose={() => {}} />);

  expect(screen.getByText(/Book Photoshoot/i)).toBeInTheDocument();

  const frameTabButton = screen.getByRole('button', { name: /Frame/i });
  fireEvent.click(frameTabButton);

  expect(await screen.findByText(/Custom Photo Frame/i)).toBeInTheDocument();
});

