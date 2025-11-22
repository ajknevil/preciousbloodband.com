import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders footer copyright", () => {
  render(<App />);
  const footer = screen.getByText(new RegExp(`OneMusic`, "i"));
  expect(footer).toBeInTheDocument();
});
