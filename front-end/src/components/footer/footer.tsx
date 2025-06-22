import Image from "next/image";
import BoardzyLogo from "../../../public/boardzy-logo.png";
import { social } from "./social";
import Link from "next/link";
import { FooterTheme } from "./theme";

export const Footer = () => {
  return (
    <footer className="border-2 p-4 md:flex md:items-center md:justify-between">
      <div className="flex items-center">
        <Image src={BoardzyLogo} width={50} height={50} alt="Boardzy Logo" />
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
          Boardzy
        </h3>
      </div>

      <ul className="flex items-center space-x-4 pt-2 md:pt-0">
        {social.map((item) => (
          <li key={item.id}>
            <Link aria-label={item.label} href={item.link}>
              {item.icon}
            </Link>
          </li>
        ))}

        <div className="flex w-full justify-end md:hidden">
          <FooterTheme />
        </div>
      </ul>
      <div className="hidden md:block">
        <FooterTheme />
      </div>
    </footer>
  );
};
