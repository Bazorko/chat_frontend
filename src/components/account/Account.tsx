const Account = () => {
    return(
        <>
            <h2 className="text-2xl text-center text-white p-5">Chat with others.</h2>
            <section className="flex flex-col pt-5 mt-10 w-full lg:w-10/12">
                <button className="text-white border-white border-2 rounded-lg p-3">Create Account</button>
                <p className="text-white text-center p-5">or</p>
                <button className="text-white bg-primary_blue border-primary_blue rounded-lg p-3">Sign In</button>
            </section>
        </>
    );
}
export default Account;