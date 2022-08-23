import { render, screen, fireEvent } from "@testing-library/react";
import { RadioGroup } from "@headlessui/react";

import PresetOption from "./PresetOption";

describe("PresetOption", () => {
  it("renders the radio button", () => {
    render(
      <RadioGroup value="something-else" onChange={() => undefined}>
        <PresetOption title="My option" value="test" />
      </RadioGroup>
    );

    expect(screen.queryByRole("radio", { checked: false, name: "My option" })).toBeInTheDocument();
  });

  it("renders the radio button when checked", () => {
    render(
      <RadioGroup value="test" onChange={() => undefined}>
        <PresetOption title="My option" value="test" />
      </RadioGroup>
    );

    expect(screen.queryByRole("radio", { checked: true, name: "My option" })).toBeInTheDocument();
  });

  it("triggers an event when changing the selection", () => {
    const onChange = jest.fn();

    render(
      <RadioGroup value="one" onChange={onChange}>
        <PresetOption title="One" value="one" />
        <PresetOption title="Two" value="two" />
      </RadioGroup>
    );

    fireEvent.click(screen.getByRole("radio", { name: "Two" }));

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe("two");
  });
});
