import { List } from "@/types/lists";
import { auth } from "@clerk/nextjs/server";

export const getBoardList = async (id: string): Promise<List[]> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(`${process.env.BACKEND_URL}/api/lists/${id}`, {
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
