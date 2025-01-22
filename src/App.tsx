import { useState } from "react";
import Logo from "./components/Logo";
import Account from "./components/account/Account";
import CreateAccount from "./components/account/CreateAccount";
import Login from "./components/account/LogIn";
import Footer from "./components/Footer";
import Portal from "./components/Portal";

const App = () => {
  const [ isPortalOpen, setIsPortalOpen ] = useState(false);
  const openPortal = (card: string) => {
    setIsPortalOpen(true);
    setAccountCard(card);
  };
  const closePortal = () => {
    setIsPortalOpen(false);
    setAccountCard("");
  };

  //Governs whether or not the create account portal or login portal displays.
  const [ accountCard, setAccountCard ] = useState("");
  const displayAccountCard = (card: string) => setAccountCard(card); 
  return(
    <>
      <section className="flex flex-col h-screen p-5 lg:p-0">
        <section className="flex flex-col items-center grow lg:flex-row lg:items-start">
          <section className="lg:flex-1 pt-5 lg:h-full lg:justify-items-center lg:content-center lg:p-0">
            <Logo />
          </section>
          <section className="flex flex-col justify-center items-center lg:flex-1 lg:h-full lg:content-center">
            <Account openPortal={openPortal} accountCard={accountCard} displayAccountCard={displayAccountCard}/>
          </section>
        </section>
        <section>
          <Footer />
        </section>
      </section>
      {isPortalOpen &&
        <Portal closePortal={closePortal}>
          {accountCard === "create" ? (<CreateAccount />) : accountCard === "login" ? (<Login />) : null}
        </Portal>
      }
    </>
  )
}
export default App;