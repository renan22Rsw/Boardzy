import Image from "next/image";
import { Button } from "../ui/button";
import BoardzyLogo from "@/assets/boardzy-logo.png";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export const NavBar = async () => {
  const { userId } = await auth();

  return (
    <nav className="flex justify-between border-2 p-4">
      <div className="flex items-center">
        <Image src={BoardzyLogo} width={50} height={50} alt="Boardzy Logo" />
        <Link href={"/"}>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            Boardzy
          </h3>
        </Link>
      </div>
      <div className="space-x-2">
        {!userId ? (
          <>
            <Link href={"/signup"}>
              <Button variant={"ghost"} className="cursor-pointer">
                Sign Up
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button className="cursor-pointer font-bold">Login</Button>
            </Link>
          </>
        ) : (
          <UserButton />
        )}
      </div>
    </nav>
  );
};
