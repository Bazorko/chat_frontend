import Logo from "./components/Logo";
import AccountCreation from "./components/AccountCreation";
const App = () => {
  return(
    <>
      <section className="flex flex-col h-screen">
        <section className="flex flex-col items-center grow lg:flex-row lg:items-start">
          <section className="lg:flex-1 pt-5 lg:h-full lg:justify-items-center lg:content-center lg:p-0">
            <Logo />
          </section>
          <section className="lg:flex-1 lg:h-full lg:content-center">
            <AccountCreation />
          </section>
        </section>
        <section className="">
          <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente inventore excepturi fugiat facilis ducimus quod repellat error, voluptates atque laudantium iste doloremque provident tempora pariatur sunt dicta velit dolor deleniti.</p>
        </section>
      </section>
    </>
  )
}
export default App;