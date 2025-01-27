import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Portal from "../../src/components/Portal";

interface RenderProps {
    children: JSX.Element,
    closePortal: () => void
}

describe("Portal.tsx", () => {
    const props = {
        children: <p>Portal Rendered</p>,
        closePortal: vitest.fn()
    }
    const renderComponent = (props: RenderProps) => {
        //Create and append the portal to senior most parent element.
        const portal = document.createElement("section");
        portal.id = "portal";
        document.body.appendChild(portal);

        //This will be appended the  to the element created above.
        render(<Portal {...props}/>);

        return{
            portal: document.getElementById("portal")?.querySelector("section")
        }
    }

    //Render component does render children props, in this case a <p> tag with the text content "Portal Rendered"
    it("should render Portal.tsx to the DOM", () => {
        renderComponent(props);

        const portalText = screen.getByText(/Portal Rendered/i);
        expect(portalText).toBeInTheDocument();
    });

    //Test if on click, does the portal dissapear
    it("should remove the portal from the dom on clicking the portal", async () => {
        const { portal } = renderComponent(props);

        const user = userEvent.setup();
        //Check if portal is being removed from the dom
        await user.click(portal!);
        expect(props.closePortal).toHaveBeenCalled();

        await (() => {
            const removedElement = screen.queryByText(/Portal Rendered/i);
            expect(removedElement).not.toBeInTheDocument();
        })
    });
});