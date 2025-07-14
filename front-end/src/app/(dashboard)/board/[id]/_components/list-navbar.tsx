import { ListNavbarTitle } from "./list-navbar-title";

interface ListNavbarProps {
  title: string;
  backgroundColor: string;
  id: string;
  orgId: string;
}

export const ListNavbar = ({
  title,
  backgroundColor,
  id,
  orgId,
}: ListNavbarProps) => {
  return (
    <nav
      className="flex h-16 w-full items-center px-6 text-white"
      style={{ backgroundColor }}
    >
      <ListNavbarTitle title={title} id={id} orgId={orgId} />
    </nav>
  );
};
