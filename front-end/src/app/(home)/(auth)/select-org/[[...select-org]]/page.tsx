import { OrganizationList } from "@clerk/nextjs";

const CreateOrganizationPage = () => {
  return (
    <div className="flex h-[700px] items-center justify-center">
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl={"/organizations/:id"}
        afterCreateOrganizationUrl={"/organizations/:id"}
      />
    </div>
  );
};

export default CreateOrganizationPage;
