import Logo from "./components/Logo";
const App = () => {
  return(
    <>
      <section className="flex flex-col h-screen">
        <section className="flex grow">
          <section className="flex-1">
            <Logo />
          </section>
          <section className="flex-1">

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