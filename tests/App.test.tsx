import { render, screen } from "@testing-library/react";
import App from "../src/AppHome";

describe("App.tsx", () => {
    const renderComponent = () => {
        render(<App />);
        return {
            logo: screen.getByRole("img"),
            accountComponentHeader: screen.getByRole("heading"),
            footerComponentParagraph: screen.getByText(/Chat Corp./i)
        }
    }
    it("should render App.tsx", () => {
        const { logo, accountComponentHeader, footerComponentParagraph } = renderComponent();

        expect(logo).toBeInTheDocument();

        expect(accountComponentHeader).toBeInTheDocument();
        expect(accountComponentHeader).toHaveTextContent(/Chat with others./i);

        expect(footerComponentParagraph).toBeInTheDocument();
    })
});