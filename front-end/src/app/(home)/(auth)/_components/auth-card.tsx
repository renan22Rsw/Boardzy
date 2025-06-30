import { Button } from "@/components/ui/button";
import { AuthContainer } from "./auth-container";

import { ReactNode } from "react";
import Link from "next/link";
import { GoogleButton } from "./google-button";

interface AuthCardProps {
  authForm: ReactNode;
  googleDescription: string;
  authOptionDescription: string;
  authFormTitle: string;
  authFormDescription: string;
  authHref: string;
  authButtonLabel: string;
  authOptionDescritionMobile: string;
}

export const AuthCard = ({
  authForm,
  googleDescription,
  authOptionDescription,
  authFormTitle,
  authFormDescription,
  authHref,
  authButtonLabel,
  authOptionDescritionMobile,
}: AuthCardProps) => {
  return (
    <AuthContainer>
      <main className="flex w-4/5 justify-center rounded-2xl border-2 bg-zinc-50 md:w-2/4 dark:bg-zinc-900">
        <div className="hidden w-2/4 flex-col items-center justify-center space-y-4 rounded-2xl bg-violet-400 text-zinc-100 lg:flex dark:bg-violet-900">
          <h3 className="text-3xl font-bold">Welcome back!</h3>
          <span className="px-2 text-center">{authFormDescription}</span>
          <Link href={authHref}>
            <Button
              className="w-[150px] cursor-pointer border-zinc-100 bg-transparent py-2 font-bold uppercase"
              variant={"outline"}
            >
              {authButtonLabel}
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-2 rounded-2xl py-6 md:w-3/5">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {authFormTitle}
          </h2>
          <GoogleButton googleDescription={googleDescription} />
          <span className="px-4 text-center text-sm text-zinc-500">
            {authOptionDescription}
          </span>
          {authForm}
          <Link href={authHref} className="italic underline lg:hidden">
            {authOptionDescritionMobile}
          </Link>
        </div>
      </main>
    </AuthContainer>
  );
};
