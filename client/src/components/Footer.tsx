import { MdCopyright } from "react-icons/md";
import logo from "../imagenes/Logo.png";

const Footer = () => {
  return (
    <footer className=" min-h-[20vh] flex bg-[#A5A5A5] opacity-80 gap-20">
      <img src={logo} alt="logo" className="h-1/2 self-end pb-8" />
      <div className="flex text-black mr-40 pb-8 self-end font-bold w-full border-t-2 border-black">
        <MdCopyright />
        <p>2022 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
