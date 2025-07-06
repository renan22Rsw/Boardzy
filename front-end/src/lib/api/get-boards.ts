import { auth } from "@clerk/nextjs/server";

export const getBoards = async () => {
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

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
