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
jest.mock("expo-video", () => {
  const View = require("react-native").View;

  return {
    useVideoPlayer: jest.fn(() => ({
      play: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn(),
    })),
    VideoView: (props: any) => <View testID={props.testID || "video-player"} />,
  };
});

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import TrendingVideo from "../TrendingVideo";
import { VideoType } from "types/common";

const mockVideo: VideoType = {
  id: "1",
  $id: "1",
  title: "Test Video",
  thumbnail: "https://example.com/thumbnail.jpg",
  video: "https://example.com/video.mp4",
  creator: {
    username: "mario",
    avatar: "https://example.com/avatar.jpg",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  $collectionId: "12356231562325",
  $permissions: [],
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
  $databaseId: "1234567890",
  deleted: false,
  prompt: "Test prompt",
};

describe("TrendingVideos Component Test functionality", () => {
  beforeEach(() => {
    render(<TrendingVideo activeVideo={null} video={mockVideo} />);
  });

  it("Should play video on thumbnail press", async () => {
    const thumbnail = screen.getByTestId("video-thumbnail");
    fireEvent.press(thumbnail);
    await waitFor(async () => {
      expect(screen.queryByTestId("video-thumbnail")).not.toBeTruthy();
      expect(await screen.getByTestId("video-player")).toBeTruthy();
    });
  });
});
