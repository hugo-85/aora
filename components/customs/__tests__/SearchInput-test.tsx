//expo-router mock to avoid router.replace error in tests
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    setParams: jest.fn(),
  },
  usePathname: () => "/search",
}));

import { fireEvent, render, screen } from "@testing-library/react-native";
import SearchInput from "../SearchInput";
import { router } from "expo-router";

describe("SearchInput Component Test Render", () => {
  it("renders search input", () => {
    render(<SearchInput placeholder="search" />);
    expect(screen.getByPlaceholderText("search")).toBeTruthy();
  });

  it("renders search button", () => {
    render(<SearchInput placeholder="search" />);
    expect(screen.getByTestId("search-button")).toBeTruthy();
  });

  it("Should render a default value", () => {
    render(<SearchInput placeholder="search" initialQuery="test" />);
    const input = screen.getByPlaceholderText("search");
    expect(input.props.value).toBe("test");
  });

  it("Should render 'Write at least 3 characters' when input is less than 3 characters", () => {
    render(<SearchInput placeholder="search" initialQuery="ab" />);
    expect(screen.getByText("Write at least 3 characters")).toBeTruthy();
  });

  it("Should not render 'Write at least 3 characters' when input is more than 3 characters", () => {
    render(<SearchInput placeholder="search" initialQuery="abcd" />);
    expect(screen.queryByText("Write at least 3 characters")).toBeFalsy();
  });

  it("Should not render 'Write at least 3 characters' when input is empty", () => {
    render(<SearchInput placeholder="search" />);
    expect(screen.queryByText("Write at least 3 characters")).toBeFalsy();
  });
});

describe("SearchInput Component Functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<SearchInput placeholder="search" />);
  });

  it("should update input value on change", () => {
    const input = screen.getByPlaceholderText("search");
    fireEvent.changeText(input, "test");
    expect(input.props.value).toBe("test");
  });

  it("should call router with 'test' value", () => {
    const input = screen.getByPlaceholderText("search");
    fireEvent.changeText(input, "test");
    const button = screen.getByTestId("search-button");
    fireEvent.press(button);

    expect(router.setParams).toHaveBeenCalledWith({ query: "test" });
  });

  it("should not call the router when input value is empty", () => {
    const button = screen.getByTestId("search-button");
    fireEvent.press(button);
    expect(router.setParams).not.toHaveBeenCalled();
  });

  it("should not call the router when input value is less than 3 characters", () => {
    const input = screen.getByPlaceholderText("search");
    fireEvent.changeText(input, "ab");
    const button = screen.getByTestId("search-button");
    fireEvent.press(button);
    expect(router.setParams).not.toHaveBeenCalled();
  });
});
