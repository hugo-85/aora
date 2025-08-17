import { render, screen } from "@testing-library/react-native";
import SearchHeader from "../SearchHeader";

describe("SearchHeader Component Test Render", () => {
  beforeEach(() => {
    render(<SearchHeader query="amazing" />);
  });

  it("should render the title", () => {
    const title = screen.getByText("Search results");
    expect(title).toBeTruthy();
  });

  it("should render the query 'amazing'", () => {
    const query = screen.getByText("amazing");
    expect(query).toBeTruthy();
  });
});
