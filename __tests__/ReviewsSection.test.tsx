import { render, screen } from "@testing-library/react";
import ReviewsSection from "../components/Testimonials/ReviewsSection";
import { TESTIMONIALS, REVIEWS_SECTION_TEXT } from "../data/portfolioData";
import { expect, test } from "vitest";

test("renders ReviewsSection testimonials and client names", () => {
  render(<ReviewsSection />);

  expect(screen.getByText(REVIEWS_SECTION_TEXT.badge)).toBeInTheDocument();
  expect(screen.getByText(TESTIMONIALS[0].coupleName)).toBeInTheDocument();
  expect(screen.getByText(TESTIMONIALS[1].coupleName)).toBeInTheDocument();
});
