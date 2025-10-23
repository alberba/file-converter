import { render, screen } from "@testing-library/react";
import FileSizeChange from "./FileSizeChange";

describe("FileSizeChange Component", () => {
  it("should render correctly for size increase", () => {
    render(<FileSizeChange isLarger={true} percentage="25" />);
    expect(
      screen.getByRole("img", { name: "Flecha desplegable" }),
    ).not.toHaveClass("rotate-180");
  });

  it("should render correctly for size decrease", () => {
    render(<FileSizeChange isLarger={false} percentage="-15" />);
    expect(screen.getByRole("img", { name: "Flecha desplegable" })).toHaveClass(
      "rotate-180",
    );
  });
});
