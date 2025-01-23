interface AccountComponentProps {
    openPortal: (card: string) => void;
    accountCard: string;
    displayAccountCard: (card: string) => void;
}

const Account = ({ openPortal }: AccountComponentProps) => {
    const handleClick = (card: string) => openPortal(card);
    return(
        <>
            <h2 className="text-2xl text-center text-white p-5">Chat with others.</h2>
            <section className="flex flex-col pt-5 mt-10 w-full lg:w-10/12">
                <button onClick={() => handleClick("create")} className="text-white border-white border-2 rounded-lg p-3 hover:scale-95">Create Account</button>
                <p className="text-white text-center p-5">or</p>
                <button onClick={() => handleClick("login")} className="text-white bg-primary_blue border-primary_blue rounded-lg p-3 hover:bg-primary_blue_darker hover:border-primary_blue_darker hover:scale-95">Sign In</button>
            </section>
        </>
    );
}
export default Account;