import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe("Test Login Component", () => {
  test("render form with 1 button", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  test("should be failed on eamil validation", () => {
    const testEmail = "cyclecode.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("should be succeeded on eamil validation", () => {
    const testEmail = "cyclecode@gmial.com";
    expect(validateEmail(testEmail)).toBe(true);
  });

  test("password input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });

  test("shoulde be able to submit the form", () => {
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");

    userEvent.type(email, "cyclecode@gmial.com");
    userEvent.type(password, "abcdef");

    userEvent.click(submitButton);
    const userInfo = screen.getByText("cyclecode@gmial.com");
    expect(userInfo).toBeInTheDocument();
  });
});
