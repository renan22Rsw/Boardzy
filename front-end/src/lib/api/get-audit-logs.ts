import { Logs } from "@/types/logs";
import { auth } from "@clerk/nextjs/server";

export const getAuditLogs = async (): Promise<Logs[]> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(`${process.env.BACKEND_URL}/api/logs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw Error("Something went wrong");
  }
};
