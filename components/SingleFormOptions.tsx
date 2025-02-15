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
import { Button } from "./ui/button";
import { useDeleteForm } from "@/hooks/useDeleteForm";
import { SvgLoading } from "./SvgLoading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateShareableLink } from "@/helpers/generateShareableLink";

interface SingleFormOptionsProps {
  id: string;
}
export function SingleFormOptions({ id }: SingleFormOptionsProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { mutate: deleteform, isPending } = useDeleteForm();
  const handleDelete = () => {
    deleteform(id, {
      onSuccess: () => {
        toast.success("Form deleted!");
      },
      onError(error) {
        toast.error(error.message);
      },
      onSettled: () => {
        setIsModalOpen(false);
      },
    });
  };

  const copyFormLink = async () => {
    try {
      await navigator.clipboard.writeText(generateShareableLink(id));
      toast.success("Link copied!");
    } catch {
      toast.error("An error occured");
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h5 className="text-[1.2rem] font-[500]"> Are you sure?</h5>
        <p className="text-muted-foreground mt-1 font-[500] text-[14px]">
          Are you sure you want to delete this form? This would delete all data
          related to this form.
          {isModalOpen ? "true" : "false"}
        </p>
        <div className="mt-4 flex gap-3 justify-end">
          <Button onClick={() => setIsModalOpen(false)} variant={"outline"}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            variant={"destructive"}
          >
            {isPending && <SvgLoading />}
            <span className="mt-[3px]">Delete form</span>
          </Button>
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
            <Link href={`/form/${id}`}>
              <DropdownMenuItem>
                <Eye />
                <span>View form</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={copyFormLink}>
              <Copy />
              <span>Copy form link</span>
            </DropdownMenuItem>
            <Link href={`/forms/${id}/edit`}>
              <DropdownMenuItem>
                <Pencil />
                <span>Edit form</span>
              </DropdownMenuItem>
            </Link>
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
