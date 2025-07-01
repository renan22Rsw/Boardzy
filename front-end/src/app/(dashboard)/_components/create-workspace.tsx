import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const CreateWorkspace = () => {
  return (
    <Button
      asChild
      type="button"
      variant={"ghost"}
      className="cursor-pointer rounded-full"
      style={{ width: "20px", height: "20px" }}
    >
      <Link href={"/select-org"}>
        <Plus />
      </Link>
    </Button>
  );
};
