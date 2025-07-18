import { List } from "@/types/lists";
import { CreateList } from "./create-list";
import { ListItem } from "./list-item";
import { Card } from "@/types/cards";

interface ListSectionProps {
  data: List[];
}

export const ListSection = ({ data }: ListSectionProps) => {
  return (
    <div className="grid w-full grid-cols-2 items-start space-y-2 px-4 py-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
      {data?.map(({ id, title, card }) => (
        <ListItem
          key={id}
          title={title}
          id={id}
          listId={id}
          data={card as Card[]}
        />
      ))}
      <CreateList />
    </div>
  );
};
