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

//expo-router mock to avoid router.replace error in tests
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

import { GlobalProvider } from "@contexts/GlobalProvider";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import ProfileHeader from "../ProfileHeader";
import { logOut } from "@lib/appwrite";
import { router } from "expo-router";

describe("ProfileHeader Component Test Render", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <ProfileHeader videosCount={5} />
      </GlobalProvider>
    );
  });

  it("renders user avatar", () => {
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toBeTruthy();
  });

  it("renders username", async () => {
    await waitFor(() => {
      expect(screen.getByText("Mario")).toBeTruthy();
    });
  });

  it("renders videos count", () => {
    const videosCount = screen.getByText("5");
    expect(videosCount).toBeTruthy();
  });

  it("renders followers count", () => {
    const followersCount = screen.getByText("Followers");
    expect(followersCount).toBeTruthy();
  });

  it("Should render logout button", () => {
    const logoutButton = screen.getByTestId("logout-button");
    expect(logoutButton).toBeTruthy();
  });
});

describe("ProfileHeader Component Functionality", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <ProfileHeader videosCount={5} />
      </GlobalProvider>
    );
  });

  it("should log out the user and redirect to login", async () => {
    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.press(logoutButton);
    await waitFor(() => {
      expect(logOut).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith("/sign-in");
    });
  });
});
