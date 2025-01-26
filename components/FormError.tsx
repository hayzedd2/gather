import { OctagonAlert } from "lucide-react";
import React from "react";

interface FormErrorProps {
  message?: string;
}
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className=" bg-destructive/15 mt-3 font-[500] p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <OctagonAlert size={20} />
      <p className="mt-1">{message}</p>
    </div>
  );
};
