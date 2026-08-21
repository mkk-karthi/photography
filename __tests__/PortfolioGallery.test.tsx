import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioGallery from '../components/Gallery/PortfolioGallery';
import { expect, test } from 'vitest';

test('renders Portfolio gallery category filter tabs and photos grid', () => {
  render(<PortfolioGallery />);

  expect(screen.getByText(/Curated Visual Collections/i)).toBeInTheDocument();
  expect(screen.getByText(/All Works/i)).toBeInTheDocument();

  const weddingTabs = screen.getAllByText(/Wedding Photography/i);
  expect(weddingTabs.length).toBeGreaterThan(0);

  const weddingButton = screen.getByRole('button', { name: /Wedding Photography/i });
  fireEvent.click(weddingButton);

  expect(screen.getByText(/Royal Muhurtham Vows/i)).toBeInTheDocument();
});
