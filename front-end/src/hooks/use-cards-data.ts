"use client";

import { Card } from "@/types/cards";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

const useCardData = (listId: string) => {
  const [cards, setCards] = useState<Card>();
  const { getToken } = useAuth();

  const getCardsByListId = useCallback(
    async (listId: string) => {
      try {
        const token = await getToken();
        const response = await fetch(`/api/cards/${listId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }

        const data: Card = await response.json();
        setCards(data);
      } catch (err) {
        console.log(err);
      }
    },
    [getToken],
  );

  useEffect(() => {
    if (listId) {
      getCardsByListId(listId);
    }
  }, [listId, getCardsByListId]);
  return {
    cards,
  };
};

export default useCardData;
