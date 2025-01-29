import { FormPayloadProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";

export const useCreateform = () => {
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
    onSuccess: async (data) => {
      console.log(data);
    },
  });
};
