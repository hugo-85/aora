const mockPush = jest.fn();
jest.mock("expo-router", () => {
  const actual = jest.requireActual("expo-router");
  Object.defineProperty(actual, "router", {
    get: () => ({
      push: mockPush,
    }),
  });
  return actual;
});

import { render, screen, fireEvent } from "@testing-library/react-native";
import Welcome from "../Welcome";
import { NavigationContainer } from "@react-navigation/native";
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({ navigate: mockNavigate }),
  };
});

describe("Welcome Component Test Render", () => {
  beforeEach(() => {
    render(<Welcome />);
  });

  it("renders welcome text", () => {
    expect(
      screen.getByText(
        "Where creativity meets innovation: embark on a journey of limitless exploration with Aora."
      )
    ).toBeTruthy();
  });

  it("renders welcome button", () => {
    expect(screen.getByText("Continue with email")).toBeTruthy();
  });
});

describe("Welcome Component Functionality", () => {
  it("Should call the onPress function", () => {
    mockPush.mockClear();
    const { getByText } = render(
      <NavigationContainer>
        <Welcome />
      </NavigationContainer>
    );
    const button = getByText("Continue with email");
    fireEvent.press(button);
    expect(mockPush).toHaveBeenCalledWith("sign-in");
  });
});
