import { Loader } from "lucide-react";
import React from "react";

const MiniLoader = () => {
  return (
    <div className="min-h-[20rem] items-center justify-center flex ">
      <Loader className="size-4 text-muted-foreground animate-spin" />
    </div>
  );
};

export default MiniLoader;
