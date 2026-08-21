import { render, screen, fireEvent } from '@testing-library/react';
import EnquiryModal from '../components/Enquiry/EnquiryModal';
import { expect, test, vi } from 'vitest';

test('renders EnquiryModal tabs and handles closing', () => {
  const handleClose = vi.fn();
  render(<EnquiryModal isOpen={true} onClose={handleClose} />);

  expect(screen.getByText(/Book Photoshoot/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Photoshoot/i })).toBeInTheDocument();

  const closeButton = screen.getByTitle('Close form');
  fireEvent.click(closeButton);

  expect(handleClose).toHaveBeenCalledTimes(1);
});
