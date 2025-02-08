import { CircleOff } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="min-h-[20rem] flex-col items-center justify-center flex ">
      <CircleOff className="size-13 text-muted-foreground " />
      <h4 className="mt-4 font-[500] text-[15px] text-subtle max-w-[300px] text-center">
        {message}
      </h4>
      <Button variant={"link"}>
        <Link href={"/forms"}>Go back to my forms</Link>
      </Button>
    </div>
  );
};

export default ErrorMessage;
