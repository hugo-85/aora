import { render, screen } from "@testing-library/react-native";
import EmptyBookmarks from "../EmptyBookmarks";

describe("UserHeader Component Test Render", () => {
  beforeEach(() => {
    render(
      <EmptyBookmarks
        title="No Bookmarks"
        subTitle="You haven't bookmarked any videos yet."
      />
    );
  });

  it("renders empty bookmarks image", () => {
    const image = screen.getByTestId("empty-bookmarks-image");
    expect(image).toBeTruthy();
  });

  it("renders title", () => {
    expect(screen.getByText("No Bookmarks")).toBeTruthy();
  });

  it("renders subtitle", () => {
    expect(
      screen.getByText("You haven't bookmarked any videos yet.")
    ).toBeTruthy();
  });
});
