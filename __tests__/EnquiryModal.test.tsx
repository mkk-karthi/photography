import { render, screen, fireEvent } from '@testing-library/react';
import EnquiryModal from '../components/Enquiry/EnquiryModal';
import { expect, test, vi } from 'vitest';

test('renders EnquiryModal tabs and handles closing', () => {
  const handleClose = vi.fn();
  render(<EnquiryModal isOpen={true} onClose={handleClose} />);

  expect(screen.getByRole('button', { name: /Photoshoot/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Frame/i })).toBeInTheDocument();

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

test('end-to-end: pre-fills frame material, frame size, and displays estimated value only on Frame tab when ordered from frame showcase', async () => {
  render(
    <EnquiryModal
      isOpen={true}
      onClose={() => {}}
      initialService='Photo Framing Order (Ultra-HD Premium Acrylic Framing - 12" x 18")'
      initialQuote={850}
    />
  );

  // Verifies 2 tabs are rendered
  expect(screen.getByRole('button', { name: /Photoshoot/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Frame/i })).toBeInTheDocument();

  // Verifies Frame form is active
  expect(await screen.findByText(/Custom Photo Frame/i)).toBeInTheDocument();

  // Verifies Estimated Frame Order Value banner is displayed on Frame tab
  expect(await screen.findByText(/Estimated Frame Order Value:/i)).toBeInTheDocument();
  expect(screen.getByText('₹850')).toBeInTheDocument();

  // Verifies Frame Dimension / Size dropdown is updated with pre-filled size label
  const sizeSelect = (await screen.findByLabelText(/Frame Dimension \/ Size \*/i)) as HTMLSelectElement;
  expect(sizeSelect.value).toContain('12" x 18"');

  // Verifies Frame Material dropdown is updated
  const materialSelect = (await screen.findByLabelText(/Frame Material \/ Style \*/i)) as HTMLSelectElement;
  expect(materialSelect.value).toBe('Ultra-HD Premium Acrylic Framing');

  // Switch to Photoshoot tab
  const photoshootTabButton = screen.getByRole('button', { name: /Photoshoot/i });
  fireEvent.click(photoshootTabButton);

  // Verifies Photoshoot form is active
  expect(await screen.findByText(/Book Photoshoot/i)).toBeInTheDocument();

  // Verifies Estimated Quote Banner is NOT visible on Photoshoot tab
  expect(screen.queryByText(/Estimated Frame Order Value:/i)).not.toBeInTheDocument();
});

test('end-to-end: completes frame enquiry submission and shows confirmation screen', async () => {
  render(
    <EnquiryModal
      isOpen={true}
      onClose={() => {}}
      initialService='Photo Framing Order (Heritage Teak Wood Handmade Frame - 16" x 24")'
      initialQuote={1450}
    />
  );

  // Fill in required fields
  const nameInput = await screen.findByPlaceholderText(/Your Name/i);
  fireEvent.change(nameInput, {
    target: { value: 'Arun Kumar' },
  });

  const phoneInput = screen.getByPlaceholderText(/\+91 9876543210/i);
  fireEvent.change(phoneInput, {
    target: { value: '+91 9876543210' },
  });

  const addressInput = screen.getByPlaceholderText(/Street Address, City/i);
  fireEvent.change(addressInput, {
    target: { value: '123 Main Street, Madurai' },
  });

  // Submit form
  const submitButton = screen.getByRole('button', { name: /Submit Enquiry/i });
  fireEvent.click(submitButton);

  // Verifies confirmation message
  expect(await screen.findByText(/Frame Order Enquiry Received!/i)).toBeInTheDocument();
  expect(screen.getByText(/Reference ID:/i)).toBeInTheDocument();
});

