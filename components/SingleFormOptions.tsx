import { Copy, Ellipsis, Eye, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SingleFormOptionsProps {
  id: string;
}
export function SingleFormOptions({ id }: SingleFormOptionsProps) {
  return (
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

        <DropdownMenuItem className="focus:bg-[#FEE2E2] focus:text-red-700 text-red-700 bg-[#FEE2E2]">
          <Trash />
          <span className="mt-[2px]">Delete form</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
