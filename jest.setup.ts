import { Models } from "react-native-appwrite";

jest.mock("@lib/appwrite", () => {
  return {
    __esModule: true,
    checkVideoIsLiked: jest.fn(() => Promise.resolve(false)),
    likeVideo: jest.fn(() => Promise.resolve({})),
    unlikeVideo: jest.fn(() => Promise.resolve({})),
    deleteVideo: jest.fn((videoId: string) => {
      return Promise.resolve({} as Models.Document);
    }),
    getCurrentUser: jest.fn(() =>
      Promise.resolve({
        $collectionId: "32804cn7092364b09",
        $createdAt: "2025-02-01T04:38:32.777+00:00",
        $databaseId: "2038749hf23924",
        $id: "c2ob349023u42f",
        $permissions: [],
        $sequence: 1,
        $updatedAt: "2025-02-01T04:38:32.777+00:00",
        accountId: "bjkn2348sds9234j",
        avatar: "https://www.gravatar.com/avatar/",
        email: "mario@gmail.com",
        username: "Mario",
      })
    ),
    logOut: jest.fn(() => Promise.resolve()),
    getLatestVideos: jest.fn(() =>
      Promise.resolve([
        {
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
        },
        {
          id: "2",
          $id: "2",
          title: "Another Video",
          thumbnail: "https://example.com/thumbnail2.jpg",
          video: "https://example.com/video2.mp4",
          creator: {
            username: "luigi",
            avatar: "https://example.com/avatar2.jpg",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          $collectionId: "12356231562325",
          $permissions: [],
          $createdAt: new Date().toISOString(),
          $updatedAt: new Date().toISOString(),
          $databaseId: "1234567890",
          deleted: false,
          prompt: "Another test prompt",
        },
      ])
    ),
  };
});
