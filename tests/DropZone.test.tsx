import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DropZone from "../src/components/DropZone";
import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

// TODO: Arreglar los tests
test("permite cambiar el formato de salida tras soltar una imagen", () => {
  render(
    <DropZone
      handleDrop={vi.fn()}
      file={null}
      options={{ format: "png" }}
      onOptionsChange={vi.fn()}
    />
  );
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
  fireEvent.change(select, { target: { value: "jpeg" } });
  expect(select).toHaveValue("jpeg");
});

test("handleDrop shows image preview when a file is dropped", async () => {
  render(
    <DropZone
      handleDrop={vi.fn()}
      file={null}
      options={{ format: "png" }}
      onOptionsChange={vi.fn()}
    />
  );

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
