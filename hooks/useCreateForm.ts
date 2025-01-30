import { FormPayloadProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateform = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (values: FormPayloadProps) => {
      const response = await fetch("/api/forms", {
        method: "POST",
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
    onSuccess: async () => {
      toast.success("Your form was published sucessfully:)");
      router.push('/forms')
    //   invalidate forms query
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
