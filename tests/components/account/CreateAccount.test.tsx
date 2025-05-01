import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Portal from "../../../src/components/utils/Portal";
import CreateAccount from "../../../src/components/account/components/CreateAccount";

interface RenderProps {
    children: JSX.Element,
    closePortal: () => void
}

describe("CreateAccount.tsx", () => {
    const closePortal = vitest.fn()
    const props = {
        children: <CreateAccount closePortal={closePortal}/>,
        closePortal
    }

    const renderComponent = (props: RenderProps) => {
        //Creates container that is eventually appended to the element with the portal id
        const portal = document.createElement("section");
        portal.id = "portal";
        document.body.appendChild(portal);

        render(<Portal {...props}/>);

        return{
            createAccountHeader: screen.getByText(/Create Account/i),
            closeButton: screen.getByText("×")
        }
    }
    it("should render the CreateAccount component inside of the Portal component", () => {
        const { createAccountHeader } = renderComponent(props);
        expect(createAccountHeader).toBeInTheDocument();
    });
    it("should remove the Component from the dom when the close button is clicked", async () => {
        const { closeButton } = renderComponent(props);
        expect(closeButton).toBeInTheDocument();

        const user = userEvent.setup();
        await user.click(closeButton);
        expect(props.closePortal).toHaveBeenCalled();
        await (() => {
            const createAccountHeader = screen.queryByText(/Create Account/i);
            expect(createAccountHeader).not.toBeInTheDocument();
        });
    })
});