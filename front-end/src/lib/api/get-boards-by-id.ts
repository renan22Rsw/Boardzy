import { Boards } from "@/types/boards";
import { auth } from "@clerk/nextjs/server";

export const getBoardById = async (id: string): Promise<Boards | undefined> => {
  const { getToken } = await auth();

  const token = await getToken();

  const response = await fetch(`${process.env.BACKEND_URL}/api/boards/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("Failed to fetch boards");
  }

  try {
    const data: Boards = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
