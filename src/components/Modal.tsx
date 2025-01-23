import React from "react";

interface ModalComponentProps {
    children: JSX.Element | null;
}

const Modal = ({ children }: ModalComponentProps) => {
    const handleClick = (event: React.MouseEvent) => event.stopPropagation();
    return (
        <section onClick={(event: React.MouseEvent) => handleClick(event)} className="w-11/12 lg:w-3/5 flex bg-black border-black border-2 rounded-lg p-5 pb-16">
            { children }
        </section>
    )
}

export default Modal;
