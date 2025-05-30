import { useState } from "react";
import Logo from "../utils/assets/Logo";
import Account from "../components/account/Account";
import CreateAccount from "../components/account/components/CreateAccount";
import SignIn from "../components/account/components/SignIn";
import Footer from "../components/footer/Footer";
import Portal from "../utils/ui-containers/Portal";

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
      <section className={`flex flex-col h-screen p-5 lg:p-0 ${isPortalOpen ? "overflow-hidden" : null}`}>
        <section className="flex flex-col items-center grow lg:flex-row lg:items-start">
          <section className="lg:flex-1 lg:h-full lg:justify-items-center lg:content-center lg:p-0">
            <Logo height={"h-24"}/>
          </section>
          <section className="flex flex-col justify-center items-center lg:flex-1 lg:h-full lg:content-center">
            <Account openPortal={openPortal} accountCard={accountCard} displayAccountCard={displayAccountCard}/>
          </section>
        </section>
        <section className="p-5 lg:p-10">
          <Footer />
        </section>
      </section>
      {isPortalOpen &&
        <Portal closePortal={closePortal}>
          {
            accountCard === "create" ? 
              (<CreateAccount closePortal={closePortal}/>) : 
            accountCard === "login" ? 
              (<SignIn closePortal={closePortal}/>) : 
            null
          }
        </Portal>
      }
    </>
  )
}
export default App;