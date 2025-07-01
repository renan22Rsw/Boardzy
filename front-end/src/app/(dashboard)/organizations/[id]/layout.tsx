import { OrganizationController } from "./_components/organization-controller";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrganizationController />
      {children}
    </>
  );
};

export default OrganizationLayout;
