"use client";

import { List } from "@/types/lists";
import { CreateList } from "./create-list";
import { ListItem } from "./list-item";
import { Card } from "@/types/cards";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

interface ListSectionProps {
  data: List[];
}

export const ListSection = ({ data }: ListSectionProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { getToken } = useAuth();

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const updateListOrder = async (items: { id: string; order: number }[]) => {
    try {
      const token = await getToken();
      const response = await fetch("/api/lists", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      toast.success(data.message);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }

      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    }
  };

  const updateCardOrder = async (items: Card[]) => {
    try {
      const token = await getToken();
      const response = await fetch("/api/cards", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      toast.success(data.message);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    }
  };

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // Dropped in the same position

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // User moves a lsit

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      setOrderedData(items);
      // TODO: Update list order in the database
      updateListOrder(items);
    }

    //User moves a card

    if (type === "card") {
      const newOrderedData = [...orderedData];

      // Source and destination list

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destinationList) return;

      // Check if cards exists on the sourceList

      if (!sourceList.card) {
        sourceList.card = [];
      }

      // Check if cards exists on the destinationList

      if (!destinationList.card) {
        destinationList.card = [];
      }

      //Moving the card in the same list

      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.card,
          source.index,
          destination.index,
        );
        reorderCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.card = reorderCards;

        setOrderedData(newOrderedData);

        // TODO: Update card order in the database
        updateCardOrder(reorderCards);

        //User moves the card to another list
      } else {
        const [movedCard] = sourceList.card.splice(source.index, 1);

        //Assign the new listId to the moved card

        movedCard.listId = destination.droppableId;

        // Add card to the destination list

        destinationList.card.splice(destination.index, 0, movedCard);

        sourceList.card.forEach((card, index) => {
          card.order = index;
        });

        //Update the order for each card in the destination list

        destinationList.card.forEach((card, index) => {
          card.order = index;

          if (card.id === movedCard.id) {
            card.listId = destination.droppableId;
          }
        });

        setOrderedData(newOrderedData);
        updateCardOrder(destinationList.card);
      }
    }
  };

  {
    /*
The above functions were created using a video from youtube channel 
Code with antonio, pleasse check the video in case of any doubts
  */
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <main
            className="grid w-full grid-cols-2 items-start space-y-2 px-4 py-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {orderedData?.map(({ id, title, card }, index) => (
              <ListItem
                key={id}
                title={title}
                id={id}
                listId={id}
                data={card as Card[]}
                index={index}
              />
            ))}
            {provided.placeholder}
            <CreateList />
          </main>
        )}
      </Droppable>
    </DragDropContext>
  );
};
