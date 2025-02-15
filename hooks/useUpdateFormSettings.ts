import { SingleFormSettingsSchema } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useUpdateFormSettings = (id: string) => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof SingleFormSettingsSchema>) => {
      const response = await fetch(`/api/forms/${id}/settings`, {
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
    onSuccess: async () => {
      toast.success("Settings updated");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
