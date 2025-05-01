import { screen, render } from "@testing-library/react";
import Footer from "../../src/components/footer/Footer";

describe("Footer.tsx", () => {
    const renderComponent = () => {
        render(<Footer />);
        return {
            paragraph: screen.getByText(/Chat Corp./i),
        }
    }
    it("should render the copyright text.", () => {
        const { paragraph } = renderComponent();
        expect(paragraph).toBeInTheDocument();
    })
})