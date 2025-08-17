import { fireEvent, render, screen } from "@testing-library/react-native";
import FormField from "../FormField";
import { FormProvider, useForm } from "react-hook-form";

const Wrapper = (props: any) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <FormField {...props} control={methods.control} />
    </FormProvider>
  );
};

describe("FormField Component test render", () => {
  beforeEach(() => {
    render(<Wrapper title="Email" name="email" placeholder="Enter email" />);
  });

  it("Should render a label Email", () => {
    const label = screen.getByText("Email");
    expect(label).toBeTruthy();
  });

  it("Should render a input with placeholder 'Enter email'", () => {
    const input = screen.getByPlaceholderText("Enter email");
    expect(input).toBeTruthy();
  });

  it("Should'nt render an show password toggle", () => {
    const toggle = screen.queryByTestId("toggle-password-visibility");
    expect(toggle).toBeNull();
  });

  it("Should render a toggle password visibility when name is 'password'", () => {
    render(
      <Wrapper title="Password" name="password" placeholder="Enter password" />
    );
    const toggle = screen.getByTestId("toggle-password-visibility");
    expect(toggle).toBeTruthy();
  });

  it("Should render an error message when there is an error", () => {
    render(
      <Wrapper
        title="Email"
        name="email"
        placeholder="Enter email"
        error={"Email is required"}
      />
    );
    const errorMessage = screen.getByText("Email is required");
    expect(errorMessage).toBeTruthy();
  });
});

describe("FormField Component functionality", () => {
  beforeEach(() => {
    render(
      <Wrapper title="Password" name="password" placeholder="Enter password" />
    );
  });

  it("Should toggle password visibility on press", () => {
    const toggle = screen.getByTestId("toggle-password-visibility");
    const input = screen.getByPlaceholderText("Enter password");

    // Initially, the input type should be 'password'
    expect(input.props.secureTextEntry).toBe(true);

    // Press the toggle button
    fireEvent.press(toggle);

    // After pressing, the input type should change to 'text'
    expect(input.props.secureTextEntry).toBe(false);
  });

  it("Should change input value on change", () => {
    const input = screen.getByPlaceholderText("Enter password");
    fireEvent.changeText(input, "newPassword");
    expect(input.props.value).toBe("newPassword");
  });
});
