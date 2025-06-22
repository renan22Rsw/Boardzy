import Image from "next/image";
import { Button } from "../ui/button";
import BoardzyLogo from "../../../public/boardzy-logo.png";

export const NavBar = () => {
  return (
    <nav className="flex justify-between p-4 shadow-lg dark:shadow-none">
      <div className="flex items-center">
        <Image src={BoardzyLogo} width={50} height={50} alt="Boardzy Logo" />
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
          Boardzy
        </h3>
      </div>
      <div className="space-x-2">
        <Button variant={"ghost"} className="cursor-pointer">
          Sign Up
        </Button>
        <Button className="cursor-pointer font-bold">Login</Button>
      </div>
    </nav>
  );
};
