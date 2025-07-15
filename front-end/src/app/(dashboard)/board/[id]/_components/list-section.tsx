import { List } from "@/types/lists";
import { CreateList } from "./create-list";
import { ListItem } from "./list-item";

interface ListSectionProps {
  data: List[];
}

export const ListSection = ({ data }: ListSectionProps) => {
  return (
    <div className="grid grid-cols-2 items-center justify-center space-y-2 gap-x-3 px-2 py-6 xl:flex xl:justify-start">
      {data?.map(({ id, title }) => (
        <ListItem key={id} title={title} id={id} />
      ))}
      <CreateList />
    </div>
  );
};
