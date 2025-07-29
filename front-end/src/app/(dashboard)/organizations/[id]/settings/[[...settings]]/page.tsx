"use client";

import { OrganizationProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
const SettingsPage = () => {
  const { theme } = useTheme();

  return (
    <OrganizationProfile
      appearance={{
        variables: {
          colorBackground: theme === "dark" ? "#09090B" : "#fff",
        },
        elements: {
          rootBox: {
            boxShadow: "none",
            padding: "20px",
            width: "100%",
            maxWidth: "1200px",
            height: "100vh",
          },

          cardBox: {
            boxShadow: "none",
            borderRadius: "0px",
            width: "100%",
            height: "100%",
          },

          scrollBox: {
            width: "100%",
            borderRadius: "none",
            border: "none",
          },
        },
      }}
    />
  );
};

export default SettingsPage;
