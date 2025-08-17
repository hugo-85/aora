import { render, screen } from "@testing-library/react-native";
import BookmarksHeader from "../BookmarksHeader";

describe("BookmarksHeader Component Test", () => {
  beforeEach(() => {
    render(<BookmarksHeader />);
  });

  it("renders the logo", () => {
    const logo = screen.getByTestId("bookmarks-logo");
    expect(logo).toBeTruthy();
  });

  it("renders the title", () => {
    const title = screen.getByText("BOOKMARKS");
    expect(title).toBeTruthy();
  });
});
