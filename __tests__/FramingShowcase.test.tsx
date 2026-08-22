import { render, screen, fireEvent } from "@testing-library/react";
import FramingShowcase from "../components/Services/FramingShowcase";
import { FRAMING_SECTION_TEXT } from "../data/portfolioData";
import { expect, test, vi } from "vitest";

test("renders FramingShowcase frame options and triggers order action", () => {
  const handleOrderFrame = vi.fn();
  render(<FramingShowcase onOrderFrame={handleOrderFrame} />);

  expect(screen.getByText(FRAMING_SECTION_TEXT.badge)).toBeInTheDocument();
  expect(screen.getByText(FRAMING_SECTION_TEXT.titleHighlight)).toBeInTheDocument();

  const orderButtons = screen.getAllByRole("button", { name: /Order/i });
  expect(orderButtons.length).toBeGreaterThan(0);

  fireEvent.click(orderButtons[0]);
  expect(handleOrderFrame).toHaveBeenCalledTimes(1);
});
