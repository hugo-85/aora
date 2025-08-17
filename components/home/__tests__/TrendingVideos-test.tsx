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

//expo-video mock to avoid errors in test environment
jest.mock("expo-video", () => ({
  useVideoPlayer: jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
  })),
  VideoView: () => null,
}));

import { render, screen, waitFor } from "@testing-library/react-native";
import TrendingVideos from "../TrendingVideos";

describe("TrendingVideos Component Test Render", () => {
  beforeEach(() => {
    render(<TrendingVideos />);
  });

  it("Should render a list of trending videos containing 2 items", async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId("video-item")).toHaveLength(2);
    });
  });
});
