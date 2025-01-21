import Logo from "./components/Logo";
import Account from "./components/account/Account";
import Footer from "./components/Footer";

const App = () => {
  return(
    <>
      <section className="flex flex-col h-screen p-5 lg:p-0">
        <section className="flex flex-col items-center grow lg:flex-row lg:items-start">
          <section className="lg:flex-1 pt-5 lg:h-full lg:justify-items-center lg:content-center lg:p-0">
            <Logo />
          </section>
          <section className="flex flex-col justify-center items-center lg:flex-1 lg:h-full lg:content-center">
            <Account />
          </section>
        </section>
        <section>
          <Footer />
        </section>
      </section>
    </>
  )
}
export default App;