import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
  DiscordLogoIcon,
} from "@radix-ui/react-icons";
import { ReactNode } from "react";

interface Social {
  id: number;
  label: string;
  icon: ReactNode;
  link: string;
}
export const social: Social[] = [
  {
    id: 1,
    label: "GitHub",
    icon: <GitHubLogoIcon width={22} height={22} />,
    link: "https://github.com/renan22Rsw",
  },
  {
    id: 2,
    label: "LinkedIn",
    icon: <LinkedInLogoIcon width={22} height={22} />,
    link: "https://www.linkedin.com/in/renan-victor-1a411735b/",
  },
  {
    id: 3,
    label: "Instagram",
    icon: <InstagramLogoIcon width={22} height={22} />,
    link: "https://www.instagram.com/renan_rsw/",
  },
  {
    id: 4,
    label: "Discord",
    icon: <DiscordLogoIcon width={22} height={22} />,
    link: "https://discord.gg/QZmjmg5g",
  },
];
