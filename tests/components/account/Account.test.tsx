import { screen, render } from "@testing-library/react";
import Account from "../../../src/components/account/Account";

describe("Account.tsx", () => {
    const renderComponent = () => {
        render(<Account/ >);
        return{
            header: screen.getByRole("heading"),
            createAccountButton: screen.getByText(/Create Account/i),
            signInButton: screen.getByText(/Sign In/i)
        }
    }
    it("should render Account.tsx", () => {
        const { header, createAccountButton, signInButton } = renderComponent();
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent(/Chat with others./i);

        expect(createAccountButton).toBeInTheDocument();
        expect(signInButton).toBeInTheDocument();
    })
})