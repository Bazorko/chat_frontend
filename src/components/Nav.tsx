import MenuIcon from "./MenuIcon";
import AccountImagePlaceholderIcon from "./AccountIcon";

const Nav = () => {
    return (
        <section className="flex justify-between w-full">
                <MenuIcon height={"h-20"}/>
                <AccountImagePlaceholderIcon height={"h-20"}/>
        </section>
    )
}

export default Nav;
