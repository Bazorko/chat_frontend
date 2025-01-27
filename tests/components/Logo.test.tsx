import { render, screen } from "@testing-library/react";
import Logo from "../../src/components/Logo";

describe("Logo.tsx", () => {
    const renderComponent = () => {
        render(<Logo />);
        return{
            logo: screen.getByAltText("Chat app logo.")
        }
    }
    it("should render an svg icon, a placeholder for a logo", () => {
        const { logo } = renderComponent();
        expect(logo).toBeInTheDocument();
    })
});