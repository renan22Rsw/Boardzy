import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { FcGoogle } from "react-icons/fc";

export const GoogleButton = ({
  googleDescription,
}: {
  googleDescription: string;
}) => {
  return (
    <SignInButton>
      <Button className="cursor-pointer" variant={"outline"}>
        <FcGoogle />
        <p className="text-sm italic">{googleDescription} with google</p>
      </Button>
    </SignInButton>
  );
};
