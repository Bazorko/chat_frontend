import Menu from "../../../assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";

interface MenuProps{
    height: string
}

const MenuIcon = ({ height }:MenuProps) => {
    return(
        <img src={Menu} className={`${height} p-5 lg:p-0 cursor-pointer`} alt="Menu icon." />
    );
}

export default MenuIcon;