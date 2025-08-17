// Mock of react-native-popup-menu so that the options are accessible in the testing tree
jest.mock("react-native-popup-menu", () => {
  const Real = jest.requireActual("react-native-popup-menu");
  const Pressable = require("react-native").Pressable;
  return {
    ...Real,
    Menu: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    MenuOptions: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    MenuOption: ({
      children,
      onSelect,
      testID,
    }: {
      children: React.ReactNode;
      onSelect?: () => void;
      testID?: string;
    }) => (
      <Pressable
        testID={testID}
        onPress={() => {
          onSelect && onSelect();
        }}
        role="button"
      >
        {children}
      </Pressable>
    ),
    MenuTrigger: ({
      children,
      testID,
      onPress,
    }: {
      children: React.ReactNode;
      testID?: string;
      onPress?: () => void;
    }) => (
      <Pressable testID={testID} onPress={onPress} role="button">
        {children}
      </Pressable>
    ),
  };
});
import { deleteVideo } from "@lib/appwrite";

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
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { VideoType } from "types/common";
import VideoCard from "../VideoCard";
import { GlobalProvider } from "@contexts/GlobalProvider";
import { MenuProvider } from "react-native-popup-menu";

const mockVideo: VideoType = {
  id: "1",
  $id: "1",
  title: "Test Video",
  thumbnail: "https://example.com/thumbnail.jpg",
  video: "https://example.com/video.mp4",
  creator: {
    username: "testuser",
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

const mockRefreshVideos = jest.fn();

describe("VideoCard Component test render", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <MenuProvider>
          <VideoCard video={mockVideo} refreshVideos={mockRefreshVideos} />
        </MenuProvider>
      </GlobalProvider>
    );
  });

  it("Should render a title Test Video", async () => {
    await waitFor(() => {
      const title = screen.getByText("Test Video");
      expect(title).toBeTruthy();
    });
  });

  it("Should render a user testuser", async () => {
    await waitFor(() => {
      const user = screen.getByText("testuser");
      expect(user).toBeTruthy();
    });
  });

  it("Should render avatar image", async () => {
    await waitFor(() => {
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeTruthy();
    });
  });

  it("Should render like icon", async () => {
    await waitFor(() => {
      const notLikeIcon = screen.getByTestId("not-like-icon");
      expect(notLikeIcon).toBeTruthy();
    });
  });
});

describe("VideoCard Component test functionality", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <MenuProvider>
          <VideoCard video={mockVideo} refreshVideos={mockRefreshVideos} />
        </MenuProvider>
      </GlobalProvider>
    );
  });

  it("Should play video on press", async () => {
    const videoThumbnail = screen.getByTestId("video-thumbnail");
    fireEvent.press(videoThumbnail);
    const video = screen.getByTestId("video");
    await waitFor(() => {
      expect(video).toBeTruthy();
    });
  });

  it("Should like video on press like button", async () => {
    const likeButton = screen.getByTestId("like-button");
    fireEvent.press(likeButton);
    await waitFor(() => {
      expect(screen.getByTestId("like-icon")).toBeTruthy();
    });
  });

  it("Should unlike video on second press like button", async () => {
    const likeButton = screen.getByTestId("like-button");
    fireEvent.press(likeButton); // Like
    fireEvent.press(likeButton); // Unlike
    await waitFor(() => {
      expect(screen.getByTestId("not-like-icon")).toBeTruthy();
    });
  });

  it("Should delete video on press delete button", async () => {
    const menuTrigger = screen.getByTestId("menu-trigger");
    fireEvent.press(menuTrigger);
    await waitFor(() => {
      expect(screen.getByTestId("delete-option")).toBeTruthy();
    });
    const deleteButton = screen.getByTestId("delete-option");
    fireEvent.press(deleteButton);
    await waitFor(() => {
      expect(deleteVideo).toHaveBeenCalled();
    });
  });
});
