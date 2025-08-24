import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Wizard from "@/src/components/Wizard/Wizard";
import { vi } from "vitest";
vi.mock("next/navigation", () => ({
  useParams: () => ({}),
  useRouter: () => ({ push: vi.fn() }),
}));
describe("Wizard", () => {
  it("renders steps", () => {
    render(<Wizard mode="create" />);
    expect(screen.getByText("Account Details")).toBeInTheDocument();
    expect(screen.getByText("Customer Profile")).toBeInTheDocument();
    expect(screen.getByText("Review & Submit")).toBeInTheDocument();
  });
});
