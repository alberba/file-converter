import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DropZone from "../src/DropZone";
import { expect, test } from "vitest";

test("muestra el mensaje 'Drop files here' al inicio", () => {
  render(<DropZone />);
  expect(screen.getByText("Drop files here")).toBeInTheDocument();
});

test("permite cambiar el formato de salida tras soltar una imagen", () => {
  render(<DropZone />);
  const file = new File(["test"], "test.png", { type: "image/png" });
  const dropZone = screen.getByText("Drop files here");
  fireEvent.drop(dropZone, {
    dataTransfer: {
      files: [file],
    },
  });

  const select = screen.getByRole("combobox");
  expect(select).toBeInTheDocument();
  expect(select).toHaveValue("png");
  fireEvent.change(select, { target: { value: "jpg" } });
  expect(select).toHaveValue("jpg");
});

test("handleDrop shows image preview when a file is dropped", async () => {
  render(<DropZone />);

  const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });

  const dropZone = screen.getByText("Drop files here");

  fireEvent.drop(dropZone, {
    dataTransfer: {
      files: [file],
    },
  });

  await waitFor(() => {
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("data:image/png;base64"),
    );
  });
});
