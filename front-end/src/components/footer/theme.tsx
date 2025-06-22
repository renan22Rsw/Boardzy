import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface FooterThmeValues {
  id: number;
  icon: ReactNode;
}

const FooterThemeValues: FooterThmeValues[] = [
  {
    id: 1,
    icon: <SunIcon width={20} height={20} />,
  },
  {
    id: 2,
    icon: <MoonIcon width={20} height={20} />,
  },
];

export const FooterTheme = () => {
  return (
    <div className="flex items-center space-x-4">
      {FooterThemeValues.map(({ id, icon }) => (
        <Button key={id} variant={"ghost"} className="cursor-pointer">
          {icon}
        </Button>
      ))}
    </div>
  );
};
