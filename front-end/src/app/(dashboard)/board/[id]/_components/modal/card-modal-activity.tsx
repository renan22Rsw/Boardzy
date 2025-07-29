"use client";

import useCardData from "@/hooks/use-cards-data";
import { Card } from "@/types/cards";

import { useAuth } from "@clerk/nextjs";
import { Activity } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CardActivityMessage } from "./card-acitivity-message";
import { AuditLog } from "../../../../../../../../back-end/src/generated/prisma";

export const CardModalActivity = ({ listId }: { listId: string }) => {
  const { getToken } = useAuth();
  const { cards } = useCardData(listId);
  const [logs, setLogs] = useState<AuditLog[]>([]);

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

      const data: AuditLog[] = await response.json();
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
            {logs.map((item) => (
              <CardActivityMessage data={item} key={item.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
