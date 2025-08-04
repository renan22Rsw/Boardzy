"use client";

import useCardData from "@/hooks/use-cards-data";
import { Card } from "@/types/cards";

import { useAuth } from "@clerk/nextjs";
import { Activity } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CardActivityMessage } from "./card-acitivity-message";
import { Logs } from "@/types/logs";
import { CardModalActivitySkeleton } from "./card-modal-activity-skeleton";

export const CardModalActivity = ({ listId }: { listId: string }) => {
  const { getToken } = useAuth();
  const { cards } = useCardData(listId);
  const [logs, setLogs] = useState<Logs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCardsLogs = useCallback(async () => {
    const { id } = cards as Card;

    try {
      const token = await getToken();
      const response = await fetch(`/api/cards/${id}/logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data: Logs[] = await response.json();
      setLogs(data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      console.log(err);
    }
  }, [getToken, cards]);

  useEffect(() => {
    if (cards) {
      fetchCardsLogs();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [cards, fetchCardsLogs]);

  return (
    <div className="space-y-2">
      {logs.length > 0 && (
        <>
          <div className="flex items-center gap-x-2">
            <Activity size={20} />
            <h6 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              Activity
            </h6>
          </div>
          <div>
            {isLoading ? (
              <CardModalActivitySkeleton />
            ) : (
              logs.map((log) => <CardActivityMessage data={log} key={log.id} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};
