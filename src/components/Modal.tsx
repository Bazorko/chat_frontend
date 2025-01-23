import React from "react";

interface ModalComponentProps {
    children: JSX.Element | null;
}

const Modal = ({ children }: ModalComponentProps) => {
    const handleClick = (event: React.MouseEvent) => event.stopPropagation();
    return (
        <section onClick={(event: React.MouseEvent) => handleClick(event)} className={`overflow-auto justify-center h-screen lg:max-h-min w-full lg:w-3/5 flex lg:grow-0 bg-black border-black border-2 rounded-lg p-5 pb-16`}>
            { children }
        </section>
    )
}

export default Modal;
