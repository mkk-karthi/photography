import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioGallery from '../components/Gallery/PortfolioGallery';
import { PORTFOLIO_SECTION_TEXT, PORTFOLIO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import { expect, test } from 'vitest';

test('renders Portfolio gallery category filter tabs and photos grid', () => {
  render(<PortfolioGallery />);

  expect(screen.getByText(PORTFOLIO_SECTION_TEXT.badge)).toBeInTheDocument();
  expect(screen.getByText(PORTFOLIO_CATEGORIES[0].label)).toBeInTheDocument();

  const weddingTabLabel = PORTFOLIO_CATEGORIES[1].label;
  const weddingTabs = screen.getAllByText(weddingTabLabel);
  expect(weddingTabs.length).toBeGreaterThan(0);

  const weddingButton = screen.getByRole('button', { name: new RegExp(weddingTabLabel, 'i') });
  fireEvent.click(weddingButton);

  expect(screen.getByText(PORTFOLIO_PHOTOS[0].title)).toBeInTheDocument();
});
