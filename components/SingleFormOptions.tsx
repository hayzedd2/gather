"use client";
import { Copy, Ellipsis, Eye, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Modal from "./Modal";

interface SingleFormOptionsProps {
  id: string;
}
export function SingleFormOptions({ id }: SingleFormOptionsProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>This is the modal content!</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-md cursor-pointer p-[5px] light-shadow">
            <Ellipsis size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Eye />
              <span>View form</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              <span>Copy form link</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil />
              <span>Edit form</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setIsModalOpen(true)}
            className="focus:bg-[#FEE2E2] focus:text-red-700 text-red-700 bg-[#FEE2E2]"
          >
            <Trash />
            <span className="mt-[2px]">Delete form</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
