// Silence act warning in the console during tests
// This is to avoid the warning “An update to VideoCard inside a test was not wrapped in act(...)” that may appear in some tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("An update to") &&
      args[0].includes("act")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

import { render, screen } from "@testing-library/react-native";
import SearchLoading from "../SearchLoading";

describe("SearchLoading Component Test Render", () => {
  beforeEach(() => {
    render(<SearchLoading />);
  });

  it("should render the loading image", () => {
    const loadingImage = screen.getByTestId("search-loading-image");
    expect(loadingImage).toBeTruthy();
  });

  it("should render the searching text", () => {
    const searchingText = screen.getByText("Searching");
    expect(searchingText).toBeTruthy();
  });
});
