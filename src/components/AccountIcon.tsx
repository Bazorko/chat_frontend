import Account from "../assets/account_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";

interface AccountImagePlaceholderIconProps{
    height: string
}

const AccountImagePlaceholderIcon = ({ height }: AccountImagePlaceholderIconProps) => {
  return (
    <img src={Account} className={`${height} p-5 lg:p-0 cursor-pointer`} alt="Account image placeholder icon." />
  )
}

export default AccountImagePlaceholderIcon;
