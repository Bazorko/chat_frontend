import Logo from "../../assets/chat_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";

interface LogoProps{
    height: string
}

const LogoIcon = ({ height }: LogoProps) => {
    return(
        <img src={Logo} className={`${height} p-5 lg:p-0`} alt="Chat app logo." />
    );
}

export default LogoIcon;