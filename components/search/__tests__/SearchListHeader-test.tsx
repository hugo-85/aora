import { render, screen } from "@testing-library/react-native";
import SearchListHeader from "../SearchListHeader";

describe("SearchListHeader Component Test Render", () => {
  beforeEach(() => {
    render(<SearchListHeader query="amazing" />);
  });

  it("should render the title", () => {
    const title = screen.getByText("Search results");
    expect(title).toBeTruthy();
  });

  it("should render the query 'amazing'", () => {
    const query = screen.getByText("amazing");
    expect(query).toBeTruthy();
  });

  it("Should render the search input", () => {
    const searchInput = screen.getByPlaceholderText("Search for a video topic");
    expect(searchInput).toBeTruthy();
  });
});
