import { Boards } from "@/types/boards";
import { auth } from "@clerk/nextjs/server";

export const getBoards = async (): Promise<Boards[]> => {
  try {
    const { getToken } = await auth();

    const token = await getToken();

    const response = await fetch(`${process.env.BACKEND_URL}/api/boards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: Boards[] = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw Error("Something went wrong");
  }
};
