import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <OrganizationProfile
      appearance={{
        elements: {
          rootBox: {
            boxShadow: "none",
            padding: "20px",
            background: "#f4f4f5",
            width: "100%",
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
          },
        },
      }}
    />
  );
};

export default SettingsPage;
