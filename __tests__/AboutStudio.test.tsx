import { render, screen } from "@testing-library/react";
import AboutStudio from "../components/About/AboutStudio";
import { ABOUT_SECTION_TEXT } from "../data/portfolioData";
import { expect, test } from "vitest";

test("renders AboutStudio section title and milestones", () => {
  render(<AboutStudio />);

  expect(screen.getByText(ABOUT_SECTION_TEXT.badge)).toBeInTheDocument();
  expect(screen.getAllByText(ABOUT_SECTION_TEXT.titleHighlight).length).toBeGreaterThan(0);
});
