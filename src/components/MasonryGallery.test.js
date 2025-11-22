import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MasonryGallery from "./MasonryGallery";

const items = [
  { img: "img/bg-img/b1.jpg", title: "A", category: "vinyl" },
  { img: "img/bg-img/b2.jpg", title: "B", category: "mp3" },
  { img: "img/bg-img/b3.jpg", title: "C", category: "merch" },
];

test("renders filters and filters items", async () => {
  render(<MasonryGallery items={items} />);

  // All button
  const allBtn = screen.getByRole("button", { name: /all/i });
  expect(allBtn).toBeInTheDocument();

  // category buttons
  const vinylBtn = screen.getByRole("button", { name: /vinyl/i });
  expect(vinylBtn).toBeInTheDocument();

  // Initially, all items should render
  expect(screen.getByText("A")).toBeInTheDocument();
  expect(screen.getByText("B")).toBeInTheDocument();
  expect(screen.getByText("C")).toBeInTheDocument();

  // Click vinyl filter
  fireEvent.click(vinylBtn);

  // Only A should remain (wait for animation/DOM update)
  await screen.findByText("A");
  await waitFor(() => expect(screen.queryByText("B")).toBeNull());
  await waitFor(() => expect(screen.queryByText("C")).toBeNull());
});
