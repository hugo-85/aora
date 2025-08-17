//expo-router mock to avoid router.replace error in tests
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import EmptyVideos from "../EmptyVideos";
import { router } from "expo-router";

describe("EmptyVideos Component render test", () => {
  beforeEach(() => {
    render(
      <EmptyVideos
        title="No videos available"
        subTitle="Please check back later."
      />
    );
  });

  it("should render a title", () => {
    const title = screen.getByText("No videos available");
    expect(title).toBeTruthy();
  });

  it("should render a subtitle", () => {
    const subTitle = screen.getByText("Please check back later.");
    expect(subTitle).toBeTruthy();
  });

  it("should render an image", () => {
    const image = screen.getByTestId("empty-videos-image");
    expect(image).toBeTruthy();
  });

  it("should render a create button", () => {
    const button = screen.getByText("Create Video");
    expect(button).toBeTruthy();
  });
});

describe("EmptyVideos Component functionality test", () => {
  beforeEach(() => {
    render(
      <EmptyVideos
        title="No videos available"
        subTitle="Please check back later."
      />
    );
  });

  it("should call navigation on create button press", async () => {
    const button = screen.getByText("Create Video");
    fireEvent.press(button);
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/create");
    });
  });
});
