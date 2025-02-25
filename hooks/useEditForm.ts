import { FormPayloadProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useEditForm = (id: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (values: FormPayloadProps) => {
      const response = await fetch(`/api/forms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: async (data) => {
      toast.success("Your form was edited sucessfully:)");
      router.push(`/forms/${data.id}/submissions`);
    },
    onError() {
       toast.error("An error occured");
    },
  });
};
