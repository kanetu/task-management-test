import { previewDebug, render } from "@test-utils";
import UserInfoForm from "./UserInfoForm";

describe("<UserInfoForm />", () => {
  it("<UserInfoForm /> should be rendered properly", () => {
    const { getByText } = render(<UserInfoForm />);
    previewDebug();
    expect(getByText("Age")).toBeInTheDocument();
  });
});
