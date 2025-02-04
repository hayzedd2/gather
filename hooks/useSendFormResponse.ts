
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSendFormResponse = (id: string) => {
  return useMutation({
    mutationFn: async (values: any) => {
      const response = await fetch(`/api/forms/${id}/submissions`, {
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
    onSuccess: async (data) => {
      console.log("Success data", data);
      toast.success("Your form was submitted sucessfully:)");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
