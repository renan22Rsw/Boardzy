import { Button } from "@/components/ui/button";
import { HomeSection } from "./_components/home-section";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="h-[450px] max-w-[800px] space-y-4">
        <h1 className="text-center text-3xl font-bold text-zinc-800 lg:text-5xl dark:text-zinc-200">
          Boardzy makes task management effortless
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <HomeSection />
          <p className="px-4 font-bold text-zinc-500 md:w-[500px] lg:text-lg">
            Create boards, add cards, manage projects, and get things done — all
            in one place. With Boardzy, turning ideas into action has never been
            easier.
          </p>
          <Link href={"/select-org"}>
            <Button className="cursor-pointer font-semibold">
              Get Started with Boardzy
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
