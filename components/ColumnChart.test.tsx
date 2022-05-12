import { render, screen } from "@testing-library/react";

import ColumnChart from "./ColumnChart";

describe("ColumnChart", () => {
  it("renders the column chart", () => {
    render(<ColumnChart min={0} max={100} value={50} />);

    expect(screen.getByRole("status")).toHaveTextContent("50");
    expect(screen.getByTestId("column-chart-fill")).toHaveStyle({ width: "50%" });
  });

  it("renders the chart with a custom label formatter", () => {
    render(<ColumnChart min={0} max={100} value={20} formatter={(value) => `${value} EUR`} />);

    expect(screen.getByRole("status")).toHaveTextContent("20 EUR");
    expect(screen.getByTestId("column-chart-fill")).toHaveStyle({ width: "20%" });
  });

  it("renders the chart with a value exceeding the max", () => {
    render(<ColumnChart min={0} max={100} value={200} formatter={(value) => `${value} EUR`} />);

    expect(screen.getByRole("status")).toHaveTextContent("200 EUR");
    expect(screen.getByTestId("column-chart-fill")).toHaveStyle({ width: "100%" });
  });

  it("renders the chart with a negative value", () => {
    render(<ColumnChart min={0} max={100} value={-20} formatter={(value) => `${value} EUR`} />);

    expect(screen.getByRole("status")).toHaveTextContent("-20 EUR");
    expect(screen.getByTestId("column-chart-fill")).toHaveStyle({ width: "20%" });
  });

  describe("given a three-value band", () => {
    function renderColumnChart(value: number): void {
      render(
        <ColumnChart
          min={0}
          max={100}
          value={value}
          bands={[{ color: "emerald" }, { at: 40, color: "yellow" }, { at: 50, color: "red" }]}
        />
      );
    }

    it("renders using colors from the first band", () => {
      renderColumnChart(20);
      expect(screen.getByTestId("column-chart-fill")).toHaveClass("bg-emerald-200");
    });

    it("renders using colors from the first band with an extreme value", () => {
      renderColumnChart(-20);
      expect(screen.getByTestId("column-chart-fill")).toHaveClass("bg-emerald-200");
    });

    it("renders using colors from the second band", () => {
      renderColumnChart(40);
      expect(screen.getByTestId("column-chart-fill")).toHaveClass("bg-yellow-200");
    });

    it("renders using colors from the third band", () => {
      renderColumnChart(50);
      expect(screen.getByTestId("column-chart-fill")).toHaveClass("bg-red-200");
    });

    it("renders using colors from the third band with an extreme value", () => {
      renderColumnChart(100);
      expect(screen.getByTestId("column-chart-fill")).toHaveClass("bg-red-200");
    });
  });
});
