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

import { render, screen } from "@testing-library/react-native";
import UserHeader from "../UserHeader";
import { GlobalProvider } from "@contexts/GlobalProvider";

describe("UserHeader Component test render", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <UserHeader />
      </GlobalProvider>
    );
  });

  it("should render user name", async () => {
    expect(await screen.findByText("Mario")).toBeTruthy();
  });

  it("Should render an avatar image", async () => {
    const avatar = await screen.findByTestId("avatar");
    expect(avatar).toBeTruthy();
  });
});
