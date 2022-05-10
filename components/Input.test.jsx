import { render, screen, fireEvent } from "@testing-library/react";

import Input from "./Input";

describe("Input", () => {
  it("renders the input name", () => {
    render(<Input name="My slider" min={0} max={100} />);

    expect(screen.queryByText(/My slider/)).toBeInTheDocument();
  });

  it("renders a simple slider", () => {
    render(<Input name="" min={0} max={100} />);

    const handle = screen.getByRole("slider");

    // Sets the min, max, and current value.
    expect(handle).toHaveAttribute("aria-valuenow", "0");
    expect(handle).toHaveAttribute("aria-valuemin", "0");
    expect(handle).toHaveAttribute("aria-valuemax", "100");
  });

  describe("with custom min, max, and value props", () => {
    it("sets the custom min, max, and value props", () => {
      render(<Input name="" min={10} max={20} value={15} />);

      const handle = screen.getByRole("slider");

      // Sets the min, max, and current value.
      expect(handle).toHaveAttribute("aria-valuenow", "15");
      expect(handle).toHaveAttribute("aria-valuemin", "10");
      expect(handle).toHaveAttribute("aria-valuemax", "20");
    });

    it("allows the value to be changed with user events", () => {
      const onChange = jest.fn();

      render(<Input name="" min={10} max={20} value={15} onChange={onChange} />);

      const handle = screen.getByRole("slider");

      fireEvent.keyDown(handle, { key: "ArrowRight", code: 39 });
      expect(onChange.mock.calls[0][0]).toBe(16);

      fireEvent.keyDown(handle, { key: "ArrowLeft", code: 37 });
      expect(onChange.mock.calls[1][0]).toBe(14);

      fireEvent.keyDown(handle, { key: "End", code: 35 });
      expect(onChange.mock.calls[2][0]).toBe(20);

      fireEvent.keyDown(handle, { key: "Home", code: 36 });
      expect(onChange.mock.calls[3][0]).toBe(10);
    });
  });
});
