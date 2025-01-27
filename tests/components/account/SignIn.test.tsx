import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Portal from "../../../src/components/Portal";
import SignIn from "../../../src/components/account/SignIn";

interface RenderProps {
    children: JSX.Element,
    closePortal: () => void
}

describe("CreateAccount.tsx", () => {
    const closePortal = vitest.fn()
    const props = {
        children: <SignIn closePortal={closePortal}/>,
        closePortal
    }

    const renderComponent = (props: RenderProps) => {
        //Creates container that is eventually appended to the element with the portal id
        const portal = document.createElement("section");
        portal.id = "portal";
        document.body.appendChild(portal);

        render(<Portal {...props}/>);

        return{
            signInHeader: screen.getByRole("heading", {name: /Sign In/i}),
            closeButton: screen.getByText("×")
        }
    }
    it("should render the SignIn component inside of the Portal component", () => {
        const { signInHeader } = renderComponent(props);
        expect(signInHeader).toBeInTheDocument();
    });
    it("should remove the Component from the dom when the close button is clicked", async () => {
        const { closeButton } = renderComponent(props);
        expect(closeButton).toBeInTheDocument();

        const user = userEvent.setup();
        await user.click(closeButton);
        expect(props.closePortal).toHaveBeenCalled();
        await (() => {
            const signInHeader = screen.queryByText(/Sign In/i);
            expect(signInHeader).not.toBeInTheDocument();
        });
    })
});