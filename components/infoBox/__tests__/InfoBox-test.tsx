import { render, screen } from "@testing-library/react-native";
import InfoBox from "../InfoBox";

describe("InfoBox Component Test Render", () => {
  beforeEach(() => {
    render(<InfoBox title="Some title" subTitle="Some subtitle" />);
  });

  it("renders info message", () => {
    expect(screen.getByText("Some subtitle")).toBeTruthy();
  });
});
