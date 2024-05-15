import { titleFont } from "@/config/font";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center text-xs mb-10">
      <Link href={"/"}>
        <span className={`${titleFont.className} antialiased font-bold`}>
          Ecommerce Outfit
        </span>
        <span> | Shop</span>
        <span> {new Date().getFullYear()}</span>
      </Link>
      <Link href={"/"}>
        <span> | Privacidad & Legal</span>
      </Link>
    </footer>
  );
};

export default Footer;
