import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import RegisterForm from "@/components/auth/RegisterForm";

jest.mock("@/lib/auth-client", () => ({
  signUp: {
    email: jest.fn(),
  },
}));
const mockState = {
  shipments: [
    {
      customer: "John Smith",
      Pickup: "Seattle",
      destination: "Portland",
      status: "Delivered" as const,
      date: "Nov 28, 2024",
    },
  ],
  signUp: jest.fn(),
};

describe("User signup", () => {
  it("should sign up a user with correct credentials", async () => {
    const mockSignUp = jest.requireMock("@/lib/auth-client").signUp.email;
    render(<RegisterForm />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: {
        value: "test@example.com",
      },
    });
    fireEvent.change(screen.getByTestId("name-input"), {
      target: {
        value: "Joe",
      },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: {
        value: "securepassword123",
      },
    });
    fireEvent.click(screen.getByTestId("signup-btn"));
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          password: "securepassword123",
          name: "Joe",
          callbackURL: "/login",
        }),
        expect.any(Object)
      );
    });
  });
});
