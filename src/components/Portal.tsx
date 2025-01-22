import ReactDOM from "react-dom";

interface PortalComponentProps {
    children: JSX.Element | null;
    closePortal: () => void;
}

const Portal = ({ children, closePortal }: PortalComponentProps) => {
    const portal = document.getElementById("portal")!;
    return ReactDOM.createPortal(
        <section onClick={closePortal} className="absolute top-0 -left-0 w-screen h-screen opacity-80 bg-neutral-500">
            <button onClick={closePortal} className="text-white absolute top-0 -left-0">&times;</button>
            { children }
        </section>, 
        portal
    );
}
export default Portal;