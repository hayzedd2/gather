"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";

interface ClipboardProps {
  text: string;
}
const CopyToClipBoard = ({ text }: ClipboardProps) => {
  const [copyState, setCopyState] = React.useOptimistic<"idle" | "copied">(
    "idle"
  );
  const [, startTransition] = React.useTransition();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => {
            startTransition(async () => {
              await navigator.clipboard.writeText(text);
              setCopyState("copied");
              await new Promise((resolve) => setTimeout(resolve, 2000));
              setCopyState("idle");
            });
          }}
          type="button"
        >
          {copyState == "idle" ? <Copy size={16} /> : <Check size={16} />}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{copyState == "idle" ? "Copy" : "Copied"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyToClipBoard;
